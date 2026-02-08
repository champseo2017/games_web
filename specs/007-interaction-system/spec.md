# Spec-007: Interaction System

## Goal
สร้างระบบการโต้ตอบ (Interaction System) ที่ช่วยให้ผู้เล่นสามารถดูแลสัตว์เลี้ยงได้อย่างทั่วถึง ผ่านทาง UI Menu (Command Menu) และการโต้ตอบด้วยเมาส์/ทัชโดยตรง (Direct Interaction) เพื่อเพิ่มความรู้สึกผูกพันและ Feedback ที่ชัดเจน

## Functional Requirements

### 1. Command Menu (UI-Based)
ระบบเมนูคำสั่งพื้นฐานที่จะส่งคำสั่งไปยัง Pet Logic:
- **Feed**: ให้ความแก่สัตว์เลี้ยง (เพิ่ม Hunger)
- **Clean**: ทำความสะอาดสภาพแวดล้อม (เพิ่ม Hygiene)
- **Play**: เล่นกับสัตว์เลี้ยง (เพิ่ม Fun)
- **Light**: เปิด/ปิดไฟ (Toggle Night/Day Mode และผลกระทบต่อ Energy)
- **Medicine**: ให้ยารักษาเมื่อสัตว์ป่วย (Heal Sickness)

### 2. Direct Interaction (Drag & Drop / Mouse)
การโต้ตอบโดยตรงบน Game Canvas:
- **Petting (ลูบหัว)**: การคลิก/ลากเมาส์บริเวณหัวของสัตว์เลี้ยง เพื่อเพิ่ม Fun เล็กน้อย
- **Waste Disposal (เก็บอึ)**: การคลิกที่อึ (Poop) ที่ปรากฏบนจอแล้วลากไปทิ้ง หรือคลิกเพื่อทำความสะอาดเฉพาะจุด

### 3. Feedback UI (Emotes & Effects)
การแสดงผลตอบรับเมื่อมีการโต้ตอบ:
- **Heart Emote**: แสดงหัวใจลอยขึ้นเมื่อสัตว์เลี้ยงมีความสุข (Feed success, Petting)
- **Sweat/Stress Emote**: แสดงเหงื่อหรือสัญลักษณ์ความเครียดเมื่อสัตว์เลี้ยงป่วยหรือสิ่งแวดล้อมสกปรก
- **Sound/Visual Pointers**: เปลี่ยน Cursor หรือแสดง Highlight เมื่อ Hover บนวัตถุที่โต้ตอบได้

## Business Rules & Logic
- คำสั่งจะไม่ทำงานหากสัตว์เลี้ยงอยู่ในสถานะ **DEAD**
- การโต้ตอบบางอย่าง (เช่น Petting) จะมี Cooldown เพื่อป้องกันการ Spam
- Emotes จะปรากฏเหนือหัวสัตว์เลี้ยงใน PixiJS Stage และหายไปเองใน 1-2 วินาที
