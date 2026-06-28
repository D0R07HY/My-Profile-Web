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

$version = (git rev-parse --short HEAD).Trim()

function Write-Utf8LfFile {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Content
  )

  $normalized = $Content -replace "`r`n?", "`n"
  [System.IO.File]::WriteAllText($Path, $normalized, [System.Text.UTF8Encoding]::new($false))
}

$indexPath = Join-Path $out "index.html"
if (Test-Path $indexPath) {
  $html = Get-Content $indexPath -Raw
  $html = $html.Replace('assets/site.css', "assets/site.css?v=$version")
  $html = $html.Replace('assets/site.js', "assets/site.js?v=$version")
  Write-Utf8LfFile -Path $indexPath -Content $html
}

$textFilesToNormalize = @(
  (Join-Path $out "assets/site.css"),
  (Join-Path $out "assets/site.js"),
  (Join-Path $out "_headers"),
  (Join-Path $out "_redirects")
)

foreach ($file in $textFilesToNormalize) {
  if (Test-Path $file) {
    $content = Get-Content $file -Raw
    Write-Utf8LfFile -Path $file -Content $content
  }
}

Get-ChildItem -Path $root -File | Where-Object {
  $_.Name -in @("_headers", "_redirects")
} | Copy-Item -Destination $out -Force

Write-Host "Prepared $out for Cloudflare Pages."
