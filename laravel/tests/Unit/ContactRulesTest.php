<?php

namespace Tests\Unit;

use App\Support\ContactRules;
use Tests\TestCase;

class ContactRulesTest extends TestCase
{
    /**
     * @return array{name: string, email: string, business: string, plan: string, message: string}
     */
    private function valid(): array
    {
        return [
            'name' => 'Aina',
            'email' => 'aina@example.com',
            'business' => 'Kedai Aina',
            'plan' => 'free',
            'message' => 'Saya ingin tahu tentang pakej FREE untuk laman statik.',
        ];
    }

    public function test_accepts_a_complete_inquiry(): void
    {
        $this->assertSame([], ContactRules::validate($this->valid()));
    }

    public function test_rejects_a_short_message_and_an_unknown_plan(): void
    {
        $errors = ContactRules::validate([
            ...$this->valid(),
            'plan' => 'enterprise',
            'message' => 'pendek',
        ]);

        $this->assertSame('Pakej tidak dikenali.', $errors['plan']);
        $this->assertStringContainsString('20 aksara', $errors['message']);
    }

    public function test_normalizes_surrounding_space(): void
    {
        $contact = ContactRules::normalize([
            ...$this->valid(),
            'name' => '  Aina  ',
            'business' => '',
        ]);

        $this->assertSame('Aina', $contact['name']);
        $this->assertSame('', $contact['business']);
    }

    public function test_checks_length_boundaries(): void
    {
        $this->assertArrayNotHasKey('name', ContactRules::validate([
            ...$this->valid(),
            'name' => str_repeat('a', 80),
        ]));
        $this->assertSame(
            'Nama terlalu panjang.',
            ContactRules::validate([...$this->valid(), 'name' => str_repeat('a', 81)])['name'],
        );

        $this->assertArrayNotHasKey('email', ContactRules::validate([
            ...$this->valid(),
            'email' => str_repeat('a', 108).'@example.com',
        ]));
        $this->assertSame(
            'Masukkan alamat e-mel yang sah.',
            ContactRules::validate([
                ...$this->valid(),
                'email' => str_repeat('a', 109).'@example.com',
            ])['email'],
        );

        $this->assertArrayNotHasKey('business', ContactRules::validate([
            ...$this->valid(),
            'business' => str_repeat('a', 120),
        ]));
        $this->assertSame(
            'Nama perniagaan terlalu panjang.',
            ContactRules::validate([...$this->valid(), 'business' => str_repeat('a', 121)])['business'],
        );

        $this->assertArrayNotHasKey('message', ContactRules::validate([
            ...$this->valid(),
            'message' => str_repeat('a', 2000),
        ]));
        $this->assertSame(
            'Mesej terlalu panjang. Pendekkan kepada 2,000 aksara.',
            ContactRules::validate([...$this->valid(), 'message' => str_repeat('a', 2001)])['message'],
        );
    }

    public function test_storage_messages_follow_the_configured_driver_without_connecting(): void
    {
        config(['database.default' => 'sqlite']);
        $this->assertSame('file', ContactRules::storageName());
        $this->assertSame(
            'Mesej telah disimpan pada pelayan ini. E-mel automatik belum diaktifkan.',
            ContactRules::savedMessage(),
        );

        config(['database.default' => 'pgsql']);
        $this->assertSame('postgres', ContactRules::storageName());
        $this->assertSame(
            'Mesej telah disimpan dalam pangkalan data. E-mel automatik belum diaktifkan.',
            ContactRules::savedMessage(),
        );
    }
}
