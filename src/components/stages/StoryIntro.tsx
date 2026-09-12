"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onContinue: () => void;
}

export const StoryIntro: React.FC<Props> = ({ onContinue }) => {
  const [step, setStep] = useState(0);

  const storyLines = [
    {
      title: "Every landscape tells a story.",
      subtitle: "The Earth is not flat or uniform. Forces within and above the planet sculpt majestic features over millions of years.",
      icon: "🌍",
      accent: "from-blue-500/20 to-teal-500/20 border-blue-500/40"
    },
    {
      title: "Nature's Magnificent Architecture",
      subtitle: "Mountains rise high into the skies. Rivers cut fertile valleys. Broad plains stretch across continents. Coasts meet the vast open sea.",
      icon: "🏔️",
      accent: "from-emerald-500/20 to-cyan-500/20 border-emerald-500/40"
    },
    {
      title: "Landforms Shape Human Destiny",
      subtitle: "Landforms do far more than form scenery. They determine WHERE we settle, HOW we travel, WHAT we harvest, and HOW we earn our living.",
      icon: "🏘️",
      accent: "from-amber-500/20 to-orange-500/20 border-amber-500/40"
    },
    {
      title: "YOUR MISSION AS EXPLORERS",
      subtitle: "Take charge of an unexplored region. Investigate terrain, solve challenges, protect against hazards, and build a thriving, sustainable civilisation!",
      icon: "⭐",
      accent: "from-purple-500/20 to-pink-500/20 border-purple-500/40"
    }
  ];

  const handleNext = () => {
    soundEngine.playClick();
    if (step < storyLines.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onContinue();
    }
  };

  const handleSkip = () => {
    soundEngine.playClick();
    onContinue();
  };

  const current = storyLines[step];

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {storyLines.map((_, i) => (
            <button
              key={i}
              onClick={() => { soundEngine.playClick(); setStep(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-10 bg-emerald-400' : i < step ? 'w-6 bg-emerald-700' : 'w-4 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Narrative Card */}
        <div className={`p-6 sm:p-10 rounded-3xl bg-gradient-to-b ${current.accent} backdrop-blur-xl border shadow-2xl transition-all duration-500 transform hover:scale-[1.01]`}>
          <div className="text-5xl sm:text-6xl mb-4 text-center animate-bounce">
            {current.icon}
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-center tracking-tight text-white mb-4">
            {current.title}
          </h2>

          <p className="text-slate-200 text-base sm:text-xl text-center leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
            {current.subtitle}
          </p>

          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <button
              onClick={handleSkip}
              className="text-xs sm:text-sm text-slate-400 hover:text-white transition px-3 py-2"
            >
              Skip Intro
            </button>

            <button
              onClick={handleNext}
              className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{step === storyLines.length - 1 ? 'BEGIN EXPLORATION' : 'NEXT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-slate-400 font-medium">
          LAND → CONDITIONS → LIFE → HUMAN ACTIVITIES
        </div>
      </div>
    </div>
  );
};
