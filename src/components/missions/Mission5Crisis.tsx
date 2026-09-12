"use client";

import React, { useState } from 'react';
import { CRISIS_SCENARIOS } from '@/data/crisisScenarios';
import { TurnBanner } from '@/components/ui/TurnBanner';
import { TeamId, TeamState } from '@/types/game';
import { ShieldAlert, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  onSwitchTurn: () => void;
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'planning') => void;
}

export const Mission5Crisis: React.FC<Props> = ({
  turnTeam,
  teams,
  onSwitchTurn,
  onComplete,
  onAwardPoints
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [scenarioResults, setScenarioResults] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const scenario = CRISIS_SCENARIOS[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    soundEngine.playClick();
    setSelectedAnswers(prev => ({ ...prev, [scenario.id]: optIdx }));

    const option = scenario.options[optIdx];
    if (option.isCorrect) {
      if (!scenarioResults[scenario.id]) {
        soundEngine.playCorrect();
        onAwardPoints(200, 'planning');
        setScenarioResults(prev => ({ ...prev, [scenario.id]: true }));
      }
      setFeedback({
        isCorrect: true,
        text: `✓ MITIGATION SUCCESSFUL (+200 LP): ${option.feedback}`
      });
    } else {
      soundEngine.playWrong();
      setFeedback({
        isCorrect: false,
        text: `⚠️ CRITICAL FLAW: ${option.feedback}`
      });
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    setFeedback(null);
    onSwitchTurn();
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
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-transparent text-slate-900 select-none">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b-2 border-slate-900 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-200 text-rose-950 text-xs font-black uppercase tracking-wider mb-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-900" />
              <span>Mission 5 of 5 • Environmental Hazards</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 flex items-center gap-2">
              <span>🚨 GEOGRAPHY CRISIS & HAZARD RESPONSE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-bold">
              Respond to unexpected natural events using sound geological, hydrological, and ecological strategies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2.5 border-slate-900 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-xs text-slate-700 font-black">Mitigated:</span>
              <span className="text-sm font-black text-emerald-700">{totalResolved} / {CRISIS_SCENARIOS.length}</span>
            </div>

            {isAllResolved && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 border-2.5 border-slate-900 text-slate-950 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-2 animate-bounce cursor-pointer"
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
                className={`p-3 rounded-2xl border-2.5 border-slate-900 text-center transition flex flex-col items-center cursor-pointer ${
                  isCurrent
                    ? 'bg-yellow-300 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] scale-105'
                    : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                }`}
              >
                <span className="text-2xl mb-1">{sc.icon}</span>
                <span className="text-[11px] font-black truncate max-w-full">{sc.title}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-1" />}
              </button>
            );
          })}
        </div>

        {/* Active Crisis Scenario Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{scenario.icon}</span>
              <div>
                <span className="text-xs uppercase font-black text-rose-700 tracking-wider">
                  Hazard Zone: {scenario.landform.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">{scenario.title}</h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-black text-slate-950 bg-yellow-300 px-3 py-1 rounded-full border border-slate-900 block mb-1">⭐ +200 LIFE POINTS</span>
              <span className="text-[10px] text-slate-600 font-bold">Critical Response</span>
            </div>
          </div>

          {/* Scenario Situation */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-900 text-xs sm:text-sm text-slate-900 font-bold leading-relaxed shadow-[2px_2px_0px_0px_#881337]">
            <strong className="text-rose-950 block mb-1 flex items-center gap-1.5 font-black">
              <AlertTriangle className="w-4 h-4 text-rose-700" /> URGENT GEOGRAPHICAL THREAT:
            </strong>
            {scenario.situation}
          </div>

          {/* Options */}
          <div>
            <div className="text-xs font-black text-blue-900 uppercase tracking-wider mb-3">
              WHAT WOULD YOUR SQUAD DO?
            </div>

            <div className="space-y-3">
              {scenario.options.map((opt, idx) => {
                const isSelected = selectedAnswers[scenario.id] === idx;
                const isCorrect = opt.isCorrect;
                const hasAnswered = selectedAnswers[scenario.id] !== undefined;

                let optClass = "bg-amber-50/70 border-slate-900 text-slate-900 hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a]";
                if (hasAnswered) {
                  if (isCorrect) {
                    optClass = "bg-emerald-200 border-emerald-950 text-emerald-950 font-black shadow-[4px_4px_0px_0px_#064e3b] ring-2 ring-emerald-400";
                  } else if (isSelected) {
                    optClass = "bg-rose-100 border-rose-950 text-rose-950 font-bold";
                  } else {
                    optClass = "bg-slate-100 border-slate-300 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={scenarioResults[scenario.id]}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition flex items-center justify-between cursor-pointer ${optClass}`}
                  >
                    <span>{opt.text}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-4 rounded-2xl border-2 border-slate-900 text-xs sm:text-sm font-bold flex items-start gap-2.5 shadow-[3px_3px_0px_0px_#0f172a] animate-fade-in ${
              feedback.isCorrect
                ? 'bg-emerald-100 text-emerald-950'
                : 'bg-rose-100 text-rose-950'
            }`}>
              <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-900">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-900 disabled:opacity-40 text-xs font-black text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
            >
              Previous Threat
            </button>

            <button
              onClick={onSwitchTurn}
              className="px-3.5 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 border-2 border-slate-900 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
            >
              🔄 Pass Turn
            </button>

            <button
              onClick={handleNext}
              disabled={currentIdx === CRISIS_SCENARIOS.length - 1}
              className="px-4 py-2 rounded-2xl bg-rose-500 hover:bg-rose-400 border-2 border-slate-900 disabled:opacity-40 text-xs font-black text-white shadow-[3px_3px_0px_0px_#0f172a] cursor-pointer"
            >
              Next Threat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
