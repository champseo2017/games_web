# Tasks: ระบบเรนเดอร์และจัดการสินทรัพย์

- [x] **Install Dependencies** <!-- id: 0 -->
    - Run `npm install pixi.js`

- [x] **Setup Game Canvas Component** <!-- id: 1 -->
    - สร้าง `src/components/Game/GameCanvas.tsx`
    - Init `PIXI.Application`
    - implement `useEffect` เพื่อ Clean up (`app.destroy`)
    - ใช้ Alias `@components/Game` (Changed to relative imports due to TS/Lint issues)

- [x] **Implement State-Driven Rendering** <!-- id: 2 -->
    - เชื่อมต่อ `useGameStore`
    - สร้าง Sprite ง่ายๆ (Graphics วงกลม/สี่เหลี่ยม) แทนตัวสัตว์เลี้ยง
    - เปลี่ยนสี Sprite ตาม State:
        - `IDLE`: Blue
        - `SLEEPING`: Indigo/Purple
        - `EATING`: Orange
        - `SICK`: Yellow
        - `DEAD`: Grey/Black

- [x] **Integrate to App** <!-- id: 3 -->
    - เพิ่ม `<GameCanvas />` ใน `src/App.tsx`
    - จัด Layout ให้ Canvas อยู่ตรงกลาง

- [x] **Browser Verification** <!-- id: 4 -->
    - เปิด Web Localhost
    - กดปุ่มเปลี่ยน State และยืนยันว่ากราฟิกเปลี่ยนตาม
    - **Capture Screenshot** หลักฐานการทำงาน
