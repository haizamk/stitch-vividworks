# Laravel API (Fasa B1)

This folder is the isolated Laravel 13 API. It does not replace the Express server in `server/`, and it is not connected to the preview site.

See the repository README for how to run PHPUnit. Tests use SQLite in memory.

Do not run `php artisan migrate` against the preview database. The inquiries migration leaves an existing `inquiries` table unchanged, and `down()` does not drop it.

Local smoke stays on loopback:

```bash
php artisan serve --host=127.0.0.1 --port=8790
```

The only approved remote exposure is the Coolify staging hostname on Monalisa. Production and `preview.vividworks.my` are out of scope. Coolify builds `laravel/Dockerfile` with base directory `laravel`. It does not build the root `Dockerfile`. That image is Nginx and PHP-FPM for this API only. It does not contain the React app or the Express server. Leave the image command as `serve`. That command starts PHP-FPM and Nginx. It is not `php artisan serve`.

`php artisan migrate --force --no-interaction` is a manual step, and only against the new Supabase staging project. Run it inside the staging container after `DB_URL` points at that project's port 5432 URL (direct or session pooler, `sslmode=require`). Do not run it against preview or production. Do not run `migrate:fresh`, `migrate:refresh`, or `db:wipe`. The container entrypoint does not migrate and does not generate `APP_KEY`.

Coolify injects the staging environment, including `APP_KEY`. Do not commit a key, a database password, or `ADMIN_TOKEN`. `/api/health` stays 503 until that manual migrate can reach the staging database. The image health check is `http://127.0.0.1/fpm-ping` from inside the container. Coolify's HTTP check, once enabled, is `GET /api/health` on port 80.
