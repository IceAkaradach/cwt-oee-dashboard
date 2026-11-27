# AI_LOCK_PROMPT — คำสั่งกำกับ AI เพื่อล็อคหน้าตาและรูปแบบ Dashboard

> **วิธีใช้:** ให้เพื่อนก๊อปปี้ข้อความในกรอบด้านล่างนี้ส่งให้ AI (Antigravity / Cursor / Claude / ChatGPT / Copilot) **ทุกครั้งก่อนสั่งให้แก้หรือต่อยอดโค้ด** เพื่อป้องกัน AI เปลี่ยนหน้าตาหรือรื้อโครงสร้างเดิม

---

```text
[STRICT DESIGN & ARCHITECTURE LOCK — ห้ามเปลี่ยนรูปแบบ UI เดิม]

คุณกำลังพัฒนาต่อยอดโปรเจกต์ "CWT OEE System — โรงงานแพรกษา" (React + Vite + Tailwind CSS v4)
ต้องยึดตามกฎต่อไปนี้อย่างเคร่งครัด ห้ามเปลี่ยนสไตล์หรือรื้อโครงสร้างหน้าเดิม:

1. ห้ามเปลี่ยนรูปแบบ Layout หลัก:
   - คงโครงสร้าง 3 ส่วนหลักไว้เหมือนเดิม 100%:
     (1) Sidebar ซ้าย (src/components/Sidebar.tsx)
     (2) แถบการ์ด KPI 4 แผนกด้านบน (src/components/TopKpiStrip.tsx) แสดง Donut Gauge + ค่า A·P·Q + ยอดผลิต/ของเสีย + เป้าหมาย
     (3) ผังโรงงาน Isometric 2.5D ตรงกลาง (src/components/IsometricFactoryCanvas.tsx) มี 4 สถานีล้อมรอบศูนย์กลาง "OEE รวม · โรงงานแพรกษา" เรืองแสงสีน้ำเงิน พร้อมเส้น Flow สีฟ้าเคลื่อนไหว และปุ่ม "ซ่อนเส้น flow"
   - ห้ามเปลี่ยนหน้าหลักไปเป็นตารางล้วน, กราฟล้วน, หรือผัง 2D CAD/DXF

2. ห้ามเปลี่ยนธีม สีหลัก และสไตล์ภาพเครื่องจักร:
   - ธีมหลักต้องเป็น Light Mode พื้นหลัง #F5F7FA การ์ดสีขาวขอบมน สีหลัก #2563EB
   - สีประจำแผนก: Cutting (#7C3AED ม่วง), Perforate (#64748B เทา), Quilting (#D97706 ส้ม), Sewing (#2563EB น้ำเงิน)
   - ห้ามลบหรือแทนที่ภาพเครื่องจักรการ์ตูน 2.5D ใน public/stations/ (cutting.jpg, perforate.jpg, quilting.jpg, sewing.jpg) ด้วยไอคอนหรือกล่อง SVG ธรรมดา
   - ภาพเครื่องจักรต้องคงคลาส .iso-station-img (mix-blend-mode: multiply) และห้ามใส่ drop-shadow บน <img> โดยตรง (เพื่อไม่ให้เห็นกรอบสี่เหลี่ยมสีขาว)

3. ห้ามลบฟีเจอร์ Interactive เดิม:
   - คลิกสถานีหรือการ์ดด้านบน ต้องเปิด StationDetailDrawer (src/components/StationDetailDrawer.tsx) แสดงรายเครื่องจักรจริง (Cutting: NC03–NC05, Quilting: SC-001–SC-016, Sewing: L1–L7, Perforate: PF-01–PF-02)
   - คงแท็บ "ภาพรวมสายการผลิต" และ "หลักการทำงานเครื่อง", ปุ่ม "จอ TV (Kiosk Mode)", และปุ่ม "ซ่อนเส้น flow" ไว้เหมือนเดิม

4. วิธีต่อยอดที่ถูกต้อง (เช่น เชื่อมต่อ API จริงจาก cwt.mtflows.com):
   - ให้แก้ไขเฉพาะชั้นข้อมูล (Data Layer) ที่ src/data/cwtData.ts, src/App.tsx และ vite.config.ts (/cwt-proxy)
   - ต้องแมปข้อมูลจาก API เข้ากับ Type เดิม (DepartmentData และ PlantSnapshot ใน src/types/oee.ts) เพื่อให้ UI เดิมทำงานต่อได้ทันทีโดยไม่ต้องรื้อ Component

5. ก่อนส่งงานทุกครั้ง:
   - ต้องรัน `npm run build` ให้ผ่าน 0 error และตรวจสอบว่าทุก Component ใน src/components/ ยังแสดงผลตรงตามดีไซน์เดิม
```
