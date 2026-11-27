export type StationStatus = 'RUN' | 'IDLE' | 'STOP' | 'MAINT' | 'SOON';

export type DepartmentId = 'cutting' | 'perforate' | 'quilting' | 'sewing';

export interface MachineUnit {
  id: string;
  code: string;
  name: string;
  status: 'RUNNING' | 'IDLE' | 'INACTIVE' | 'OFFLINE' | 'STOP' | 'MAINT';
  oee?: number | null;
  availability?: number | null;
  performance?: number | null;
  quality?: number | null;
  output: number;
  target?: number | null;
  hourlyTarget?: number | null;
  model?: string;
  note?: string;
}

export interface DepartmentData {
  id: DepartmentId;
  code: string;
  name: string;
  thaiName: string;
  description: string;
  status: StationStatus;
  statusLabel: string;
  primaryMetricLabel: 'OEE' | 'OA';
  primaryMetricValue: number | null;
  target: number | null;
  periodDelta: number | null;
  availability: number | null;
  performance: number | null;
  quality: number | null;
  productivity?: number | null; // pcs/hr for Sewing
  output: number;
  defects: number;
  defectRate: number;
  activeMachines: number;
  totalMachines: number;
  bottleneck?: string;
  externalUrl?: string;
  accentColor: string; // Tailwind hex for top bar / gauge
  imageSrc: string;
  stepOrder: number;
  machines: MachineUnit[];
  workflowSummary: {
    input: string;
    process: string;
    output: string;
    telemetrySource: string;
  };
}

export interface PlantSnapshot {
  plantName: string;
  companyName: string;
  version: string;
  updatedAt: string;
  overallOee: number;
  totalOutput: number;
  totalDefects: number;
  runningMachines: number;
  totalMachines: number;
  onTargetDepartments: number;
  measuredDepartments: number;
  attentionDepartment: string;
  attentionGap: number;
  departments: DepartmentData[];
}
