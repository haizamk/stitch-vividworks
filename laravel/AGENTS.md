# Agent notes

This Laravel app is phase B1 only. Do not install system packages, `php8.5-pgsql`, Laravel Boost, or a PHP-FPM pool. Do not change Nginx, HestiaCP, or the Express process on port 8787. Do not run migrations against the preview database, and do not put real secrets in git.

PHPUnit runs with SQLite in memory from this directory: `./vendor/bin/phpunit`.
