# VividWorks production image: Vite assets and Laravel in one container.
# Runtime secrets and database migrations stay outside this build.

FROM node:22-bookworm-slim AS frontend

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .

ARG VITE_SITE_URL=https://vividworks.my
ENV VITE_SITE_URL=${VITE_SITE_URL}
ENV NODE_ENV=production

RUN npm run build \
 && test -s dist/index.html \
 && test ! -e dist/index.php


FROM php:8.4-cli-bookworm AS vendor

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update \
 && apt-get install -y --no-install-recommends unzip git \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY laravel/ /app/
RUN rm -f .env .env.* \
 && composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
 && rm -rf tests phpunit.xml \
 && find bootstrap/cache storage/logs storage/framework -type f ! -name '.gitignore' -delete


FROM php:8.4-fpm-bookworm AS runtime

ENV NODE_ENV=production

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    nginx \
    ca-certificates \
    curl \
    libpq-dev \
    libicu-dev \
    libzip-dev \
 && docker-php-ext-install -j"$(nproc)" bcmath intl opcache pdo_pgsql zip \
 && apt-get purge -y --auto-remove libpq-dev libicu-dev libzip-dev \
 && apt-get install -y --no-install-recommends libpq5 libicu72 libzip4 \
 && rm -rf /var/lib/apt/lists/* \
 && rm -f \
    /usr/local/etc/php-fpm.d/docker.conf \
    /usr/local/etc/php-fpm.d/zz-docker.conf \
    /etc/nginx/sites-enabled/default \
    /etc/nginx/conf.d/default.conf \
 && php -m | grep -qx pdo_pgsql \
 && php -m | grep -qx mbstring \
 && php -m | grep -qx openssl \
 && php -m | grep -qx curl \
 && php -m | grep -qx dom \
 && php -m | grep -qx fileinfo \
 && php -m | grep -qx xml \
 && php -m | grep -qx zip \
 && php -m | grep -qx intl \
 && php -m | grep -qx bcmath \
 && php -m | grep -qi 'Zend OPcache'

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/php/vividworks.ini /usr/local/etc/php/conf.d/vividworks.ini
COPY docker/entrypoint.sh /entrypoint.sh

RUN curl -fsSL -o /usr/bin/tini https://github.com/krallin/tini/releases/download/v0.19.0/tini-static-amd64 \
 && echo "c5b0666b4cb676901f90dfcb37106783c5fe2077b04590973b885950611b30ee  /usr/bin/tini" | sha256sum -c - \
 && chmod 755 /usr/bin/tini

COPY --from=vendor /app /var/www/html
COPY --from=frontend /src/dist /tmp/vite-dist

RUN cp /var/www/html/public/index.php /tmp/index.php.keep \
 && tar -C /tmp/vite-dist -cf - --exclude=index.php . | tar -C /var/www/html/public -xf - \
 && cmp /tmp/index.php.keep /var/www/html/public/index.php \
 && test -s /var/www/html/public/index.html \
 && rm -f /tmp/index.php.keep /var/www/html/.env /var/www/html/.env.* \
 && rm -rf /tmp/vite-dist /var/www/html/tests /var/www/html/phpunit.xml \
 && mkdir -p /run/php /var/log/nginx \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache \
 && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
 && chmod -R ug+rwx /var/www/html/storage /var/www/html/bootstrap/cache \
 && chmod 755 /entrypoint.sh \
 && php-fpm --test \
 && nginx -t

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl --fail --silent --show-error http://127.0.0.1/fpm-ping | grep -qx pong

ENTRYPOINT ["/usr/bin/tini", "--", "/entrypoint.sh"]
