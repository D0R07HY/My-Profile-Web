param(
  [string]$OutputDir = "dist"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root $OutputDir

if (Test-Path $out) {
  Remove-Item -Recurse -Force $out
}

New-Item -ItemType Directory -Path $out | Out-Null

$allowedExtensions = @(".html", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".svg", ".ico", ".css", ".js", ".json", ".txt", ".pdf")

Get-ChildItem -Path $root -File | Where-Object {
  $_.Name -eq "index.html" -or $allowedExtensions -contains $_.Extension.ToLowerInvariant()
} | Copy-Item -Destination $out -Force

Get-ChildItem -Path (Join-Path $root "assets") -Directory -ErrorAction SilentlyContinue | Out-Null
if (Test-Path (Join-Path $root "assets")) {
  Copy-Item -Path (Join-Path $root "assets") -Destination $out -Recurse -Force
}

Get-ChildItem -Path $root -File | Where-Object {
  $_.Name -in @("_headers", "_redirects")
} | Copy-Item -Destination $out -Force

Write-Host "Prepared $out for Cloudflare Pages."
