"use client";

import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onContinue: () => void;
}

export const HowToPlay: React.FC<Props> = ({ onContinue }) => {
  const steps = [
    {
      icon: "🗺️",
      title: "1. Explore the Map",
      desc: "Investigate Mountains, Plateaus, Plains, Valleys, and Coasts. Inspect elevation, slope, and climate conditions.",
      bg: "bg-blue-100 border-blue-900 shadow-[4px_4px_0px_0px_#1e3a8a]"
    },
    {
      icon: "🧠",
      title: "2. Solve Challenges",
      desc: "Understand WHY certain human occupations, crops, and animals thrive in specific geographical environments.",
      bg: "bg-cyan-100 border-cyan-900 shadow-[4px_4px_0px_0px_#155e75]"
    },
    {
      icon: "🌾",
      title: "3. Choose Livelihoods",
      desc: "Match agriculture, mining, fisheries, pastoralism, and tourism with the natural resource profile of the land.",
      bg: "bg-emerald-100 border-emerald-900 shadow-[4px_4px_0px_0px_#064e3b]"
    },
    {
      icon: "⚠️",
      title: "4. Respond to Crises",
      desc: "Mitigate cyclones, floods, landslides, and droughts using sound ecological and geological planning.",
      bg: "bg-rose-100 border-rose-900 shadow-[4px_4px_0px_0px_#881337]"
    },
    {
      icon: "⭐",
      title: "5. Earn Life Points",
      desc: "Accumulate Life Points (LP) for smart decisions. The squad with the highest geographical wisdom wins the trophy!",
      bg: "bg-purple-100 border-purple-900 shadow-[4px_4px_0px_0px_#581c87]"
    }
  ];

  const handleStart = () => {
    soundEngine.playClick();
    onContinue();
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-transparent text-slate-900 select-none">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-300 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
            <Zap className="w-3.5 h-3.5" />
            <span>Mission Briefing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 mb-2">
            HOW TO PLAY & WIN
          </h2>
          <p className="text-slate-800 text-sm sm:text-base font-bold">
            Master the core cycle: <strong className="text-emerald-700">EXPLORE → DISCOVER → DECIDE → ADAPT → WIN</strong>
          </p>
        </div>

        {/* 5 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl ${step.bg} border-2.5 border-slate-900 transition-all duration-300 hover:-translate-y-1 flex flex-col`}
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="font-black text-base text-slate-950 mb-1.5 flex items-center gap-2">
                <span>{step.title}</span>
              </h3>
              <p className="text-xs text-slate-800 font-bold leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scoring summary pill */}
        <div className="p-4 rounded-3xl bg-white border-2.5 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-yellow-300 border-2 border-slate-900 flex items-center justify-center text-xl shadow-[1px_1px_0px_0px_#0f172a]">
              ⭐
            </div>
            <div>
              <div className="text-xs text-amber-700 font-black uppercase">Reward System</div>
              <div className="text-sm font-bold text-slate-900">Life Points awarded for correct choices, smart reasoning & environmental care!</div>
            </div>
          </div>
          <div className="text-xs text-slate-700 font-black bg-slate-100 px-3 py-1 rounded-xl border border-slate-300">
            Missions 1-4 • Blitz • Final Restoration
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleStart}
            className="px-10 sm:px-14 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 border-3 border-slate-900 text-slate-950 font-black text-lg sm:text-xl shadow-[6px_6px_0px_0px_#0f172a] transition-all transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            ENTER THE REGIONAL MAP ➔
          </button>
        </div>
      </div>
    </div>
  );
};
