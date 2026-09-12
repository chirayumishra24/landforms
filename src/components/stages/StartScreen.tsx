"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
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
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 text-slate-900 select-none">
      {/* Background Illustrated Terrain Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {/* Distant Mountain Peaks */}
        <svg className="absolute bottom-0 w-full h-[65%] text-slate-400/50" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <polygon points="0,600 120,380 280,500 450,220 620,440 820,180 1020,420 1200,260 1350,450 1440,320 1440,600" fill="currentColor" />
          <polygon points="450,220 500,300 400,300" fill="#ffffff" opacity="0.8" />
          <polygon points="820,180 870,270 770,270" fill="#ffffff" opacity="0.8" />
        </svg>

        {/* Midground Plateau & Forests */}
        <svg className="absolute bottom-0 w-full h-[45%] text-amber-300/40" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0,400 L0,220 L260,220 L350,290 L600,290 L750,190 L1050,190 L1150,270 L1440,240 L1440,400 Z" fill="currentColor" />
        </svg>

        {/* Foreground Lush Plains and Coastal Bay */}
        <svg className="absolute bottom-0 w-full h-[30%] text-emerald-400/40" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,300 Q360,180 720,240 T1440,200 L1440,300 Z" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 w-full h-[22%] text-cyan-500/50" viewBox="0 0 1440 250" preserveAspectRatio="none">
          <path d="M0,250 C400,200 650,260 900,180 C1150,100 1350,220 1440,250 Z" fill="#0284c7" opacity="0.4" />
        </svg>
      </div>

      {/* Floating Sparkle Particles */}
      <div className="absolute top-16 left-12 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
      <div className="absolute top-28 right-24 w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse opacity-80" />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full bg-emerald-400 animate-bounce opacity-70" />

      {/* Hero Header Slogan Banner */}
      <div className="relative z-10 pt-6 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-slate-900 text-xs sm:text-sm font-black text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] animate-float">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Different Land. Different Lives. A Brighter Tomorrow.</span>
        </div>
      </div>

      {/* Central Hero Block */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 text-center flex flex-col items-center">
        {/* Title Badge */}
        <div className="relative mb-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight">
            <span className="text-emerald-600 drop-shadow-[4px_4px_0px_#0f172a]">
              LANDFORM
            </span>
            <br className="sm:hidden" />
            <span className="ml-0 sm:ml-4 text-amber-500 drop-shadow-[4px_4px_0px_#0f172a]">
              LEGENDS
            </span>
          </h1>
          <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide text-slate-950 mt-3 drop-shadow-[1px_1px_0px_#ffffff]">
            Shape the Land. Shape Life.
          </div>
        </div>

        <p className="max-w-2xl text-slate-800 text-sm sm:text-base md:text-lg mt-3 font-bold leading-relaxed">
          Explore how mountains, plateaus, plains, valleys, and coasts shape where people settle, what they grow, how they travel, and how nature adapts.
        </p>

        {/* Feature Badges matching storyboard */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 my-8 max-w-3xl w-full">
          {[
            { label: 'Explore', icon: '🧭', bg: 'bg-blue-100 text-blue-950 border-blue-900' },
            { label: 'Plan', icon: '📐', bg: 'bg-teal-100 text-teal-950 border-teal-900' },
            { label: 'Build', icon: '🏗️', bg: 'bg-amber-100 text-amber-950 border-amber-900' },
            { label: 'Adapt', icon: '🌿', bg: 'bg-emerald-100 text-emerald-950 border-emerald-900' },
            { label: 'Compete', icon: '🏆', bg: 'bg-rose-100 text-rose-950 border-rose-900' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl ${item.bg} border-2.5 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] transition-transform hover:-translate-y-1`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{item.icon}</span>
              <span className="text-xs sm:text-sm font-black tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-1">
          <button
            onClick={handleStart}
            className="group relative px-10 sm:px-14 py-4 rounded-2xl bg-yellow-300 hover:bg-yellow-400 border-3 border-slate-900 text-slate-950 font-black text-xl sm:text-2xl tracking-wide shadow-[6px_6px_0px_0px_#0f172a] hover:shadow-[7px_7px_0px_0px_#0f172a] transition-all transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-3 cursor-pointer"
          >
            <span>START JOURNEY</span>
            <span className="text-2xl group-hover:translate-x-1.5 transition-transform">➔</span>
          </button>
        </div>

        {/* Landform Signpost Ribbons */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-black text-slate-900">
          <span className="px-3 py-1 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">🏔️ Mountains</span>
          <span className="px-3 py-1 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">🟫 Plateaus</span>
          <span className="px-3 py-1 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">🟩 Plains</span>
          <span className="px-3 py-1 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">🏞️ Valleys</span>
          <span className="px-3 py-1 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">🌊 Coasts</span>
        </div>
      </div>

      {/* Footer credits */}
      <footer className="relative z-10 py-3 px-4 bg-white/90 backdrop-blur-md border-t-2 border-slate-900 text-center text-xs text-slate-800 font-bold flex flex-wrap items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span>🌍 Class 6 Geography Interactive Simulation</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-600 font-black">
          <span>LAND → CONDITIONS → LIFE → HUMAN ACTIVITIES</span>
        </div>
      </footer>
    </div>
  );
};
