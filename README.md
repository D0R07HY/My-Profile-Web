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
