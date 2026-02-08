# Technical Plan: ระบบค่าพลังและตรรกะสัตว์เลี้ยง

**Based on Spec**: `specs/004-pet-stats/spec.md`
**Status**: Draft

## Architecture & Tech Stack

### 1. Stats Configuration (`GameConfig`)
- **File**: `src/config/gameConfig.ts`
- **Details**: เก็บค่าคงที่ต่างๆ แยกออกมา เพื่อให้ปรับ Balance ง่าย
    - `DECAY_RATES`: { hunger: 0.1, fun: 0.15, ... } (ต่อ Tick)
    - `THRESHOLDS`: { sick_hygiene: 30, warning_hunger: 20 }

### 2. Logic Enhancement (`useGameStore`)
- **Function**: `performTick`
- **Logic**:
    1. Apply Decay (ลดค่า)
    2. Check Vital Signs (Dead?)
    3. Check Sickness (Random chance if hygiene low)
    4. Auto-Wake (ถ้า Energy เต็ม 100 ให้ตื่นเอง?) -> Optional

### 3. Action Enhancement
- **Function**: `updateStats`
- **Logic**: เพิ่ม Side Effects เช่น "กินแล้วอึ" (Hygiene ลด), "เล่นแล้วเหนื่อย" (Energy ลด)

## Proposed Changes

### [Config]
#### [NEW] `src/config/gameConfig.ts`
- Export constants: `TICK_RATE`, `DECAY_RATES`, `THRESHOLDS`

### [Store]
#### [MODIFY] `src/stores/useGameStore.ts`
- Import config จาก `gameConfig.ts`
- Update `performTick`:
    - ใช้ค่าจาก Config
    - เพิ่ม Logic `checkDeath()` และ `checkSickness()`
- Update `updateStats`:
    - เพิ่ม logic การคำนวณที่ซับซ้อนขึ้น (ถ้ามี)

## Verification Plan

### Automated Tests
- `npm run build`: Type Check

### Manual & Browser Verification
- **Stress Test**: เร่งความเร็ว Tick Rate (ใน Code ชั่วคราว) เพื่อดูการตาย
- **Balance Test**: ลองเลี้ยง 5 นาทีว่ารอดไหม
