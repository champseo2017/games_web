# Technical Plan - Spec-007: Interaction System

## Architecture Overview
ระบบนี้จะแบ่งการทำงานเป็น 2 ส่วนหลัก: **UI Controls** (React) และ **Canvas Interaction** (PixiJS) โดยสื่อสารผ่าน `@stores/useGameStore`

## Proposed Changes

### 1. State Management (`@stores/useGameStore`)
- เพิ่มสถานะ `isLightsOn` (boolean) เพื่อควบคุม Theme
- เพิ่มฟังก์ชัน `pet()` สำหรับจัดการ Logic การลูบหัว (เพิ่ม Fun, ลด Cooldown)
- เพิ่มฟังก์ชัน `disposeWaste(wasteId)` สำหรับระบบเก็บอึ

### 2. PixiJS Interaction Layer (`@components/Game/GameCanvas`)
- **Enable Interactive Stage**: ตั้งค่า `app.stage.eventMode = 'static'` และ `app.stage.hitArea = app.screen`
- **Pet Interaction**:
    - เพิ่ม `eventMode = 'static'` ให้กับ Pet Sprite/Graphics
    - จัดการ Event `pointerdown` และ `pointermove` เพื่อตรวจจับการลูบ
- **Waste Items**:
    - สร้าง Sprite สำหรับ Waste (อึ) เมื่อ `hygiene` ต่ำกว่าเกณฑ์
    - รองรับ Drag-and-drop โดยใช้ PixiJS Interaction Events

### 3. Emote System (`@components/Game/Environment`)
- สร้างคอมโพเนนต์ย่อยหรือ Layer ภายใน PixiJS Stage สำหรับวาด Emotes
- ใช้ `gsap` (ถ้ามี) หรือ PixiJS Ticker ในการทำ Animation (Fade out + Floating up)
- รองรับการเรียกใช้ผ่าน Global Function หรือ Hook ที่เชื่อมกับ PixiJS App Instance

### 4. Layout & UI (`App.tsx` & `@components/Game/Controls`)
- ปรับปรุงปุ่ม UI ใน `App.tsx` ให้ใช้คอมโพเนนต์ `ActionButton` ที่รองรับสถานะ Disabled ตาม Logic
- จัดกลุ่มเมนูคำสั่งให้สวยงามตาม Feature: `Feed`, `Clean`, `Play`, `Light`, `Medicine`

## Tech Stack Details
- **Renderer**: PixiJS v8 (EventMode API)
- **State**: Zustand (Middlewares for Persistent state)
- **Icons**: Lucide-react (สำหรับ UI Buttons)

## Verification Plan
1. **Interaction Test**: ใชเมาส์คลิก/ลากบนตัว Pet แล้วตรวจสอบว่าค่า Fun ใน Store เพิ่มขึ้นหรือไม่
2. **Menu Test**: กดปุ่ม Light แล้วตรวจสอบว่า `timeOfDay` เปลี่ยนและ visual background ใน Canvas อัปเดตทันที
3. **Emote Check**: เมื่อสั่ง Feed ต้องมีหัวใจสีแดงลอยขึ้นเหนือ Pet
