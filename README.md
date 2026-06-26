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

### Release points
Create a tagged release after stable milestones:

`git tag -a v1.0.0 -m "Release v1.0.0"`

Useful rule:
- One release tag per stable visual milestone
- One commit per logical change
- Revert the bad commit instead of rewriting history
