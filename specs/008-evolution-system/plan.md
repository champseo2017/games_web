# Implementation Plan: Evolution System (Digimon Style)

## 1. Store Updates (`useGameStore.ts`)
- **Update Stages**: Rename/Add stages to: `'egg', 'baby1', 'baby2', 'child', 'adult'`.
- **Update Branching**: Add `evolutionBranch` types: `'AGU'` (Good Child), `'BETA'` (Bad Child), `'GREY'`, `'TYRANNO'`, `'SEA'`, `'NUME'`.
- **Logic**:
    - Update `evolve()` to handle 4 steps.
    - Implement `calculateBranch()` helper for the complex branching logic logic based on CMs.
- **Debug Actions**: Add `setStage(stage_idx)` to jump to specific forms.

## 2. Rendering Updates (`GameCanvas.tsx`)
- Refactor the draw function to be cleaner using a `drawPet(graphics, stage, branch)` helper.
- **Shapes**:
    - **Baby I**: Small black circle + white eyes.
    - **Baby II**: Pink circle + triangular ears (path).
    - **Child (AGU)**: Orange rounded rect + tail.
    - **Child (BETA)**: Green ellipse + fin.
    - **Adults**: Larger distinct shapes/colors.

## 3. Debug UI (`App.tsx`)
- Replace single "Evolve" button with **"Stage 1", "Stage 2", "Stage 3", "Stage 4"** buttons.
- These buttons will force set the stage and a default branch for visualization.
