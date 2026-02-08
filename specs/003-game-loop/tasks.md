# Tasks: ระบบวงจรเกมและสถานะ

- [x] **Define State Types** <!-- id: 0 -->
    - แก้ไข `src/stores/useGameStore.ts`
    - เพิ่ม Type `PetState` ('IDLE' | 'SLEEPING' | 'EATING' | 'PLAYING' | 'SICK' | 'DEAD')
    - เปลี่ยน `isSleeping` เป็น `state: PetState` (Migration logic: if isSleeping -> SLEEPING else IDLE)

- [x] **Implement State Transitions** <!-- id: 1 -->
    - สร้าง Function `transitionTo(newState)` ใน Store
    - ใส่ Guard Clauses: ห้ามเปลี่ยนจาก `SLEEPING` ไป `EATING` โดยตรง ฯลฯ
    - ปรับปรุง Actions เดิม (Feed, Play) ให้เช็ค State ก่อนทำงาน

- [x] **Create Game Loop Hook** <!-- id: 2 -->
    - สร้าง `src/hooks/useGameLoop.ts`
    - ใช้ `useEffect` และ `setInterval` (กำหนด TICK_RATE = 1000ms หรือตาม Config)
    - ให้เรียก `useGameStore.getState().performTick()` ทุกรอบ

- [x] **Integrate & Verify** <!-- id: 3 -->
    - เชื่อม `useGameLoop` ใน `src/App.tsx` (Component บนสุด)
    - แสดงสถานะปัจจุบัน (`CURRENT STATE: ...`) บนหน้าจอ Debug
    - ทดสอบกดปุ่มต่างๆ ในสถานะที่ต่างกัน (นอน, กิน, เล่น)
