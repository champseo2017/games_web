# Tasks: Path Aliases Configuration (Specific)

- [x] **Install Dev Dependencies** <!-- id: 0 -->
    - Run `npm install -D @types/node`

- [x] **Configure TypeScript (Specific)** <!-- id: 1 -->
    - Update `tsconfig.app.json` with specific paths (`@components/*`, `@utils/*`, etc.)
    - Remove generic `@/*` path
    - **FIX**: Added path mappings to root `tsconfig.json` to fix editor-side linting errors.

- [x] **Configure Vite (Specific)** <!-- id: 2 -->
    - Update `vite.config.ts` to include specific aliases (`@components`, `@utils`, etc.)

- [x] **Refactor Imports (Specific)** <!-- id: 3 -->
    - Update `src/App.tsx` to use `@stores/` and `@utils/`
    - Verify no other files need updates yet

- [x] **Verify Build** <!-- id: 4 -->
    - Run `npm run build`
