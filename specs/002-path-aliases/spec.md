# Functional Spec: Path Aliases Configuration (Specific)

**Feature Branch**: `feature/002-path-aliases`
**Created**: 2026-02-08
**Status**: Revised
**Input**: Configure specific path aliases (@components, @utils, etc.) for clearer categorization.

## User Scenarios & Testing

### User Story 1 - Categorized Imports (Priority: P1)
**As a** Developer,
**I want** to import modules using specific category aliases (e.g., `@components/Button`, `@utils/cn`),
**So that** I immediately know what kind of module I am importing and avoid namespace collisions.

**Why this priority**: Enhances code readability and organization in a multi-folder project.

**Acceptance Scenarios**:
1. **Given** a component import, **When** I type `@components/`, **Then** it suggests files from `./src/components`.
2. **Given** a store import, **When** I use `@stores/useGameStore`, **Then** it resolves correctly.

## Requirements

### Functional Requirements
- **FR-001**: System MUST support specific aliases for top-level `src` folders:
  - `@assets`, `@components`, `@config`, `@features`, `@hooks`
  - `@layouts`, `@lib`, `@pages`, `@services`, `@stores`, `@types`, `@utils`
- **FR-002**: System MUST NOT use a generic `@/` alias that masks the folder structure.
- **FR-003**: TypeScript and Vite must resolve these specific aliases.

## Success Criteria
- **SC-001**: `npm run build` passes with specific aliases.
