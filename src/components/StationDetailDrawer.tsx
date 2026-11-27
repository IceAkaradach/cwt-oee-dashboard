import React from 'react';
import { X, ExternalLink, AlertCircle, Cpu, CheckCircle2 } from 'lucide-react';
import { DepartmentData, MachineUnit } from '../types/oee';

interface StationDetailDrawerProps {
  department: DepartmentData | null;
  onClose: () => void;
}

function machineStatusStyle(status: MachineUnit['status']) {
  switch (status) {
    case 'RUNNING':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'IDLE':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'STOP':
    case 'OFFLINE':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'MAINT':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'INACTIVE':
    default:
      return 'bg-slate-100 text-slate-500 border-slate-200';
  }
}

export const StationDetailDrawer: React.FC<StationDetailDrawerProps> = ({
  department,
  onClose,
}) => {
  if (!department) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-[2px]">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/70">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
              <img
                src={department.imageSrc}
                alt={department.name}
                className="iso-station-img w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 truncate">
                  {department.name}
                </h2>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: department.accentColor }}
                >
                  {department.statusLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {department.thaiName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Primary Metric & A/P/Q Breakdown */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-medium text-slate-500">
                  {department.primaryMetricLabel} ปัจจุบัน
                  {department.target ? ` (เป้า ≥ ${department.target}%)` : ''}
                </div>
                <div
                  className="text-3xl font-extrabold tabular-nums mt-0.5"
                  style={{ color: department.primaryMetricValue !== null ? department.accentColor : '#94A3B8' }}
                >
                  {department.primaryMetricValue !== null
                    ? `${department.primaryMetricValue.toFixed(1)}%`
                    : '—'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">ยอดผลิตรวม</div>
                <div className="text-xl font-bold text-slate-900 tabular-nums">
                  {department.output.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-500">ชิ้น</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-medium">
                  Defect {department.defects} ({department.defectRate.toFixed(1)}%)
                </div>
              </div>
            </div>

            {/* A · P · Q Bars */}
            {department.availability !== null && (
              <div className="space-y-2 pt-3 border-t border-slate-200/70">
                {[
                  {
                    label: department.id === 'sewing' ? 'OA (Overall Achievement)' : 'Availability (A)',
                    val: department.availability,
                    color: '#EF4444',
                  },
                  {
                    label: 'Performance (P)',
                    val: department.performance,
                    color: '#8B5CF6',
                  },
                  {
                    label: 'Quality (Q)',
                    val: department.quality,
                    color: '#10B981',
                  },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">{metric.label}</span>
                      <span className="font-bold text-slate-800 tabular-nums">
                        {metric.val !== null ? `${metric.val.toFixed(1)}%` : '—'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${metric.val ?? 0}%`,
                          backgroundColor: metric.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {department.bottleneck && (
              <div className="mt-3 flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200/80 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  <strong>จุดที่ต้องเร่ง:</strong> {department.bottleneck}
                </span>
              </div>
            )}
          </div>

          {/* Machine / Line Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>
                  รายละเอียดเครื่องจักร / สายการผลิต ({department.machines.length})
                </span>
              </h3>
              <span className="text-xs text-slate-500 tabular-nums">
                เดิน {department.activeMachines}/{department.totalMachines}
              </span>
            </div>

            {department.id === 'quilting' ? (
              /* Compact 16-Machine ESP32 Grid for Quilting */
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {department.machines.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-lg border p-2.5 transition-all ${machineStatusStyle(
                      m.status
                    )}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold">{m.code}</span>
                      <span className="text-[9px] font-bold uppercase">{m.status}</span>
                    </div>
                    <div className="mt-1.5 text-sm font-bold tabular-nums">
                      {m.output}{' '}
                      <span className="text-[10px] font-normal opacity-80">ชิ้น</span>
                    </div>
                    {m.model && (
                      <div className="text-[10px] opacity-80 truncate mt-0.5">
                        {m.model}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Detailed Machine / Line Cards for Cutting, Sewing, Perforate */
              <div className="space-y-2.5">
                {department.machines.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-200 p-3 bg-white hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            {m.code}
                          </span>
                          <span className="text-xs font-semibold text-slate-800 truncate">
                            {m.name}
                          </span>
                        </div>
                        {m.model && (
                          <div className="text-[11px] text-slate-500 mt-1">
                            รุ่น: <span className="font-medium text-slate-700">{m.model}</span>
                            {m.hourlyTarget ? ` · เป้า ${m.hourlyTarget}/ชม.` : ''}
                          </div>
                        )}
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${machineStatusStyle(
                          m.status
                        )}`}
                      >
                        {m.status}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-600 tabular-nums">
                        ผลิตแล้ว{' '}
                        <strong className="text-slate-900">
                          {m.output.toLocaleString()} ชิ้น
                        </strong>
                        {m.target && department.id === 'sewing'
                          ? ` / เป้า ${m.target}`
                          : ''}
                      </span>

                      {m.oee !== undefined && m.oee !== null ? (
                        <span className="font-extrabold text-blue-700 tabular-nums">
                          {department.primaryMetricLabel} {m.oee.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">
                          {m.note ?? '—'}
                        </span>
                      )}
                    </div>

                    {m.availability !== undefined && m.availability !== null && (
                      <div className="mt-1.5 text-[11px] text-slate-500 tabular-nums flex items-center gap-3">
                        <span>A: {m.availability}%</span>
                        <span>P: {m.performance}%</span>
                        <span>Q: {m.quality}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Workflow Info */}
          <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/70 text-xs space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              แหล่งข้อมูล Telemetry
            </div>
            <p className="text-slate-600">{department.workflowSummary.telemetrySource}</p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>

          {department.externalUrl && (
            <a
              href={department.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
            >
              <span>เปิดหน้าระบบเดิม (cwt.mtflows.com)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
