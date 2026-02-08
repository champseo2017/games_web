Original prompt: ใช้ Vite React Vite + PixiJS TS สร้างเกมส์ Stack Builder: วางบล็อกให้ตรงที่สุด สร้างตึกสูงสุด ขอพื้นฐานก่อนเป็น step

- Started manual Vite + React + TS scaffold since npm create timed out.
- Added manual Vite + React + TS scaffold files (package.json, tsconfigs, vite config, index.html).
- Built PixiJS Stack Builder prototype with start screen, stacking logic, and basic UI.
- Exposed window.render_game_to_text and window.advanceTime hooks for automated tests.
- npm install timed out (120s), so dependencies not installed and Playwright tests not run yet.
- Updated PixiJS init flow to v8 API (Application.init + app.canvas) to fix canvas undefined errors.
- Ensured Pixi app/ticker explicitly start; added click listener and pointer prevention for reliable input.
