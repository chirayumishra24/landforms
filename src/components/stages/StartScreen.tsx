"use client";

import React from 'react';
import { Compass, Sparkles, Map, Mountain, TreePine, Droplets, Trophy, Users } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onStart: () => void;
}

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  const handleStart = () => {
    soundEngine.playClick();
    onStart();
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-900 via-teal-950 to-slate-950 text-white select-none">
      {/* Background Illustrated Terrain Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {/* Distant Mountain Peaks */}
        <svg className="absolute bottom-0 w-full h-[65%] text-slate-800/60" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <polygon points="0,600 120,380 280,500 450,220 620,440 820,180 1020,420 1200,260 1350,450 1440,320 1440,600" fill="currentColor" />
          <polygon points="450,220 500,300 400,300" fill="#ffffff" opacity="0.4" />
          <polygon points="820,180 870,270 770,270" fill="#ffffff" opacity="0.4" />
        </svg>

        {/* Midground Plateau & Forests */}
        <svg className="absolute bottom-0 w-full h-[45%] text-amber-950/40" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0,400 L0,220 L260,220 L350,290 L600,290 L750,190 L1050,190 L1150,270 L1440,240 L1440,400 Z" fill="currentColor" />
        </svg>

        {/* Foreground Lush Plains, Meandering River, and Coastal Bay */}
        <svg className="absolute bottom-0 w-full h-[32%] text-emerald-900/50" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,300 Q360,180 720,240 T1440,200 L1440,300 Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 w-full h-[25%] text-cyan-900/60" viewBox="0 0 1440 250" preserveAspectRatio="none">
          <path d="M0,250 C400,200 650,260 900,180 C1150,100 1350,220 1440,250 Z" fill="#0369a1" opacity="0.5" />
        </svg>
      </div>

      {/* Floating Sparkle Particles */}
      <div className="absolute top-16 left-12 w-2 h-2 rounded-full bg-cyan-300 animate-ping opacity-75" />
      <div className="absolute top-28 right-24 w-3 h-3 rounded-full bg-amber-300 animate-pulse opacity-80" />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-emerald-300 animate-bounce opacity-70" />

      {/* Hero Header Slogan Banner */}
      <div className="relative z-10 pt-6 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-emerald-300 shadow-lg animate-float">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Different Land. Different Lives. A Brighter Tomorrow.</span>
        </div>
      </div>

      {/* Central Hero Block */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 text-center flex flex-col items-center">
        {/* Title Badge */}
        <div className="relative mb-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-100 to-sky-300">
              LANDFORM
            </span>
            <br className="sm:hidden" />
            <span className="ml-0 sm:ml-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400">
              LEGENDS
            </span>
          </h1>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-teal-200 mt-2">
            Shape the Land. Shape Life.
          </div>
        </div>

        <p className="max-w-2xl text-slate-200 text-sm sm:text-base md:text-lg mt-3 font-normal leading-relaxed drop-shadow">
          Explore how mountains, plateaus, plains, valleys, and coasts shape where people settle, what they grow, how they travel, and how nature adapts.
        </p>

        {/* Feature Badges matching storyboard */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 my-8 max-w-3xl w-full">
          {[
            { label: 'Explore', icon: '🧭', color: 'from-blue-500/30 to-blue-700/30 border-blue-400/40 text-blue-200' },
            { label: 'Plan', icon: '📐', color: 'from-teal-500/30 to-teal-700/30 border-teal-400/40 text-teal-200' },
            { label: 'Build', icon: '🏗️', color: 'from-amber-500/30 to-amber-700/30 border-amber-400/40 text-amber-200' },
            { label: 'Adapt', icon: '🌿', color: 'from-emerald-500/30 to-emerald-700/30 border-emerald-400/40 text-emerald-200' },
            { label: 'Compete', icon: '🏆', color: 'from-orange-500/30 to-orange-700/30 border-orange-400/40 text-orange-200' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl bg-gradient-to-b ${item.color} border backdrop-blur-md shadow-lg transition-transform hover:scale-105`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{item.icon}</span>
              <span className="text-xs sm:text-sm font-bold tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            onClick={handleStart}
            className="group relative px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-lg sm:text-xl tracking-wide shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.8)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
          >
            <span>START JOURNEY</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">➔</span>
          </button>
        </div>

        {/* Landform Signpost Ribbons */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-300">
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">🏔️ Mountains</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">🟫 Plateaus</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">🟩 Plains</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">🏞️ Valleys</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">🌊 Coasts</span>
        </div>
      </div>

      {/* Footer credits */}
      <footer className="relative z-10 py-3 px-4 bg-slate-950/80 backdrop-blur-md border-t border-white/5 text-center text-xs text-slate-400 flex flex-wrap items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span>🌍 Class 6 Geography Interactive Simulation</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>LAND → CONDITIONS → LIFE → HUMAN ACTIVITIES</span>
        </div>
      </footer>
    </div>
  );
};
