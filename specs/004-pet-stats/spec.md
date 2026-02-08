# Functional Spec: ระบบค่าพลังและตรรกะสัตว์เลี้ยง (Pet Stats & Logic)

**Feature Branch**: `feature/004-pet-stats`
**Created**: 2026-02-08
**Status**: Draft
**Input**: สร้างระบบคำนวณ Stats และ Logic การป่วย/ตาย + Web Test

## User Scenarios & Testing

### User Story 1 - สมดุลแห่งชีวิต (Living Stats)
**ในฐานะ** ผู้เล่น
**ฉันต้องการ** ให้ค่าพลังต่างๆ (Hunger, Fun, Hygiene) ลดลงอย่างสมเหตุสมผล
**เพื่อที่** เกมจะมีความท้าทาย ไม่ใช่เลี้ยงง่ายเกินไปหรือยากจนหงุดหงิด

**Acceptance Scenarios**:
1. **Given** ปล่อยทิ้งไว้ 1 นาที, **Then** ค่า Hunger/Fun ควรลดลงเล็กน้อย (เช่น -2 ถึง -5)
2. **Given** ไม่ได้ทำความสะอาด (Hygiene ต่ำ), **Then** สัตว์เลี้ยงควรมีโอกาส "ป่วย" (`SICK`)

### User Story 2 - ผลของการกระทำ (Consequences)
**ในฐานะ** ผู้เล่น
**ฉันต้องการ** ให้การกระทำส่งผลต่อ Stats อย่างถูกต้อง
**เพื่อที่** จะได้วางแผนการดูแลได้

**Acceptance Scenarios**:
1. **Given** สัตว์เลี้ยงหิว (Usage < 20), **When** กดกินข้าว (Feed), **Then** Hunger เพิ่มขึ้น, Energy ลดลงเล็กน้อย (อิ่มแล้วง่วง)
2. **Given** ค่า Hunger หรือ Energy เหลือ 0, **Then** สัตว์เลี้ยงควรตาย (`DEAD`)

## Requirements

### Functional Requirements
- **FR-001**: ระบบต้องคำนวณ **Decay** (การลดค่า) ของ Stats ทุก Tick
    - `Hunger`: ลดลงตลอดเวลา
    - `Fun`: ลดลงตลอดเวลา (ลดเร็วขึ้นถ้าป่วย)
    - `Energy`: ลดลงตอนตื่น, เพิ่มขึ้นตอนนอน
    - `Hygiene`: ลดลงช้าๆ (หรือลดฮวบตอนอึ)
- **FR-002**: ระบบต้องมีเงื่อนไข **State Transition** อัตโนมัติ:
    - ถ้า `Hygiene < 30` -> เปลี่ยนเป็น `SICK` (โอกาส 10% ต่อ Tick)
    - ถ้า `Hunger == 0` หรือ `Energy == 0` (ติดต่อกัน X Ticks) -> เปลี่ยนเป็น `DEAD`
- **FR-003**: การกระทำต้องมี Cooldown หรือข้อจำกัด (เช่น กินข้าวรัวๆ ไม่ได้)

## Success Criteria
- **SC-001**: กราฟ Stats แสดงผลการลดลงตามเวลาจริง
- **SC-002**: สัตว์เลี้ยงตายได้จริงเมื่อดูแลไม่ดี
- **SC-003**: **Web Test**: หน้าจอแสดงผลถูกต้องและตอบสนองต่อการเปลี่ยนแปลง Stats
