# Engineering Standards

## Naming Conventions
- Variables/Functions: `camelCase`
- Classes/Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case.ts` (except React components which are `PascalCase.tsx`)
- Folders: `kebab-case`

## Folder Conventions
- Group by feature module (e.g. `src/features/auth`).
- Shared logic goes to `src/shared`.

## Import Rules
- Absolute imports preferred using path aliases (`@/components`, `@/lib`).
- Group imports: built-in, external, internal, parent, sibling, index.

## Coding Conventions
- Prefer `const` over `let`.
- Prefer functional components and hooks.
- Write strict TypeScript (avoid `any`).

## Commit Strategy
- We use Conventional Commits: `type(scope): description`.
- Example: `feat(api): add user endpoint`.

## Branch Strategy
- `main` is production-ready.
- `feature/name` for new features.
- `fix/name` for bug fixes.
- PRs must pass CI before merging.

## Review Checklist
- Code is formatted.
- No lint errors.
- TypeScript strict mode passes.
- Tests are written for new logic.
- Documentation updated if needed.

## Definition of Done
- Deployed to staging.
- Passes QA review.
- Approved by at least one peer.
