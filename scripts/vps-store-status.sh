#!/bin/bash
TOKEN=$(cat /opt/blobsrv/token)

echo "=== service ==="
systemctl is-enabled blobsrv 2>/dev/null | sed 's/^/enabled-on-boot: /'
systemctl is-active blobsrv | sed 's/^/active: /'
systemctl show blobsrv -p MainPID --value | sed 's/^/pid: /'

echo
echo "=== order sequence ==="
curl -sS -H "Authorization: Bearer ${TOKEN}" http://127.0.0.1:3100/b/meta/order-seq.json; echo

echo
echo "=== store contents ==="
find /www/order-data/blobs -type f ! -name '*__meta.json' -printf '%TY-%Tm-%Td %TH:%TM  %8s  %P\n' | sort

echo
echo "=== disk usage ==="
du -sh /www/order-data/blobs

echo
echo "=== cert auto-renew timer ==="
systemctl list-timers 'certbot*' --no-pager 2>/dev/null | head -3

echo
echo "=== recent service log ==="
tail -n 5 /var/log/blobsrv.log 2>/dev/null || echo '(empty)'
