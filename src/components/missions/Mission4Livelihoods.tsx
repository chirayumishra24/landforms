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
  const [wrongAttempts, setWrongAttempts] = useState<Record<string, number>>({});
  const [eliminatedLandforms, setEliminatedLandforms] = useState<Record<string, LandformType[]>>({});
  const [livelihoodResolved, setLivelihoodResolved] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; isPassed?: boolean; text: string } | null>(null);

  const turnTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
    };
  }, []);

  const landformZones: { id: LandformType; label: string; icon: string }[] = [
    { id: 'mountains', label: 'Mountains', icon: '🏔️' },
    { id: 'plateaus', label: 'Plateaus', icon: '🟫' },
    { id: 'plains', label: 'Plains', icon: '🟩' },
    { id: 'valleys', label: 'Valleys', icon: '🏞️' },
    { id: 'coasts', label: 'Coastal Areas', icon: '🌊' }
  ];

  const handleAssignLivelihood = (item: LivelihoodItem, landform: LandformType) => {
    if (livelihoodResolved[item.id]) return;
    if (eliminatedLandforms[item.id]?.includes(landform)) return;

    soundEngine.playClick();
    setMatches(prev => ({ ...prev, [item.id]: landform }));

    const isMatch = item.primaryLandform === landform || item.alternateLandform === landform;
    const otherTeam = turnTeam === 'terraformers' ? 'earthkeepers' : 'terraformers';
    const attempts = wrongAttempts[item.id] || 0;

    if (isMatch) {
      soundEngine.playCorrect();
      const isSteal = attempts > 0;
      const points = isSteal ? 150 : 100;
      onAwardPoints(points, 'knowledge');
      setCorrectMatches(prev => ({ ...prev, [item.id]: true }));
      setLivelihoodResolved(prev => ({ ...prev, [item.id]: true }));

      setFeedback({
        isCorrect: true,
        isPassed: false,
        text: isSteal
          ? `🎯 STEAL SUCCESSFUL (+${points} LP for ${teams[turnTeam].name})! ${item.geographicalReason}`
          : `✓ EXCELLENT ALLOCATION (+${points} LP for ${teams[turnTeam].name})! ${item.geographicalReason}`
      });

      if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
      turnTimeoutRef.current = setTimeout(() => {
        onSwitchTurn();
      }, 2600);
    } else {
      soundEngine.playWrong();
      const nextAttempts = attempts + 1;
      setWrongAttempts(prev => ({ ...prev, [item.id]: nextAttempts }));
      setEliminatedLandforms(prev => ({
        ...prev,
        [item.id]: [...(prev[item.id] || []), landform]
      }));

      if (nextAttempts === 1) {
        soundEngine.playStealAlert();
        setFeedback({
          isCorrect: false,
          isPassed: true,
          text: `❌ SUBOPTIMAL GEOGRAPHY by ${teams[turnTeam].name}! Chance passes to ${teams[otherTeam].name} to allocate ${item.title}!`
        });
        if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
        turnTimeoutRef.current = setTimeout(() => {
          onSwitchTurn();
        }, 1800);
      } else {
        setLivelihoodResolved(prev => ({ ...prev, [item.id]: true }));
        setFeedback({
          isCorrect: false,
          isPassed: false,
          text: `❌ BOTH TEAMS MISSED! ${item.title} belongs in ${item.primaryLandform.toUpperCase()}: ${item.geographicalReason}`
        });
        if (turnTimeoutRef.current) clearTimeout(turnTimeoutRef.current);
        turnTimeoutRef.current = setTimeout(() => {
          onSwitchTurn();
        }, 2600);
      }
    }
  };

  const totalAssigned = Object.values(livelihoodResolved).filter(Boolean).length;
  const isMissionFinished = totalAssigned >= LIVELIHOODS.length;
  const isAnyStealActive = Object.values(wrongAttempts).some(att => att === 1) && feedback?.isPassed;

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-transparent text-slate-900 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b-2 border-slate-900 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-200 text-purple-950 text-xs font-black uppercase tracking-wider mb-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <Briefcase className="w-3.5 h-3.5 text-purple-900" />
              <span>Mission 3 of 4 • Economic Geography</span>
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

            <button
              onClick={() => { soundEngine.playClick(); onComplete(); }}
              className={`px-5 py-2 rounded-2xl border-2.5 border-slate-900 font-black text-xs sm:text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
                isMissionFinished
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 animate-bounce'
                  : 'bg-white hover:bg-amber-100 text-slate-900'
              }`}
            >
              <span>{isMissionFinished ? "COMPLETE MISSION ➔" : "PROCEED TO MISSION 4 ➔"}</span>
            </button>
          </div>
        </div>

        {/* Turn-based Smart Board Banner */}
        <TurnBanner
          turnTeam={turnTeam}
          teams={teams}
          onSwitchTurn={onSwitchTurn}
          actionPrompt="Choose the most suitable landform for this economic livelihood!"
          isStealActive={Boolean(isAnyStealActive)}
        />

        {/* Livelihoods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {LIVELIHOODS.map((item) => {
            const isDone = Boolean(livelihoodResolved[item.id]);
            const isCorrect = Boolean(correctMatches[item.id]);
            const currentChoice = matches[item.id];
            const eliminated = eliminatedLandforms[item.id] || [];

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border-2.5 border-slate-900 transition-all duration-300 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col justify-between ${
                  isDone
                    ? isCorrect
                      ? 'bg-emerald-100'
                      : 'bg-rose-100'
                    : 'bg-white hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    {isDone ? (
                      isCorrect ? (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-black border border-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Allocated
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-950 font-black border border-rose-900 flex items-center gap-1">
                          ❌ Unsolved
                        </span>
                      )
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
                      const isEliminated = eliminated.includes(zone.id);

                      return (
                        <button
                          key={zone.id}
                          onClick={() => handleAssignLivelihood(item, zone.id)}
                          disabled={isDone || isEliminated}
                          className={`p-1.5 rounded-xl text-[11px] font-black border-2 border-slate-900 transition flex items-center justify-center gap-1 cursor-pointer ${
                            isEliminated
                              ? 'bg-slate-200 text-slate-400 line-through opacity-50 cursor-not-allowed border-slate-400'
                              : isSelected && isCorrect
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
          <div className={`p-4 rounded-2xl border-2 border-slate-900 text-xs sm:text-sm font-bold flex items-start gap-2.5 shadow-[3px_3px_0px_0px_#0f172a] animate-fade-in ${
            feedback.isCorrect
              ? 'bg-emerald-100 text-emerald-950'
              : feedback.isPassed
              ? 'bg-amber-100 text-amber-950'
              : 'bg-rose-100 text-rose-950'
          }`}>
            <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${
              feedback.isCorrect ? 'text-emerald-700' : 'text-amber-700'
            }`} />
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

function isMatch(item: LivelihoodItem, zoneId: LandformType): boolean {
  return item.primaryLandform === zoneId || item.alternateLandform === zoneId;
}
