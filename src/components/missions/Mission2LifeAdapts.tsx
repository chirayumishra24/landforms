"use client";

import React, { useState } from 'react';
import { LandformType, TeamId, TeamState } from '@/types/game';
import { ADAPTATION_CHARACTERS } from '@/data/adaptationsData';
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
  // Human Matching State
  const [humanMatches, setHumanMatches] = useState<Record<string, LandformType>>({});
  const [humanCorrect, setHumanCorrect] = useState<Record<string, boolean>>({});
  const [eliminatedHumanTargets, setEliminatedHumanTargets] = useState<Record<string, LandformType[]>>({});
  const [wrongHumanAttempts, setWrongHumanAttempts] = useState<Record<string, number>>({});
  const [humanResolved, setHumanResolved] = useState<Record<string, boolean>>({});
  const [humanFeedbackInfo, setHumanFeedbackInfo] = useState<{ isCorrect: boolean; isPassed?: boolean; text: string } | null>(null);

  const turnTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
    };
  }, []);

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

      if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
      turnTimeoutRef.current = setTimeout(() => {
        onSwitchTurn();
      }, 2600);
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
        if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
        turnTimeoutRef.current = setTimeout(() => {
          onSwitchTurn();
        }, 1800);
      } else {
        // Second wrong guess: Both teams missed! NOW reveal the answer!
        setHumanResolved(prev => ({ ...prev, [charId]: true }));
        setHumanFeedbackInfo({
          isCorrect: false,
          isPassed: false,
          text: `❌ BOTH TEAMS MISSED! ${character.title} belongs in ${character.primaryLandform.toUpperCase()}: ${character.explanation}`
        });
        if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
        turnTimeoutRef.current = setTimeout(() => {
          onSwitchTurn();
        }, 2600);
      }
    }
  };

  const totalHumansResolved = Object.values(humanResolved).filter(Boolean).length;
  const isAllComplete = totalHumansResolved >= 6;

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
              <span>🌱 LIFE ADAPTS: HUMAN LIVELIHOODS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-bold">
              Discover how physical landforms dictate human settlements, occupations, and livelihoods.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2.5 border-slate-900 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-xs text-slate-700 font-black">Progress:</span>
              <span className="text-sm font-black text-emerald-700">
                {totalHumansResolved} / 6 Livelihoods
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
          actionPrompt="Match each community livelihood to its natural landform terrain!"
          isStealActive={Boolean(humanFeedbackInfo?.isPassed)}
        />

        {/* Human Livelihoods Section */}
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
        </div>
      </div>
    );
  };
