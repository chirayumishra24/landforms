"use client";

import React, { useState } from 'react';
import { GameStage, TeamId, TeamState } from '@/types/game';
import { Volume2, VolumeX, RefreshCw, Compass, Trophy, HeartPulse, Sparkles, Maximize, Minimize } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  currentStage: GameStage;
  teams: Record<TeamId, TeamState>;
  turnTeam: TeamId;
  onSwitchTurn: () => void;
  regionHealth: number;
  completedMissions: string[];
  onReset: () => void;
  onNavigateMap: () => void;
}

export const TopScoreboard: React.FC<Props> = ({
  currentStage,
  teams,
  turnTeam,
  onSwitchTurn,
  regionHealth,
  completedMissions,
  onReset,
  onNavigateMap
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    soundEngine.playClick();
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const getStageTitle = (stage: GameStage) => {
    switch (stage) {
      case 'start': return 'Title Screen';
      case 'story': return 'The Legend Begins';
      case 'team_select': return 'Team Headquarters';
      case 'how_to_play': return 'Field Briefing';
      case 'map': return 'Regional Tactical Map';
      case 'mission_1': return 'Mission 1: Landform Explorer';
      case 'mission_2': return 'Mission 2: Life Adapts';
      case 'mission_3': return 'Mission 3: Build a Settlement';
      case 'mission_4': return 'Mission 4: Land & Livelihoods';
      case 'mission_5': return 'Mission 5: Geography Crisis';
      case 'blitz': return 'Bonus: Landform Blitz';
      case 'restore': return 'Final Challenge: Restore Region';
      case 'final_score': return 'Championship Results';
      case 'learning_summary': return 'Pedagogical Debrief';
      default: return 'Landform Legends';
    }
  };

  const isMinimal = currentStage === 'start';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b-3 border-slate-900 shadow-[0_4px_0px_0px_#0f172a] px-3 py-2 text-slate-900 transition-all select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Mission */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateMap}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 border-2.5 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all group"
            title="Open Interactive Map"
          >
            <Compass className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] tracking-wider uppercase font-black text-slate-900 block leading-tight">Class 6 Geography</span>
              <span className="font-black text-sm tracking-tight text-slate-950 block leading-tight">LANDFORM LEGENDS</span>
            </div>
          </button>

          {!isMinimal && (
            <div className="hidden md:flex items-center gap-2 bg-amber-100/80 px-3 py-1.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <span className="text-xs text-slate-700 font-bold">Phase:</span>
              <span className="text-xs font-black text-slate-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {getStageTitle(currentStage)}
              </span>
            </div>
          )}
        </div>

        {/* Scoreboards for Teams */}
        {!isMinimal && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Team Terraformers Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                if (turnTeam !== 'terraformers') onSwitchTurn();
              }}
              title="Click/Touch to activate Team Terraformers turn"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2.5 transition-all cursor-pointer ${
                turnTeam === 'terraformers'
                  ? 'bg-blue-100 border-blue-900 shadow-[4px_4px_0px_0px_#1e3a8a] scale-105'
                  : 'bg-white border-slate-400 opacity-80 hover:opacity-100 hover:border-blue-600 shadow-[2px_2px_0px_0px_#94a3b8]'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500 border-2 border-slate-900 flex items-center justify-center text-sm shadow-[1px_1px_0px_0px_#0f172a]">
                🔵
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black tracking-wider text-blue-900 uppercase">Team A • Terraformers</span>
                  {turnTeam === 'terraformers' ? (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-600 text-white font-black animate-pulse">ACTIVE TURN</span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">Tap turn</span>
                  )}
                </div>
                <div className="font-black text-sm sm:text-base text-slate-950 flex items-center gap-1">
                  ⭐ <span className="tabular-nums">{teams.terraformers.points.toLocaleString()}</span>
                  <span className="text-[10px] text-blue-700 font-bold">LP</span>
                </div>
              </div>
            </button>

            {/* Team Earthkeepers Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                if (turnTeam !== 'earthkeepers') onSwitchTurn();
              }}
              title="Click/Touch to activate Team Earthkeepers turn"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border-2.5 transition-all cursor-pointer ${
                turnTeam === 'earthkeepers'
                  ? 'bg-orange-100 border-orange-900 shadow-[4px_4px_0px_0px_#c2410c] scale-105'
                  : 'bg-white border-slate-400 opacity-80 hover:opacity-100 hover:border-orange-600 shadow-[2px_2px_0px_0px_#94a3b8]'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-orange-500 border-2 border-slate-900 flex items-center justify-center text-sm shadow-[1px_1px_0px_0px_#0f172a]">
                🟠
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black tracking-wider text-orange-900 uppercase">Team B • Earthkeepers</span>
                  {turnTeam === 'earthkeepers' ? (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-600 text-white font-black animate-pulse">ACTIVE TURN</span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">Tap turn</span>
                  )}
                </div>
                <div className="font-black text-sm sm:text-base text-slate-950 flex items-center gap-1">
                  ⭐ <span className="tabular-nums">{teams.earthkeepers.points.toLocaleString()}</span>
                  <span className="text-[10px] text-orange-700 font-bold">LP</span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Region Health & Controls */}
        <div className="flex items-center gap-2">
          {!isMinimal && (
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <HeartPulse className={`w-4 h-4 ${regionHealth >= 70 ? 'text-emerald-600 animate-pulse' : 'text-amber-600'}`} />
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-800 font-bold gap-2">
                  <span>HEALTH</span>
                  <span className="font-black text-emerald-700">{regionHealth}%</span>
                </div>
                <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-900">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 transition-all duration-500"
                    style={{ width: `${regionHealth}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-slate-950 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition flex items-center justify-center cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen (Smart Board)"}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 text-slate-950" />
            ) : (
              <Maximize className="w-4 h-4 text-slate-950" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-slate-900 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition cursor-pointer"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Reset Game */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] text-slate-900 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition cursor-pointer"
            title="Reset Game"
          >
            <RefreshCw className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
