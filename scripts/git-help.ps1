param(
  [ValidateSet("status","log","revert-safe","release","rollback-deploy-check")]
  [string]$Action = "status",
  [string]$Target = "",
  [string]$Tag = "",
  [string]$ProductionUrl = "https://my-profile-web-3an.pages.dev/",
  [int]$Attempts = 18,
  [int]$DelaySeconds = 10
)

switch ($Action) {
  "status" {
    git status --short --branch
  }
  "log" {
    git log --oneline --decorate -10
  }
  "revert-safe" {
    if (-not $Target) { throw "Provide -Target <commit-or-range>." }
    git revert --no-edit $Target
  }
  "release" {
    if (-not $Tag) { throw "Provide -Tag vX.Y.Z." }
    git tag -a $Tag -m "Release $Tag"
    git push origin $Tag
  }
  "rollback-deploy-check" {
    if (-not $Target) { throw "Provide -Target <commit>." }

    $before = (Invoke-WebRequest -UseBasicParsing $ProductionUrl).Content
    git revert --no-edit $Target
    git push origin main

    for ($i = 1; $i -le $Attempts; $i++) {
      Start-Sleep -Seconds $DelaySeconds
      $after = (Invoke-WebRequest -UseBasicParsing $ProductionUrl).Content
      if ($after -ne $before) {
        Write-Host "Production updated after rollback."
        exit 0
      }
      Write-Host "Waiting for production deploy... attempt $i/$Attempts"
    }

    throw "Rollback commit was pushed, but production content did not change within the expected time window."
  }
}
