# My-Profile-Web

## Workflow

### Commit naming
Use this format:

`type(scope): short summary`

Examples:
- `feat(hero): add language transition`
- `fix(certificates): smooth hover bounce`
- `chore(release): mark v1.0.0`

Recommended `type` values:
- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `perf`

### Safe rollback
Preferred order:
1. `git status`
2. `git log --oneline --decorate -10`
3. `git revert <commit>`
4. Push the revert commit

Use `git reset --hard` only if you explicitly want to discard history.

Rollback helper:

`./scripts/git-help.ps1 -Action rollback-deploy-check -Target <commit>`

This will:
- create a revert commit
- push to `main`
- poll the production URL until the deployed HTML changes

### Release points
Create a tagged release after stable milestones:

`git tag -a v1.0.0 -m "Release v1.0.0"`

Useful rule:
- One release tag per stable visual milestone
- One commit per logical change
- Revert the bad commit instead of rewriting history

## Cloudflare Pages

This repo is ready for Cloudflare Pages CI, but you still need to add these GitHub secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_PAGES_PROJECT_NAME`

Once those are set, every push to `main` will deploy automatically.
For rollback, revert the bad commit and push `main` again. Cloudflare will publish the reverted state.

## Security notes

This project now includes Cloudflare Pages security headers via [_headers](C:\Users\M%20S%20I\Downloads\Portfolio\_headers), including:
- `Content-Security-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`
- `Strict-Transport-Security`
- `Cross-Origin-Opener-Policy`

Current posture:
- CSS and JavaScript are now split into [assets/site.css](C:\Users\M%20S%20I\Downloads\Portfolio\assets\site.css) and [assets/site.js](C:\Users\M%20S%20I\Downloads\Portfolio\assets\site.js).
- Google Fonts was removed to reduce third-party asset exposure.
- `script-src` is locked to `'self'`.
- Stylesheets are limited to `'self'`, while runtime style attributes used by visual effects remain explicitly scoped through CSP.
