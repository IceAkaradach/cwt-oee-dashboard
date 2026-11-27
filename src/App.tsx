import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  RefreshCw,
  Maximize2,
  Minimize2,
  Wifi,
} from 'lucide-react';
import {
  INITIAL_DEPARTMENTS,
  computePlantSnapshot,
  simulateTelemetryTick,
} from './data/cwtData';
import { DepartmentData, DepartmentId } from './types/oee';
import { Sidebar } from './components/Sidebar';
import { TopKpiStrip } from './components/TopKpiStrip';
import { IsometricFactoryCanvas, CanvasTab } from './components/IsometricFactoryCanvas';
import { StationDetailDrawer } from './components/StationDetailDrawer';

export default function App() {
  const [departments, setDepartments] = useState<DepartmentData[]>(INITIAL_DEPARTMENTS);
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [canvasTab, setCanvasTab] = useState<CanvasTab>('overview');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<DepartmentId | null>(null);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [kioskMode, setKioskMode] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(() => new Date());

  // Live clock + simulated real-time OEE telemetry every 2.5 seconds
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    if (!isLive) return;
    const simTimer = setInterval(() => {
      setDepartments((prev) => simulateTelemetryTick(prev));
    }, 2500);
    return () => clearInterval(simTimer);
  }, [isLive]);

  const snapshot = useMemo(
    () => computePlantSnapshot(departments, now),
    [departments, now]
  );

  const selectedDepartment = useMemo(
    () => departments.find((d) => d.id === selectedDepartmentId) ?? null,
    [departments, selectedDepartmentId]
  );

  const handleSelectNav = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'overview' || nav === 'workflow') {
      setCanvasTab(nav);
      setSelectedDepartmentId(null);
    }
  };

  const handleSelectDepartment = (id: DepartmentId) => {
    setSelectedDepartmentId(id);
    setActiveNav(id);
  };

  const handleResetSnapshot = () => {
    setDepartments(INITIAL_DEPARTMENTS);
    setNow(new Date());
  };

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-slate-900">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onSelectDepartment={handleSelectDepartment}
        kioskMode={kioskMode}
        onToggleKiosk={() => setKioskMode((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                CWT Production Monitor
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-medium text-slate-500">
                {snapshot.version}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              ภาพรวมการผลิต {snapshot.plantName} (Isometric OEE)
            </h1>
          </div>

          {/* Right Status & Quick Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-700">
              <Wifi className="w-3.5 h-3.5" />
              <span>เชื่อมต่อครบ · 2026-11-27</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 tabular-nums">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{snapshot.updatedAt} น.</span>
            </div>

            <button
              onClick={handleResetSnapshot}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
              title="รีเซ็ตค่าเริ่มต้นจาก CWT"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setKioskMode((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              title={kioskMode ? 'ออกจากโหมดจอ TV' : 'โหมดจอ TV (เต็มจอ)'}
            >
              {kioskMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ออกเต็มจอ</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">จอ TV</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-5 space-y-4 max-w-[1600px] w-full mx-auto">
          {/* Top KPI Summary Cards (A · P · Q + Donut + Output) */}
          <TopKpiStrip
            departments={snapshot.departments}
            selectedDepartmentId={selectedDepartmentId}
            onSelectDepartment={handleSelectDepartment}
          />

          {/* Main Isometric Factory Canvas Card */}
          <IsometricFactoryCanvas
            snapshot={snapshot}
            activeTab={canvasTab}
            onChangeTab={(tab) => {
              setCanvasTab(tab);
              setActiveNav(tab);
            }}
            selectedDepartmentId={selectedDepartmentId}
            onSelectDepartment={handleSelectDepartment}
            isLive={isLive}
            onToggleLive={() => setIsLive((prev) => !prev)}
          />
        </div>
      </main>

      {/* Station Drill-Down Drawer */}
      <StationDetailDrawer
        department={selectedDepartment}
        onClose={() => {
          setSelectedDepartmentId(null);
          setActiveNav(canvasTab);
        }}
      />
    </div>
  );
}
