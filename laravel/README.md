# Laravel API (Fasa B1)

This folder is the isolated Laravel 13 API. It does not replace the Express server in `server/`, and it is not connected to the preview site.

See the repository README for how to run PHPUnit. Tests use SQLite in memory.

Do not run `php artisan migrate` against the preview database. The inquiries migration leaves an existing `inquiries` table unchanged, and `down()` does not drop it.

Do not expose this app beyond `127.0.0.1`. A local smoke server, when one is required, uses port 8790.
