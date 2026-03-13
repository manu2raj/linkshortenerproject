#!/usr/bin/env bash

set -euo pipefail

payload="$(cat)"
tool_name="$(
  printf '%s' "$payload" | node -e "process.stdin.setEncoding('utf8'); let input = ''; process.stdin.on('data', chunk => input += chunk); process.stdin.on('end', () => { const payload = JSON.parse(input || '{}'); process.stdout.write(payload.toolName ?? ''); });"
)"

if [[ "$tool_name" == "create" || "$tool_name" == "edit" ]]; then
  npx prettier --write .
fi
