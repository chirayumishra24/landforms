"use client";

import React, { useState } from 'react';
import { LandformType } from '@/types/game';
import { ADAPTATION_CHARACTERS, ADAPTATION_ANIMALS } from '@/data/adaptationsData';
import { CheckCircle2, HelpCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'adaptation') => void;
}

export const Mission2LifeAdapts: React.FC<Props> = ({ onComplete, onAwardPoints }) => {
  const [activeTab, setActiveTab] = useState<'humans' | 'animals'>('humans');

  // Human Matching State
  const [humanMatches, setHumanMatches] = useState<Record<string, LandformType>>({});
  const [humanCorrect, setHumanCorrect] = useState<Record<string, boolean>>({});
  const [humanFeedback, setHumanFeedback] = useState<string | null>(null);

  // Animal Reasoning State
  const [currentAnimalIdx, setCurrentAnimalIdx] = useState<number>(0);
  const [animalAnswers, setAnimalAnswers] = useState<Record<string, number>>({});
  const [animalCorrect, setAnimalCorrect] = useState<Record<string, boolean>>({});
  const [animalFeedback, setAnimalFeedback] = useState<string | null>(null);

  const landformTargets: { id: LandformType; label: string; icon: string }[] = [
    { id: 'mountains', label: 'Mountains', icon: '🏔️' },
    { id: 'plateaus', label: 'Plateaus', icon: '🟫' },
    { id: 'plains', label: 'Plains', icon: '🟩' },
    { id: 'valleys', label: 'Valleys', icon: '🏞️' },
    { id: 'coasts', label: 'Coastal Areas', icon: '🌊' }
  ];

  // Match a human occupation to a landform
  const handleMatchHuman = (charId: string, landform: LandformType) => {
    soundEngine.playClick();
    const character = ADAPTATION_CHARACTERS.find(c => c.id === charId);
    if (!character) return;

    setHumanMatches(prev => ({ ...prev, [charId]: landform }));

    const isSuitable = character.suitableLandforms.includes(landform);
    if (isSuitable) {
      if (!humanCorrect[charId]) {
        soundEngine.playCorrect();
        onAwardPoints(100, 'adaptation');
        setHumanCorrect(prev => ({ ...prev, [charId]: true }));
      }
      setHumanFeedback(`✓ EXCELLENT! ${character.title} thrives in ${landform.toUpperCase()}: ${character.explanation}`);
    } else {
      soundEngine.playWrong();
      setHumanFeedback(`⚠️ Suboptimal match. Consider what natural resources and topography ${character.title} requires to work!`);
    }
  };

  // Animal Reasoning answer
  const currentAnimal = ADAPTATION_ANIMALS[currentAnimalIdx];

  const handleSelectAnimalReason = (optionIdx: number) => {
    soundEngine.playClick();
    setAnimalAnswers(prev => ({ ...prev, [currentAnimal.id]: optionIdx }));

    const isCorrect = optionIdx === currentAnimal.correctReasonIdx;
    if (isCorrect) {
      if (!animalCorrect[currentAnimal.id]) {
        soundEngine.playCorrect();
        onAwardPoints(120, 'adaptation');
        setAnimalCorrect(prev => ({ ...prev, [currentAnimal.id]: true }));
      }
      setAnimalFeedback(`✓ BRILLIANT REASONING (+120 LP): ${currentAnimal.explanation}`);
    } else {
      soundEngine.playWrong();
      setAnimalFeedback("⚠️ Not quite. Think about how physical anatomical adaptations (feet, lungs, humps, gills) counter specific environmental challenges.");
    }
  };

  const totalHumansCorrect = Object.values(humanCorrect).filter(Boolean).length;
  const totalAnimalsCorrect = Object.values(animalCorrect).filter(Boolean).length;
  const isAllComplete = totalHumansCorrect >= 6 && totalAnimalsCorrect >= 4;

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-slate-950 text-white select-none">
      <div className="max-w-6xl mx-auto">
        {/* Mission Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Mission 2 of 5</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
              <span>🌱 LIFE ADAPTS: HUMANS & WILDLIFE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Discover how physical landforms dictate human livelihoods and evolutionary traits of animals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
              <span className="text-xs text-slate-400">Progress:</span>
              <span className="text-sm font-extrabold text-emerald-400">
                {totalHumansCorrect}/6 Humans • {totalAnimalsCorrect}/4 Animals
              </span>
            </div>

            {isAllComplete && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2 animate-bounce"
              >
                <span>COMPLETE MISSION ➔</span>
              </button>
            )}
          </div>
        </div>

        {/* Phase Toggle Tabs */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('humans'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 border ${
              activeTab === 'humans'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>👨‍🌾 Human Livelihoods</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 font-bold">
              {totalHumansCorrect}/6
            </span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('animals'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 border ${
              activeTab === 'animals'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🐐 Animal Adaptations & Reasoning</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 font-bold">
              {totalAnimalsCorrect}/4
            </span>
          </button>
        </div>

        {/* ================= PHASE A: HUMAN LIVELIHOODS ================= */}
        {activeTab === 'humans' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-slate-300 flex items-center justify-between">
              <span>Match each community worker to the most suitable landform environment.</span>
              <span className="font-bold text-amber-400">⭐ +100 Life Points per correct match</span>
            </div>

            {/* Grid of Character Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ADAPTATION_CHARACTERS.map((char) => {
                const isMatched = humanCorrect[char.id];
                const currentChoice = humanMatches[char.id];

                return (
                  <div
                    key={char.id}
                    className={`p-5 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between ${
                      isMatched
                        ? 'bg-emerald-950/40 border-emerald-500/50'
                        : 'bg-slate-900/80 border-white/10 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl">{char.icon}</div>
                        {isMatched ? (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Select Landform</span>
                        )}
                      </div>

                      <h3 className="font-black text-base text-white mb-1">{char.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {char.description}
                      </p>
                    </div>

                    {/* Landform Target Selection Buttons */}
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Assign to Landform:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {landformTargets.map((lf) => {
                          const isSelected = currentChoice === lf.id;
                          return (
                            <button
                              key={lf.id}
                              onClick={() => handleMatchHuman(char.id, lf.id)}
                              disabled={isMatched}
                              className={`p-1.5 rounded-xl text-[11px] font-bold border transition flex items-center justify-center gap-1 ${
                                isSelected && isMatched
                                  ? 'bg-emerald-600 border-emerald-400 text-white'
                                  : isSelected && !isMatched
                                  ? 'bg-red-900/60 border-red-500 text-red-200'
                                  : 'bg-slate-800/80 border-white/5 text-slate-300 hover:bg-slate-700 hover:text-white'
                              }`}
                            >
                              <span>{lf.icon}</span>
                              <span className="truncate">{lf.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Feedback Banner */}
            {humanFeedback && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 flex items-start gap-2.5 shadow-xl">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>{humanFeedback}</span>
              </div>
            )}
          </div>
        )}

        {/* ================= PHASE B: ANIMAL ADAPTATION REASONING ================= */}
        {activeTab === 'animals' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Animal Selection Bar */}
            <div className="grid grid-cols-4 gap-2">
              {ADAPTATION_ANIMALS.map((a, idx) => {
                const isDone = animalCorrect[a.id];
                const isCurrent = currentAnimalIdx === idx;

                return (
                  <button
                    key={a.id}
                    onClick={() => { soundEngine.playClick(); setCurrentAnimalIdx(idx); setAnimalFeedback(null); }}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center ${
                      isCurrent
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                        : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-3xl mb-1">{a.icon}</span>
                    <span className="text-xs font-bold truncate max-w-full">{a.name}</span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-300 mt-1" />}
                  </button>
                );
              })}
            </div>

            {/* Current Animal Challenge Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{currentAnimal.icon}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{currentAnimal.name}</h3>
                    <span className="text-xs text-emerald-400 font-bold">
                      Native Habitat: {currentAnimal.suitableLandform.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400 font-extrabold block">⭐ +120 LP</span>
                  <span className="text-[10px] text-slate-400">Reasoning Challenge</span>
                </div>
              </div>

              {/* Adaptation Trait Highlight */}
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-white/5 text-xs sm:text-sm text-slate-200">
                <strong className="text-amber-300 block mb-1">Key Evolutionary Trait:</strong>
                {currentAnimal.adaptationTrait}
              </div>

              {/* Signature "WHY?" Question */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wide mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>THE &quot;WHY?&quot; REASONING CHALLENGE</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-4">
                  {currentAnimal.reasoningQuestion}
                </h4>

                <div className="space-y-3">
                  {currentAnimal.reasoningOptions.map((opt, idx) => {
                    const isSelected = animalAnswers[currentAnimal.id] === idx;
                    const isCorrect = idx === currentAnimal.correctReasonIdx;
                    const hasAnswered = animalAnswers[currentAnimal.id] !== undefined;

                    let btnClass = "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-blue-400";
                    if (hasAnswered) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-900/60 border-emerald-400 text-white font-bold ring-2 ring-emerald-500/50";
                      } else if (isSelected) {
                        btnClass = "bg-red-900/40 border-red-500 text-red-200";
                      } else {
                        btnClass = "bg-slate-800/40 border-slate-800 text-slate-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnimalReason(idx)}
                        disabled={animalCorrect[currentAnimal.id]}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback */}
              {animalFeedback && (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-xs sm:text-sm text-emerald-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
                  <span>{animalFeedback}</span>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setCurrentAnimalIdx(prev => Math.max(prev - 1, 0));
                    setAnimalFeedback(null);
                  }}
                  disabled={currentAnimalIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold"
                >
                  Previous Animal
                </button>

                <div className="text-xs text-slate-400 font-mono">
                  {currentAnimalIdx + 1} / {ADAPTATION_ANIMALS.length}
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setCurrentAnimalIdx(prev => Math.min(prev + 1, ADAPTATION_ANIMALS.length - 1));
                    setAnimalFeedback(null);
                  }}
                  disabled={currentAnimalIdx === ADAPTATION_ANIMALS.length - 1}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-bold text-white"
                >
                  Next Animal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
