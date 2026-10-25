<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Create inquiries only when the table is absent.
     *
     * The preview database already owns public.inquiries. This migration must
     * not add, rename, or retype any column on that table.
     */
    public function up(): void
    {
        if (Schema::hasTable('inquiries')) {
            return;
        }

        Schema::create('inquiries', function (Blueprint $table) {
            $table->text('id')->primary();
            $table->text('name');
            $table->text('email');
            $table->text('business')->default('');
            $table->text('plan')->default('');
            $table->text('message');
            $table->timestampTz('created_at', 6)->useCurrent();
        });
    }

    /**
     * Never drop inquiries. A rollback must leave the preview table in place.
     */
    public function down(): void
    {
        //
    }
};
