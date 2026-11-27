import { DepartmentData, PlantSnapshot } from '../types/oee';

/**
 * Initial snapshot mirrored directly from live CWT Production Monitor (Phraeksa Factory)
 * https://cwt.mtflows.com/factory/?from_date=2026-11-27&to_date=2026-11-27
 */
export const INITIAL_DEPARTMENTS: DepartmentData[] = [
  {
    id: 'cutting',
    code: 'CUTTING',
    name: 'Cutting',
    thaiName: 'แผนกตัดหนัง / วัสดุ (NC)',
    description: 'เครื่องตัดหนังและวัสดุอัตโนมัติระบบ NC (NC03–NC05) สำหรับเบาะรถยนต์รุ่น RG21, RG23, RJ10',
    status: 'RUN',
    statusLabel: 'RUN',
    primaryMetricLabel: 'OEE',
    primaryMetricValue: 64.9,
    target: 80,
    periodDelta: -51.7,
    availability: 67.0,
    performance: 96.8,
    quality: 100.0,
    output: 15520,
    defects: 0,
    defectRate: 0.0,
    activeMachines: 3,
    totalMachines: 3,
    bottleneck: 'Availability',
    externalUrl: 'https://cwt.mtflows.com/cutting/',
    accentColor: '#7C3AED', // Purple accent matching CWT Cutting card
    imageSrc: '/stations/cutting.jpg',
    stepOrder: 1,
    machines: [
      {
        id: 'nc03',
        code: 'NC03',
        name: '12I5823 (AUIH8-366405)',
        status: 'RUNNING',
        oee: 72.0,
        availability: 74.0,
        performance: 97.0,
        quality: 100.0,
        output: 5640,
        target: 80,
        model: 'RG21 X-TERRAIN',
      },
      {
        id: 'nc04',
        code: 'NC04',
        name: '17SE5838 (AUIQ80-727205)',
        status: 'RUNNING',
        oee: 51.0,
        availability: 54.0,
        performance: 94.0,
        quality: 100.0,
        output: 4120,
        target: 80,
        model: 'RG23 PU BLACK',
        note: 'Downtime 12m (9 stops)',
      },
      {
        id: 'nc05',
        code: 'NC05',
        name: '22DE5830 (CUT-1120236)',
        status: 'RUNNING',
        oee: 73.0,
        availability: 75.0,
        performance: 98.0,
        quality: 100.0,
        output: 5760,
        target: 80,
        model: 'RJ10 87BLACK',
      },
    ],
    workflowSummary: {
      input: 'หนังแท้, หนัง PU, ผ้าเบาะรถยนต์ (ม้วน / ผืน)',
      process: 'สแกนตำหนิผืนหนัง → วาง Nesting → ตัดชิ้นส่วนด้วยหัวตัด NC อัตโนมัติ',
      output: 'ชิ้นส่วนเบาะตัดสำเร็จ (Cut Pieces) ส่งต่อ Perforate / Quilting / Sewing',
      telemetrySource: 'NC Machine Logs · Operating 9.6h · Run 6.3h · Positioning 24m',
    },
  },
  {
    id: 'perforate',
    code: 'PERFORATE',
    name: 'Perforate',
    thaiName: 'แผนกเจาะรูหนัง',
    description: 'เครื่องเจาะรูระบายอากาศบนชิ้นส่วนหนังเบาะรถยนต์ (อยู่ระหว่างเตรียมเชื่อมต่อ IoT)',
    status: 'SOON',
    statusLabel: 'COMING SOON',
    primaryMetricLabel: 'OEE',
    primaryMetricValue: null,
    target: null,
    periodDelta: null,
    availability: null,
    performance: null,
    quality: null,
    output: 0,
    defects: 0,
    defectRate: 0,
    activeMachines: 0,
    totalMachines: 2,
    externalUrl: 'https://cwt.mtflows.com/factory/',
    accentColor: '#64748B',
    imageSrc: '/stations/perforate.jpg',
    stepOrder: 2,
    machines: [
      {
        id: 'pf01',
        code: 'PF-01',
        name: 'Perforation Press #1',
        status: 'INACTIVE',
        output: 0,
        note: 'รอเชื่อมต่อเซ็นเซอร์ IoT',
      },
      {
        id: 'pf02',
        code: 'PF-02',
        name: 'Perforation Press #2',
        status: 'INACTIVE',
        output: 0,
        note: 'รอเชื่อมต่อเซ็นเซอร์ IoT',
      },
    ],
    workflowSummary: {
      input: 'ชิ้นส่วนหนังจากแผนก Cutting (รุ่นที่ต้องการรูระบายอากาศ)',
      process: 'เจาะรูแพทเทิร์นด้วยแม่พิมพ์เข็มความแม่นยำสูง (Precision Punching)',
      output: 'ชิ้นส่วนหนังเจาะรู ส่งต่อแผนก Quilting หรือ Sewing',
      telemetrySource: 'ยังไม่เชื่อมต่อข้อมูล (Coming Soon — พร้อมรองรับ ESP32 / PLC)',
    },
  },
  {
    id: 'quilting',
    code: 'QUILTING',
    name: 'Quilting',
    thaiName: 'แผนกเดินลาย / เย็บควิลท์ (ESP32)',
    description: 'เครื่องเย็บเดินลายอัตโนมัติ 16 เครื่อง (SC-001 ถึง SC-016) เชื่อมต่อผ่าน ESP32 Real-time',
    status: 'IDLE',
    statusLabel: 'UNPLANNED',
    primaryMetricLabel: 'OEE',
    primaryMetricValue: null,
    target: 85,
    periodDelta: null,
    availability: null,
    performance: null,
    quality: null,
    output: 240,
    defects: 0,
    defectRate: 0,
    activeMachines: 3,
    totalMachines: 16,
    bottleneck: 'ไม่มีแผนการผลิตในระบบ (ผลิตนอกแผน 240 ชิ้น)',
    externalUrl: 'https://cwt.mtflows.com/quilting/',
    accentColor: '#D97706', // Amber
    imageSrc: '/stations/quilting.jpg',
    stepOrder: 3,
    machines: [
      { id: 'sc01', code: 'SC-001', name: 'Quilting #01', status: 'IDLE', output: 29 },
      { id: 'sc02', code: 'SC-002', name: 'Quilting #02', status: 'RUNNING', output: 29 },
      { id: 'sc03', code: 'SC-003', name: 'Quilting #03', status: 'IDLE', output: 20 },
      { id: 'sc04', code: 'SC-004', name: 'Quilting #04', status: 'IDLE', output: 21 },
      { id: 'sc05', code: 'SC-005', name: 'Quilting #05', status: 'IDLE', output: 16 },
      { id: 'sc06', code: 'SC-006', name: 'Quilting #06', status: 'IDLE', output: 16 },
      { id: 'sc07', code: 'SC-007', name: 'Quilting #07', status: 'IDLE', output: 1 },
      { id: 'sc08', code: 'SC-008', name: 'Quilting #08', status: 'IDLE', output: 7 },
      { id: 'sc09', code: 'SC-009', name: 'Quilting #09', status: 'RUNNING', output: 22 },
      { id: 'sc10', code: 'SC-010', name: 'Quilting #10', status: 'RUNNING', output: 18 },
      { id: 'sc11', code: 'SC-011', name: 'Quilting #11', status: 'IDLE', output: 35 },
      { id: 'sc12', code: 'SC-012', name: 'Quilting #12', status: 'IDLE', output: 28 },
      { id: 'sc13', code: 'SC-013', name: 'Quilting #13', status: 'INACTIVE', output: 0 },
      { id: 'sc14', code: 'SC-014', name: 'Quilting #14', status: 'INACTIVE', output: 0 },
      { id: 'sc15', code: 'SC-015', name: 'Quilting #15', status: 'INACTIVE', output: 0 },
      { id: 'sc16', code: 'SC-016', name: 'Quilting #16', status: 'OFFLINE', output: 0, target: 10, model: 'B55', note: 'Plan 08:00–08:39' },
    ],
    workflowSummary: {
      input: 'ชิ้นส่วนหนัง/ผ้าจาก Cutting & Perforate + ฟองน้ำลามิเนต',
      process: 'เย็บเดินลาย CNC (Diamond / Line Stitch) ด้วยเครื่อง SC-001 ถึง SC-016',
      output: 'ชิ้นงานเดินลายสำเร็จ (Quilted Panels) ส่งต่อแผนก Sewing',
      telemetrySource: 'ESP32 IoT Telemetry · 3 Running · 9 Idle · 3 Inactive · 1 Offline',
    },
  },
  {
    id: 'sewing',
    code: 'SEWING',
    name: 'Sewing',
    thaiName: 'แผนกเย็บประกอบเบาะรถยนต์',
    description: 'สายการผลิตเย็บประกอบหุ้มเบาะรถยนต์ 6 ไลน์ (F/C, F/B, R/C, R/B, 3RD & Armrest, เบาะผ้า)',
    status: 'RUN',
    statusLabel: 'RUN',
    primaryMetricLabel: 'OA',
    primaryMetricValue: 55.8,
    target: 85,
    periodDelta: -65.3,
    availability: 55.8,
    performance: 78.4,
    quality: 100.0,
    productivity: 3.9,
    output: 201,
    defects: 0,
    defectRate: 0.0,
    activeMachines: 5,
    totalMachines: 6,
    bottleneck: 'ห่างเป้า 29.2% (L4 R/B ยังไม่มีผลผลิต)',
    externalUrl: 'https://cwt.mtflows.com/sewing/',
    accentColor: '#2563EB', // Primary Blue
    imageSrc: '/stations/sewing.jpg',
    stepOrder: 4,
    machines: [
      { id: 'l1', code: 'L1', name: 'Line F/C (Front Cushion)', status: 'RUNNING', oee: 75.6, output: 65, target: 376, hourlyTarget: 48, model: 'RG21 X-SERIES' },
      { id: 'l2', code: 'L2', name: 'Line F/B (Front Backrest)', status: 'RUNNING', oee: 61.7, output: 51, target: 376, hourlyTarget: 48, model: 'RG21 PU' },
      { id: 'l3', code: 'L3', name: 'Line R/C (Rear Cushion)', status: 'RUNNING', oee: 61.9, output: 50, target: 368, hourlyTarget: 47, model: 'RG23 PU BLACK' },
      { id: 'l4', code: 'L4', name: 'Line R/B (Rear Backrest)', status: 'STOP', oee: 0.0, output: 0, target: 240, hourlyTarget: 30, note: 'ยังไม่มีผลผลิตวันนี้' },
      { id: 'l5', code: 'L5', name: 'Line 3RD & ARMREST', status: 'RUNNING', oee: 77.6, output: 30, target: 160, hourlyTarget: 20, model: 'RJ10 PU BL' },
      { id: 'l7', code: 'L7', name: 'Line เบาะผ้า (Fabric Seat)', status: 'RUNNING', oee: null, output: 5, target: null, model: 'RG21-BLACK', note: 'ไม่มีเป้าหมายรายวัน' },
    ],
    workflowSummary: {
      input: 'ชิ้นส่วนตัด (Cutting) + ชิ้นงานเดินลาย (Quilting) + อุปกรณ์เสริม (ซิป, คลิป, ด้าย)',
      process: 'เย็บประกอบชิ้นส่วนตามไลน์ F/C, F/B, R/C, R/B, 3RD และ QC ตรวจสอบ 100%',
      output: 'ชุดหุ้มเบาะรถยนต์สำเร็จรูป (Finished Automotive Seat Covers)',
      telemetrySource: 'CWT Sewing Monitor v2.16.0 · Quality 100% · Productivity 3.9 pcs/Man-Hr',
    },
  },
];

export function computePlantSnapshot(departments: DepartmentData[], now = new Date()): PlantSnapshot {
  const cutting = departments.find((d) => d.id === 'cutting');
  const sewing = departments.find((d) => d.id === 'sewing');

  // Mirror CWT's plant OEE logic (OEE average from OEE-measured departments)
  const oeeDepts = departments.filter(
    (d) => d.primaryMetricLabel === 'OEE' && d.primaryMetricValue !== null
  );
  const overallOee =
    oeeDepts.length > 0
      ? Number(
          (
            oeeDepts.reduce((acc, d) => acc + (d.primaryMetricValue ?? 0), 0) /
            oeeDepts.length
          ).toFixed(1)
        )
      : cutting?.primaryMetricValue ?? 0;

  const measuredDepartments = departments.filter((d) => d.primaryMetricValue !== null).length;
  const onTargetDepartments = departments.filter(
    (d) =>
      d.primaryMetricValue !== null &&
      d.target !== null &&
      d.primaryMetricValue >= d.target
  ).length;

  const totalOutput = departments.reduce((acc, d) => acc + d.output, 0);
  const totalDefects = departments.reduce((acc, d) => acc + d.defects, 0);
  const runningMachines = departments.reduce((acc, d) => acc + d.activeMachines, 0);
  const totalMachines = departments.reduce((acc, d) => acc + d.totalMachines, 0);

  const attentionGap =
    sewing && sewing.primaryMetricValue !== null && sewing.target !== null
      ? Number(Math.max(0, sewing.target - sewing.primaryMetricValue).toFixed(1))
      : 29.2;

  return {
    plantName: 'โรงงานแพรกษา',
    companyName: 'Chai Watana Tannery Group (CWT)',
    version: 'v1.6.1 · Digital Twin',
    updatedAt: now.toLocaleTimeString('th-TH', { hour12: false }),
    overallOee,
    totalOutput,
    totalDefects,
    runningMachines,
    totalMachines,
    onTargetDepartments,
    measuredDepartments,
    attentionDepartment: 'Sewing',
    attentionGap,
    departments,
  };
}

/**
 * Generates a realistic live telemetry tick so users can see real-time updates
 * just like the SSE OEE dashboard video.
 */
export function simulateTelemetryTick(departments: DepartmentData[]): DepartmentData[] {
  return departments.map((dept) => {
    if (dept.id === 'cutting') {
      const addPcs = Math.floor(Math.random() * 14) + 3;
      const deltaA = (Math.random() - 0.48) * 0.4;
      const newA = Number(Math.min(82, Math.max(62, (dept.availability ?? 67) + deltaA)).toFixed(1));
      const newP = Number(Math.min(99.2, Math.max(94.5, (dept.performance ?? 96.8) + (Math.random() - 0.5) * 0.2)).toFixed(1));
      const newQ = dept.quality ?? 100;
      const newOee = Number(((newA * newP * newQ) / 10000).toFixed(1));

      return {
        ...dept,
        availability: newA,
        performance: newP,
        primaryMetricValue: newOee,
        output: dept.output + addPcs,
        machines: dept.machines.map((m, idx) => ({
          ...m,
          output: m.output + (idx === Math.floor(Math.random() * 3) ? addPcs : 0),
          oee: m.oee !== null && m.oee !== undefined
            ? Number(Math.min(88, Math.max(46, m.oee + (Math.random() - 0.48) * 0.3)).toFixed(1))
            : m.oee,
        })),
      };
    }

    if (dept.id === 'quilting') {
      const addPcs = Math.random() > 0.45 ? 1 : 0;
      const newOutput = dept.output + addPcs;
      return {
        ...dept,
        output: newOutput,
        bottleneck: `ไม่มีแผนการผลิตในระบบ (ผลิตนอกแผน ${newOutput.toLocaleString()} ชิ้น)`,
        machines: dept.machines.map((m) =>
          m.status === 'RUNNING' && addPcs > 0 && Math.random() > 0.65
            ? { ...m, output: m.output + 1 }
            : m
        ),
      };
    }

    if (dept.id === 'sewing') {
      const addPcs = Math.random() > 0.5 ? 1 : 0;
      const newOa = Number(
        Math.min(88, Math.max(52, (dept.primaryMetricValue ?? 55.8) + (Math.random() - 0.45) * 0.3)).toFixed(1)
      );
      return {
        ...dept,
        primaryMetricValue: newOa,
        availability: newOa,
        output: dept.output + addPcs,
        productivity: Number(
          Math.min(5.2, Math.max(3.5, (dept.productivity ?? 3.9) + (Math.random() - 0.48) * 0.05)).toFixed(1)
        ),
        machines: dept.machines.map((m) =>
          m.status === 'RUNNING' && addPcs > 0 && Math.random() > 0.72
            ? {
                ...m,
                output: m.output + 1,
                oee: m.oee !== null && m.oee !== undefined
                  ? Number(Math.min(95, m.oee + 0.2).toFixed(1))
                  : m.oee,
              }
            : m
        ),
      };
    }

    return dept;
  });
}
