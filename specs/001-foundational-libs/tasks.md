# Tasks: Foundational Libraries Integration

- [x] **Install Dependencies** <!-- id: 0 -->
    - Run `npm install zustand clsx tailwind-merge lucide-react date-fns`

- [x] **Implement Utility: ClassNames (cn)** <!-- id: 1 -->
    - Create `src/utils/cn.ts`
    - Implement `clsx` + `tailwind-merge` merger function

- [x] **Implement Utility: Time Helper** <!-- id: 2 -->
    - Create `src/utils/time.ts`
    - Implement `calculateOfflineProgress(lastTimestamp)`

- [x] **Implement Store: Game State** <!-- id: 3 -->
    - Create `src/stores/useGameStore.ts`
    - Define TypeScript Interface for Pet Stats
    - create `zustand` store with `persistence` middleware (optional but good for game) or basic store first

- [x] **Verify Integration** <!-- id: 4 -->
    - Create a temporary test component or log output in `App.tsx` to prove libraries work
