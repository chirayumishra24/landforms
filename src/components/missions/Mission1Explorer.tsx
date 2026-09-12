"use client";

import React, { useState } from 'react';
import { LandformType, TeamId, TeamState } from '@/types/game';
import { LANDFORMS_DATA } from '@/data/landformsData';
import { LandformViewer3D } from '@/components/3d/LandformViewer3D';
import { TurnBanner } from '@/components/ui/TurnBanner';
import { CheckCircle2, ArrowRight, ArrowLeft, HelpCircle, Sparkles, Compass, ShieldCheck, Gauge, Zap } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  onSwitchTurn: () => void;
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'knowledge') => void;
}

export const Mission1Explorer: React.FC<Props> = ({
  turnTeam,
  teams,
  onSwitchTurn,
  onComplete,
  onAwardPoints
}) => {
  const landformKeys: LandformType[] = ['mountains', 'plateaus', 'plains', 'valleys', 'coasts'];
  const [activeTab, setActiveTab] = useState<LandformType>('mountains');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Feature Scan Activity State
  const [scannedFeatures, setScannedFeatures] = useState<Record<string, Set<string>>>({
    mountains: new Set(),
    plateaus: new Set(),
    plains: new Set(),
    valleys: new Set(),
    coasts: new Set()
  });
  const [selectedHotspotName, setSelectedHotspotName] = useState<string | null>(null);

  const currentLandform = LANDFORMS_DATA[activeTab];

  // Visual fast dials data (zero paragraphs of text)
  const visualDials: Record<LandformType, { elevation: string; climate: string; slope: string; primaryUse: string; icon: string }> = {
    mountains: {
      elevation: "High (>6,000m)",
      climate: "Freezing Alpine ❄️",
      slope: "Steep Vertical Crags 🧗",
      primaryUse: "Terrace Farming & Tourism 🌾",
      icon: "🏔️"
    },
    plateaus: {
      elevation: "Elevated Table (~1,500m)",
      climate: "Dry & Breezy 🌬️",
      slope: "Sheer Cliff Escarpment 🟫",
      primaryUse: "Mineral Mining & Hydropower ⛏️",
      icon: "🟫"
    },
    plains: {
      elevation: "Lowland (<200m)",
      climate: "Temperate & Warm ☀️",
      slope: "Broad & Level 🟩",
      primaryUse: "Intensive Agriculture & Cities 🚜",
      icon: "🟩"
    },
    valleys: {
      elevation: "Sheltered Basin 🏞️",
      climate: "Temperate Microclimate 🍏",
      slope: "U-Shaped Trough ⛰️",
      primaryUse: "Fruit Orchards & River Towns 🍎",
      icon: "🏞️"
    },
    coasts: {
      elevation: "Sea Level (0m) 🌊",
      climate: "Humid Maritime Breeze 🌴",
      slope: "Sandy Shores & Headlands 🏖️",
      primaryUse: "Seaports & Maritime Trade ⚓",
      icon: "🌊"
    }
  };

  const handleSelectHotspot = (name: string) => {
    setSelectedHotspotName(name);
    const currSet = scannedFeatures[activeTab] || new Set();
    if (!currSet.has(name)) {
      soundEngine.playPlacement();
      const updatedSet = new Set(currSet);
      updatedSet.add(name);
      setScannedFeatures(prev => ({ ...prev, [activeTab]: updatedSet }));
      onAwardPoints(25, 'knowledge');
    }
  };

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
        text: `✓ CORRECT! (+100 LP): ${currentLandform.question.explanation}`
      });
    } else {
      soundEngine.playWrong();
      setFeedback({
        isCorrect: false,
        text: "⚠️ Not quite. Think about the slope, terrain gradient, and environmental conditions!"
      });
    }
  };

  const handleNextTab = () => {
    soundEngine.playClick();
    setFeedback(null);
    setSelectedHotspotName(null);
    onSwitchTurn();
    const currIdx = landformKeys.indexOf(activeTab);
    if (currIdx < landformKeys.length - 1) {
      setActiveTab(landformKeys[currIdx + 1]);
    }
  };

  const handlePrevTab = () => {
    soundEngine.playClick();
    setFeedback(null);
    setSelectedHotspotName(null);
    const currIdx = landformKeys.indexOf(activeTab);
    if (currIdx > 0) {
      setActiveTab(landformKeys[currIdx - 1]);
    }
  };

  const currentScannedCount = scannedFeatures[activeTab]?.size || 0;
  const totalAnswered = Object.values(answeredCorrectly).filter(Boolean).length;
  const isMissionFinished = totalAnswered >= 5;
  const dials = visualDials[activeTab];

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-slate-950 text-white select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-white/10 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1 border border-blue-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Mission 1: Landform Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>EXPLORE & SHAPE THE LAND</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-md">
              <span className="text-xs text-slate-400 font-bold uppercase">Regions Cleared:</span>
              <span className="text-sm font-black text-emerald-400">{totalAnswered} / 5</span>
            </div>
            {isMissionFinished && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 animate-bounce"
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
          actionPrompt="Step to the Smart Board! Scan 3D features and solve the landform challenge!"
        />

        {/* 5 Landform Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {landformKeys.map((key) => {
            const lf = LANDFORMS_DATA[key];
            const isDone = answeredCorrectly[key];
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab(key);
                  setFeedback(null);
                  setSelectedHotspotName(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/40 scale-105'
                    : 'bg-slate-900/80 border-white/10 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{lf.icon}</span>
                <span>{lf.name}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: 3D Model & Fast Visual Dials (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {/* Upgraded 3D Diorama */}
            <LandformViewer3D
              landform={activeTab}
              onSelectHotspot={handleSelectHotspot}
              selectedHotspotName={selectedHotspotName}
            />

            {/* Visual Dials (Tactile, minimal text, instant glanceability) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-blue-500/20 text-center flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-blue-400">Elevation</span>
                <span className="text-xs font-black text-white mt-0.5">{dials.elevation}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/20 text-center flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-cyan-400">Climate</span>
                <span className="text-xs font-black text-white mt-0.5">{dials.climate}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/20 text-center flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-amber-400">Slope</span>
                <span className="text-xs font-black text-white mt-0.5">{dials.slope}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/20 text-center flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Human Use</span>
                <span className="text-xs font-black text-white mt-0.5 truncate max-w-[110px]">{dials.primaryUse}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hands-on Activities (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Activity 1: 3D Feature Scan Tracker */}
            <div className="p-4 rounded-2xl bg-slate-900/85 border border-cyan-500/30 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-cyan-300">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Activity 1: Scan 3D Features ({currentScannedCount}/3)</span>
                </div>
                <span className="text-[11px] font-extrabold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                  +25 LP per Scan
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-2.5">
                Touch the glowing pins on the 3D model or tap below to scan this landform's key geographical features:
              </p>

              <div className="grid grid-cols-3 gap-2">
                {activeTab === 'mountains' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Glacial Summit")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Glacial Summit")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>❄️ Summit</span>
                      {scannedFeatures[activeTab]?.has("Glacial Summit") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Terrace Steps")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Terrace Steps")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🚜 Terraces</span>
                      {scannedFeatures[activeTab]?.has("Terrace Steps") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Alpine Basecamp")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Alpine Basecamp")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>⛺ Basecamp</span>
                      {scannedFeatures[activeTab]?.has("Alpine Basecamp") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </>
                )}

                {activeTab === 'plateaus' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Tableland Summit")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Tableland Summit")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🟫 Tableland</span>
                      {scannedFeatures[activeTab]?.has("Tableland Summit") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Plunging Waterfall")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Plunging Waterfall")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>💧 Waterfall</span>
                      {scannedFeatures[activeTab]?.has("Plunging Waterfall") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Mineral Quarry")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Mineral Quarry")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>⛏️ Quarry</span>
                      {scannedFeatures[activeTab]?.has("Mineral Quarry") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </>
                )}

                {activeTab === 'plains' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Alluvial Farms")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Alluvial Farms")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🌾 Farmland</span>
                      {scannedFeatures[activeTab]?.has("Alluvial Farms") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Perennial River")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Perennial River")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🌊 River</span>
                      {scannedFeatures[activeTab]?.has("Perennial River") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Grain Barn & Silo")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Grain Barn & Silo")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🚜 Farmstead</span>
                      {scannedFeatures[activeTab]?.has("Grain Barn & Silo") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </>
                )}

                {activeTab === 'valleys' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Sheltered Corridor")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Sheltered Corridor")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🏞️ Corridor</span>
                      {scannedFeatures[activeTab]?.has("Sheltered Corridor") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Terrace Settlements")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Terrace Settlements")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🏘️ Village</span>
                      {scannedFeatures[activeTab]?.has("Terrace Settlements") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Fruit Orchards")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Fruit Orchards")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🍎 Orchards</span>
                      {scannedFeatures[activeTab]?.has("Fruit Orchards") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </>
                )}

                {activeTab === 'coasts' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Coastal Lighthouse")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Coastal Lighthouse")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🚨 Lighthouse</span>
                      {scannedFeatures[activeTab]?.has("Coastal Lighthouse") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Natural Bay & Dock")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Natural Bay & Dock")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>⚓ Harbor</span>
                      {scannedFeatures[activeTab]?.has("Natural Bay & Dock") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Sandy Dunes & Palms")}
                      className={`p-2 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        scannedFeatures[activeTab]?.has("Sandy Dunes & Palms")
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/80 border-white/10 text-slate-200 hover:border-cyan-400'
                      }`}
                    >
                      <span>🌴 Dunes</span>
                      {scannedFeatures[activeTab]?.has("Sandy Dunes & Palms") && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Activity 2: Smart Board Team Action Challenge */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500/40 shadow-2xl">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wide">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Activity 2: Team Action Challenge</span>
                </div>
                <div className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  +100 LIFE POINTS
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-white mb-3.5 leading-snug">
                {currentLandform.question.prompt}
              </h4>

              {/* 4 Tactile Smart Board Touch Cards */}
              <div className="space-y-2">
                {currentLandform.question.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[activeTab] === idx;
                  const isCorrectAnswer = idx === currentLandform.question.correctIdx;
                  const hasAnswered = selectedAnswers[activeTab] !== undefined;

                  let optClass = "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-blue-400";
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      optClass = "bg-emerald-950/90 border-emerald-400 text-white font-black ring-2 ring-emerald-400/60 shadow-lg";
                    } else if (isSelected) {
                      optClass = "bg-red-950/80 border-red-500 text-red-200";
                    } else {
                      optClass = "bg-slate-800/40 border-slate-800 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answeredCorrectly[activeTab]}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Banner */}
              {feedback && (
                <div className={`mt-3 p-3 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-2 shadow-lg animate-fade-in ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200'
                    : 'bg-red-950/90 border-red-500/60 text-red-200'
                }`}>
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* Next/Prev Navigation & Pass Turn */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <button
                  onClick={handlePrevTab}
                  disabled={landformKeys.indexOf(activeTab) === 0}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-300 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <button
                  onClick={onSwitchTurn}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-[11px] font-extrabold text-amber-300 flex items-center gap-1.5"
                >
                  <span>🔄 Pass Turn</span>
                </button>

                <button
                  onClick={handleNextTab}
                  disabled={landformKeys.indexOf(activeTab) === landformKeys.length - 1}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-white flex items-center gap-1 shadow-lg"
                >
                  <span>Next Landform</span>
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
