# CWT OEE System — Phraeksa Factory (Isometric 2.5D Dashboard)

Web Dashboard แสดงผล OEE แบบ **Isometric 2.5D แนวการ์ตูน** สำหรับ **โรงงานแพรกษา (Chai Watana Tannery Group)** พร้อมศูนย์กลาง OEE รวมเรืองแสง เส้น Flow เคลื่อนไหว การ์ด KPI (`A · P · Q`) และหน้าต่างเจาะลึกรายเครื่องจักรทั้ง 4 แผนก (`Cutting`, `Perforate`, `Quilting`, `Sewing`)

---

## วิธีรันบน Windows / Mac (เปิดแล้วหน้าตาเหมือนกัน 100%)

### 1. ติดตั้ง Node.js (ถ้ายังไม่มี)
ดาวน์โหลด **Node.js LTS (v20 หรือ v22)** จาก https://nodejs.org

### 2. Clone โปรเจกต์
```bash
git clone https://github.com/IceAkaradach/cwt-oee-dashboard.git
cd cwt-oee-dashboard
```

### 3. เปิดใช้งาน
- **บน Windows (คลิกเดียว):** ดับเบิลคลิกไฟล์ `start_windows.bat`
- **หรือรันผ่าน Terminal / VS Code:**
  ```bash
  npm install
  npm run dev
  ```
จากนั้นเปิดเบราว์เซอร์ไปที่ **http://localhost:5173**

> **หมายเหตุ:** ห้ามดับเบิลคลิกเปิดไฟล์ `index.html` ตรงๆ ต้องรันผ่าน `npm run dev` (หรือ `npm run preview`) เพื่อให้รูปเครื่องจักรใน `public/stations/` โหลดได้ครบ

---

## โครงสร้างโปรเจกต์

- `src/App.tsx` — หน้าหลัก, Live Clock, Real-time Simulation, โหมดจอ TV (Kiosk Mode)
- `src/components/TopKpiStrip.tsx` — การ์ด KPI ด้านบน 4 แผนก (Donut Gauge + A·P·Q + เป้าหมาย)
- `src/components/IsometricFactoryCanvas.tsx` — ผัง Isometric 2.5D + เส้น Flow เคลื่อนไหว + ศูนย์กลาง OEE รวม + แท็บหลักการทำงานเครื่อง
- `src/components/StationDetailDrawer.tsx` — หน้าต่างเจาะลึกรายเครื่อง (`NC03–NC05`, `SC-001–SC-016`, `L1–L7`)
- `src/components/Sidebar.tsx` — เมนูซ้าย, โหมดจอ TV, ลิงก์ไป `cwt.mtflows.com`
- `src/data/cwtData.ts` — ข้อมูล 4 แผนกของ CWT และตัวจำลอง Real-time (จุดเชื่อมต่อ Live API)
- `public/stations/*.jpg` — ภาพเครื่องจักร 2.5D แนวการ์ตูนทั้ง 4 แผนก
- `HANDOFF.md` — คู่มือส่งต่องานและแนวทางต่อ Live API จาก `cwt.mtflows.com`
