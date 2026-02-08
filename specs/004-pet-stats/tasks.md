# Tasks: ระบบค่าพลังและตรรกะสัตว์เลี้ยง

- [x] **Create Game Config** <!-- id: 0 -->
    - สร้าง `src/config/gameConfig.ts`
    - กำหนดค่า `DECAY_RATES` (Hunger, Fun, Energy, Hygiene)
    - กำหนดค่า `THRESHOLDS` (SICK, STARVING)

- [x] **Enhance Game Logic (Store)** <!-- id: 1 -->
    - อัปเดต `performTick` ใน `useGameStore.ts`
    - Implement: Decay logic ตาม Config
    - Implement: Death condition (Hunger <= 0)
    - Implement: Sickness condition (Hygiene < 30 -> Chance to SICK)

- [x] **UI Updates for Logic** <!-- id: 2 -->
    - เพิ่มปุ่ม "Clean" (อาบน้ำ/เก็บอึ) ใน `App.tsx`
    - เพิ่มปุ่ม "Medicine" (รักษาสถานะ SICK)
    - แสดง Alert หรือหน้าจอแดงเมื่อใกล้ตาย (Hunger < 20)

- [x] **Browser Verification** <!-- id: 3 -->
    - เปิด Web Localhost (`npm run dev`)
    - ทดสอบปล่อยให้หิวจนตาย
    - ทดสอบการรักษา (Medical) และทำความสะอาด (Clean)
    - **Capture Screenshot** ตอน SICK หรือ DEAD
