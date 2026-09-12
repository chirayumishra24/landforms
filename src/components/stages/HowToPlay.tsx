"use client";

import React from 'react';
import { ArrowRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onContinue: () => void;
}

export const HowToPlay: React.FC<Props> = ({ onContinue }) => {
  const steps = [
    {
      icon: "🗺️",
      title: "1. Explore the Map",
      desc: "Investigate Mountains, Plateaus, Plains, Valleys, and Coasts. Inspect elevation, slope, and climate conditions."
    },
    {
      icon: "🧠",
      title: "2. Solve Geography Challenges",
      desc: "Understand WHY certain human occupations, crops, and animals thrive in specific geographical environments."
    },
    {
      icon: "🏘️",
      title: "3. Build Settlements & Roads",
      desc: "Spend 100 Building Points wisely. Avoid steep landslide hazards and connect farms to marketplaces and deepwater ports."
    },
    {
      icon: "🌾",
      title: "4. Choose Suitable Livelihoods",
      desc: "Match agriculture, mining, fisheries, pastoralism, and tourism with the natural resource profile of the land."
    },
    {
      icon: "⚠️",
      title: "5. Respond to Regional Crises",
      desc: "Mitigate cyclones, floods, landslides, and droughts using sound ecological and geological planning."
    },
    {
      icon: "⭐",
      title: "6. Earn Life Points & Win",
      desc: "Accumulate Life Points (LP) for smart decisions. The squad with the highest geographical wisdom wins the trophy!"
    }
  ];

  const handleStart = () => {
    soundEngine.playClick();
    onContinue();
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white select-none">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>Mission Briefing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
            HOW TO PLAY & WIN
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Master the core cycle: <strong className="text-emerald-400">EXPLORE → DISCOVER → DECIDE → BUILD → ADAPT → WIN</strong>
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-800/70 border border-white/10 backdrop-blur-md hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col"
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="font-extrabold text-base text-white mb-1.5 flex items-center gap-2">
                <span>{step.title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scoring summary pill */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-white/10 mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">
              ⭐
            </div>
            <div>
              <div className="text-xs text-amber-300 font-bold uppercase">Reward System</div>
              <div className="text-sm font-semibold text-slate-200">Life Points awarded for correct choices, smart reasoning & environmental care!</div>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Missions 1-5 • Blitz • Final Restoration
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleStart}
            className="px-12 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-lg sm:text-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
          >
            <span>LET&apos;S GO!</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
