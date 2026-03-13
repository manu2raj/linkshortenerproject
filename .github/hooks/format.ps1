$payload = $input | Out-String

$toolName = $payload | node -e @"
process.stdin.setEncoding('utf8');
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const payload = JSON.parse(input || '{}');
  process.stdout.write(payload.toolName ?? '');
});
"@

if ($toolName -eq 'create' -or $toolName -eq 'edit') {
  npx prettier --write .
}
