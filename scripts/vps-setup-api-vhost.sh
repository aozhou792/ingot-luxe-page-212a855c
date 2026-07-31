#!/bin/bash
set -euo pipefail

DOMAIN=api.ailibarbar.com
# ailibarbar.org's vhost declares `listen 107.167.13.78:80`, and an IP-specific
# listener outranks a bare `listen 80` for that address. Without matching it here,
# every request arriving on this IP is handed to the .org server block instead.
IP=107.167.13.78
VHOST=/www/server/panel/vhost/nginx/${DOMAIN}.conf
ACME_ROOT=/www/wwwroot/${DOMAIN}
CERT_DIR=/etc/letsencrypt/live/${DOMAIN}
TOKEN=$(cat /opt/blobsrv/token)

echo "=== seed order sequence so numbering continues past the Vercel-era orders ==="
curl -sS -X PUT -H "Authorization: Bearer ${TOKEN}" -H 'x-blob-content-type: application/json' \
  --data '{"last":3906}' http://127.0.0.1:3100/b/meta/order-seq.json >/dev/null
echo -n "seq now: "; curl -sS -H "Authorization: Bearer ${TOKEN}" http://127.0.0.1:3100/b/meta/order-seq.json; echo

mkdir -p "${ACME_ROOT}/.well-known/acme-challenge"
chown -R www:www "${ACME_ROOT}" 2>/dev/null || true

echo
echo "=== DNS check ==="
# The box's own resolver negative-caches, so ask an authoritative-facing resolver.
RESOLVED=$(dig +short "${DOMAIN}" A @1.1.1.1 2>/dev/null | grep -E '^[0-9.]+$' | head -1 || true)
echo "${DOMAIN} resolves to: ${RESOLVED:-<nothing>}"

write_http_only() {
  cat > "${VHOST}" <<EOF
server {
    listen ${IP}:80;
    listen 80;
    server_name ${DOMAIN};

    location ^~ /.well-known/acme-challenge/ {
        root ${ACME_ROOT};
        allow all;
        default_type text/plain;
    }

    location / {
        return 404;
    }
}
EOF
}

write_full() {
  cat > "${VHOST}" <<EOF
# Order store API for the Alibarbar storefronts. Replaces Vercel Blob.
server {
    listen ${IP}:80;
    listen 80;
    server_name ${DOMAIN};

    location ^~ /.well-known/acme-challenge/ {
        root ${ACME_ROOT};
        allow all;
        default_type text/plain;
    }

    location / {
        return 301 https://${DOMAIN}\$request_uri;
    }
}

server {
    listen ${IP}:443 ssl;
    listen 443 ssl;
    http2 on;
    server_name ${DOMAIN};

    ssl_certificate     ${CERT_DIR}/fullchain.pem;
    ssl_certificate_key ${CERT_DIR}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;

    access_log /www/wwwlogs/${DOMAIN}.log;
    error_log  /www/wwwlogs/${DOMAIN}.error.log;

    # Receipt screenshots arrive as base64 JSON, so bodies are a few MB.
    client_max_body_size 64m;

    location ^~ /.well-known/acme-challenge/ {
        root ${ACME_ROOT};
        allow all;
        default_type text/plain;
    }

    location / {
        proxy_pass http://127.0.0.1:3100;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 120s;
        proxy_request_buffering off;
    }
}
EOF
}

if [ -f "${CERT_DIR}/fullchain.pem" ]; then
  echo "cert already present -> writing full vhost"
  write_full
else
  echo "no cert yet -> writing HTTP-only vhost for the ACME challenge"
  write_http_only
fi

nginx -t 2>&1 | tail -2
nginx -s reload
echo "nginx reloaded"

if [ ! -f "${CERT_DIR}/fullchain.pem" ]; then
  if [ -z "${RESOLVED}" ]; then
    echo
    echo "SKIP certbot: ${DOMAIN} has no DNS record yet."
    echo "Add an A record ${DOMAIN} -> 107.167.13.78 (DNS only / grey cloud), then re-run this script."
    exit 0
  fi
  echo
  echo "=== requesting Let's Encrypt cert ==="
  certbot certonly --webroot -w "${ACME_ROOT}" -d "${DOMAIN}" \
    --non-interactive --agree-tos --register-unsafely-without-email --keep-until-expiring 2>&1 | tail -12
  if [ -f "${CERT_DIR}/fullchain.pem" ]; then
    write_full
    nginx -t 2>&1 | tail -2
    nginx -s reload
    echo "cert issued, full vhost live"
  else
    echo "certbot did not produce a cert; leaving HTTP-only vhost in place"
    exit 1
  fi
fi

echo
echo "=== external health check ==="
curl -sS --max-time 10 "https://${DOMAIN}/health" || echo "(not reachable yet)"
echo
echo "TOKEN=${TOKEN}"
