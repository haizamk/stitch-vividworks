# Laravel 13 API for Coolify staging on Monalisa.
# Coolify base directory is laravel/, so this context cannot see the React app or Express.
# The entrypoint does not generate APP_KEY and does not migrate.

FROM php:8.4-fpm-bookworm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        libpq-dev \
        nginx \
        unzip \
    && docker-php-ext-install -j"$(nproc)" opcache pdo_pgsql \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p \
        /var/www/html \
        /run/php \
        /var/lib/nginx \
        /var/log/nginx \
        /etc/nginx/conf.d \
    && rm -f /etc/nginx/sites-enabled/default \
    && chown -R www-data:www-data /var/lib/nginx /var/log/nginx /run/php

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN COMPOSER_ALLOW_SUPERUSER=1 COMPOSER_NO_INTERACTION=1 \
    composer install \
        --no-dev \
        --no-scripts \
        --no-autoloader \
        --prefer-dist \
        --no-interaction

COPY . .

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/php/laravel.ini /usr/local/etc/php/conf.d/laravel.ini
COPY docker/entrypoint.sh /entrypoint.sh

RUN test ! -e database/migrations/2026_11_08_100013_create_vividworks_membership_definer_role.php \
    && test ! -e database/migrations/2026_11_08_100014_create_membership_class_a_functions.php \
    && test ! -e database/migrations/2026_11_08_100015_expand_vividworks_membership_definer_privileges.php \
    && rm -f .env .env.backup .env.production bootstrap/cache/*.php \
    && COMPOSER_ALLOW_SUPERUSER=1 COMPOSER_NO_INTERACTION=1 \
        composer dump-autoload --optimize --no-dev --no-interaction \
    && APP_ENV=staging APP_DEBUG=false \
        php artisan package:discover --ansi --no-interaction \
    && rm -f /usr/local/bin/composer \
    && mkdir -p \
        storage/app/private \
        storage/app/public \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && find storage bootstrap/cache -type d -exec chmod 775 {} \; \
    && find storage bootstrap/cache -type f -exec chmod 664 {} \; \
    && rm -f /usr/local/etc/php-fpm.d/zz-docker.conf \
    && chmod 755 /entrypoint.sh \
    && php-fpm -t \
    && nginx -t

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD curl -fsS http://127.0.0.1/fpm-ping

ENTRYPOINT ["/entrypoint.sh"]
CMD ["serve"]
