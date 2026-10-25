# Hestia proxy template for a future Laravel cutover.
# This file does not replace vividpreview.tpl. The live domain keeps PROXY=vividpreview
# until an approved cutover changes the template name.

server {
	listen      %ip%:%proxy_port%;
	server_name %domain_idn% %alias_idn%;
	root        /home/vividpreview/laravel-app/current/public;
	index       index.html index.php;
	client_max_body_size 32k;
	error_log   /var/log/%web_system%/domains/%domain%.error.log error;

	include %home%/%user%/conf/web/%domain%/nginx.forcessl.conf*;

	location ~ /\.(?!well-known\/|file) {
		deny all;
		return 404;
	}

	location ^~ /storage/ { deny all; return 404; }
	location ^~ /vendor/ { deny all; return 404; }
	location ^~ /bootstrap/ { deny all; return 404; }

	location ^~ /api/ {
		add_header Cache-Control "private, no-store" always;
		try_files $uri /index.php?$query_string;
	}

	location / {
		try_files $uri $uri/ /index.html;
	}

	location = /index.html {
		add_header Cache-Control "private, no-store" always;
	}

	location = /index.php {
		include /etc/nginx/fastcgi_params;
		fastcgi_param SCRIPT_FILENAME $realpath_root/index.php;
		fastcgi_param DOCUMENT_ROOT $realpath_root;
		fastcgi_param REMOTE_ADDR $remote_addr;
		fastcgi_param HTTP_X_FORWARDED_FOR "";
		fastcgi_param HTTP_X_FORWARDED_PROTO $scheme;
		fastcgi_param HTTP_AUTHORIZATION $http_authorization;
		fastcgi_hide_header X-Powered-By;
		fastcgi_pass unix:/run/php/php8.5-fpm-vividpreview.sock;
	}

	location ~ \.php$ {
		deny all;
		return 404;
	}

	location /error/ {
		alias %home%/%user%/web/%domain%/document_errors/;
	}

	include %home%/%user%/conf/web/%domain%/nginx.conf_*;
}
