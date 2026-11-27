import React from 'react';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';
import { DepartmentData, DepartmentId } from '../types/oee';

interface TopKpiStripProps {
  departments: DepartmentData[];
  selectedDepartmentId: DepartmentId | null;
  onSelectDepartment: (id: DepartmentId) => void;
}

const MiniDonut: React.FC<{ value: number | null; color: string; label: string }> = ({
  value,
  color,
  label,
}) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const pct = value !== null ? Math.max(0, Math.min(100, value)) : 0;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-13 h-13 shrink-0 flex items-center justify-center">
      <svg className="w-13 h-13 -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="4.5"
        />
        {value !== null && (
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-extrabold text-slate-900 tabular-nums leading-none">
          {value !== null ? `${value.toFixed(0)}%` : '—'}
        </span>
        <span className="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
};

function getStatusPillStyle(status: DepartmentData['status']) {
  switch (status) {
    case 'RUN':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    case 'IDLE':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    case 'STOP':
      return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
    case 'MAINT':
      return 'bg-orange-50 text-orange-700 ring-1 ring-orange-200';
    case 'SOON':
    default:
      return 'bg-slate-100 text-slate-500 ring-1 ring-slate-200';
  }
}

export const TopKpiStrip: React.FC<TopKpiStripProps> = ({
  departments,
  selectedDepartmentId,
  onSelectDepartment,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
      {departments.map((dept) => {
        const isSelected = selectedDepartmentId === dept.id;
        const gap =
          dept.primaryMetricValue !== null && dept.target !== null
            ? Number((dept.target - dept.primaryMetricValue).toFixed(1))
            : null;

        return (
          <button
            key={dept.id}
            onClick={() => onSelectDepartment(dept.id)}
            className={`group relative text-left bg-white rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${
              isSelected
                ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                : 'border-slate-200/90 hover:border-blue-300 hover:shadow-md shadow-2xs'
            }`}
          >
            {/* Colored Top Accent Bar */}
            <div
              className="h-1 w-full"
              style={{ backgroundColor: dept.accentColor }}
            />

            <div className="p-3.5">
              {/* Row 1: Name + Status Pill */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[13px] font-bold text-slate-900 truncate">
                    {dept.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide shrink-0 ${getStatusPillStyle(
                    dept.status
                  )}`}
                >
                  {dept.statusLabel}
                </span>
              </div>

              {/* Row 2: Donut Gauge + A·P·Q & Output */}
              <div className="flex items-center gap-3">
                <MiniDonut
                  value={dept.primaryMetricValue}
                  color={dept.accentColor}
                  label={dept.primaryMetricLabel}
                />

                <div className="flex-1 min-w-0 space-y-1">
                  {/* A · P · Q Triplet */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">
                      {dept.id === 'sewing' ? 'OA · Q · Prod' : 'A · P · Q'}
                    </span>
                    <span className="font-bold text-slate-700 tabular-nums">
                      {dept.id === 'sewing'
                        ? `${dept.primaryMetricValue?.toFixed(0) ?? '—'} · ${dept.quality?.toFixed(0) ?? '—'} · ${dept.productivity ?? '—'}`
                        : dept.availability !== null
                        ? `${dept.availability.toFixed(0)} · ${dept.performance?.toFixed(0)} · ${dept.quality?.toFixed(0)}`
                        : '— · — · —'}
                    </span>
                  </div>

                  {/* Output & Defect */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">ผลิต / เสีย</span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {dept.output.toLocaleString()}
                      <span className="text-slate-400 font-normal">
                        {' '}
                        / {dept.defects} ({dept.defectRate.toFixed(1)}%)
                      </span>
                    </span>
                  </div>

                  {/* Target / Bottleneck */}
                  <div className="flex items-center justify-between text-[10px] pt-0.5">
                    {dept.target !== null ? (
                      <span className="text-slate-500">
                        เป้า ≥ {dept.target}%
                      </span>
                    ) : (
                      <span className="text-slate-400">ยังไม่ตั้งเป้า</span>
                    )}

                    {gap !== null && gap > 0 ? (
                      <span className="inline-flex items-center gap-0.5 text-rose-600 font-semibold tabular-nums">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        ขาด {gap}%
                      </span>
                    ) : dept.status === 'IDLE' ? (
                      <span className="text-amber-600 font-semibold">
                        เดิน {dept.activeMachines}/{dept.totalMachines}
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        {dept.activeMachines}/{dept.totalMachines} เครื่อง
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
