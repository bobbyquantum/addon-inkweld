#!/bin/sh
# Entrypoint: translate the app options (/data/options.json) into Inkweld's
# environment, make sure /data belongs to the inkweld user, then run the
# server as that user.
set -eu

OPTIONS=/data/options.json

# Print a jq expression over the options, or nothing when it is null/missing.
option() {
  jq -r "($1) // empty" "$OPTIONS"
}

# Session signing and config encryption key. Generated once and kept with the
# app's data, so sessions survive restarts and backups restore working
# encrypted settings.
SECRET_FILE=/data/.database-key
if [ ! -s "$SECRET_FILE" ]; then
  head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n' > "$SECRET_FILE"
  chmod 600 "$SECRET_FILE"
fi
DATABASE_KEY="$(cat "$SECRET_FILE")"
export DATABASE_KEY

# Trust X-Remote-User-* headers from the Supervisor's ingress proxy only.
export INGRESS_ENABLED=true
INGRESS_ADMINS="$(option '.admins | join(",")')"
export INGRESS_ADMINS

ALLOWED_ORIGINS="$(option '.allowed_origins | join(",")')"
if [ -n "$ALLOWED_ORIGINS" ]; then
  export ALLOWED_ORIGINS
else
  unset ALLOWED_ORIGINS
fi

WEBAUTHN_RP_ID="$(option '.webauthn_rp_id')"
export WEBAUTHN_RP_ID="${WEBAUTHN_RP_ID:-homeassistant.local}"

LOG_LEVEL="$(option '.log_level')"
export LOG_LEVEL="${LOG_LEVEL:-info}"

mkdir -p /data/yjs
if [ "$(stat -c %U /data)" != inkweld ]; then
  chown -R inkweld:inkweld /data
fi
chown inkweld:inkweld "$SECRET_FILE"

cd /app
exec setpriv --reuid=inkweld --regid=inkweld --init-groups ./inkweld-server
