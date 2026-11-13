#!/bin/sh
# Prepare writable Laravel paths, then start PHP-FPM and Nginx.
# Does not generate APP_KEY. Does not migrate. Does not look for public/index.html.
set -eu

cd /var/www/html

if [ ! -f public/index.php ]; then
    echo "laravel api entrypoint: public/index.php is missing" >&2
    exit 1
fi

mkdir -p \
    /run/php \
    storage/app/private \
    storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

chown -R www-data:www-data /run/php storage bootstrap/cache
find storage bootstrap/cache -type d -exec chmod 775 {} \;
find storage bootstrap/cache -type f -exec chmod 664 {} \;

if [ "$#" -gt 0 ] && [ "$1" != "serve" ]; then
    exec "$@"
fi

php-fpm -t
nginx -t
php-fpm -D

if [ ! -S /run/php/php-fpm.sock ]; then
    echo "laravel api entrypoint: php-fpm socket was not created" >&2
    exit 1
fi

exec nginx -g 'daemon off;'
