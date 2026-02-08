
# Tasks: Spec-006 Dynamic Environments & Themes

- [x] **Setup & Configuration**
    - [x] Create `ThemeConfig` in `src/config/themeConfig.ts` with color palettes (Day/Night, Pet States). <!-- id: 1 -->
    - [x] Add `theme` slice to `useGameStore` (logic for auto-switching based on simulated time or pet state). <!-- id: 2 -->

- [x] **Implementation (Basic Environment)**
    - [x] Create `src/components/Game/Environment.tsx` (PixiJS Container/Graphics). <!-- id: 3 -->
    - [x] Implement `Background` component that accepts `theme` prop. <!-- id: 4 -->
    - [x] Integrate `Environment` into `GameCanvas.tsx` (Render behind the Pet). <!-- id: 5 -->

- [ ] **Implementation (Visual Enhancements)**
    - [ ] **Sky & Ground**: Upgrade `Environment` to use Gradients (Texture) instead of solid colors for a "Beautiful" look. <!-- id: 12 -->
    - [ ] **Weather System**: Implement `WeatherOverlay` (PixiJS ParticleContainer) for Rain/Snow effects. <!-- id: 13 -->
    - [ ] **Responsive Canvas**: Refactor `GameCanvas` to resize dynamically with the window/container. <!-- id: 14 -->

- [x] **Implementation (UI)**
    - [x] Add "Theme Toggle" button in `App.tsx` (Manual override or Debug). <!-- id: 6 -->
    - [x] Ensure `App.tsx` passes correct theme state to `GameCanvas`. <!-- id: 7 -->
    - [ ] **UI Polish**: Style the toggle buttons to look "Premium" (Glassmorphism/Icons). <!-- id: 15 -->

- [ ] **Refactoring**
    - [x] Update `useGameLoop` to advance "Game Time". <!-- id: 8 -->
    - [x] Ensure all imports use Alias Paths. <!-- id: 9 -->
    - [ ] Optimize Particle System for performance. <!-- id: 16 -->

- [ ] **Verification**
    - [x] **Browser Test**: Toggle themes and verify background color change. <!-- id: 10 -->
    - [ ] **Visual Test**: Verify Gradients and Weather effects look good. <!-- id: 17 -->
    - [ ] **Responsiveness**: Resize window and check if Canvas adapts without stretching. <!-- id: 18 -->
