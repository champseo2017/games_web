# Functional Spec: ระบบเรนเดอร์และจัดการสินทรัพย์ (PixiJS Renderer & Asset System)

**Feature Branch**: `feature/005-pixi-renderer`
**Created**: 2026-02-08
**Status**: Draft
**Input**: สร้างระบบกราฟิกด้วย PixiJS และระบบโหลดภาพ + Web Test (ใช้ Alias Path)

## User Scenarios & Testing

### User Story 1 - จากข้อความสู่ภาพ (Visual Feedback)
**ในฐานะ** ผู้เล่น
**ฉันต้องการ** เห็นตัวละครสัตว์เลี้ยงขยับได้ในฉาก ไม่ใช่แค่อ่าน Text Status
**เพื่อที่** จะได้รู้สึกผูกพันและเข้าใจสถานะของมันได้ทันที

**Acceptance Scenarios**:
1. **Given** เปิดเกมขึ้นมา, **Then** ต้องเห็น Canvas แสดงภาพสัตว์เลี้ยง (Sprite)
2. **Given** สัตว์เลี้ยงสถานะ `SLEEPING`, **Then** ภาพต้องเปลี่ยนเป็นท่านอน (หรือหลับตา)
3. **Given** สัตว์เลี้ยงตาย (`DEAD`), **Then** ภาพต้องเปลี่ยนเป็นหลุมศพหรือวิญญาณ

### User Story 2 - โหลดลื่นไหล (Asset Management)
**ในฐานะ** Developer (และ User)
**ฉันต้องการ** ให้ระบบโหลดภาพให้เสร็จก่อนเริ่มเกม
**เพื่อที่** จะได้ไม่เห็นภาพกระพริบหรือสี่เหลี่ยมสีขาว (Missing Texture)

**Acceptance Scenarios**:
1. **Given** เน็ตช้า, **Then** ต้องขึ้น Loading Screen จนกว่า Asset หลักจะมาครบ

## Requirements

### Functional Requirements
- **FR-001**: ใช้ **PixiJS (v8)** เป็น Rendering Engine
- **FR-002**: ระบบต้องรองรับ **Responsive Canvas** (ย่อขยายตามหน้าจอ หรือ Fixed Aspect Ratio)
- **FR-003**: **Asset Loader** ต้องสามารถ Preload ภาพจาก `@assets/*` ได้
- **FR-004**: การแสดงผลต้อง Sync กับ `GameStore.state` (State-driven Rendering)

## Success Criteria
- **SC-001**: มี `<canvas>` ปรากฏบนหน้าจอแทน (หรือคู่กับ) Debug UI
- **SC-002**: เปลี่ยน State ใน Debug UI แล้วภาพใน Canvas เปลี่ยนตาม
- **SC-003**: Code ใช้ Alias Path (`@components`, `@assets`, `@utils`) ถูกต้องตามกฎ
