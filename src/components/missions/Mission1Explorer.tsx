"use client";

import React, { useState } from 'react';
import { LandformType, TeamId, TeamState } from '@/types/game';
import { LANDFORMS_DATA } from '@/data/landformsData';
import { LandformViewer3D } from '@/components/3d/LandformViewer3D';
import { TurnBanner } from '@/components/ui/TurnBanner';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Compass, Zap } from 'lucide-react';
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
      primaryUse: "Terrace Farming 🌾",
      icon: "🏔️"
    },
    plateaus: {
      elevation: "Elevated (~1,500m)",
      climate: "Dry & Breezy 🌬️",
      slope: "Sheer Cliff Scarp 🟫",
      primaryUse: "Mining & Power ⛏️",
      icon: "🟫"
    },
    plains: {
      elevation: "Lowland (<200m)",
      climate: "Temperate & Warm ☀️",
      slope: "Broad & Level 🟩",
      primaryUse: "Intensive Crops 🚜",
      icon: "🟩"
    },
    valleys: {
      elevation: "Sheltered Basin 🏞️",
      climate: "Temperate Climate 🍏",
      slope: "U-Shaped Trough ⛰️",
      primaryUse: "Fruit Orchards 🍎",
      icon: "🏞️"
    },
    coasts: {
      elevation: "Sea Level (0m) 🌊",
      climate: "Maritime Breeze 🌴",
      slope: "Shores & Cliffs 🏖️",
      primaryUse: "Seaports & Trade ⚓",
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
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-transparent text-slate-900 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b-2 border-slate-900 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-950 text-xs font-black uppercase tracking-wider mb-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <Compass className="w-3.5 h-3.5 text-blue-700" />
              <span>Mission 1: Landform Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 flex items-center gap-2">
              <span>EXPLORE & SHAPE THE LAND</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2.5 border-slate-900 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-xs text-slate-700 font-black uppercase">Regions Cleared:</span>
              <span className="text-sm font-black text-emerald-600">{totalAnswered} / 5</span>
            </div>
            {isMissionFinished && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 border-2.5 border-slate-900 text-slate-950 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-2 animate-bounce cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap border-2.5 border-slate-900 cursor-pointer ${
                  isActive
                    ? 'bg-yellow-300 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] scale-105'
                    : 'bg-white hover:bg-amber-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                }`}
              >
                <span className="text-xl">{lf.icon}</span>
                <span>{lf.name}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />}
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
              <div className="p-3 rounded-2xl bg-blue-100 border-2 border-slate-900 text-center flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] uppercase font-black text-blue-900">Elevation</span>
                <span className="text-xs font-black text-slate-950 mt-0.5">{dials.elevation}</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-100 border-2 border-slate-900 text-center flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] uppercase font-black text-cyan-900">Climate</span>
                <span className="text-xs font-black text-slate-950 mt-0.5">{dials.climate}</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-100 border-2 border-slate-900 text-center flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] uppercase font-black text-amber-900">Slope</span>
                <span className="text-xs font-black text-slate-950 mt-0.5">{dials.slope}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-100 border-2 border-slate-900 text-center flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_#0f172a]">
                <span className="text-[10px] uppercase font-black text-emerald-900">Human Use</span>
                <span className="text-xs font-black text-slate-950 mt-0.5 truncate max-w-[110px]">{dials.primaryUse}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hands-on Activities (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Activity 1: 3D Feature Scan Tracker */}
            <div className="p-4 rounded-3xl bg-white border-3 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-950">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Activity 1: Scan 3D Features ({currentScannedCount}/3)</span>
                </div>
                <span className="text-[11px] font-black text-slate-950 bg-yellow-300 px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]">
                  +25 LP per Scan
                </span>
              </div>

              <p className="text-xs text-slate-700 font-bold mb-2.5">
                Touch the glowing pins on the 3D model or tap below to scan key features:
              </p>

              <div className="grid grid-cols-3 gap-2">
                {activeTab === 'mountains' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Glacial Summit")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Glacial Summit")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>❄️ Summit</span>
                      {scannedFeatures[activeTab]?.has("Glacial Summit") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Terrace Steps")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Terrace Steps")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🚜 Terraces</span>
                      {scannedFeatures[activeTab]?.has("Terrace Steps") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Alpine Basecamp")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Alpine Basecamp")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>⛺ Basecamp</span>
                      {scannedFeatures[activeTab]?.has("Alpine Basecamp") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                  </>
                )}

                {activeTab === 'plateaus' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Tableland Summit")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Tableland Summit")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🟫 Tableland</span>
                      {scannedFeatures[activeTab]?.has("Tableland Summit") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Plunging Waterfall")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Plunging Waterfall")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>💧 Waterfall</span>
                      {scannedFeatures[activeTab]?.has("Plunging Waterfall") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Mineral Quarry")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Mineral Quarry")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>⛏️ Quarry</span>
                      {scannedFeatures[activeTab]?.has("Mineral Quarry") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                  </>
                )}

                {activeTab === 'plains' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Alluvial Farms")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Alluvial Farms")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🌾 Farmland</span>
                      {scannedFeatures[activeTab]?.has("Alluvial Farms") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Perennial River")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Perennial River")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🌊 River</span>
                      {scannedFeatures[activeTab]?.has("Perennial River") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Grain Barn & Silo")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Grain Barn & Silo")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🚜 Farmstead</span>
                      {scannedFeatures[activeTab]?.has("Grain Barn & Silo") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                  </>
                )}

                {activeTab === 'valleys' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Sheltered Corridor")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Sheltered Corridor")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🏞️ Corridor</span>
                      {scannedFeatures[activeTab]?.has("Sheltered Corridor") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Terrace Settlements")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Terrace Settlements")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🏘️ Village</span>
                      {scannedFeatures[activeTab]?.has("Terrace Settlements") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Fruit Orchards")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Fruit Orchards")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🍎 Orchards</span>
                      {scannedFeatures[activeTab]?.has("Fruit Orchards") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                  </>
                )}

                {activeTab === 'coasts' && (
                  <>
                    <button
                      onClick={() => handleSelectHotspot("Coastal Lighthouse")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Coastal Lighthouse")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🚨 Lighthouse</span>
                      {scannedFeatures[activeTab]?.has("Coastal Lighthouse") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Natural Bay & Dock")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Natural Bay & Dock")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>⚓ Harbor</span>
                      {scannedFeatures[activeTab]?.has("Natural Bay & Dock") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleSelectHotspot("Sandy Dunes & Palms")}
                      className={`p-2 rounded-2xl border-2 border-slate-900 text-xs font-black transition flex items-center justify-between cursor-pointer ${
                        scannedFeatures[activeTab]?.has("Sandy Dunes & Palms")
                          ? 'bg-emerald-200 text-emerald-950 shadow-[2px_2px_0px_0px_#0f172a]'
                          : 'bg-white hover:bg-slate-50 text-slate-800 shadow-[2px_2px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>🌴 Dunes</span>
                      {scannedFeatures[activeTab]?.has("Sandy Dunes & Palms") && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Activity 2: Smart Board Team Action Challenge */}
            <div className="p-5 rounded-3xl bg-white border-3 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-950 uppercase tracking-wide">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Activity 2: Team Action Challenge</span>
                </div>
                <div className="text-xs font-black text-slate-950 bg-yellow-300 px-3 py-0.5 rounded-full border-2 border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]">
                  +100 LIFE POINTS
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-black text-slate-950 mb-3.5 leading-snug">
                {currentLandform.question.prompt}
              </h4>

              {/* 4 Tactile Smart Board Touch Cards */}
              <div className="space-y-2">
                {currentLandform.question.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[activeTab] === idx;
                  const isCorrectAnswer = idx === currentLandform.question.correctIdx;
                  const hasAnswered = selectedAnswers[activeTab] !== undefined;

                  let optClass = "bg-amber-50/70 border-slate-900 text-slate-900 hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      optClass = "bg-emerald-200 border-emerald-950 text-emerald-950 font-black shadow-[4px_4px_0px_0px_#064e3b] ring-2 ring-emerald-400";
                    } else if (isSelected) {
                      optClass = "bg-rose-100 border-rose-950 text-rose-950 font-bold shadow-[2px_2px_0px_0px_#881337]";
                    } else {
                      optClass = "bg-slate-100 border-slate-300 text-slate-400 opacity-60 shadow-none";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answeredCorrectly[activeTab]}
                      className={`w-full p-3 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Banner */}
              {feedback && (
                <div className={`mt-3 p-3 rounded-2xl border-2 border-slate-900 text-xs sm:text-sm font-bold leading-relaxed flex items-start gap-2 shadow-[3px_3px_0px_0px_#0f172a] animate-fade-in ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 text-emerald-950'
                    : 'bg-rose-100 text-rose-950'
                }`}>
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* Next/Prev Navigation & Pass Turn */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-slate-900">
                <button
                  onClick={handlePrevTab}
                  disabled={landformKeys.indexOf(activeTab) === 0}
                  className="px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-slate-900 flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a] cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <button
                  onClick={onSwitchTurn}
                  className="px-3.5 py-1.5 rounded-2xl bg-yellow-300 hover:bg-yellow-400 border-2 border-slate-900 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🔄 Pass Turn</span>
                </button>

                <button
                  onClick={handleNextTab}
                  disabled={landformKeys.indexOf(activeTab) === landformKeys.length - 1}
                  className="px-4 py-2 rounded-2xl bg-blue-500 hover:bg-blue-400 border-2 border-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-white flex items-center gap-1 shadow-[3px_3px_0px_0px_#0f172a] cursor-pointer"
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
