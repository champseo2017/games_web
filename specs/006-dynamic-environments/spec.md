
# Spec-006: Dynamic Environments & Themes (Enhanced)

## 1. Goal
Create a visually stunning and responsive environment that breathes life into the game.

## 2. Functional Requirements
- **Day/Night Cycle**:
    - **Sky**: Dynamic Gradients (e.g., Sunset Turn from Blue to Orange).
    - **Celestial Bodies**: Sun and Moon traversing the sky.
- **Weather System**:
    - **Rain**: Visual rain drops falling.
    - **Snow**: Gentle snow flakes drifting.
    - **States**: Weather can be triggered by Game Logic or Debug Tools.
- **Responsive Design**:
    - The Game Canvas must fill its container and resize intelligently.
    - The Pet stays centered.
    - The Ground stays anchored to the bottom.

## 3. User Story
> "I want to be wowed by the visuals. When it's night, I want to see a beautiful gradient sky with stars. When it rains, I want to feel the mood change. And I want to play this on my phone or desktop without it looking broken."

## 4. Technical Constraints
- **Performance**: Particle systems must be optimized (Object Pooling or ParticleContainer).
- **Library**: Use native PixiJS features or lightweight helpers. No heavy external engines.
