import React from 'react';
import {
  LayoutDashboard,
  Factory,
  Scissors,
  CircleDot,
  Grid2x2,
  Shirt,
  Monitor,
  ExternalLink,
  Activity,
  ChevronRight,
} from 'lucide-react';
import { DepartmentId } from '../types/oee';

interface SidebarProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onSelectDepartment: (id: DepartmentId) => void;
  kioskMode: boolean;
  onToggleKiosk: () => void;
}

const MAIN_MENU = [
  { id: 'overview', label: 'ภาพรวมโรงงาน', icon: LayoutDashboard },
  { id: 'workflow', label: 'สายการผลิต', icon: Factory },
];

const DEPT_MENU: { id: DepartmentId; label: string; sub: string; icon: React.ElementType }[] = [
  { id: 'cutting', label: 'Cutting', sub: 'NC03–NC05', icon: Scissors },
  { id: 'perforate', label: 'Perforate', sub: 'Coming Soon', icon: CircleDot },
  { id: 'quilting', label: 'Quilting', sub: '16 เครื่อง ESP32', icon: Grid2x2 },
  { id: 'sewing', label: 'Sewing', sub: '6 ไลน์ประกอบ', icon: Shirt },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  onSelectDepartment,
  kioskMode,
  onToggleKiosk,
}) => {
  if (kioskMode) return null;

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-200/90 flex flex-col justify-between min-h-screen select-none">
      <div>
        {/* Brand Header */}
        <div className="px-4 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm shadow-blue-600/25">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 tracking-tight truncate">
              CWT OEE System
            </div>
            <div className="text-[11px] font-medium text-slate-500 truncate">
              โรงงานแพรกษา (Phraeksa)
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-3 pt-4">
          <div className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            เมนูหลัก
          </div>
          <nav className="space-y-1">
            {MAIN_MENU.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectNav(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs ring-1 ring-blue-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Departments Quick Drill-Down */}
        <div className="px-3 pt-5">
          <div className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            แผนกการผลิต (4 สถานี)
          </div>
          <nav className="space-y-1">
            {DEPT_MENU.map((dept) => {
              const Icon = dept.icon;
              const isActive = activeNav === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => onSelectDepartment(dept.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium leading-tight truncate">{dept.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{dept.sub}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 shrink-0" />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Display & Original System Links */}
        <div className="px-3 pt-5">
          <div className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            โหมดแสดงผล & ระบบเดิม
          </div>
          <div className="space-y-1">
            <button
              onClick={onToggleKiosk}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
            >
              <Monitor className="w-4 h-4 text-slate-400" />
              <span>จอ TV (Kiosk Mode)</span>
            </button>
            <a
              href="https://cwt.mtflows.com/factory/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-all"
            >
              <span className="flex items-center gap-2.5 truncate">
                <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">cwt.mtflows.com</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white text-[11px] font-extrabold flex items-center justify-center tracking-tight">
            CWT
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-slate-800 truncate">
              Chai Watana Tannery
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              Production Monitor · v1.6.1
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
