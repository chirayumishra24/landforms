"use client";

import React, { useEffect } from 'react';
import { TeamId, TeamState } from '@/types/game';
import { soundEngine } from '@/utils/soundEngine';
import { Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  isOpen: boolean;
  onClose: () => void;
}

export const TurnTransitionOverlay: React.FC<Props> = ({
  turnTeam,
  teams,
  isOpen,
  onClose
}) => {
  const isTerra = turnTeam === 'terraformers';
  const team = teams[turnTeam];

  useEffect(() => {
    if (isOpen) {
      soundEngine.playTurnChange(turnTeam);
      const timer = setTimeout(() => {
        onClose();
      }, 1900);
      return () => clearTimeout(timer);
    }
  }, [isOpen, turnTeam, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm cursor-pointer select-none transition-all duration-300 animate-fade-in"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`relative max-w-xl w-full p-6 sm:p-10 rounded-3xl border-4 border-slate-950 text-center shadow-[12px_12px_0px_0px_#0f172a] animate-turn-pop overflow-hidden ${
          isTerra
            ? 'bg-gradient-to-b from-sky-100 via-blue-50 to-white'
            : 'bg-gradient-to-b from-amber-100 via-orange-50 to-white'
        }`}
      >
        {/* Decorative Background Accents */}
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-yellow-300/40 blur-xl pointer-events-none" />
        <div className={`absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-xl pointer-events-none ${
          isTerra ? 'bg-blue-300/40' : 'bg-orange-300/40'
        }`} />

        {/* Top Header Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-300 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-widest mb-4 border-2.5 border-slate-950 shadow-[3px_3px_0px_0px_#0f172a]">
          <Sparkles className="w-4 h-4 text-amber-800 animate-spin" />
          <span>SMART BOARD TURN SWITCH</span>
        </div>

        {/* Animated Avatar / Emblem */}
        <div className="flex items-center justify-center mb-4">
          <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-3.5 border-slate-950 flex items-center justify-center text-5xl sm:text-6xl shadow-[5px_5px_0px_0px_#0f172a] animate-bounce ${
            isTerra
              ? 'bg-gradient-to-tr from-blue-500 to-sky-400 text-white'
              : 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white'
          }`}>
            <span>{isTerra ? '🗺️' : '🔭'}</span>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white border-2 border-slate-950 flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_#0f172a]">
              {isTerra ? '🔵' : '🟠'}
            </div>
          </div>
        </div>

        {/* Giant Announcement Title */}
        <div className="mb-2">
          <h2 className={`text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none drop-shadow-sm ${
            isTerra ? 'text-blue-950' : 'text-orange-950'
          }`}>
            {isTerra ? "TEAM A'S TURN!" : "TEAM B'S TURN!"}
          </h2>
        </div>

        {/* Subtitle Pill */}
        <div className="inline-block mb-4">
          <span className={`px-4 py-1 rounded-2xl text-xs sm:text-sm font-black border-2 border-slate-950 shadow-[2px_2px_0px_0px_#0f172a] ${
            isTerra ? 'bg-blue-300 text-blue-950' : 'bg-orange-300 text-orange-950'
          }`}>
            {team.name}
          </span>
        </div>

        {/* Strategic Motto / Prompt */}
        <p className="text-slate-800 text-sm sm:text-base font-extrabold max-w-md mx-auto mb-6 leading-relaxed">
          {isTerra
            ? 'Step up to the Smart Board! Explore landforms, plan regional settlements & build trade arteries!'
            : 'Step up to the Smart Board! Discover animal adaptations, protect ecosystems & resolve geography crises!'}
        </p>

        {/* Dismiss Touch Prompt */}
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-black text-sm shadow-[4px_4px_0px_0px_#facc15] flex items-center justify-center gap-2 mx-auto cursor-pointer transition active:translate-x-0.5 active:translate-y-0.5"
        >
          <span>TAP TO START TURN</span>
          <ArrowRight className="w-4 h-4 text-yellow-300" />
        </button>
      </div>
    </div>
  );
};
