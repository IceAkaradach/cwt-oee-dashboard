import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Play,
  Pause,
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { DepartmentData, DepartmentId, PlantSnapshot } from '../types/oee';

export type CanvasTab = 'overview' | 'workflow';

interface IsometricFactoryCanvasProps {
  snapshot: PlantSnapshot;
  activeTab: CanvasTab;
  onChangeTab: (tab: CanvasTab) => void;
  selectedDepartmentId: DepartmentId | null;
  onSelectDepartment: (id: DepartmentId) => void;
  isLive: boolean;
  onToggleLive: () => void;
}

interface StationPosition {
  id: DepartmentId;
  // Percentage coordinates inside the 1000x560 isometric canvas
  boxClass: string;
  badgeClass: string;
  // SVG anchor point (x, y) in 1000x560 viewBox where the glowing blue flow line connects
  anchorX: number;
  anchorY: number;
}

const STATION_LAYOUT: Record<DepartmentId, StationPosition> = {
  cutting: {
    id: 'cutting',
    boxClass: 'left-[3%] top-[5%] w-[34%]',
    badgeClass: 'left-[2%] top-[3%]',
    anchorX: 280,
    anchorY: 195,
  },
  perforate: {
    id: 'perforate',
    boxClass: 'right-[4%] top-[5%] w-[31%]',
    badgeClass: 'right-[3%] top-[3%]',
    anchorX: 720,
    anchorY: 195,
  },
  quilting: {
    id: 'quilting',
    boxClass: 'left-[4%] bottom-[9%] w-[32%]',
    badgeClass: 'left-[2%] bottom-[4%]',
    anchorX: 280,
    anchorY: 375,
  },
  sewing: {
    id: 'sewing',
    boxClass: 'right-[3%] bottom-[9%] w-[33%]',
    badgeClass: 'right-[2%] bottom-[4%]',
    anchorX: 720,
    anchorY: 375,
  },
};

function statusBadgeColors(status: DepartmentData['status']) {
  switch (status) {
    case 'RUN':
      return {
        pill: 'bg-emerald-500 text-white',
        dot: 'bg-emerald-500',
        ring: 'border-emerald-200',
      };
    case 'IDLE':
      return {
        pill: 'bg-amber-500 text-white',
        dot: 'bg-amber-500',
        ring: 'border-amber-200',
      };
    case 'STOP':
      return {
        pill: 'bg-rose-500 text-white',
        dot: 'bg-rose-500',
        ring: 'border-rose-200',
      };
    case 'MAINT':
      return {
        pill: 'bg-orange-500 text-white',
        dot: 'bg-orange-500',
        ring: 'border-orange-200',
      };
    case 'SOON':
    default:
      return {
        pill: 'bg-slate-400 text-white',
        dot: 'bg-slate-400',
        ring: 'border-slate-200',
      };
  }
}

export const IsometricFactoryCanvas: React.FC<IsometricFactoryCanvasProps> = ({
  snapshot,
  activeTab,
  onChangeTab,
  selectedDepartmentId,
  onSelectDepartment,
  isLive,
  onToggleLive,
}) => {
  const [showFlowLines, setShowFlowLines] = useState(true);
  const [hoveredDept, setHoveredDept] = useState<DepartmentId | null>(null);

  const hubX = 500;
  const hubY = 285;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
      {/* Card Header: Tabs + Controls (matching SSE OEE video) */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
          <button
            onClick={() => onChangeTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-blue-700 shadow-2xs ring-1 ring-slate-200/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ภาพรวมสายการผลิต
          </button>
          <button
            onClick={() => onChangeTab('workflow')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'workflow'
                ? 'bg-white text-blue-700 shadow-2xs ring-1 ring-slate-200/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            หลักการทำงานเครื่อง
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLive}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isLive
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="จำลองการอัปเดตข้อมูล Real-time"
          >
            {isLive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Pause className="w-3 h-3" />
                <span>Real-time</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>หยุดชั่วคราว</span>
              </>
            )}
          </button>

          {activeTab === 'overview' && (
            <button
              onClick={() => setShowFlowLines((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              {showFlowLines ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>ซ่อนเส้น flow</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>แสดงเส้น flow</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Body */}
      {activeTab === 'overview' ? (
        <div className="relative w-full h-[555px] bg-white overflow-hidden select-none">
          {/* Subtle Isometric Floor Dot Pattern */}
          <div
            className="absolute inset-0 opacity-45 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#CBD5E1 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />

          {/* Soft Radial Ambient Glow Behind Center OEE Hub */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[260px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(59,130,246,0.04) 45%, rgba(255,255,255,0) 72%)',
            }}
          />

          {/* Animated SVG Flow Lines */}
          {showFlowLines && (
            <svg
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <defs>
                <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>

              {/* Subtle Sequential Process Flow: Cutting -> Perforate -> Quilting -> Sewing */}
              <path
                d="M 355 150 L 645 150"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeOpacity="0.35"
                className="flow-line-process"
              />
              <path
                d="M 670 225 C 580 260, 420 315, 340 355"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeOpacity="0.25"
                className="flow-line-process"
              />
              <path
                d="M 360 445 L 640 445"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeOpacity="0.35"
                className="flow-line-process"
              />

              {/* Radial Glowing Blue Telemetry Flow Lines into Central OEE Hub */}
              {snapshot.departments.map((dept) => {
                const pos = STATION_LAYOUT[dept.id];
                const isHighlighted =
                  hoveredDept === dept.id || selectedDepartmentId === dept.id;
                const isInactive = dept.status === 'SOON';

                // Smooth S-curve from station to central OEE hub
                const midX = (pos.anchorX + hubX) / 2;
                const pathD = `M ${pos.anchorX} ${pos.anchorY} C ${midX} ${pos.anchorY}, ${midX} ${hubY}, ${hubX} ${hubY}`;

                return (
                  <g key={dept.id}>
                    {/* Soft outer glow line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isInactive ? '#CBD5E1' : '#3B82F6'}
                      strokeWidth={isHighlighted ? 9 : 6}
                      strokeOpacity={isInactive ? 0.25 : isHighlighted ? 0.32 : 0.18}
                      strokeLinecap="round"
                      filter={isInactive ? undefined : 'url(#blueGlow)'}
                      className={isInactive ? '' : 'flow-glow'}
                    />
                    {/* Crisp animated dashed inner line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isInactive ? '#94A3B8' : 'url(#flowGrad)'}
                      strokeWidth={isHighlighted ? 3.5 : 2.5}
                      strokeOpacity={isInactive ? 0.45 : 0.95}
                      strokeLinecap="round"
                      className={isInactive ? '' : 'flow-line-animated'}
                    />
                    {/* Anchor node dot at station */}
                    <circle
                      cx={pos.anchorX}
                      cy={pos.anchorY}
                      r={isHighlighted ? 6 : 4.5}
                      fill={isInactive ? '#94A3B8' : '#2563EB'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* 4 Isometric Production Stations */}
          {snapshot.departments.map((dept) => {
            const pos = STATION_LAYOUT[dept.id];
            const colors = statusBadgeColors(dept.status);
            const isSelected = selectedDepartmentId === dept.id;
            const isHovered = hoveredDept === dept.id;

            return (
              <div
                key={dept.id}
                onMouseEnter={() => setHoveredDept(dept.id)}
                onMouseLeave={() => setHoveredDept(null)}
                onClick={() => onSelectDepartment(dept.id)}
                className={`absolute ${pos.boxClass} z-20 cursor-pointer group transition-transform duration-300 ${
                  isHovered || isSelected ? 'scale-[1.03]' : 'scale-100'
                }`}
              >
                {/* Isometric Machine Image */}
                <div className="relative w-full flex items-center justify-center">
                  <img
                    src={dept.imageSrc}
                    alt={`${dept.name} Isometric Station`}
                    className={`iso-station-img w-full h-auto max-h-[225px] object-contain transition-all duration-300 ${
                      dept.status === 'SOON' ? 'opacity-60 grayscale-[35%]' : 'opacity-100'
                    }`}
                  />

                  {/* Floating Station KPI Badge (like SSE OEE video) */}
                  <div
                    className={`absolute ${pos.badgeClass} bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg shadow-slate-900/8 border transition-all duration-200 min-w-[138px] ${
                      isSelected || isHovered
                        ? 'border-blue-500 ring-2 ring-blue-500/20'
                        : colors.ring
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-extrabold text-slate-900 tracking-wide">
                        {dept.code}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider leading-none ${colors.pill}`}
                      >
                        {dept.statusLabel}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-xs font-bold text-slate-800 tabular-nums">
                        {dept.output.toLocaleString()}{' '}
                        <span className="text-[10px] font-normal text-slate-400">ชิ้น</span>
                      </span>
                      <span
                        className="text-[11px] font-extrabold tabular-nums"
                        style={{ color: dept.primaryMetricValue !== null ? dept.accentColor : '#94A3B8' }}
                      >
                        {dept.primaryMetricLabel}{' '}
                        {dept.primaryMetricValue !== null
                          ? `${dept.primaryMetricValue.toFixed(1)}%`
                          : '—'}
                      </span>
                    </div>

                    <div className="mt-1 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>เครื่องเดิน</span>
                      <span className="font-semibold text-slate-700 tabular-nums">
                        {dept.activeMachines}/{dept.totalMachines}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Central Glowing Blue OEE Hub Card (Centerpiece matching video) */}
          <div className="absolute left-1/2 top-[51%] -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="oee-hub-glow bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-600 text-white rounded-2xl px-6 py-4 min-w-[186px] text-center border border-blue-400/50 backdrop-blur-md">
              <div className="text-[11px] font-semibold text-blue-100 tracking-wide uppercase">
                OEE รวม · โรงงานแพรกษา
              </div>
              <div className="text-4xl font-extrabold tracking-tight tabular-nums my-0.5 text-amber-300 drop-shadow-xs">
                {snapshot.overallOee.toFixed(1)}%
              </div>
              <div className="text-xs font-semibold text-white/95 tabular-nums">
                ผลิตรวม {snapshot.totalOutput.toLocaleString()} ชิ้น
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-blue-50 tabular-nums">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>
                  เดิน {snapshot.runningMachines}/{snapshot.totalMachines} เครื่อง
                </span>
              </div>
            </div>
          </div>

          {/* Bottom-Center Helper Legend */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-full px-4 py-1.5 shadow-xs flex items-center gap-4 text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              RUN
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              UNPLANNED / IDLE
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              COMING SOON
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline text-blue-600 font-medium">
              คลิกที่สถานีเพื่อดูรายเครื่อง
            </span>
          </div>
        </div>
      ) : (
        /* Tab 2: หลักการทำงานเครื่อง (4-Step CWT Manufacturing Process Flow) */
        <div className="p-5 sm:p-6 bg-slate-50/50">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                กระบวนการผลิตหุ้มเบาะรถยนต์ (CWT โรงงานแพรกษา)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ลำดับการไหลของชิ้นงานตั้งแต่ตัดหนังจนถึงเย็บประกอบเสร็จสมบูรณ์ พร้อมแหล่งข้อมูล Telemetry ของแต่ละแผนก
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>4 ขั้นตอนหลัก · 27 หน่วยการผลิต</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {snapshot.departments.map((dept, index) => (
              <div
                key={dept.id}
                onClick={() => onSelectDepartment(dept.id)}
                className="relative bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: dept.accentColor }}
                    >
                      {dept.stepOrder}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {dept.code}
                    </span>
                  </div>

                  <div className="h-32 flex items-center justify-center mb-3 bg-white rounded-lg">
                    <img
                      src={dept.imageSrc}
                      alt={dept.name}
                      className="iso-station-img max-h-28 object-contain"
                    />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {dept.name} — {dept.thaiName}
                  </h4>

                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-slate-400">
                        วัตถุดิบเข้า (Input)
                      </div>
                      <div className="text-slate-700">{dept.workflowSummary.input}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-slate-400">
                        กระบวนการ (Process)
                      </div>
                      <div className="text-slate-700">{dept.workflowSummary.process}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-slate-400">
                        ผลผลิต (Output)
                      </div>
                      <div className="text-slate-700">{dept.workflowSummary.output}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-blue-700 bg-blue-50/60 -mx-4 -mb-4 px-4 py-2.5 rounded-b-xl">
                  <Cpu className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
                  <span className="leading-snug">{dept.workflowSummary.telemetrySource}</span>
                </div>

                {index < snapshot.departments.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-xs items-center justify-center text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 bg-white rounded-xl border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                รุ่นสินค้าที่กำลังผลิตวันนี้:{' '}
                <strong className="text-slate-900">
                  RG21 X-TERRAIN · RG23 PU BLACK · RG21 PU · RG21 X-SERIES · RJ10 87BLACK · RJ10 PU BL
                </strong>
              </span>
            </div>
            <span className="text-slate-400">อัปเดตล่าสุด {snapshot.updatedAt}</span>
          </div>
        </div>
      )}
    </div>
  );
};
