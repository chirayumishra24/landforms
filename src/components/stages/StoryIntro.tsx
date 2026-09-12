"use client";

import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
      accent: "bg-blue-100 border-blue-900"
    },
    {
      title: "Nature's Magnificent Architecture",
      subtitle: "Mountains rise high into the skies. Rivers cut fertile valleys. Broad plains stretch across continents. Coasts meet the vast open sea.",
      icon: "🏔️",
      accent: "bg-emerald-100 border-emerald-900"
    },
    {
      title: "Landforms Shape Human Destiny",
      subtitle: "Landforms do far more than form scenery. They determine WHERE we settle, HOW we travel, WHAT we harvest, and HOW we earn our living.",
      icon: "🏘️",
      accent: "bg-amber-100 border-amber-900"
    },
    {
      title: "YOUR MISSION AS EXPLORERS",
      subtitle: "Take charge of an unexplored region. Investigate terrain, solve challenges, protect against hazards, and build a thriving, sustainable civilisation!",
      icon: "⭐",
      accent: "bg-purple-100 border-purple-900"
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
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-transparent text-slate-900 overflow-hidden select-none">
      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {storyLines.map((_, i) => (
            <button
              key={i}
              onClick={() => { soundEngine.playClick(); setStep(i); }}
              className={`h-3 rounded-full border-2 border-slate-900 transition-all duration-300 cursor-pointer ${
                i === step ? 'w-12 bg-yellow-300 shadow-[2px_2px_0px_0px_#0f172a]' : i < step ? 'w-8 bg-emerald-300' : 'w-5 bg-white'
              }`}
            />
          ))}
        </div>

        {/* Narrative Card */}
        <div className={`p-6 sm:p-10 rounded-3xl ${current.accent} border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] transition-all duration-500`}>
          <div className="text-6xl sm:text-7xl mb-4 text-center animate-bounce">
            {current.icon}
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-center tracking-tight text-slate-950 mb-4">
            {current.title}
          </h2>

          <p className="text-slate-800 text-base sm:text-xl text-center leading-relaxed font-bold mb-8 max-w-2xl mx-auto">
            {current.subtitle}
          </p>

          <div className="flex items-center justify-between border-t-2 border-slate-900 pt-6">
            <button
              onClick={handleSkip}
              className="text-xs sm:text-sm font-black text-slate-700 hover:text-slate-950 transition px-3 py-2 cursor-pointer"
            >
              Skip Briefing
            </button>

            <button
              onClick={handleNext}
              className="px-6 sm:px-8 py-3 rounded-2xl bg-yellow-300 hover:bg-yellow-400 border-2.5 border-slate-900 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              <span>{step < storyLines.length - 1 ? 'Next ➔' : 'Proceed to Teams ➔'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
