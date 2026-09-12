"use client";

import React, { useEffect } from 'react';
import { TeamId, TeamState } from '@/types/game';
import confetti from 'canvas-confetti';
import { Trophy, Award, Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  teams: Record<TeamId, TeamState>;
  onContinue: () => void;
  onPlayAgain: () => void;
}

export const FinalScore: React.FC<Props> = ({
  teams,
  onContinue,
  onPlayAgain
}) => {
  const terra = teams.terraformers;
  const keeper = teams.earthkeepers;

  const winner: TeamState = terra.points >= keeper.points ? terra : keeper;
  const isTie = terra.points === keeper.points;

  useEffect(() => {
    soundEngine.playVictoryFanfare();

    // Launch Confetti
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f97316', '#06b6d4', '#84cc16', '#a855f7']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  // Format percentages for radar/breakdown
  const getPercentage = (val: number, maxVal = 600) => {
    return Math.min(Math.round((val / maxVal) * 100) + 75, 98);
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center select-none">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Winner Announcement Trophy Banner */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-amber-500/40 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Championship Trophy Awarded</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-2">
            🏆 {isTie ? "IT'S A HISTORIC TIE!" : `${winner.name.toUpperCase()} WINS!`}
          </h2>
          <p className="text-emerald-300 text-base sm:text-xl font-bold italic max-w-xl mx-auto">
            &quot;You understood how land shapes life. Different land. Different life.&quot;
          </p>
        </div>

        {/* Head to Head Team Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {/* Team Terraformers Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border-2 text-left transition-all ${
            winner.id === 'terraformers'
              ? 'bg-gradient-to-b from-blue-900/60 to-blue-950/80 border-blue-400 ring-4 ring-blue-500/30 shadow-2xl shadow-blue-500/20'
              : 'bg-slate-900/80 border-slate-700/60'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🗺️</span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold">
                TEAM TERRAFORMERS
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white mb-4 flex items-center gap-2">
              ⭐ <span className="tabular-nums">{terra.points.toLocaleString()}</span>
              <span className="text-sm font-normal text-blue-300">LIFE POINTS</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Landform Knowledge</span>
                  <span className="font-bold text-blue-300">{getPercentage(terra.stats.knowledge)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${getPercentage(terra.stats.knowledge)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Spatial Planning</span>
                  <span className="font-bold text-blue-300">{getPercentage(terra.stats.planning)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${getPercentage(terra.stats.planning)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Environmental Adaptation</span>
                  <span className="font-bold text-blue-300">{getPercentage(terra.stats.adaptation)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${getPercentage(terra.stats.adaptation)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Hazard Decision Making</span>
                  <span className="font-bold text-blue-300">{getPercentage(terra.stats.decisions)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${getPercentage(terra.stats.decisions)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Team Earthkeepers Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border-2 text-left transition-all ${
            winner.id === 'earthkeepers'
              ? 'bg-gradient-to-b from-orange-900/60 to-orange-950/80 border-orange-400 ring-4 ring-orange-500/30 shadow-2xl shadow-orange-500/20'
              : 'bg-slate-900/80 border-slate-700/60'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🔭</span>
              <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-bold">
                TEAM EARTHKEEPERS
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white mb-4 flex items-center gap-2">
              ⭐ <span className="tabular-nums">{keeper.points.toLocaleString()}</span>
              <span className="text-sm font-normal text-orange-300">LIFE POINTS</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Landform Knowledge</span>
                  <span className="font-bold text-orange-300">{getPercentage(keeper.stats.knowledge)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${getPercentage(keeper.stats.knowledge)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Spatial Planning</span>
                  <span className="font-bold text-orange-300">{getPercentage(keeper.stats.planning)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${getPercentage(keeper.stats.planning)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Environmental Adaptation</span>
                  <span className="font-bold text-orange-300">{getPercentage(keeper.stats.adaptation)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${getPercentage(keeper.stats.adaptation)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Hazard Decision Making</span>
                  <span className="font-bold text-orange-300">{getPercentage(keeper.stats.decisions)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${getPercentage(keeper.stats.decisions)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => { soundEngine.playClick(); onPlayAgain(); }}
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play New Expedition</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); onContinue(); }}
            className="px-10 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-sm sm:text-base shadow-xl flex items-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            <span>WHAT DID WE DISCOVER? (LEARNING SUMMARY)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
