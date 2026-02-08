# Technical Plan: ระบบเรนเดอร์และจัดการสินทรัพย์

**Based on Spec**: `specs/005-pixi-renderer/spec.md`
**Status**: Draft

## Architecture & Tech Stack

### 1. Rendering Engine (`pixi.js`)
- **Version**: 8.x (Latest)
- **Integration**: ใช้ `pixi.js` แบบ Vanilla ห่อด้วย `useEffect` ใน React Component (`GameCanvas`) จะเสถียรกว่าการใช้ Library Wrapper ในระยะยาว
- **Component**: `@components/Game/GameCanvas.tsx`

### 2. Asset System
- **Pattern**: Singleton หรือ Custom Hook `useAssetLoader`
- **Logic**: ใช้ `Assets.load` ของ PixiJS v8
- **Files**:
    - Placeholder Images: สร้างภาพสี่เหลี่ยมสีต่างกันแทน Sprite จริงไปก่อน (Generate ด้วย Canvas API หรือใช้ภาพ Placeholder ง่ายๆ) เพื่อไม่ต้องรอไฟล์จริง

### 3. State Synchronization
- **Logic**: `GameCanvas` จะ Subscribe กับ `useGameStore`
- **Update Loop**: ใช้ `app.ticker.add` ของ PixiJS เชื่อมกับ State เพื่ออัปเดต Animation (ถ้ามี) หรือเปลี่ยน Texture เมื่อ State เปลี่ยน

## Proposed Changes

### [Dependencies]
- Running `npm install pixi.js`

### [Files]

#### [NEW] `src/components/Game/GameCanvas.tsx`
- สร้าง Pixi Application
- Handle Resize
- Render Sprite ตาม State (`IDLE` = สีฟ้า, `SLEEP` = สีม่วง, `DEAD` = สีดำ)

#### [NEW] `src/hooks/usePixiApp.ts`
- Encapsulate การสร้าง `PIXI.Application`

#### [MODIFY] `src/App.tsx`
- เพิ่ม `<GameCanvas />` ลงใน Layout
- ซ่อน Debug UI บางส่วน หรือย้ายไปอยู่ข้างล่าง

## Verification Plan

### Browser Verification
- เปิดหน้าเว็บ
- เช็คว่ามี Canvas สีดำ/ขาว ขึ้นมา
- กดปุ่ม Sleep/Feed ใน Debug UI แล้วดูว่า "สี่เหลี่ยม" ใน Canvas เปลี่ยนสี/รูปร่างไหม
