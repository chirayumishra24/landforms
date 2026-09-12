"use client";

import React, { useState } from 'react';
import { LandformType } from '@/types/game';
import { TurnBanner } from '@/components/ui/TurnBanner';
import { TeamId, TeamState } from '@/types/game';
import { CheckCircle2, Briefcase, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  turnTeam: TeamId;
  teams: Record<TeamId, TeamState>;
  onSwitchTurn: () => void;
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'knowledge') => void;
}

interface LivelihoodItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  primaryLandform: LandformType;
  alternateLandform?: LandformType;
  geographicalReason: string;
}

const LIVELIHOODS: LivelihoodItem[] = [
  {
    id: "agriculture",
    title: "Large-Scale Agriculture",
    icon: "🌾",
    description: "Extensive crop cultivation (wheat, paddy, pulses, sugarcane) with mechanized harvesting and irrigation canals.",
    primaryLandform: "plains",
    geographicalReason: "Broad, flat river plains deposit perennial nutrient-rich alluvium and make gravity canal irrigation and tractor transport effortless."
  },
  {
    id: "fishing",
    title: "Commercial Marine Fishing & Aquaculture",
    icon: "🎣",
    description: "Deep sea trawling, coastal fish farming, shrimp hatcheries, and dried fish processing units.",
    primaryLandform: "coasts",
    geographicalReason: "Sheltered coastal bays provide safe mooring for fishing fleets, shallow continental shelves support marine life, and global maritime shipping routes are directly accessible."
  },
  {
    id: "mining",
    title: "Open-Cast & Underground Mining",
    icon: "⛏️",
    description: "Excavation and extraction of iron ore, coal, bauxite, manganese, and limestone.",
    primaryLandform: "plateaus",
    geographicalReason: "Plateaus are ancient geological tablelands formed by tectonic uplift and volcanic magma flows, making them the richest storehouses of industrial minerals on Earth."
  },
  {
    id: "pastoralism",
    title: "Pastoral Animal Husbandry",
    icon: "🐐",
    description: "Herding sheep, goats, and yaks in high-altitude meadows (Bugyals) for wool, milk, and cheese.",
    primaryLandform: "mountains",
    alternateLandform: "plateaus",
    geographicalReason: "Mountain slopes support seasonal alpine pastures. Communities practice transhumance—migrating up to high meadows in summer and returning to sheltered valleys before winter."
  },
  {
    id: "tourism",
    title: "Adventure & Scenic Eco-Tourism",
    icon: "🏔️",
    description: "Mountaineering expeditions, ski resorts, hiking trails, paragliding, and cool summer retreats.",
    primaryLandform: "mountains",
    alternateLandform: "coasts",
    geographicalReason: "Dramatic elevation, cooler alpine climates, snow-covered summits, and breathtaking vertical scenery attract tourists escaping warm lowlands."
  },
  {
    id: "forestry",
    title: "Sustainable Forestry & Horticulture",
    icon: "🌳",
    description: "Harvesting timber, medicinal herbs, resin, and cultivating apple, apricot, and walnut orchards.",
    primaryLandform: "valleys",
    alternateLandform: "mountains",
    geographicalReason: "Sheltered valleys with well-drained fertile soils and protection from freezing ridge winds provide ideal microclimates for commercial fruit orchards and timber."
  }
];

export const Mission4Livelihoods: React.FC<Props> = ({
  turnTeam,
  teams,
  onSwitchTurn,
  onComplete,
  onAwardPoints
}) => {
  const [matches, setMatches] = useState<Record<string, LandformType>>({});
  const [correctMatches, setCorrectMatches] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const landformZones: { id: LandformType; label: string; icon: string }[] = [
    { id: 'mountains', label: 'Mountains', icon: '🏔️' },
    { id: 'plateaus', label: 'Plateaus', icon: '🟫' },
    { id: 'plains', label: 'Plains', icon: '🟩' },
    { id: 'valleys', label: 'Valleys', icon: '🏞️' },
    { id: 'coasts', label: 'Coastal Areas', icon: '🌊' }
  ];

  const handleAssignLivelihood = (item: LivelihoodItem, landform: LandformType) => {
    soundEngine.playClick();
    setMatches(prev => ({ ...prev, [item.id]: landform }));

    const isMatch = item.primaryLandform === landform || item.alternateLandform === landform;

    if (isMatch) {
      if (!correctMatches[item.id]) {
        soundEngine.playCorrect();
        onAwardPoints(100, 'knowledge');
        setCorrectMatches(prev => ({ ...prev, [item.id]: true }));
      }
      setFeedback(`✓ EXCELLENT ALLOCATION (+100 LP): ${item.geographicalReason}`);
    } else {
      soundEngine.playWrong();
      setFeedback(`⚠️ Suboptimal geography: ${landform.toUpperCase()} does not naturally provide the resources required for ${item.title}. Consider the underlying minerals, soils, and elevation!`);
    }
  };

  const totalAssigned = Object.values(correctMatches).filter(Boolean).length;
  const isMissionFinished = totalAssigned >= LIVELIHOODS.length;

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-transparent text-slate-900 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b-2 border-slate-900 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-200 text-purple-950 text-xs font-black uppercase tracking-wider mb-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <Briefcase className="w-3.5 h-3.5 text-purple-900" />
              <span>Mission 4 of 5 • Economic Geography</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 flex items-center gap-2">
              <span>💼 LAND & LIVELIHOODS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-bold">
              Discover how physical terrain offers unique economic opportunities while imposing natural constraints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2.5 border-slate-900 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="text-xs text-slate-700 font-black">Assigned:</span>
              <span className="text-sm font-black text-emerald-700">{totalAssigned} / {LIVELIHOODS.length}</span>
            </div>

            {isMissionFinished && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 border-2.5 border-slate-900 text-slate-950 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-2 animate-bounce cursor-pointer"
              >
                <span>COMPLETE MISSION ➔</span>
              </button>
            )}
          </div>
        </div>

        {/* Turn-based Smart Board Banner */}
        <TurnBanner
          turnTeam={turnTeam}
          teams={teams}
          onSwitchTurn={onSwitchTurn}
          actionPrompt="Choose the most suitable landform for this economic livelihood!"
        />

        {/* Livelihoods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {LIVELIHOODS.map((item) => {
            const isDone = correctMatches[item.id];
            const currentChoice = matches[item.id];

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border-2.5 border-slate-900 transition-all duration-300 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-100'
                    : 'bg-white hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    {isDone ? (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-black border border-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Allocated
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-600 uppercase tracking-wider font-black">Unassigned</span>
                    )}
                  </div>

                  <h3 className="font-black text-base text-slate-950 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-800 font-bold leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Landform Buttons */}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-600 mb-2">
                    Allocate to Landform:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {landformZones.map((zone) => {
                      const isSelected = currentChoice === zone.id;

                      return (
                        <button
                          key={zone.id}
                          onClick={() => handleAssignLivelihood(item, zone.id)}
                          disabled={isDone}
                          className={`p-1.5 rounded-xl text-[11px] font-black border-2 border-slate-900 transition flex items-center justify-center gap-1 cursor-pointer ${
                            isSelected && isDone
                              ? 'bg-emerald-300 text-emerald-950 shadow-[1px_1px_0px_0px_#0f172a]'
                              : isSelected && !isMatch(item, zone.id)
                              ? 'bg-rose-200 text-rose-950'
                              : 'bg-amber-50 hover:bg-yellow-200 text-slate-900 shadow-[1px_1px_0px_0px_#0f172a]'
                          }`}
                        >
                          <span>{zone.icon}</span>
                          <span className="truncate">{zone.label}</span>
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
        {feedback && (
          <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-slate-900 text-xs sm:text-sm text-emerald-950 font-bold flex items-start gap-2.5 shadow-[3px_3px_0px_0px_#0f172a] animate-fade-in">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <span>{feedback}</span>
          </div>
        )}
      </div>
    </div>
  );
};

function isMatch(item: LivelihoodItem, zoneId: LandformType): boolean {
  return item.primaryLandform === zoneId || item.alternateLandform === zoneId;
}
