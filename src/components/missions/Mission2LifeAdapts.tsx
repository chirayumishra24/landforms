"use client";

import React, { useState } from 'react';
import { LandformType, TeamId, TeamState } from '@/types/game';
import { ADAPTATION_CHARACTERS, ADAPTATION_ANIMALS } from '@/data/adaptationsData';
import { TurnBanner } from '@/components/ui/TurnBanner';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  onSwitchTurn: () => void;
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'adaptation') => void;
}

export const Mission2LifeAdapts: React.FC<Props> = ({
  turnTeam,
  teams,
  onSwitchTurn,
  onComplete,
  onAwardPoints
}) => {
  const [activeTab, setActiveTab] = useState<'humans' | 'animals'>('humans');

  // Human Matching State
  const [humanMatches, setHumanMatches] = useState<Record<string, LandformType>>({});
  const [humanCorrect, setHumanCorrect] = useState<Record<string, boolean>>({});
  const [eliminatedHumanTargets, setEliminatedHumanTargets] = useState<Record<string, LandformType[]>>({});
  const [wrongHumanAttempts, setWrongHumanAttempts] = useState<Record<string, number>>({});
  const [humanResolved, setHumanResolved] = useState<Record<string, boolean>>({});
  const [humanFeedbackInfo, setHumanFeedbackInfo] = useState<{ isCorrect: boolean; isPassed?: boolean; text: string } | null>(null);

  // Animal Reasoning State
  const [currentAnimalIdx, setCurrentAnimalIdx] = useState<number>(0);
  const [animalAnswers, setAnimalAnswers] = useState<Record<string, number>>({});
  const [animalCorrect, setAnimalCorrect] = useState<Record<string, boolean>>({});
  const [eliminatedAnimalOptions, setEliminatedAnimalOptions] = useState<Record<string, number[]>>({});
  const [wrongAnimalAttempts, setWrongAnimalAttempts] = useState<Record<string, number>>({});
  const [animalResolved, setAnimalResolved] = useState<Record<string, boolean>>({});
  const [animalFeedbackInfo, setAnimalFeedbackInfo] = useState<{ isCorrect: boolean; isPassed?: boolean; text: string } | null>(null);

  const landformTargets: { id: LandformType; label: string; icon: string }[] = [
    { id: 'mountains', label: 'Mountains', icon: '🏔️' },
    { id: 'plateaus', label: 'Plateaus', icon: '🟫' },
    { id: 'plains', label: 'Plains', icon: '🟩' },
    { id: 'valleys', label: 'Valleys', icon: '🏞️' },
    { id: 'coasts', label: 'Coastal Areas', icon: '🌊' }
  ];

  // Match a human occupation to a landform
  const handleMatchHuman = (charId: string, landform: LandformType) => {
    if (humanResolved[charId]) return;
    if (eliminatedHumanTargets[charId]?.includes(landform)) return;

    soundEngine.playClick();
    const character = ADAPTATION_CHARACTERS.find(c => c.id === charId);
    if (!character) return;

    setHumanMatches(prev => ({ ...prev, [charId]: landform }));

    const otherTeam = turnTeam === 'terraformers' ? 'earthkeepers' : 'terraformers';
    const isSuitable = character.suitableLandforms.includes(landform);

    if (isSuitable) {
      soundEngine.playCorrect();
      const isSteal = (wrongHumanAttempts[charId] || 0) > 0;
      onAwardPoints(100, 'adaptation');
      setHumanCorrect(prev => ({ ...prev, [charId]: true }));
      setHumanResolved(prev => ({ ...prev, [charId]: true }));
      setHumanFeedbackInfo({
        isCorrect: true,
        isPassed: false,
        text: isSteal
          ? `🎯 STEAL SUCCESSFUL (+100 LP for ${teams[turnTeam].name})! ${character.title} thrives in ${landform.toUpperCase()}: ${character.explanation}`
          : `✓ EXCELLENT (+100 LP for ${teams[turnTeam].name})! ${character.title} thrives in ${landform.toUpperCase()}: ${character.explanation}`
      });
    } else {
      soundEngine.playWrong();
      const nextAttempts = (wrongHumanAttempts[charId] || 0) + 1;
      setWrongHumanAttempts(prev => ({ ...prev, [charId]: nextAttempts }));
      setEliminatedHumanTargets(prev => ({
        ...prev,
        [charId]: [...(prev[charId] || []), landform]
      }));

      if (nextAttempts === 1) {
        // First wrong guess: DO NOT reveal answer! Show feedback first, then pass after delay
        setHumanFeedbackInfo({
          isCorrect: false,
          isPassed: true,
          text: `❌ Suboptimal match by ${teams[turnTeam].name}! Chance passes to ${teams[otherTeam].name} to match ${character.title}!`
        });
        setTimeout(() => {
          onSwitchTurn();
        }, 1500);
      } else {
        // Second wrong guess: Both teams missed! NOW reveal the answer!
        setHumanResolved(prev => ({ ...prev, [charId]: true }));
        setHumanFeedbackInfo({
          isCorrect: false,
          isPassed: false,
          text: `❌ BOTH TEAMS MISSED! ${character.title} belongs in ${character.primaryLandform.toUpperCase()}: ${character.explanation}`
        });
      }
    }
  };

  // Animal Reasoning answer
  const currentAnimal = ADAPTATION_ANIMALS[currentAnimalIdx];

  const handleSelectAnimalReason = (optionIdx: number) => {
    if (animalResolved[currentAnimal.id]) return;
    if (eliminatedAnimalOptions[currentAnimal.id]?.includes(optionIdx)) return;

    soundEngine.playClick();
    setAnimalAnswers(prev => ({ ...prev, [currentAnimal.id]: optionIdx }));

    const otherTeam = turnTeam === 'terraformers' ? 'earthkeepers' : 'terraformers';
    const isCorrect = optionIdx === currentAnimal.correctReasonIdx;

    if (isCorrect) {
      soundEngine.playCorrect();
      const isSteal = (wrongAnimalAttempts[currentAnimal.id] || 0) > 0;
      onAwardPoints(120, 'adaptation');
      setAnimalCorrect(prev => ({ ...prev, [currentAnimal.id]: true }));
      setAnimalResolved(prev => ({ ...prev, [currentAnimal.id]: true }));
      setAnimalFeedbackInfo({
        isCorrect: true,
        isPassed: false,
        text: isSteal
          ? `🎯 STEAL SUCCESSFUL (+120 LP for ${teams[turnTeam].name})! ${currentAnimal.explanation}`
          : `✓ BRILLIANT REASONING (+120 LP for ${teams[turnTeam].name})! ${currentAnimal.explanation}`
      });
    } else {
      soundEngine.playWrong();
      const nextAttempts = (wrongAnimalAttempts[currentAnimal.id] || 0) + 1;
      setWrongAnimalAttempts(prev => ({ ...prev, [currentAnimal.id]: nextAttempts }));
      setEliminatedAnimalOptions(prev => ({
        ...prev,
        [currentAnimal.id]: [...(prev[currentAnimal.id] || []), optionIdx]
      }));

      if (nextAttempts === 1) {
        // First wrong guess: DO NOT reveal answer! Show feedback first, then pass after delay
        setAnimalFeedbackInfo({
          isCorrect: false,
          isPassed: true,
          text: `❌ Wrong reasoning by ${teams[turnTeam].name}! Chance passes to ${teams[otherTeam].name} to steal!`
        });
        setTimeout(() => {
          onSwitchTurn();
        }, 1500);
      } else {
        // Second wrong guess: Both teams missed! NOW reveal the answer!
        setAnimalResolved(prev => ({ ...prev, [currentAnimal.id]: true }));
        const correctText = currentAnimal.reasoningOptions[currentAnimal.correctReasonIdx];
        setAnimalFeedbackInfo({
          isCorrect: false,
          isPassed: false,
          text: `❌ BOTH TEAMS MISSED! The correct reason was: "${correctText}". ${currentAnimal.explanation}`
        });
      }
    }
  };

  const totalHumansResolved = Object.values(humanResolved).filter(Boolean).length;
  const totalAnimalsResolved = Object.values(animalResolved).filter(Boolean).length;
  const isAllComplete = totalHumansResolved >= 6 && totalAnimalsResolved >= 4;

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-transparent text-slate-900 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Mission Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b-2 border-slate-900 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black uppercase tracking-wider mb-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Mission 2 of 4</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 flex items-center gap-2">
              <span>🌱 LIFE ADAPTS: HUMANS & WILDLIFE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-bold">
              Discover how physical landforms dictate human livelihoods and evolutionary traits of animals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2.5 border-slate-900 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-xs text-slate-700 font-black">Progress:</span>
              <span className="text-sm font-black text-emerald-700">
                {totalHumansResolved}/6 Humans • {totalAnimalsResolved}/4 Animals
              </span>
            </div>

            <button
              onClick={() => { soundEngine.playClick(); onComplete(); }}
              className={`px-5 py-2 rounded-2xl border-2.5 border-slate-900 font-black text-xs sm:text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
                isAllComplete
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 animate-bounce'
                  : 'bg-white hover:bg-amber-100 text-slate-900'
              }`}
            >
              <span>{isAllComplete ? "COMPLETE MISSION ➔" : "PROCEED TO MISSION 3 ➔"}</span>
            </button>
          </div>
        </div>

        {/* Turn-based Smart Board Banner */}
        <TurnBanner
          turnTeam={turnTeam}
          teams={teams}
          onSwitchTurn={onSwitchTurn}
          actionPrompt="Match human livelihoods or solve the animal adaptation 'Why?' question!"
          isStealActive={Boolean(humanFeedbackInfo?.isPassed || animalFeedbackInfo?.isPassed)}
        />

        {/* Phase Toggle Tabs */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('humans'); }}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm transition flex items-center gap-2 border-2.5 border-slate-900 cursor-pointer ${
              activeTab === 'humans'
                ? 'bg-yellow-300 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] scale-105'
                : 'bg-white hover:bg-amber-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
            }`}
          >
            <span>👨‍🌾 Human Livelihoods</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 text-white font-black">
              {totalHumansResolved}/6
            </span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('animals'); }}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm transition flex items-center gap-2 border-2.5 border-slate-900 cursor-pointer ${
              activeTab === 'animals'
                ? 'bg-yellow-300 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] scale-105'
                : 'bg-white hover:bg-amber-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
            }`}
          >
            <span>🐐 Animal Adaptations & Reasoning</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 text-white font-black">
              {totalAnimalsResolved}/4
            </span>
          </button>
        </div>

        {/* ================= PHASE A: HUMAN LIVELIHOODS ================= */}
        {activeTab === 'humans' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-bold flex items-center justify-between shadow-[3px_3px_0px_0px_#0f172a]">
              <span>Match each community worker to the most suitable landform environment.</span>
              <span className="font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-slate-900">
                ⭐ +100 Life Points per correct match
              </span>
            </div>

            {/* Grid of Character Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ADAPTATION_CHARACTERS.map((char) => {
                const isMatched = humanCorrect[char.id];
                const isResolved = humanResolved[char.id];
                const currentChoice = humanMatches[char.id];

                return (
                  <div
                    key={char.id}
                    className={`p-5 rounded-3xl border-2.5 border-slate-900 transition-all duration-300 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col justify-between ${
                      isMatched
                        ? 'bg-emerald-100'
                        : isResolved
                        ? 'bg-slate-100 opacity-80'
                        : 'bg-white hover:-translate-y-1'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl">{char.icon}</div>
                        {isMatched ? (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-black border border-emerald-900 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                          </span>
                        ) : isResolved ? (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-black border border-slate-400">
                            Revealed
                          </span>
                        ) : (
                          <span className="text-xs text-slate-600 font-black">Select Landform</span>
                        )}
                      </div>

                      <h3 className="font-black text-base text-slate-950 mb-1">{char.title}</h3>
                      <p className="text-xs text-slate-800 font-bold leading-relaxed mb-4">
                        {char.description}
                      </p>
                    </div>

                    {/* Landform Target Selection Buttons */}
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-600 mb-2">
                        Assign to Landform:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {landformTargets.map((lf) => {
                          const isSelected = currentChoice === lf.id;
                          const isEliminated = eliminatedHumanTargets[char.id]?.includes(lf.id);
                          const isCorrectTarget = char.suitableLandforms.includes(lf.id);

                          let btnStyle = "bg-amber-50 hover:bg-yellow-200 text-slate-900 shadow-[1px_1px_0px_0px_#0f172a] cursor-pointer";

                          if (isEliminated) {
                            btnStyle = "bg-rose-100 text-rose-900 line-through opacity-60 cursor-not-allowed shadow-none";
                          } else if (isResolved) {
                            if (isCorrectTarget) {
                              btnStyle = "bg-emerald-300 text-emerald-950 font-black shadow-[2px_2px_0px_0px_#0f172a] ring-2 ring-emerald-500";
                            } else {
                              btnStyle = "bg-slate-100 text-slate-400 opacity-60 shadow-none cursor-default";
                            }
                          } else if (isSelected && isMatched) {
                            btnStyle = "bg-emerald-300 text-emerald-950 shadow-[1px_1px_0px_0px_#0f172a]";
                          }

                          return (
                            <button
                              key={lf.id}
                              onClick={() => handleMatchHuman(char.id, lf.id)}
                              disabled={isResolved || isEliminated}
                              className={`p-1.5 rounded-xl text-[11px] font-black border-2 border-slate-900 transition flex items-center justify-center gap-1 ${btnStyle}`}
                            >
                              <span>{lf.icon}</span>
                              <span className="truncate">{lf.label}</span>
                              {isEliminated && <span className="text-[9px]">❌</span>}
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
            {humanFeedbackInfo && (
              <div className={`p-4 rounded-2xl border-2.5 border-slate-900 text-xs sm:text-sm font-black flex items-start gap-2.5 shadow-[3px_3px_0px_0px_#0f172a] animate-fade-in ${
                humanFeedbackInfo.isPassed
                  ? 'bg-yellow-300 text-slate-950 ring-2 ring-yellow-400 animate-bounce'
                  : humanFeedbackInfo.isCorrect
                  ? 'bg-emerald-100 text-emerald-950'
                  : 'bg-rose-100 text-rose-950'
              }`}>
                <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>{humanFeedbackInfo.text}</span>
              </div>
            )}
          </div>
        )}

        {/* ================= PHASE B: ANIMAL ADAPTATION REASONING ================= */}
        {activeTab === 'animals' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-bold flex items-center justify-between shadow-[3px_3px_0px_0px_#0f172a]">
              <span>Discover why these species evolved specialized traits in extreme landforms.</span>
              <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-slate-900">
                ⭐ +120 Life Points per correct reasoning
              </span>
            </div>

            {/* Active Animal Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{currentAnimal.icon}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950">{currentAnimal.name}</h3>
                    <span className="text-xs text-emerald-700 font-black">
                      Native Habitat: {currentAnimal.suitableLandform.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-950 font-black bg-yellow-300 px-2.5 py-0.5 rounded-full border border-slate-900 block mb-1">⭐ +120 LP</span>
                  <span className="text-[10px] text-slate-600 font-bold">Reasoning Challenge</span>
                </div>
              </div>

              {/* Adaptation Trait Highlight */}
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-bold">
                <span className="font-black text-blue-900 block mb-1">Key Evolutionary Feature:</span>
                {currentAnimal.adaptationTrait}
              </div>

              {/* Question Prompt */}
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-950 mb-3">
                  {currentAnimal.reasoningQuestion}
                </h4>

                <div className="space-y-2.5">
                  {currentAnimal.reasoningOptions.map((opt: string, idx: number) => {
                    const isCorrect = idx === currentAnimal.correctReasonIdx;
                    const isEliminated = eliminatedAnimalOptions[currentAnimal.id]?.includes(idx);
                    const isResolved = animalResolved[currentAnimal.id];

                    let optClass = "bg-amber-50/70 border-slate-900 text-slate-900 hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a] cursor-pointer";

                    if (isEliminated) {
                      optClass = "bg-rose-100/70 border-rose-900/40 text-rose-900 line-through opacity-70 cursor-not-allowed shadow-none";
                    } else if (isResolved) {
                      if (isCorrect) {
                        optClass = "bg-emerald-200 border-emerald-950 text-emerald-950 font-black shadow-[4px_4px_0px_0px_#064e3b] ring-2 ring-emerald-400";
                      } else {
                        optClass = "bg-slate-100 border-slate-300 text-slate-400 opacity-60 cursor-default shadow-none";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnimalReason(idx)}
                        disabled={isResolved || isEliminated}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition flex items-center justify-between ${optClass}`}
                      >
                        <span>{opt}</span>
                        {isEliminated && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 font-black border border-rose-400">
                            ❌ Ruled Out
                          </span>
                        )}
                        {isResolved && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Banner */}
              {animalFeedbackInfo && (
                <div className={`p-4 rounded-2xl border-2.5 border-slate-900 text-xs sm:text-sm font-black flex items-start gap-2 shadow-[3px_3px_0px_0px_#0f172a] animate-fade-in ${
                  animalFeedbackInfo.isPassed
                    ? 'bg-yellow-300 text-slate-950 ring-2 ring-yellow-400 animate-bounce'
                    : animalFeedbackInfo.isCorrect
                    ? 'bg-emerald-100 text-emerald-950'
                    : 'bg-rose-100 text-rose-950'
                }`}>
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{animalFeedbackInfo.text}</span>
                </div>
              )}

              {/* Next Animal Navigation */}
              <div className="flex items-center justify-between border-t-2 border-slate-900 pt-4">
                <button
                  onClick={onSwitchTurn}
                  className="px-3.5 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 border-2 border-slate-900 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
                >
                  🔄 Pass Turn
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setAnimalFeedbackInfo(null);
                    if (currentAnimalIdx < ADAPTATION_ANIMALS.length - 1) {
                      setCurrentAnimalIdx(prev => prev + 1);
                    } else {
                      setCurrentAnimalIdx(0);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 border-2 border-slate-900 text-xs font-black text-white flex items-center gap-1 shadow-[3px_3px_0px_0px_#0f172a] cursor-pointer"
                >
                  <span>Next Animal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
