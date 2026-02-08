# Tasks: Spec-007 Interaction System

## Phase 1: Store & Logic Updates
- [ ] อัปเดต `useGameStore` ให้รองรับการโต้ตอบใหม่ๆ (pet, lights, waste) <!-- id: 701 -->
- [ ] เพิ่ม Cooldown Logic สำหรับการลูบหัว (Petting) ใน Store <!-- id: 702 -->

## Phase 2: PixiJS Interaction Implementation
- [ ] เปิดใช้งาน `eventMode` ใน `GameCanvas` และ Pet Sprite <!-- id: 703 -->
- [ ] ทำระบบตรวจจับ Mouse Interaction สำหรับการลูบหัว (Petting Detection) <!-- id: 704 -->
- [ ] สร้างระบบแสดงผล Emotes (หัวใจ, เหงื่อ) บน PixiJS Stage <!-- id: 705 -->

## Phase 3: Command Menu & UI Refactor
- [ ] สร้างชุดปุ่มคำสั่งใหม่ใน `App.tsx` (Feed, Clean, Play, Light, Medicine) <!-- id: 706 -->
- [ ] ปรับแต่ง UI CSS (Inline Styles) ให้รองรับสถานะการกดและ Disabled ที่ชัดเจน <!-- id: 707 -->

## Phase 4: Waste Management (Bonus Features)
- [ ] แสดง Item "อึ" บน Canvas เมื่อ Hygiene ต่ำ <!-- id: 708 -->
- [ ] พัฒนาฟังก์ชันการหยิบอึไปทิ้ง (Drag-and-drop to clean) <!-- id: 709 -->

## Phase 5: Verification & Cleanup
- [ ] ทดสอบระบบโต้ตอบทั้งหมดบนความละเอียดหน้าจอต่างๆ <!-- id: 710 -->
- [ ] ตรวจสอบว่าไม่มี Console Error เมื่อมีการโต้ตอบถี่ๆ <!-- id: 711 -->
