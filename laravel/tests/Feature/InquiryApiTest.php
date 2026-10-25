<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Support\ContactRules;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class InquiryApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array{name: string, email: string, business: string, plan: string, message: string}
     */
    private function valid(string $name = 'Aina'): array
    {
        return [
            'name' => $name,
            'email' => 'aina@example.com',
            'business' => 'Kedai Aina',
            'plan' => 'free',
            'message' => 'Saya ingin tahu tentang pakej FREE untuk laman statik.',
        ];
    }

    public function test_health_reports_the_storage_label_for_the_configured_driver(): void
    {
        $response = $this->getJson('/api/health')
            ->assertOk()
            ->assertExactJson([
                'ok' => true,
                'service' => 'vividworks-my',
                'storage' => ContactRules::storageName(),
            ]);

        $this->assertFalse($response->headers->has('Access-Control-Allow-Origin'));
    }

    public function test_unknown_api_requests_use_the_express_not_found_payload(): void
    {
        $this->getJson('/api/missing')
            ->assertNotFound()
            ->assertExactJson(['message' => 'Tidak dijumpai.']);

        $this->postJson('/api/health')
            ->assertNotFound()
            ->assertExactJson(['message' => 'Tidak dijumpai.']);
    }

    public function test_health_returns_503_when_the_database_cannot_be_reached(): void
    {
        $original = config('database.default');
        config([
            'database.default' => 'pgsql',
            'database.connections.pgsql.host' => '127.0.0.1',
            'database.connections.pgsql.port' => '1',
            'database.connections.pgsql.database' => 'blocked',
            'database.connections.pgsql.username' => 'blocked',
            'database.connections.pgsql.password' => '',
            'database.connections.pgsql.url' => null,
        ]);
        DB::purge('pgsql');

        try {
            $this->getJson('/api/health')
                ->assertStatus(503)
                ->assertExactJson([
                    'ok' => false,
                    'service' => 'vividworks-my',
                    'storage' => 'postgres',
                ]);
        } finally {
            config(['database.default' => $original]);
            DB::purge('pgsql');
        }
    }

    public function test_contact_stores_an_inquiry(): void
    {
        $storage = ContactRules::storageName();
        $response = $this->postJson('/api/contact', $this->valid())
            ->assertCreated()
            ->assertJsonPath('saved', true)
            ->assertJsonPath('storage', $storage)
            ->assertJsonPath('message', ContactRules::savedMessage($storage));

        $id = $response->json('id');
        $this->assertMatchesRegularExpression(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
            $id,
        );
        $this->assertDatabaseHas('inquiries', [
            'id' => $id,
            'name' => 'Aina',
            'email' => 'aina@example.com',
            'business' => 'Kedai Aina',
            'plan' => 'free',
        ]);
    }

    public function test_contact_returns_the_express_validation_messages(): void
    {
        $this->postJson('/api/contact', [
            'name' => ' ',
            'email' => 'bukan-emel',
            'business' => str_repeat('a', 121),
            'plan' => 'enterprise',
            'message' => 'terlalu pendek',
        ])->assertStatus(400)->assertExactJson([
            'saved' => false,
            'errors' => [
                'name' => 'Masukkan nama (sekurang-kurangnya 2 aksara).',
                'email' => 'Masukkan alamat e-mel yang sah.',
                'business' => 'Nama perniagaan terlalu panjang.',
                'plan' => 'Pakej tidak dikenali.',
                'message' => 'Mesej perlu sekurang-kurangnya 20 aksara supaya ia jelas.',
            ],
        ]);
    }

    public function test_contact_rate_limit_is_eight_per_hour_and_runs_after_the_size_check(): void
    {
        $this->call(
            'POST',
            '/api/contact',
            server: [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_ACCEPT' => 'application/json',
                'CONTENT_LENGTH' => 30000,
            ],
            content: str_repeat('a', 30000),
        )->assertStatus(413)->assertContent('Payload Too Large');

        for ($attempt = 0; $attempt < 7; $attempt++) {
            $this->postJson('/api/contact', $this->valid())->assertCreated();
        }

        $this->postJson('/api/contact', ['name' => 'A'])->assertStatus(400);
        $this->assertSame(7, Inquiry::query()->count());

        $this->postJson('/api/contact', $this->valid('Kesembilan'))
            ->assertStatus(429)
            ->assertExactJson([
                'saved' => false,
                'message' => 'Terlalu banyak percubaan. Cuba lagi kemudian.',
            ]);

        $this->postJson('/api/contact', $this->valid('Kesepuluh'))->assertStatus(429);
        $this->assertSame(7, Inquiry::query()->count());
        $this->assertDatabaseMissing('inquiries', ['name' => 'Kesembilan']);
    }

    public function test_contact_returns_500_when_the_row_cannot_be_saved(): void
    {
        Schema::rename('inquiries', 'inquiries_hidden');

        $this->postJson('/api/contact', $this->valid())
            ->assertStatus(500)
            ->assertExactJson([
                'saved' => false,
                'message' => 'Mesej tidak disimpan.',
            ]);
    }

    public function test_inquiries_follow_the_admin_token_contract(): void
    {
        Inquiry::query()->create([
            'id' => 'older',
            'created_at' => now()->subMinute(),
            ...$this->valid('Lama'),
        ]);
        Inquiry::query()->create([
            'id' => 'newer',
            'created_at' => now(),
            ...$this->valid('Baru'),
        ]);

        config(['services.admin.token' => '']);
        $this->getJson('/api/inquiries', ['Authorization' => 'Bearer test-admin-token'])
            ->assertNotFound()
            ->assertExactJson(['message' => 'Tidak dijumpai.']);

        config(['services.admin.token' => 'test-admin-token']);
        $this->getJson('/api/inquiries')
            ->assertUnauthorized()
            ->assertExactJson(['message' => 'Tidak dibenarkan.']);
        $this->getJson('/api/inquiries', ['Authorization' => 'Bearer salah'])
            ->assertUnauthorized();
        $this->getJson('/api/inquiries', ['Authorization' => 'bearer test-admin-token'])
            ->assertUnauthorized();

        $response = $this->getJson('/api/inquiries', [
            'Authorization' => 'Bearer test-admin-token',
        ])->assertOk();

        $response->assertJsonPath('inquiries.0.id', 'newer');
        $response->assertJsonPath('inquiries.0.name', 'Baru');
        $response->assertJsonPath('inquiries.1.id', 'older');
        $this->assertMatchesRegularExpression(
            '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/',
            $response->json('inquiries.0.createdAt'),
        );
        $this->assertArrayNotHasKey('created_at', $response->json('inquiries.0'));
    }

    public function test_inquiries_return_only_the_newest_hundred(): void
    {
        foreach (range(1, 101) as $index) {
            Inquiry::query()->create([
                'id' => 'row-'.$index,
                'created_at' => now()->addSeconds($index),
                ...$this->valid('Orang '.$index),
            ]);
        }

        $response = $this->getJson('/api/inquiries', [
            'Authorization' => 'Bearer test-admin-token',
        ])->assertOk();

        $ids = array_column($response->json('inquiries'), 'id');
        $this->assertCount(100, $ids);
        $this->assertSame('row-101', $ids[0]);
        $this->assertNotContains('row-1', $ids);
    }

    public function test_inquiries_return_500_when_the_list_cannot_be_read(): void
    {
        Schema::rename('inquiries', 'inquiries_hidden');

        $this->getJson('/api/inquiries', ['Authorization' => 'Bearer test-admin-token'])
            ->assertStatus(500)
            ->assertExactJson(['message' => 'Senarai mesej tidak dapat dibaca.']);
    }

    public function test_migration_does_not_change_an_existing_inquiries_table(): void
    {
        Schema::drop('inquiries');
        Schema::create('inquiries', function ($table): void {
            $table->text('id')->primary();
            $table->text('name');
        });
        DB::table('inquiries')->insert([
            'id' => 'keep-me',
            'name' => 'Ada',
        ]);

        $migration = require database_path('migrations/2026_10_25_000000_create_inquiries_table.php');
        $migration->up();

        $this->assertFalse(Schema::hasColumn('inquiries', 'email'));
        $this->assertSame('Ada', DB::table('inquiries')->where('id', 'keep-me')->value('name'));

        $migration->down();

        $this->assertTrue(Schema::hasTable('inquiries'));
        $this->assertSame(1, DB::table('inquiries')->count());

        Schema::drop('inquiries');
        $migration->up();

        $this->assertEqualsCanonicalizing(
            ['id', 'name', 'email', 'business', 'plan', 'message', 'created_at'],
            Schema::getColumnListing('inquiries'),
        );
        $this->assertFalse(Schema::hasColumn('inquiries', 'updated_at'));
    }
}
