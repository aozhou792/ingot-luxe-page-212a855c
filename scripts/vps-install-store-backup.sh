#!/bin/bash
set -euo pipefail

# The VPS store is now the only copy of the order data, so an accidental rm or a
# disk fault would be unrecoverable. Nightly tarball, 14 days of history.

BACKUP_DIR=/www/backup/order-store
SCRIPT=/opt/blobsrv/backup.sh

mkdir -p "${BACKUP_DIR}"

cat > "${SCRIPT}" <<'EOF'
#!/bin/bash
set -euo pipefail
BACKUP_DIR=/www/backup/order-store
SRC=/www/order-data/blobs
STAMP=$(date +%Y%m%d-%H%M)
mkdir -p "${BACKUP_DIR}"
tar -czf "${BACKUP_DIR}/blobs-${STAMP}.tar.gz" -C "$(dirname "${SRC}")" "$(basename "${SRC}")"
# Keep two weeks; the data is small (KB-scale JSON plus receipt screenshots).
find "${BACKUP_DIR}" -name 'blobs-*.tar.gz' -mtime +14 -delete
echo "$(date -Is) backed up to ${BACKUP_DIR}/blobs-${STAMP}.tar.gz"
EOF
chmod +x "${SCRIPT}"

cat > /etc/cron.d/blobsrv-backup <<EOF
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
17 4 * * * root ${SCRIPT} >> /var/log/blobsrv-backup.log 2>&1
EOF
chmod 644 /etc/cron.d/blobsrv-backup

echo "=== running it once now ==="
"${SCRIPT}"

echo
echo "=== backups on disk ==="
ls -la "${BACKUP_DIR}"

echo
echo "=== verify the archive actually restores ==="
TMP=$(mktemp -d)
tar -xzf "$(ls -t ${BACKUP_DIR}/blobs-*.tar.gz | head -1)" -C "${TMP}"
find "${TMP}" -type f | sed "s|${TMP}/||"
rm -rf "${TMP}"

echo
echo "=== cron entry ==="
cat /etc/cron.d/blobsrv-backup
