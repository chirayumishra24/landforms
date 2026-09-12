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
      case 'restore': return 'Final Challenge: Restore the Region';
      case 'final_score': return 'Championship Results';
      case 'learning_summary': return 'Pedagogical Debrief';
      default: return 'Landform Legends';
    }
  };

  // If at very start or story, keep it sleek
  const isMinimal = currentStage === 'start';

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg px-3 py-2 text-white transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Mission */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateMap}
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 transition shadow-sm group"
            title="Open Interactive Map"
          >
            <Compass className="w-5 h-5 text-emerald-200 group-hover:rotate-45 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-200 block leading-tight">Class 6 Geography</span>
              <span className="font-extrabold text-sm tracking-tight text-white block leading-tight">LANDFORM LEGENDS</span>
            </div>
          </button>

          {!isMinimal && (
            <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-xl border border-white/5">
              <span className="text-xs text-slate-400 font-medium">Status:</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {getStageTitle(currentStage)}
              </span>
            </div>
          )}
        </div>

        {/* Scoreboards for Teams */}
        {!isMinimal && (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Team Terraformers Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                if (turnTeam !== 'terraformers') onSwitchTurn();
              }}
              title="Click/Touch to activate Team Terraformers turn"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                turnTeam === 'terraformers'
                  ? 'bg-blue-600/35 border-blue-400 ring-2 ring-blue-500/60 shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-slate-800/60 border-blue-900/50 opacity-75 hover:opacity-100 hover:border-blue-400'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-sm shadow">
                🔵
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black tracking-wider text-blue-300 uppercase">Terraformers</span>
                  {turnTeam === 'terraformers' ? (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500 text-white font-extrabold animate-pulse">ACTIVE TURN</span>
                  ) : (
                    <span className="text-[9px] px-1 py-0.2 rounded-full bg-slate-700 text-slate-300">Tap to play</span>
                  )}
                </div>
                <div className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1">
                  ⭐ <span className="tabular-nums">{teams.terraformers.points.toLocaleString()}</span>
                  <span className="text-[10px] text-blue-200 font-normal">LP</span>
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                turnTeam === 'earthkeepers'
                  ? 'bg-orange-600/35 border-orange-400 ring-2 ring-orange-500/60 shadow-lg shadow-orange-500/30 scale-105'
                  : 'bg-slate-800/60 border-orange-900/50 opacity-75 hover:opacity-100 hover:border-orange-400'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-sm shadow">
                🟠
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black tracking-wider text-orange-300 uppercase">Earthkeepers</span>
                  {turnTeam === 'earthkeepers' ? (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-orange-500 text-white font-extrabold animate-pulse">ACTIVE TURN</span>
                  ) : (
                    <span className="text-[9px] px-1 py-0.2 rounded-full bg-slate-700 text-slate-300">Tap to play</span>
                  )}
                </div>
                <div className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1">
                  ⭐ <span className="tabular-nums">{teams.earthkeepers.points.toLocaleString()}</span>
                  <span className="text-[10px] text-orange-200 font-normal">LP</span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Region Health & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isMinimal && (
            <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-xl border border-white/5">
              <HeartPulse className={`w-4 h-4 ${regionHealth >= 70 ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-300 gap-2">
                  <span>REGION HEALTH</span>
                  <span className="font-bold text-emerald-400">{regionHealth}%</span>
                </div>
                <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 transition-all duration-500"
                    style={{ width: `${regionHealth}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Fullscreen Button for Smart Board */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white transition flex items-center justify-center shadow-sm"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen (Smart Board)"}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 text-amber-400" />
            ) : (
              <Maximize className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white transition"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Reset Game */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white transition"
            title="Reset Game"
          >
            <RefreshCw className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
