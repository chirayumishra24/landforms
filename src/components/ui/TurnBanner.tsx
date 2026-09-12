"use client";

import React from 'react';
import { TeamId, TeamState } from '@/types/game';
import { ArrowRightLeft, Sparkles, UserCheck } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  onSwitchTurn: () => void;
  actionPrompt?: string;
}

export const TurnBanner: React.FC<Props> = ({
  turnTeam,
  teams,
  onSwitchTurn,
  actionPrompt = "Step up to the Smart Board to answer or make this spatial decision!"
}) => {
  const currentTeam = teams[turnTeam];
  const isTerra = turnTeam === 'terraformers';

  return (
    <div className={`w-full mb-4 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 shadow-xl flex flex-wrap items-center justify-between gap-3 ${
      isTerra
        ? 'bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-slate-900 border-blue-400 ring-2 ring-blue-500/40'
        : 'bg-gradient-to-r from-orange-950/90 via-orange-900/70 to-slate-900 border-orange-400 ring-2 ring-orange-500/40'
    }`}>
      {/* Team Badge & Instruction */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg ${
          isTerra ? 'bg-blue-600' : 'bg-orange-600'
        }`}>
          {isTerra ? '🔵' : '🟠'}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${
              isTerra ? 'text-blue-300' : 'text-orange-300'
            }`}>
              {currentTeam.name}&apos;S TURN
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-extrabold animate-pulse">
              ACTIVE SQUAD
            </span>
          </div>
          <p className="text-xs text-slate-200 font-medium">
            {actionPrompt}
          </p>
        </div>
      </div>

      {/* Manual Turn Switch Button for Teacher/Smart Board */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            soundEngine.playClick();
            onSwitchTurn();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-white/20 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition shadow-sm active:scale-95 cursor-pointer"
          title="Switch active turn to the other team"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
          <span>Pass Turn ➔ {isTerra ? 'Earthkeepers' : 'Terraformers'}</span>
        </button>
      </div>
    </div>
  );
};
