# CWT OEE System — คู่มือส่งต่องาน (Windows Ready)

โปรเจกต์ **CWT OEE System (โรงงานแพรกษา)** — Web Dashboard แสดงผล OEE แบบ **Isometric 2.5D** พร้อมศูนย์กลาง OEE รวมเรืองแสง เส้น Flow เคลื่อนไหว และหน้าต่างเจาะลึกรายเครื่องจักรทั้ง 4 แผนก

---

## 1. วิธีเปิดใช้งานบน Windows (ทำตามนี้ได้หน้าตาเหมือน 100%)

### สิ่งที่ต้องมีในเครื่อง
- **Node.js (แนะนำเวอร์ชัน 20 หรือ 22 LTS):** ดาวน์โหลดที่ https://nodejs.org

### วิธีรันแบบคลิกเดียว (แนะนำ)
1. แตกไฟล์ `.zip` ออกมาเป็นโฟลเดอร์ `cwt-oee-dashboard`
2. ดับเบิลคลิกไฟล์ **`start_windows.bat`**
   - ครั้งแรกระบบจะรัน `npm install` อัตโนมัติ (รอประมาณ 20–40 วินาที)
   - จากนั้นจะเปิดเบราว์เซอร์ไปที่ **http://localhost:5173** ให้อัตโนมัติ

### วิธีรันผ่าน Terminal / VS Code
```cmd
cd cwt-oee-dashboard
npm install
npm run dev
```
แล้วเปิดเบราว์เซอร์ไปที่ **http://localhost:5173**

> **ข้อควรระวัง:** ห้ามดับเบิลคลิกเปิดไฟล์ `index.html` ตรงๆ เพราะรูปเครื่องจักรและ JS module ต้องโหลดผ่านเซิร์ฟเวอร์ (`npm run dev`)

---

## 2. โครงสร้างไฟล์ในโปรเจกต์

```text
cwt-oee-dashboard/
├── start_windows.bat               # ไฟล์กดรันบน Windows แบบ 1-click
├── HANDOFF.md                      # คู่มือส่งต่องานฉบับนี้
├── index.html                      # หน้า HTML หลัก (ฟอนต์ IBM Plex Sans Thai + Inter)
├── package.json                    # React 18 + Vite 6 + Tailwind CSS v4 + Lucide
├── vite.config.ts                  # ตั้งค่า Vite + Proxy (/cwt-proxy -> https://cwt.mtflows.com)
├── public/stations/
│   ├── cutting.jpg                 # ภาพเครื่องจักร 2.5D แผนก Cutting
│   ├── perforate.jpg               # ภาพเครื่องจักร 2.5D แผนก Perforate
│   ├── quilting.jpg                # ภาพเครื่องจักร 2.5D แผนก Quilting
│   └── sewing.jpg                  # ภาพเครื่องจักร 2.5D แผนก Sewing
└── src/
    ├── App.tsx                     # โครงหน้าหลัก, นาฬิกา, Real-time Simulation, โหมดจอ TV
    ├── index.css                   # Tailwind + Animation เส้น Flow + mix-blend-multiply
    ├── types/oee.ts                # โครงสร้างข้อมูล TypeScript
    ├── data/cwtData.ts             # ข้อมูล 4 แผนกจริงของ CWT + ตัวจำลอง Real-time
    └── components/
        ├── Sidebar.tsx             # เมนูซ้าย + โหมดจอ TV + ลิงก์ไป cwt.mtflows.com
        ├── TopKpiStrip.tsx         # การ์ด KPI 4 แผนกด้านบน (Donut + A·P·Q + เป้าหมาย)
        ├── IsometricFactoryCanvas.tsx  # ผัง Isometric 2.5D + เส้น Flow + ศูนย์กลาง OEE รวม
        └── StationDetailDrawer.tsx # หน้าต่างสไลด์เจาะลึกรายเครื่อง (NC03-05, SC-01-16, L1-L7)
```

---

## 3. แนวทางต่อยอด (Live API จาก `cwt.mtflows.com`)

- ใช้ Proxy `/cwt-proxy/...` ที่ตั้งไว้แล้วใน `vite.config.ts` เพื่อเลี่ยงปัญหา CORS ระหว่างพัฒนา
- เปลี่ยนการอัปเดต state ใน `src/App.tsx` จาก `simulateTelemetryTick` เป็นการ `fetch` ข้อมูลจริงทุก 30–45 วินาที และแมปเข้ากับ `DepartmentData[]` ใน `src/types/oee.ts`
- Build ขึ้น Production Server ด้วยคำสั่ง `npm run build` (จะได้ไฟล์พร้อมใช้งานในโฟลเดอร์ `dist/`)
