"use client";

import React from 'react';
import { TeamId, TeamState } from '@/types/game';
import { ArrowRightLeft, Sparkles, UserCheck, Zap } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';
import { TurnTimer } from '@/components/ui/TurnTimer';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  onSwitchTurn: () => void;
  actionPrompt?: string;
  isStealActive?: boolean;
  showTimer?: boolean;
}

export const TurnBanner: React.FC<Props> = ({
  turnTeam,
  teams,
  onSwitchTurn,
  actionPrompt = "Step up to the Smart Board to make your spatial decision!",
  isStealActive = false,
  showTimer = true
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
            {isStealActive && (
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-black bg-rose-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] animate-bounce flex items-center gap-1">
                <Zap className="w-3 h-3 fill-yellow-300 text-slate-950" />
                STEAL CHANCE
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-bold">
            {actionPrompt}
          </p>
        </div>
      </div>

      {/* Timer & Turn Switch Controls */}
      <div className="flex items-center flex-wrap gap-2">
        {showTimer && (
          <TurnTimer
            turnTeam={turnTeam}
            onTimeout={onSwitchTurn}
            defaultSeconds={40}
          />
        )}

        <button
          onClick={() => {
            soundEngine.playClick();
            onSwitchTurn();
          }}
          className="px-4 py-2 rounded-2xl bg-yellow-300 hover:bg-yellow-400 border-2.5 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] text-xs sm:text-sm font-black text-slate-950 flex items-center gap-1.5 transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          title="Switch active turn to the other team"
        >
          <ArrowRightLeft className="w-4 h-4 text-slate-950" />
          <span>Pass Turn ➔ {isTerra ? 'Team B 🟠' : 'Team A 🔵'}</span>
        </button>
      </div>
    </div>
  );
};
