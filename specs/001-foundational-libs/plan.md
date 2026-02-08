# Technical Plan: Foundational Libraries Integration

**Based on Spec**: `specs/foundational-libs/spec.md`
**Status**: Draft

## Architecture & Tech Stack

### 1. State Management: Zustand
- **Why**: Minimal boilerplate, transient updates (subscriber-based) perfect for Game Loop bridging, small bundle size (<2KB).
- **Structure**: `src/stores/useGameStore.ts`
  - Store will hold `stats` (Hunger, Fun, Energy) and `gameState` (Playing, Sleeping).
  - Actions will be separate from state to avoid unnecessary re-renders.

### 2. Styling Utilities: clsx + tailwind-merge
- **Why**: Standard for conditional classes in React. `tailwind-merge` ensures no class conflicts if we use Tailwind later (Constitution: Future-proof).
- **Implementation**: `src/utils/cn.ts` (Standard `cn` helper).

### 3. Iconography: Lucide-React
- **Why**: Industry standard, tree-shakable, consistent SVG icons.
- **Usage**: Import individual icons in components (e.g., `import { Heart } from 'lucide-react'`).

### 4. Time Utilities: date-fns
- **Why**: Modular, immutable date logic. Essential for accurate "Offline Time" calculation across timezones.
- **Implementation**: Direct usage or helper in `src/utils/time.ts`.

## Proposed Changes

### [Dependencies]
- `npm install zustand clsx tailwind-merge lucide-react date-fns`

### [Source Files]
#### [NEW] `src/utils/cn.ts`
- Export `cn(...inputs: ClassValue[])`

#### [NEW] `src/stores/useGameStore.ts`
- Define `GameStore` interface.
- Create store with standard Tamagotchi defaults.

#### [NEW] `src/utils/time.ts` (Optional Wrapper)
- Helper `calculateSecondsPassed(lastInteract: number): number`

## Verification Plan

### Manual Verification
1. **State**: Call `useGameStore.getState().setHunger(100)` in Console -> Check UI.
2. **Styles**: Check if dynamic classes (e.g., `bg-red-500` when critical) apply correctly.
3. **Build**: Run `npm run build` to ensure no Tree-shaking issues.
