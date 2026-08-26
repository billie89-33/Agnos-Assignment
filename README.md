# 🏥 Agnos Patient Registration & Staff Monitor System

ระบบฟอร์มลงทะเบียนผู้ป่วยและหน้าจอตรวจสอบสำหรับเจ้าหน้าที่แบบเรียลไทม์ พัฒนาด้วย **Next.js (App Router)**, **TailwindCSS**, และ **Supabase Realtime**

## 🚀 ฟีเจอร์หลัก
- **Responsive Patient Form:** หน้าต่างกรอกข้อมูลผู้ป่วยดีไซน์ทันสมัย ใช้งานง่าย รองรับทั้งบนเดสก์ท็อป (แสดง 2 คอลัมน์) และมือถือ (แสดง 1 คอลัมน์)
- **Zod Validation:** ระบบตรวจสอบความถูกต้องของข้อมูลอย่างรวดเร็ว (เช่น รูปแบบอีเมล, ฟิลด์บังคับกรอก) ด้วย `react-hook-form` และ `zod`
- **Real-Time Staff Dashboard:** เจ้าหน้าที่สามารถมองเห็นข้อมูลที่ผู้ป่วยกำลังพิมพ์ได้แบบสดๆ (Real-time)
- **Presence Indicators:** ป้ายสถานะแจ้งเตือนแบบเรียลไทม์ เพื่อบอกเจ้าหน้าที่ว่าผู้ป่วยอยู่ในสถานะ "Inactive ⚪" (ไม่ได้ใช้งาน), "Actively filling in 🟡" (กำลังพิมพ์), หรือ "Submitted 🟢" (ส่งข้อมูลแล้ว)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack Used)
- **Next.js & React (TypeScript)**
- **TailwindCSS** for responsive styling
- **Supabase (Realtime WebSockets)** for instant data synchronization
- **React Hook Form & Zod** for robust form validation

---

## 💻 วิธีการรันโปรเจกต์

1. ติดตั้ง Dependencies:
```bash
npm install
```
2. ตั้งค่า Environment variables โดยสร้างไฟล์ `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
3. รัน Development Server:
```bash
npm run dev
```
4. Build สำหรับ Production:
```bash
npm run build
npm start
```

---

## 🏗️ Development Planning Documentation (เอกสารประกอบการพัฒนา)

### 1. โครงสร้างโปรเจกต์ (Project Structure)
```text
Agnos/
├── src/
│   ├── app/
│   │   ├── admin/       # หน้าต่างสำหรับเจ้าหน้าที่ (/admin)
│   │   │   └── page.tsx
│   │   ├── globals.css  # Global Tailwind styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # หน้าต่างฟอร์มสำหรับผู้ป่วย (/)
│   ├── components/      # React Components ที่ถูกเรียกใช้งานซ้ำ
│   │   ├── PatientForm.tsx
│   │   └── StaffDashboard.tsx
│   └── lib/             # Utilities และการตั้งค่าต่างๆ
│       └── supabase.ts  # ตั้งค่าการเชื่อมต่อ Supabase Client
└── public/              # ไฟล์ภาพและไอคอน (Static assets)
```

### 2. การตัดสินใจด้านการออกแบบ UI/UX (UI/UX Design Decisions)
- **เลย์เอาต์ฟอร์ม (Desktop vs Mobile):** 
  - *Desktop:* เลือกใช้ Grid แบบ 2 คอลัมน์ (`md:grid-cols-2`) เพื่อใช้พื้นที่หน้าจอแนวตั้งให้เกิดประโยชน์สูงสุด ช่วยลดการเลื่อนหน้าจอ (Scrolling) และทำให้มองเห็นภาพรวมของฟอร์มได้ง่ายขึ้น
  - *Mobile:* เปลี่ยนเป็นแบบ 1 คอลัมน์พร้อมช่องกรอกข้อมูลที่มีขนาดใหญ่ขึ้น (Padding กว้าง) เพื่อให้รองรับการสัมผัสบนหน้าจอมือถือได้ดีที่สุด
- **ความสวยงามทันสมัย (Modern Aesthetic):** นำสไตล์ Glassmorphism (พื้นหลังเบลอ) มาใช้ร่วมกับเงาแบบนุ่มนวล และพื้นหลังแบบไล่สี (Gradient) เพื่อให้หน้าต่างดูเป็นมิตร สะอาดตา และเป็นมืออาชีพ ลบภาพจำของระบบโรงพยาบาลที่มักจะดูแข็งทื่อ
- **ตัวชี้วัดสถานะเรียลไทม์ (Real-time Indicator):** จัดวางป้ายสถานะ (Inactive / Actively filling / Submitted) ให้เด่นชัดที่สุดที่มุมขวาบนของหน้าจอ Admin พร้อมเพิ่มแอนิเมชันไฟกระพริบ เพื่อให้เจ้าหน้าที่สังเกตเห็นความเคลื่อนไหวได้ทันทีโดยไม่ต้องกวาดสายตาทั้งหน้าจอ
- **การจัดกลุ่มข้อมูล (Visual Hierarchy):** แบ่งข้อมูลออกเป็นหมวดหมู่ย่อย (ข้อมูลส่วนตัว, ข้อมูลติดต่อ, ข้อมูลติดต่อฉุกเฉิน) ด้วยไอคอนและสีพื้นหลังที่แตกต่างกันเล็กน้อย ช่วยให้เจ้าหน้าที่กวาดสายตาอ่านข้อมูล (Skim) ได้รวดเร็วยิ่งขึ้น

### 3. สถาปัตยกรรมคอมโพเนนต์ (Component Architecture)
- `PatientForm.tsx`: เป็น "Smart" Client Component ที่ทำหน้าที่เรนเดอร์ฟอร์ม, รับข้อมูลจากผู้ใช้, ตรวจสอบข้อมูลด้วย Zod, และกระจายข้อมูล (Broadcast) ผ่าน Supabase โดยใช้ `useForm` (React Hook Form) เพื่อจัดการ State อย่างมีประสิทธิภาพและลดการ Re-render ที่ไม่จำเป็น
- `StaffDashboard.tsx`: เป็น Client Component ที่ทำหน้าที่เป็น "ผู้ฟัง (Listener)" โดยจะไป Subscribe กับช่องสัญญาณ (`patient-room`) ของ Supabase WebSocket เพื่อรอรับอีเวนต์ `broadcast` มาอัปเดตข้อมูล (`patientData`) และดักจับอีเวนต์ `presence` เพื่ออัปเดตป้ายสถานะคนไข้
- `app/page.tsx` & `app/admin/page.tsx`: เป็น Server Components ที่ทำหน้าที่เป็นแค่เปลือก (Wrapper/Layout) ในการเรียกใช้งาน Client Components ด้านบน และมีปุ่มลิงก์สลับไปมาเพื่อความสะดวกในการทดสอบ

### 4. ลำดับการทำงานของ Real-Time Synchronization
ระบบนี้ใช้ **Supabase WebSockets** ทำหน้าที่เป็นตัวกลางรับส่งข้อความ (Message Broker) เพื่อให้สื่อสารกันได้อย่างรวดเร็ว (Low-latency) โดย**ไม่มีการบันทึกข้อมูลลงฐานข้อมูล** (ไม่มีการสร้างตารางหรือ Database Writes ใดๆ ตามข้อกำหนดของโจทย์)

**ขั้นตอนการทำงาน (Step-by-Step Flow):**
1. **การเชื่อมต่อเริ่มต้น (Initial Connection):** เมื่อผู้ป่วย (`/`) และเจ้าหน้าที่ (`/admin`) เปิดแอปพลิเคชัน ทั้งคู่จะเข้าไปเชื่อมต่อกับช่องสัญญาณชื่อ `patient-room` โดยค่าเริ่มต้นสถานะของผู้ป่วยจะถูกตั้งเป็น `inactive` (ไม่มีการเคลื่อนไหว)
2. **ขณะกำลังพิมพ์ (Actively Filling In):** 
   - เมื่อผู้ป่วยพิมพ์ตัวอักษรใดๆ ฟังก์ชัน `onChange` จะถูกเรียกทำงาน
   - ฝั่งผู้ป่วยจะทำการกระจาย (Broadcast) อีเวนต์ชื่อ `form-update` ซึ่งแนบข้อมูลในฟอร์มทั้งหมดไปด้วย
   - ฝั่งผู้ป่วยทำการอัปเดตสถานะของตัวเอง (Presence state) เป็น `actively_filling`
   - หน้าจอเจ้าหน้าที่จะได้รับข้อมูลที่ส่งมาทันทีและนำไปแสดงผล พร้อมกับเปลี่ยนป้ายสถานะเป็น 🟡 
3. **การส่งข้อมูล (Submission):** เมื่อผู้ป่วยกดปุ่ม Submit และข้อมูลผ่านการตรวจสอบ (Validation) สถานะจะถูกเปลี่ยนเป็น `submitted` 🟢 เพื่อแจ้งให้เจ้าหน้าที่ทราบว่าการกรอกข้อมูลเสร็จสมบูรณ์แล้ว
4. **การยกเลิกการเชื่อมต่อ (Disconnection):** หากผู้ป่วยปิดแท็บเบราว์เซอร์หนีไป Supabase จะตัดสถานะ (Presence) ออกอัตโนมัติ และหน้าจอเจ้าหน้าที่จะเปลี่ยนป้ายสถานะกลับเป็น ⚪ `Inactive` ทันที

---
*โปรเจกต์นี้จัดทำขึ้นเพื่อเป็นแบบทดสอบสำหรับ Agnos*
