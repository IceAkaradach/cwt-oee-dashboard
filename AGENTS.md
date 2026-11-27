# AGENTS.md — Mandatory Design & Architecture Lock

This repository is the **CWT OEE System (Phraeksa Factory)** Isometric 2.5D Dashboard.
Any AI coding agent working in this repository MUST follow these non-negotiable rules:

1. **Preserve the Visual Layout 100%:**
   - Keep Light Mode (`#F5F7FA` background, `#FFFFFF` cards, `#2563EB` primary blue).
   - Keep the 3-part layout: `Sidebar.tsx` + `TopKpiStrip.tsx` (4 cards with Donut + `A · P · Q`) + `IsometricFactoryCanvas.tsx` (4 cartoon 2.5D stations around the glowing blue central `OEE รวม` hub with animated SVG flow lines and `ซ่อนเส้น flow` toggle).
   - Do NOT convert the main overview into plain tables, generic charts, or a 2D DXF/CAD blueprint.
2. **Preserve Cartoon 2.5D Machine Assets:**
   - Keep `public/stations/cutting.jpg`, `perforate.jpg`, `quilting.jpg`, `sewing.jpg`.
   - Keep `.iso-station-img` (`mix-blend-mode: multiply`) on machine `<img>` elements; do NOT add CSS `drop-shadow` directly on `<img>` (breaks multiply blending and reveals white bounding boxes).
3. **Preserve Interactive Drill-Downs:**
   - Clicking any department card or isometric station MUST open `StationDetailDrawer.tsx` showing individual machines (`NC03–NC05`, `SC-001–SC-016`, `L1–L7`, `PF-01–PF-02`).
4. **Integrate Real Data Cleanly:**
   - When connecting live APIs from `https://cwt.mtflows.com`, modify only the data/fetching layer (`src/data/cwtData.ts`, `src/App.tsx`, `vite.config.ts`) and map responses into the existing `DepartmentData` / `PlantSnapshot` interfaces in `src/types/oee.ts`.
5. **Verification:**
   - Always verify with `npm run build` (0 TypeScript / Vite errors) after edits.
