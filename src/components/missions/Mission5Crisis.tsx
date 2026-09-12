"use client";

import React, { useState } from 'react';
import { CRISIS_SCENARIOS } from '@/data/crisisScenarios';
import { TurnBanner } from '@/components/ui/TurnBanner';
import { TeamId, TeamState } from '@/types/game';
import { AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  onSwitchTurn: () => void;
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'decisions') => void;
}

export const Mission5Crisis: React.FC<Props> = ({
  turnTeam,
  teams,
  onSwitchTurn,
  onComplete,
  onAwardPoints
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [scenarioResults, setScenarioResults] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const scenario = CRISIS_SCENARIOS[currentIdx];

  const handleSelectOption = (idx: number) => {
    soundEngine.playClick();
    setSelectedAnswers(prev => ({ ...prev, [scenario.id]: idx }));
    const opt = scenario.options[idx];

    if (opt.isCorrect) {
      if (!scenarioResults[scenario.id]) {
        soundEngine.playCorrect();
        onAwardPoints(scenario.points, 'decisions');
        setScenarioResults(prev => ({ ...prev, [scenario.id]: true }));
      }
      setFeedback({
        isCorrect: true,
        text: `${opt.feedback} • ${scenario.explanation}`
      });
    } else {
      soundEngine.playWrong();
      setFeedback({
        isCorrect: false,
        text: opt.feedback
      });
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    setFeedback(null);
    if (currentIdx < CRISIS_SCENARIOS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setFeedback(null);
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const totalResolved = Object.values(scenarioResults).filter(Boolean).length;
  const isAllResolved = totalResolved >= CRISIS_SCENARIOS.length;

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-slate-950 text-white select-none">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider mb-1 border border-red-500/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Mission 5 of 5 • Environmental Hazards</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
              <span>🚨 GEOGRAPHY CRISIS & HAZARD RESPONSE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Respond to unexpected natural events using sound geological, hydrological, and ecological strategies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
              <span className="text-xs text-slate-400">Mitigated:</span>
              <span className="text-sm font-extrabold text-emerald-400">{totalResolved} / {CRISIS_SCENARIOS.length}</span>
            </div>

            {isAllResolved && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2 animate-bounce"
              >
                <span>FINISH MISSION ➔</span>
              </button>
            )}
          </div>
        </div>

        {/* Turn-based Smart Board Banner */}
        <TurnBanner
          turnTeam={turnTeam}
          teams={teams}
          onSwitchTurn={onSwitchTurn}
          actionPrompt="Evaluate the environmental disaster scenario and select the best mitigation strategy!"
        />

        {/* Crisis Step Pills */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {CRISIS_SCENARIOS.map((sc, idx) => {
            const isDone = scenarioResults[sc.id];
            const isCurrent = currentIdx === idx;

            return (
              <button
                key={sc.id}
                onClick={() => { soundEngine.playClick(); setCurrentIdx(idx); setFeedback(null); }}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center ${
                  isCurrent
                    ? 'bg-red-900/60 border-red-400 text-white shadow-lg ring-2 ring-red-500/40'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="text-2xl mb-1">{sc.icon}</span>
                <span className="text-[11px] font-bold truncate max-w-full">{sc.title}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-300 mt-1" />}
              </button>
            );
          })}
        </div>

        {/* Active Crisis Scenario Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-red-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{scenario.icon}</span>
              <div>
                <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
                  Hazard Zone: {scenario.landform.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{scenario.title}</h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-black text-amber-400 block">⭐ +200 LIFE POINTS</span>
              <span className="text-[10px] text-slate-400">Critical Response</span>
            </div>
          </div>

          {/* Scenario Situation */}
          <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-red-300 block mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> URGENT GEOGRAPHICAL THREAT:
            </strong>
            {scenario.situation}
          </div>

          {/* "What would you do?" Options */}
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
              WHAT WOULD YOUR SQUAD DO?
            </div>

            <div className="space-y-3">
              {scenario.options.map((opt, idx) => {
                const isSelected = selectedAnswers[scenario.id] === idx;
                const isCorrect = opt.isCorrect;
                const hasAnswered = selectedAnswers[scenario.id] !== undefined;

                let optClass = "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-red-400";
                if (hasAnswered) {
                  if (isCorrect) {
                    optClass = "bg-emerald-900/60 border-emerald-400 text-white font-bold ring-2 ring-emerald-500/50";
                  } else if (isSelected) {
                    optClass = "bg-red-900/50 border-red-500 text-red-200";
                  } else {
                    optClass = "bg-slate-800/40 border-slate-800 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={scenarioResults[scenario.id]}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt.text}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
              feedback.isCorrect
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/80 border-red-500/50 text-red-200'
            }`}>
              <Sparkles className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold"
            >
              Previous Threat
            </button>

            <div className="text-xs text-slate-400 font-mono">
              Scenario {currentIdx + 1} of {CRISIS_SCENARIOS.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIdx === CRISIS_SCENARIOS.length - 1}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-xs font-bold text-white"
            >
              Next Threat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
