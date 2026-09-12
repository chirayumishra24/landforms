"use client";

import React, { useState } from 'react';
import { LandformType } from '@/types/game';
import { LANDFORMS_DATA } from '@/data/landformsData';
import { LandformViewer3D } from '@/components/3d/LandformViewer3D';
import { CheckCircle2, ArrowRight, ArrowLeft, Award, HelpCircle, Sparkles, Compass } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'knowledge') => void;
}

export const Mission1Explorer: React.FC<Props> = ({ onComplete, onAwardPoints }) => {
  const landformKeys: LandformType[] = ['mountains', 'plateaus', 'plains', 'valleys', 'coasts'];
  const [activeTab, setActiveTab] = useState<LandformType>('mountains');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentLandform = LANDFORMS_DATA[activeTab];

  const handleSelectOption = (optionIdx: number) => {
    soundEngine.playClick();
    setSelectedAnswers(prev => ({ ...prev, [activeTab]: optionIdx }));

    const isCorrect = optionIdx === currentLandform.question.correctIdx;
    if (isCorrect) {
      if (!answeredCorrectly[activeTab]) {
        soundEngine.playCorrect();
        onAwardPoints(100, 'knowledge');
        setAnsweredCorrectly(prev => ({ ...prev, [activeTab]: true }));
      }
      setFeedback({
        isCorrect: true,
        text: `✓ SPOT ON (+100 LP): ${currentLandform.question.explanation}`
      });
    } else {
      soundEngine.playWrong();
      setFeedback({
        isCorrect: false,
        text: "⚠️ Not quite. Think about the slope, terrain gradient, and climate conditions of this landform."
      });
    }
  };

  const handleNextTab = () => {
    soundEngine.playClick();
    setFeedback(null);
    const currIdx = landformKeys.indexOf(activeTab);
    if (currIdx < landformKeys.length - 1) {
      setActiveTab(landformKeys[currIdx + 1]);
    }
  };

  const handlePrevTab = () => {
    soundEngine.playClick();
    setFeedback(null);
    const currIdx = landformKeys.indexOf(activeTab);
    if (currIdx > 0) {
      setActiveTab(landformKeys[currIdx - 1]);
    }
  };

  const totalAnswered = Object.values(answeredCorrectly).filter(Boolean).length;
  const isMissionFinished = totalAnswered >= 5;

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-slate-950 text-white select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1 border border-blue-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Mission 1 of 5</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
              <span>🔍 LANDFORM EXPLORER</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Investigate the physical anatomy, elevation, and conditions of the 5 key geographical landforms.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Explored:</span>
              <span className="text-sm font-extrabold text-emerald-400">{totalAnswered} / 5</span>
            </div>
            {isMissionFinished && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2 animate-bounce"
              >
                <span>FINISH MISSION ➔</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 Landform Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {landformKeys.map((key) => {
            const lf = LANDFORMS_DATA[key];
            const isDone = answeredCorrectly[key];
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => { soundEngine.playClick(); setActiveTab(key); setFeedback(null); }}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-slate-900/80 border-white/10 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-xl">{lf.icon}</span>
                <span>{lf.name}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Explorer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 3D Model & Scientific Profile (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* 3D Model Display */}
            <LandformViewer3D landform={activeTab} />

            {/* Scientific Attributes Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Terrain Diagnostics</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">Class 6 Core</span>
              </div>

              <div>
                <div className="text-[11px] font-bold text-blue-400 uppercase">Elevation</div>
                <div className="text-xs font-semibold text-slate-200">{currentLandform.elevation}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase">Slope & Topography</div>
                <div className="text-xs font-semibold text-slate-200">{currentLandform.slope}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-cyan-400 uppercase">Atmosphere & Climate</div>
                <div className="text-xs font-semibold text-slate-200">{currentLandform.climate}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-purple-400 uppercase">Real-World Examples</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {currentLandform.realWorldExamples.map((ex, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/5">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Features, Human Activities, and Challenge Question (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Description & Geographical Significance */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl">
              <h3 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                <span>{currentLandform.icon}</span>
                <span>{currentLandform.name} Overview</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {currentLandform.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/5">
                  <span className="font-bold text-emerald-300 block mb-1.5">Key Physical Features:</span>
                  <ul className="space-y-1 text-slate-300">
                    {currentLandform.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/5">
                  <span className="font-bold text-amber-300 block mb-1.5">Human Adaptations & Economy:</span>
                  <ul className="space-y-1 text-slate-300">
                    {currentLandform.humanLife.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Interactive Geography Challenge Question */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wide">
                  <HelpCircle className="w-4 h-4" />
                  <span>Geographical Application Check</span>
                </div>
                <div className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
                  ⭐ +100 LIFE POINTS
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white mb-4 leading-snug">
                {currentLandform.question.prompt}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentLandform.question.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[activeTab] === idx;
                  const isCorrectAnswer = idx === currentLandform.question.correctIdx;
                  const hasAnswered = selectedAnswers[activeTab] !== undefined;

                  let optClass = "bg-slate-800/70 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-blue-400";
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      optClass = "bg-emerald-900/60 border-emerald-400 text-white font-bold ring-2 ring-emerald-500/50";
                    } else if (isSelected) {
                      optClass = "bg-red-900/40 border-red-500 text-red-200";
                    } else {
                      optClass = "bg-slate-800/40 border-slate-800 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answeredCorrectly[activeTab]}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                    : 'bg-red-950/80 border-red-500/50 text-red-200'
                }`}>
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* Next/Prev Tab Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={handlePrevTab}
                  disabled={landformKeys.indexOf(activeTab) === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-300 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-slate-400">
                  Landform {landformKeys.indexOf(activeTab) + 1} of 5
                </div>

                <button
                  onClick={handleNextTab}
                  disabled={landformKeys.indexOf(activeTab) === landformKeys.length - 1}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
