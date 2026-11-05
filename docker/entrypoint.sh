#!/bin/bash
set -euo pipefail

cd /var/www/html

mkdir -p \
  storage/app/private \
  storage/app/public \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache \
  /run/php \
  /var/log/nginx

chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache

if [[ ! -f public/index.php || ! -f public/index.html ]]; then
  echo "vividworks: public/index.php and public/index.html must both exist" >&2
  exit 1
fi

php-fpm --nodaemonize &
fpm_pid=$!
nginx &
nginx_pid=$!

stop_requested=0

shutdown_requested() {
  stop_requested=1
  kill -TERM "$fpm_pid" "$nginx_pid" 2>/dev/null || true
  exit 0
}

trap shutdown_requested TERM INT

while kill -0 "$fpm_pid" 2>/dev/null && kill -0 "$nginx_pid" 2>/dev/null; do
  sleep 1
done

if [[ "$stop_requested" -eq 1 ]]; then
  exit 0
fi

kill -TERM "$fpm_pid" "$nginx_pid" 2>/dev/null || true
exit 1
