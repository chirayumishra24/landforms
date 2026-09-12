"use client";

import React from 'react';
import { BookOpen, Sparkles, RotateCcw, Map, Award, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  onRestart: () => void;
  onExploreMap: () => void;
}

export const LearningSummary: React.FC<Props> = ({ onRestart, onExploreMap }) => {
  const takeaways = [
    {
      icon: "🏔️",
      title: "Mountains: Glaciers & Slopes",
      points: [
        "High elevations (>600m) with rugged conical peaks and cool climates.",
        "Glaciers provide perennial water sources for continental river systems.",
        "Terrace farming carves stepped fields into slopes to control runoff.",
        "Attracts adventure tourism, trekking, and seasonal transhumance pastoralism."
      ],
      border: "border-sky-500",
      accent: "bg-sky-50"
    },
    {
      icon: "🟫",
      title: "Plateaus: Mineral Tablelands",
      points: [
        "Elevated flat-topped land (tableland) with steep escarpment edges.",
        "Global storehouses of iron ore, coal, bauxite, gold, and manganese.",
        "Waterfalls form where plateau rivers plummet over steep cliff ledges.",
        "Lava plateaus (like Deccan) possess rich black soils ideal for cotton."
      ],
      border: "border-amber-500",
      accent: "bg-amber-50"
    },
    {
      icon: "🟩",
      title: "Plains: Civilisation Cradles",
      points: [
        "Vast, flat lowlands under 200m formed by river alluvium deposition.",
        "Extremely fertile soils yield multiple crop harvests each year.",
        "Flat topography makes constructing highways, railways, and cities easy.",
        "Highest population densities on Earth due to hospitable conditions."
      ],
      border: "border-emerald-500",
      accent: "bg-emerald-50"
    },
    {
      icon: "🏞️",
      title: "Valleys: River Corridors",
      points: [
        "Low depressions carved between mountain ridges by rivers or glaciers.",
        "Protected from harsh alpine winds, providing mild microclimates.",
        "Act as natural corridors and mountain passes for historical trade routes.",
        "Ideal for temperate fruit orchards (apples, walnuts, apricots) & tourism."
      ],
      border: "border-purple-500",
      accent: "bg-purple-50"
    },
    {
      icon: "🌊",
      title: "Coastal: Ocean Gateways",
      points: [
        "Dynamic interface where continental landmass meets ocean water.",
        "Sheltered natural bays house deepwater ports for merchant shipping.",
        "Supports marine fishing, fish processing, aquaculture, and tourism.",
        "Mangrove bio-shields and sand dunes absorb destructive storm surges."
      ],
      border: "border-teal-500",
      accent: "bg-teal-50"
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-8 text-slate-900 select-none">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-300 text-slate-900 text-xs font-black uppercase tracking-wider mb-2 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
            <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
            <span>Class 6 Geography Core Curriculum Review</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2">
            WHAT DID WE DISCOVER?
          </h2>
          <p className="text-slate-700 font-medium text-sm sm:text-base max-w-xl mx-auto">
            Landforms are never just static shapes on a map. They govern human life, livelihoods, cultures, and survival.
          </p>
        </div>

        {/* 5 Landform Takeaway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {takeaways.map((card, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl ${card.accent} border-3 border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-3xl">{card.icon}</span>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">{card.title}</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
                  {card.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-900 font-black mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Slogan Card */}
          <div className="p-6 rounded-3xl bg-yellow-300 border-3 border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] text-slate-900 flex flex-col items-center justify-center text-center">
            <Sparkles className="w-8 h-8 text-amber-800 mb-2 animate-bounce" />
            <span className="text-xs uppercase font-black tracking-widest text-slate-800">The Ultimate Lesson</span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 mb-2">
              &quot;Different land. Different life.&quot;
            </h3>
            <p className="text-xs font-bold text-slate-800 max-w-xs">
              When we respect and adapt to the natural laws of our geography, human society and nature both thrive.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 border-t-2 border-slate-900/20 pt-6">
          <button
            onClick={() => { soundEngine.playClick(); onRestart(); }}
            className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border-2.5 border-slate-900 text-xs font-black text-slate-900 shadow-[3px_3px_0px_0px_#0f172a] flex items-center gap-2 transition transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Expedition</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); onExploreMap(); }}
            className="px-10 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 border-2.5 border-slate-900 text-slate-900 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-2 transition transform hover:scale-105 active:scale-95"
          >
            <Map className="w-4 h-4" />
            <span>Return to Interactive Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
