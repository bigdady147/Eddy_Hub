# Project Conventions

## Naming Conventions

- **Directories**: `kebab-case` (e.g., `user-profile`)
- **Files**:
  - Typescript/Vue: `PascalCase` for Components/Views (`LoginView.vue`), `camelCase` for logic (`auth.service.ts`).
  - SCSS: `_snake_case` for partials (`_base_styles.scss`).
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE` (`API_URL`)
- **Classes**: `PascalCase`

## Code Structure

- **Imports**: Group imports by type:
  1. Built-in/Third-party (Vue, Pinia, Axios)
  2. Internal Modules (`../modules/...`)
  3. Components (`../components/...`)
  4. Utils/Constants (`../utils/...`)

## Git Workflow

- **Branches**: `feature/feature-name`, `fix/bug-fix`, `chore/maintenance`
- **Commits**: Use Conventional Commits (e.g., `feat: add login page`, `fix: resolve validation error`).
