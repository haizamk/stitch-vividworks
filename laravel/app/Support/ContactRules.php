<?php

namespace App\Support;

class ContactRules
{
    public const EMAIL_PATTERN = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

    /**
     * @var list<string>
     */
    public const PLAN_IDS = ['free', 'starter', 'professional', 'business'];

    /**
     * @param  array<string, mixed>  $draft
     * @return array{name: string, email: string, business: string, plan: string, message: string}
     */
    public static function normalize(array $draft): array
    {
        return [
            'name' => trim(self::string($draft['name'] ?? null)),
            'email' => trim(self::string($draft['email'] ?? null)),
            'business' => trim(self::string($draft['business'] ?? null)),
            'plan' => trim(self::string($draft['plan'] ?? null)),
            'message' => trim(self::string($draft['message'] ?? null)),
        ];
    }

    /**
     * @param  array{name: string, email: string, business: string, plan: string, message: string}  $contact
     * @return array<string, string>
     */
    public static function validate(array $contact): array
    {
        $errors = [];
        $name = $contact['name'];
        $email = $contact['email'];
        $business = $contact['business'];
        $plan = $contact['plan'];
        $message = $contact['message'];

        if (self::length($name) < 2) {
            $errors['name'] = 'Masukkan nama (sekurang-kurangnya 2 aksara).';
        } elseif (self::length($name) > 80) {
            $errors['name'] = 'Nama terlalu panjang.';
        }

        if (preg_match(self::EMAIL_PATTERN, $email) !== 1 || self::length($email) > 120) {
            $errors['email'] = 'Masukkan alamat e-mel yang sah.';
        }

        if (self::length($business) > 120) {
            $errors['business'] = 'Nama perniagaan terlalu panjang.';
        }

        if ($plan !== '' && ! in_array($plan, self::PLAN_IDS, true)) {
            $errors['plan'] = 'Pakej tidak dikenali.';
        }

        if (self::length($message) < 20) {
            $errors['message'] = 'Mesej perlu sekurang-kurangnya 20 aksara supaya ia jelas.';
        } elseif (self::length($message) > 2000) {
            $errors['message'] = 'Mesej terlalu panjang. Pendekkan kepada 2,000 aksara.';
        }

        return $errors;
    }

    public static function storageName(): string
    {
        $connection = (string) config('database.default');
        $driver = config("database.connections.{$connection}.driver", $connection);

        return $driver === 'pgsql' ? 'postgres' : 'file';
    }

    public static function savedMessage(?string $storage = null): string
    {
        $storage ??= self::storageName();

        return $storage === 'postgres'
            ? 'Mesej telah disimpan dalam pangkalan data. E-mel automatik belum diaktifkan.'
            : 'Mesej telah disimpan pada pelayan ini. E-mel automatik belum diaktifkan.';
    }

    private static function string(mixed $value): string
    {
        if (is_string($value)) {
            return $value;
        }

        if (is_int($value) || is_float($value)) {
            return (string) $value;
        }

        return '';
    }

    private static function length(string $value): int
    {
        return mb_strlen($value, 'UTF-8');
    }
}
