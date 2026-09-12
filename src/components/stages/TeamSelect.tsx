"use client";

import React, { useState } from 'react';
import { TeamId } from '@/types/game';
import { Compass, ShieldCheck, CheckCircle2, Users, UserCheck, Sparkles } from 'lucide-react';
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
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white select-none">
      <div className="max-w-5xl w-full mx-auto text-center">
        {/* Title */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 text-xs sm:text-sm font-black text-emerald-300 mb-4 border border-emerald-500/40 shadow-lg animate-pulse">
          <Users className="w-4 h-4" />
          <span>SMART BOARD CLASSROOM COMPETITION • 2 TEAMS ACTIVE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
          MEET THE TWO COMPETING TEAMS
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          This game is designed for the interactive smart board. Both teams will play simultaneously, alternating turns to answer challenges, place buildings, and restore the geographical region!
        </p>

        {/* 2 Teams Face-off Display with VS in Center */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch mb-10">
          {/* Team Terraformers Card */}
          <div className="rounded-3xl p-6 sm:p-8 border-2 text-left bg-gradient-to-b from-blue-900/50 via-blue-950/70 to-slate-900 border-blue-400 ring-4 ring-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl shadow-xl">
                  🗺️
                </div>
                <span className="text-xs px-3.5 py-1 rounded-full bg-blue-500/30 text-blue-200 font-extrabold border border-blue-400">
                  BLUE SQUAD
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">
                TEAM TERRAFORMERS
              </h3>
              <p className="text-sm font-bold text-blue-400 mb-4 tracking-wide">
                Explore • Plan • Build
              </p>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-blue-500/30 mb-4 flex items-center gap-3">
                <div className="text-4xl">🧑‍🎓</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-blue-300 block text-sm">Geography Planners</strong>
                  Equipped with topographic relief maps, contour surveying tools, and architectural grids.
                </div>
              </div>

              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 mb-4 font-medium">
                <li className="flex items-center gap-2">✓ Masters elevations, contours & slope gradients</li>
                <li className="flex items-center gap-2">✓ Plans optimal road corridors, canals & ports</li>
                <li className="flex items-center gap-2">✓ Strategic placement of settlements and farms</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-bold text-center">
              Active Team 1: Starts First Turn on Board
            </div>
          </div>

          {/* Central VS Badge */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black text-xl items-center justify-center shadow-2xl ring-4 ring-slate-950 border-2 border-white">
            VS
          </div>

          {/* Team Earthkeepers Card */}
          <div className="rounded-3xl p-6 sm:p-8 border-2 text-left bg-gradient-to-b from-orange-900/50 via-orange-950/70 to-slate-900 border-orange-400 ring-4 ring-orange-500/30 shadow-[0_0_50px_rgba(249,115,22,0.3)] relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-3xl shadow-xl">
                  🔭
                </div>
                <span className="text-xs px-3.5 py-1 rounded-full bg-orange-500/30 text-orange-200 font-extrabold border border-orange-400">
                  ORANGE SQUAD
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">
                TEAM EARTHKEEPERS
              </h3>
              <p className="text-sm font-bold text-orange-400 mb-4 tracking-wide">
                Observe • Adapt • Protect
              </p>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-orange-500/30 mb-4 flex items-center gap-3">
                <div className="text-4xl">🧑‍🌾</div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-orange-300 block text-sm">Environmental Guardians</strong>
                  Equipped with field binoculars, soil health monitors, and ecological telemetry sensors.
                </div>
              </div>

              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 mb-4 font-medium">
                <li className="flex items-center gap-2">✓ Understands ecosystem harmony & hazards</li>
                <li className="flex items-center gap-2">✓ Champions soil conservation, wetlands & mangroves</li>
                <li className="flex items-center gap-2">✓ Adapts human life sustainably to terrain</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-bold text-center">
              Active Team 2: Responds & Alternates Turn
            </div>
          </div>
        </div>

        {/* Big Smart Board Action Button */}
        <div className="mt-4">
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-lg sm:text-2xl shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.8)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto"
          >
            <span>START 2-TEAM SMART BOARD EXPEDITION</span>
            <span className="text-2xl">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
