#!/bin/bash
set -euo pipefail

APP_DIR=/opt/blobsrv
DATA_DIR=/www/order-data/blobs
TOKEN_FILE=/opt/blobsrv/token

mkdir -p "$APP_DIR" "$DATA_DIR"

# Generate the shared secret once and keep it stable across re-installs.
if [ ! -f "$TOKEN_FILE" ]; then
  openssl rand -hex 32 > "$TOKEN_FILE"
  chmod 600 "$TOKEN_FILE"
fi
TOKEN=$(cat "$TOKEN_FILE")

cat > /etc/systemd/system/blobsrv.service <<EOF
[Unit]
Description=Alibarbar order blob store
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/env node $APP_DIR/server.mjs
Environment=BLOBSRV_PORT=3100
Environment=BLOBSRV_HOST=127.0.0.1
Environment=BLOBSRV_DATA=$DATA_DIR
Environment=BLOBSRV_PUBLIC_BASE=https://api.ailibarbar.com
Environment=BLOBSRV_TOKEN=$TOKEN
Restart=always
RestartSec=2
StandardOutput=append:/var/log/blobsrv.log
StandardError=append:/var/log/blobsrv.log

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable blobsrv >/dev/null 2>&1
systemctl restart blobsrv
sleep 1.5

echo "=== service status ==="
systemctl is-active blobsrv
echo "=== health ==="
curl -sS --max-time 5 http://127.0.0.1:3100/health; echo
echo "=== auth check (expect 401 then 200) ==="
curl -sS -o /dev/null -w 'no token  -> %{http_code}\n' http://127.0.0.1:3100/l
curl -sS -o /dev/null -w 'with token-> %{http_code}\n' -H "Authorization: Bearer $TOKEN" 'http://127.0.0.1:3100/l?prefix='
echo "=== roundtrip put/get/list/del ==="
curl -sS -X PUT -H "Authorization: Bearer $TOKEN" -H 'x-blob-content-type: application/json' \
  --data '{"hello":"world"}' http://127.0.0.1:3100/b/_selftest/probe.json; echo
curl -sS -H "Authorization: Bearer $TOKEN" http://127.0.0.1:3100/b/_selftest/probe.json; echo
curl -sS -H "Authorization: Bearer $TOKEN" 'http://127.0.0.1:3100/l?prefix=_selftest/'; echo
curl -sS -X DELETE -H "Authorization: Bearer $TOKEN" http://127.0.0.1:3100/b/_selftest/probe.json; echo
echo "=== path traversal must be rejected (expect 400) ==="
curl -sS -o /dev/null -w '%{http_code}\n' -H "Authorization: Bearer $TOKEN" "http://127.0.0.1:3100/b/..%2F..%2Fetc%2Fpasswd"
echo
echo "TOKEN=$TOKEN"
