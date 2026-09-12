"use client";

import React, { useState } from 'react';
import { RestorationTask } from '@/types/game';
import { CheckCircle2, RefreshCw, Trophy, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  restorationTasks: RestorationTask[];
  onCompleteTask: (taskId: string) => void;
  onFinishGame: () => void;
}

export const RestoreRegion: React.FC<Props> = ({
  restorationTasks,
  onCompleteTask,
  onFinishGame
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100
  const [activeTaskId, setActiveTaskId] = useState<string>(restorationTasks[0]?.id || 'restore_1');

  const completedCount = restorationTasks.filter(t => t.isComplete).length;
  const isAllComplete = completedCount === restorationTasks.length;

  const currentTask = restorationTasks.find(t => t.id === activeTaskId) || restorationTasks[0];

  const handleExecuteTask = (task: RestorationTask) => {
    soundEngine.playPlacement();
    onCompleteTask(task.id);
    if (completedCount + 1 === restorationTasks.length) {
      soundEngine.playVictoryFanfare();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 text-slate-900 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b-2 border-slate-900/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-300 text-slate-900 text-xs font-black uppercase tracking-wider mb-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <Trophy className="w-3.5 h-3.5 text-amber-800" />
              <span>Grand Finale Challenge</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>🏆 FINAL CHALLENGE: RESTORE THE REGION</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Fix geographical blunders. Relocate settlements, rebuild arteries, stabilize hill slopes, and balance ecosystems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2 border-slate-900 px-4 py-2 rounded-2xl shadow-[3px_3px_0px_0px_#0f172a] flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Restored:</span>
              <span className="text-sm font-black text-emerald-600">{completedCount} / 5 Tasks</span>
            </div>

            <button
              onClick={() => { soundEngine.playClick(); onFinishGame(); }}
              className={`px-5 py-2.5 rounded-2xl border-2.5 border-slate-900 font-black text-xs sm:text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
                isAllComplete
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 animate-bounce'
                  : 'bg-white hover:bg-amber-100 text-slate-900'
              }`}
            >
              <span>{isAllComplete ? "VIEW FINAL CHAMPIONSHIP RESULTS ➔" : "PROCEED TO FINAL RESULTS ➔"}</span>
            </button>
          </div>
        </div>

        {/* Interactive Before & After Visual Slider + Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Before & After Territory Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] bg-slate-900">
              {/* BEFORE LAYER: Degraded, eroded, muddy, barren */}
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-amber-950 to-stone-950">
                <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
                  {/* Brown barren mountains */}
                  <polygon points="50,220 180,90 300,240" fill="#78716c" />
                  <polygon points="170,240 330,60 480,260" fill="#57534e" />
                  {/* Murky sludge river */}
                  <path d="M 230,220 Q 300,340 450,380 T 750,450" fill="none" stroke="#713f12" strokeWidth="18" />
                  {/* Eroded barren slopes */}
                  <text x="180" y="240" fontSize="24">⚠️</text>
                  <text x="320" y="260" fontSize="20">🪨</text>
                  <text x="440" y="360" fontSize="24">🥀</text>
                  <text x="260" y="320" fontSize="22">🏚️</text>
                  <text x="560" y="420" fontSize="24">🌊</text>
                </svg>
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-xl bg-red-950/80 border border-red-500/40 text-xs font-black text-red-300 uppercase">
                  BEFORE: Degraded Landscape
                </div>
              </div>

              {/* AFTER LAYER (Revealed by Slider): Lush green, clean river, thriving community */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="absolute inset-0 w-[800px] h-[500px] sm:w-[1000px] sm:h-[600px] bg-gradient-to-b from-sky-900 via-emerald-950 to-teal-950">
                  <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
                    {/* Snowcapped peaks */}
                    <polygon points="50,220 180,90 300,240" fill="#64748b" />
                    <polygon points="180,90 200,130 160,130" fill="#ffffff" />
                    <polygon points="170,240 330,60 480,260" fill="#475569" />
                    <polygon points="330,60 360,110 300,110" fill="#ffffff" />
                    {/* Clean blue river */}
                    <path d="M 230,220 Q 300,340 450,380 T 750,450" fill="none" stroke="#38bdf8" strokeWidth="18" />
                    {/* Thriving farms, settlements, trees */}
                    <text x="200" y="230" fontSize="22">🌲</text>
                    <text x="240" y="240" fontSize="22">🌲</text>
                    <text x="320" y="360" fontSize="24">🌾</text>
                    <text x="380" y="370" fontSize="24">🌾</text>
                    <text x="240" y="360" fontSize="24">🏘️</text>
                    <text x="480" y="360" fontSize="22">🛣️</text>
                    <text x="640" y="440" fontSize="24">🌳</text>
                    <text x="700" y="460" fontSize="24">🚢</text>
                  </svg>
                  <div className="absolute bottom-3 left-4 px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-black text-emerald-300 uppercase">
                    AFTER: Restored & Thriving
                  </div>
                </div>
              </div>

              {/* Slider Handle Divider */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize z-30"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center font-bold text-xs">
                  ⇆
                </div>
              </div>

              {/* Transparent Slider Input Control */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
              />
            </div>

            <div className="text-center text-xs text-slate-600 font-bold">
              ↔️ Drag slider left & right to view the transformation from Degraded ➔ Restored!
            </div>
          </div>

          {/* Right: 5 Actionable Restoration Tasks (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] text-xs font-black text-slate-800 flex items-center justify-between">
              <span>Restoration Action Items</span>
              <span className="text-emerald-700 bg-emerald-100 border border-emerald-500 px-2 py-0.5 rounded-full font-black">Execute all 5 to complete</span>
            </div>

            <div className="space-y-2.5">
              {restorationTasks.map((task) => {
                const isSelected = activeTaskId === task.id;

                return (
                  <div
                    key={task.id}
                    onClick={() => { soundEngine.playClick(); setActiveTaskId(task.id); }}
                    className={`p-4 rounded-2xl border-2.5 transition-all cursor-pointer ${
                      task.isComplete
                        ? 'bg-emerald-50 border-emerald-500 shadow-[3px_3px_0px_0px_#10b981]'
                        : isSelected
                        ? 'bg-amber-50 border-slate-900 ring-2 ring-amber-400 shadow-[4px_4px_0px_0px_#0f172a]'
                        : 'bg-white border-slate-900/30 hover:border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{task.icon}</span>
                        <h4 className="font-black text-xs sm:text-sm text-slate-900">{task.title}</h4>
                      </div>
                      {task.isComplete ? (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-black border border-emerald-600 flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Fixed
                        </span>
                      ) : (
                        <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-300 text-slate-900 border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]">+{task.points} LP</span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                      {task.isComplete ? task.solutionExplanation : task.problem}
                    </p>

                    {!task.isComplete && isSelected && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleExecuteTask(task); }}
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 border-2 border-slate-900 text-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] transition transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-1.5"
                      >
                        <span>{task.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
