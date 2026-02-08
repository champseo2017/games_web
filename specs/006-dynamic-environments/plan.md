
# Technical Plan: Dynamic Environments & Themes (Enhanced)

## 1. Goal: "Beautiful & Alive"
The environment should feel like a living world, not just a color switcher.
- **Gradients**: Use `pixi-texture-gradient` or create Canvas gradients for Sky/Ground.
- **Weather**: Procedural particle system for Rain/Snow.
- **Responsive**: `ResizeObserver` driving Pixi Application resize.

## 2. Architecture Updates

### `Environment` Component
- **Sky**: Multi-stop Linear Gradient (Deep Blue -> Orange for Sunset, etc.)
- **Sun/Moon**: Separate Sprites/Graphics moving across the sky.
- **Weather Layer**:
    - `Rain`: Fast vertical falling lines/sprites.
    - `Snow`: Slow drifting circles with sine wave motion.

### `GameCanvas` Component
- **Resize Logic**:
    ```typescript
    const resize = () => {
        const parent = containerRef.current;
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
        // Center Pet
        pet.x = app.screen.width / 2;
        pet.y = app.screen.height / 2 + bobbing;
    };
    ```

## 3. Data Structures
### `ThemeConfig` (Expanded)
```typescript
interface Theme {
    skyGradient: string[]; // ['#87CEEB', '#E0F7FA']
    groundColor: number;
    weather: 'CLEAR' | 'RAIN' | 'SNOW';
}
```

## 4. Implementation Steps
1.  **Refactor `ThemeConfig`**: Add Gradient definitions and Weather types.
2.  **Upgrade `Environment`**: Implement Gradient generation.
3.  **Create `WeatherSystem`**: A new Pixi component for handling particles.
4.  **Responsive**: Add `ResizeObserver` hook in `GameCanvas`.

## 5. Verification
- **Visual**: Confirm gradients blend smoothly.
- **Performance**: Ensure particles don't drop FPS below 60.
- **Mobile**: Check layout on simulated mobile view (Chrome DevTools).
