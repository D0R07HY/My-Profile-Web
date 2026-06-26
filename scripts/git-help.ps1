param(
  [ValidateSet("status","log","revert-safe","release")]
  [string]$Action = "status",
  [string]$Target = "",
  [string]$Tag = ""
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
}
