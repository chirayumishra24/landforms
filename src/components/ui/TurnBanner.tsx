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
  actionPrompt = "Step up to the Smart Board to make your spatial decision!"
}) => {
  const currentTeam = teams[turnTeam];
  const isTerra = turnTeam === 'terraformers';

  return (
    <div className={`w-full mb-4 p-3.5 sm:p-4 rounded-3xl border-3 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] transition-all flex flex-wrap items-center justify-between gap-3 select-none ${
      isTerra
        ? 'bg-gradient-to-r from-blue-100 via-sky-50 to-white'
        : 'bg-gradient-to-r from-orange-100 via-amber-50 to-white'
    }`}>
      {/* Team Badge & Instruction */}
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-2xl border-2.5 border-slate-900 flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#0f172a] ${
          isTerra ? 'bg-blue-400' : 'bg-orange-400'
        }`}>
          {isTerra ? '🔵' : '🟠'}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${
              isTerra ? 'text-blue-950' : 'text-orange-950'
            }`}>
              {currentTeam.name}&apos;S TURN
            </span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0f172a] ${
              isTerra ? 'bg-blue-300 text-blue-950' : 'bg-orange-300 text-orange-950'
            }`}>
              SMART BOARD ACTIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-bold">
            {actionPrompt}
          </p>
        </div>
      </div>

      {/* Manual Turn Switch Button for Smart Board */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            soundEngine.playClick();
            onSwitchTurn();
          }}
          className="px-4 py-2 rounded-2xl bg-yellow-300 hover:bg-yellow-400 border-2.5 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] text-xs sm:text-sm font-black text-slate-950 flex items-center gap-1.5 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          title="Switch active turn to the other team"
        >
          <ArrowRightLeft className="w-4 h-4 text-slate-950" />
          <span>Pass Turn ➔ {isTerra ? 'Earthkeepers 🟠' : 'Terraformers 🔵'}</span>
        </button>
      </div>
    </div>
  );
};
