# Technical Plan: Path Aliases Configuration (Specific)

**Based on Spec**: `specs/002-path-aliases/spec.md`
**Status**: Revised

## Architecture & Tech Stack

### 1. TypeScript Configuration
- **Action**: Map multiple paths in `compilerOptions` -> `paths`.
- **mapping**:
  - `@assets/*` -> `./src/assets/*`
  - `@components/*` -> `./src/components/*`
  - `@config/*` -> `./src/config/*`
  - `@features/*` -> `./src/features/*`
  - `@hooks/*` -> `./src/hooks/*`
  - `@layouts/*` -> `./src/layouts/*`
  - `@lib/*` -> `./src/lib/*`
  - `@pages/*` -> `./src/pages/*`
  - `@services/*` -> `./src/services/*`
  - `@stores/*` -> `./src/stores/*`
  - `@types/*` -> `./src/types/*`
  - `@utils/*` -> `./src/utils/*`

### 2. Vite Configuration
- **Action**: Add corresponding aliases in `vite.config.ts`.
- **Optimization**: Use a loop or object spread to generate aliases if possible, or list explicitly for clarity. Explicit is better for stability (Constitution).

## Proposed Changes

### [Configuration]
#### [MODIFY] `tsconfig.app.json`
- Replace `@/*` with specific folder mappings.

#### [MODIFY] `vite.config.ts`
- Replace `@` alias with specific folder aliases.

### [Codebase]
#### [MODIFY] `src/App.tsx`
- Update imports:
  - `@/stores/useGameStore` -> `@stores/useGameStore`
  - `@/utils/cn` -> `@utils/cn`

## Verification Plan
- Build check only.
