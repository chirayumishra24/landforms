"use client";

import React from 'react';
import { Users } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onContinue: () => void;
}

export const TeamSelect: React.FC<Props> = ({ onContinue }) => {
  const handleProceed = () => {
    soundEngine.playVictoryFanfare();
    onContinue();
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-transparent text-slate-900 select-none">
      <div className="max-w-5xl w-full mx-auto text-center">
        {/* Title Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-300 text-xs sm:text-sm font-black text-slate-950 mb-4 border-2.5 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
          <Users className="w-4 h-4" />
          <span>SMART BOARD CLASSROOM COMPETITION • 2 TEAMS ACTIVE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 mb-3">
          MEET THE TWO COMPETING TEAMS
        </h2>
        <p className="text-slate-800 text-sm sm:text-base font-bold max-w-2xl mx-auto mb-8">
          This game is designed for the interactive smart board. Both teams will play simultaneously, alternating turns to answer challenges, place buildings, and restore the geographical region!
        </p>

        {/* 2 Teams Face-off Display with VS in Center */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch mb-8">
          {/* Team Terraformers Card */}
          <div className="rounded-3xl p-6 sm:p-8 border-3 border-slate-900 text-left bg-blue-50 shadow-[6px_6px_0px_0px_#1e3a8a] relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500 border-2.5 border-slate-900 flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_#0f172a]">
                  🗺️
                </div>
                <span className="text-xs px-3.5 py-1 rounded-full bg-blue-200 text-blue-950 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                  BLUE SQUAD
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">
                TEAM TERRAFORMERS
              </h3>
              <p className="text-sm font-black text-blue-800 mb-4 tracking-wide">
                Explore • Plan • Build
              </p>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] mb-4 flex items-center gap-3">
                <div className="text-4xl">🧑‍🎓</div>
                <div className="text-xs text-slate-800 font-bold leading-relaxed">
                  <strong className="text-blue-900 block text-sm font-black">Geography Planners</strong>
                  Equipped with topographic relief maps, contour surveying tools, and architectural grids.
                </div>
              </div>

              <ul className="text-xs sm:text-sm text-slate-800 space-y-2 mb-4 font-bold">
                <li className="flex items-center gap-2">✓ Masters elevations, contours & slope gradients</li>
                <li className="flex items-center gap-2">✓ Plans optimal road corridors, canals & ports</li>
                <li className="flex items-center gap-2">✓ Strategic placement of settlements and farms</li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-blue-200 border-2 border-slate-900 text-blue-950 text-xs font-black text-center shadow-[2px_2px_0px_0px_#0f172a]">
              Active Team 1: Starts First Turn on Board
            </div>
          </div>

          {/* Central VS Badge */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-yellow-300 text-slate-950 font-black text-xl items-center justify-center shadow-[4px_4px_0px_0px_#0f172a] border-3 border-slate-900">
            VS
          </div>

          {/* Team Earthkeepers Card */}
          <div className="rounded-3xl p-6 sm:p-8 border-3 border-slate-900 text-left bg-orange-50 shadow-[6px_6px_0px_0px_#c2410c] relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-500 border-2.5 border-slate-900 flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_#0f172a]">
                  🔭
                </div>
                <span className="text-xs px-3.5 py-1 rounded-full bg-orange-200 text-orange-950 font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                  ORANGE SQUAD
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-1">
                TEAM EARTHKEEPERS
              </h3>
              <p className="text-sm font-black text-orange-800 mb-4 tracking-wide">
                Observe • Adapt • Protect
              </p>

              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] mb-4 flex items-center gap-3">
                <div className="text-4xl">🧑‍🌾</div>
                <div className="text-xs text-slate-800 font-bold leading-relaxed">
                  <strong className="text-orange-900 block text-sm font-black">Ecological Stewards</strong>
                  Monitors environmental carrying capacity, soil protection, and wildlife corridors.
                </div>
              </div>

              <ul className="text-xs sm:text-sm text-slate-800 space-y-2 mb-4 font-bold">
                <li className="flex items-center gap-2">✓ Protects fragile mountain and forest ecosystems</li>
                <li className="flex items-center gap-2">✓ Balances human occupation with ecological sustainability</li>
                <li className="flex items-center gap-2">✓ Responds swiftly to floods, droughts & cyclones</li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-orange-200 border-2 border-slate-900 text-orange-950 text-xs font-black text-center shadow-[2px_2px_0px_0px_#0f172a]">
              Active Team 2: Takes Alternate Turns
            </div>
          </div>
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleProceed}
          className="px-10 sm:px-14 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 border-3 border-slate-900 text-slate-950 font-black text-lg sm:text-xl shadow-[6px_6px_0px_0px_#0f172a] transition-all transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          ENTER FIELD BRIEFING ➔
        </button>
      </div>
    </div>
  );
};
