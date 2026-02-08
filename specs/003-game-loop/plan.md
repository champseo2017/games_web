# Technical Plan: ระบบวงจรเกมและสถานะ

**Based on Spec**: `specs/003-game-loop/spec.md`
**Status**: Draft

## Architecture & Tech Stack

### 1. Game Loop Implementation (`useGameLoop`)
- **Pattern**: `useEffect` + `setInterval`
- **Why**: เกม Tamagotchi ไม่ต้องการ High Precision แบบ Action Game (60FPS Logic) การใช้ `setInterval` ที่ 1000ms (1 Tick per Sec) เพียงพอและประหยัดทรัพยากร
- **Hook Location**: `src/hooks/useGameLoop.ts`
- **Integration**: Hook จะเรียก Action `performTick` ใน Zutand Store

### 2. State Machine (`useGameStore`)
- **Pattern**: Finite State Machine (FSM) ผสมใน Zustand
- **States**: `IDLE`, `SLEEPING`, `EATING`, `PLAYING`, `SICK`, `DEAD`
- **Implementation**:
    - เพิ่ม field `state` (Enum/Union Type) ใน Store (แทน `isSleeping` boolean เดิม)
    - เพิ่ม logic ตรวจสอบ `current_state` ก่อนเริ่ม Action ใหม่

## Proposed Changes

### [Source Files]

#### [MODIFY] `src/stores/useGameStore.ts`
- **Refactor**: เปลี่ยน `isSleeping: boolean` เป็น `state: GameStateEnum`
- **Add**: Define `type PetState = 'IDLE' | 'SLEEPING' | 'EATING' | 'PLAYING' | 'SICK' | 'DEAD'`
- **Update**: `performTick` ให้รองรับ Logic ของ State ใหม่ (เช่น ถ้า Sleep Energy ขึ้น)
- **Update**: `toggleSleep` -> เปลี่ยนเป็น `sendCommand('SLEEP')` ที่เช็ค State ปัจจุบัน

#### [NEW] `src/hooks/useGameLoop.ts`
- สร้าง Custom Hook ที่รับ `onTick` callback หรือผูกกับ Store โดยตรง
- จัดการ `setInterval` และการ Pause เมื่อจำเป็น (เช่น หน้าจอไม่ Active? หรือรันตลอด?) -> รันตลอดตราบที่ Component Mount

#### [MODIFY] `src/App.tsx`
- เรียกใช้ `useGameLoop`
- ปรับปุ่มกดให้เรียกผ่านระบบ State ใหม่ (เช็คเงื่อนไขก่อนกดได้ หรือให้ปุ่ม Disable)

## Verification Plan

### Automated Tests
- `npm run build`: ต้องผ่าน Type Check (เพราะมีการรื้อ Type ใหญ่)

### Manual Verification
- **Tick Test**: เปิดเกมนับเวลา 1 นาที ค่า Tick ต้องเพิ่มประมาณ 60 ครั้ง
- **State Test**: กดให้นอน -> กดป้อนข้าว -> ต้องไม่กิน
- **Resume Test**: รีเฟรชหน้าจอ -> สถานะต้องคงเดิม (Persist)
