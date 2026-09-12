"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TeamId } from '@/types/game';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface TurnTimerProps {
  turnTeam: TeamId;
  onTimeout: () => void;
  defaultSeconds?: number;
  className?: string;
}

export const TurnTimer: React.FC<TurnTimerProps> = ({
  turnTeam,
  onTimeout,
  defaultSeconds = 40,
  className = ""
}) => {
  const [secondsLeft, setSecondsLeft] = useState(defaultSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const prevTurnTeam = useRef(turnTeam);

  // Reset timer on team turn switch
  useEffect(() => {
    if (prevTurnTeam.current !== turnTeam) {
      setSecondsLeft(defaultSeconds);
      setIsPaused(false);
      prevTurnTeam.current = turnTeam;
    }
  }, [turnTeam, defaultSeconds]);

  // Countdown effect
  useEffect(() => {
    if (isPaused) return;

    if (secondsLeft <= 0) {
      soundEngine.playTimeout();
      onTimeout();
      setSecondsLeft(defaultSeconds);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        const next = prev - 1;
        if (next <= 5 && next > 0) {
          soundEngine.playCountdownTick(next <= 3);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isPaused, defaultSeconds, onTimeout]);

  const percentage = Math.max(0, Math.min(100, (secondsLeft / defaultSeconds) * 100));
  const isUrgent = secondsLeft <= 8;

  const handleTogglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    setIsPaused(prev => !prev);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    setSecondsLeft(defaultSeconds);
  };

  return (
    <div
      className={`inline-flex items-center gap-2 bg-white border-2 border-slate-900 rounded-xl px-2.5 py-1 shadow-[2px_2px_0px_0px_#0f172a] select-none ${className}`}
      title={isPaused ? "Timer Paused" : `Turn Time Remaining: ${secondsLeft}s`}
    >
      <div className="flex items-center gap-1.5">
        <Timer className={`w-3.5 h-3.5 ${isUrgent ? 'text-rose-600 animate-spin' : 'text-slate-700'}`} />
        <span
          className={`font-mono font-black text-xs sm:text-sm tabular-nums transition-colors ${
            isUrgent ? 'text-rose-600 animate-pulse font-extrabold' : 'text-slate-900'
          }`}
        >
          {secondsLeft}s
        </span>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-10 sm:w-14 h-2 bg-slate-200 border border-slate-900 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isUrgent ? 'bg-rose-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Teacher Pause/Resume & Reset Controls */}
      <div className="flex items-center gap-0.5 border-l border-slate-300 pl-1.5">
        <button
          type="button"
          onClick={handleTogglePause}
          className="p-1 hover:bg-slate-100 rounded text-slate-800 transition active:scale-95"
          title={isPaused ? "Resume Shot Clock" : "Pause Shot Clock (Teacher Discussion)"}
        >
          {isPaused ? <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" /> : <Pause className="w-3 h-3 text-slate-700" />}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-1 hover:bg-slate-100 rounded text-slate-800 transition active:scale-95"
          title="Reset Turn Clock (+40s)"
        >
          <RotateCcw className="w-3 h-3 text-slate-600" />
        </button>
      </div>
    </div>
  );
};
