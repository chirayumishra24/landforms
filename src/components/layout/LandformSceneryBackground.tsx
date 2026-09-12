"use client";

import React from 'react';

export const LandformSceneryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Sky Gradient with Subtle Sunlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50/90" />

      {/* Subtle Dot Grid Texture Overlay */}
      <div className="absolute inset-0 bg-maximalist-dots opacity-40" />

      {/* Distant Snow-Capped Mountain Peaks */}
      <svg
        className="absolute bottom-0 w-full h-[65%] text-slate-400/50"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <polygon
          points="0,600 120,380 280,500 450,220 620,440 820,180 1020,420 1200,260 1350,450 1440,320 1440,600"
          fill="currentColor"
        />
        {/* Snowcaps on major peaks */}
        <polygon points="450,220 500,300 400,300" fill="#ffffff" opacity="0.9" />
        <polygon points="820,180 870,270 770,270" fill="#ffffff" opacity="0.9" />
        <polygon points="1200,260 1240,320 1160,320" fill="#ffffff" opacity="0.9" />
        <polygon points="120,380 150,420 90,420" fill="#ffffff" opacity="0.8" />
        <polygon points="1440,320 1440,380 1400,380" fill="#ffffff" opacity="0.8" />
      </svg>

      {/* Midground Elevated Plateaus & Forest Ridge */}
      <svg
        className="absolute bottom-0 w-full h-[45%] text-amber-300/40"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          d="M0,400 L0,220 L260,220 L350,290 L600,290 L750,190 L1050,190 L1150,270 L1440,240 L1440,400 Z"
          fill="currentColor"
        />
      </svg>

      {/* Foreground Lush Plains */}
      <svg
        className="absolute bottom-0 w-full h-[30%] text-emerald-400/40"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,300 Q360,180 720,240 T1440,200 L1440,300 Z"
          fill="currentColor"
        />
      </svg>

      {/* Coastal Bay Water Layer */}
      <svg
        className="absolute bottom-0 w-full h-[22%] text-cyan-500/40"
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
      >
        <path
          d="M0,250 C400,200 650,260 900,180 C1150,100 1350,220 1440,250 Z"
          fill="#0284c7"
          opacity="0.35"
        />
      </svg>

      {/* Floating Sparkles & Clouds */}
      <div className="absolute top-16 left-12 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-60" />
      <div className="absolute top-28 right-24 w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse opacity-70" />
      <div className="absolute bottom-40 left-1/4 w-3 h-3 rounded-full bg-emerald-400 animate-bounce opacity-60" />
      <div className="absolute top-36 left-2/3 w-2.5 h-2.5 rounded-full bg-sky-300 animate-ping opacity-50" />
    </div>
  );
};
