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
      title: "Mountains: Towering Glaciers & Slopes",
      points: [
        "High elevations (>600m) with rugged conical peaks and cool climates.",
        "Glaciers provide perennial water sources for continental river systems.",
        "Terrace farming carves stepped fields into slopes to control rapid water runoff.",
        "Attracts adventure tourism, trekking, and seasonal pastoralism (transhumance)."
      ],
      border: "border-blue-500/30",
      accent: "from-blue-500/10 to-slate-900/80"
    },
    {
      icon: "🟫",
      title: "Plateaus: Mineral-Rich Tablelands",
      points: [
        "Elevated flat-topped land (tableland) with steep escarpment edges.",
        "Global storehouses of iron ore, coal, bauxite, gold, and manganese.",
        "Waterfalls form where plateau rivers plummet over steep cliff ledges.",
        "Lava plateaus (like Deccan) possess rich black soils ideal for cotton farming."
      ],
      border: "border-amber-500/30",
      accent: "from-amber-500/10 to-slate-900/80"
    },
    {
      icon: "🟩",
      title: "Plains: The Cradles of Civilisation",
      points: [
        "Vast, flat lowlands under 200m elevation formed by river alluvium deposition.",
        "Extremely fertile soils yield multiple crop harvests each year.",
        "Flat topography makes constructing highway grids, railways, and cities easy.",
        "Highest population densities on Earth due to hospitable living conditions."
      ],
      border: "border-emerald-500/30",
      accent: "from-emerald-500/10 to-slate-900/80"
    },
    {
      icon: "🏞️",
      title: "Valleys: Sheltered River Corridors",
      points: [
        "Low depressions carved between mountain ridges by rivers or glaciers.",
        "Protected from harsh alpine winds, providing mild microclimates.",
        "Act as natural corridors and mountain passes for historical trade routes.",
        "Ideal for temperate fruit orchards (apples, walnuts, apricots) and tourism."
      ],
      border: "border-teal-500/30",
      accent: "from-teal-500/10 to-slate-900/80"
    },
    {
      icon: "🌊",
      title: "Coastal Areas: Gateways to the Ocean",
      points: [
        "Dynamic interface where continental landmass meets ocean water.",
        "Sheltered natural bays house deepwater ports for global merchant shipping.",
        "Supports marine fishing, fish processing, aquaculture, and beach tourism.",
        "Mangrove bio-shields and sand dunes absorb destructive storm surges."
      ],
      border: "border-cyan-500/30",
      accent: "from-cyan-500/10 to-slate-900/80"
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-8 bg-slate-950 text-white select-none">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Class 6 Geography Core Curriculum Review</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
            WHAT DID WE DISCOVER?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Landforms are never just static shapes on a map. They govern human life, livelihoods, cultures, and survival.
          </p>
        </div>

        {/* 5 Landform Takeaway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {takeaways.map((card, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl bg-gradient-to-b ${card.accent} border ${card.border} shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{card.icon}</span>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">{card.title}</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  {card.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Slogan Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white shadow-xl flex flex-col items-center justify-center text-center">
            <Sparkles className="w-8 h-8 text-amber-300 mb-3 animate-spin" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">The Ultimate Lesson</span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 mb-2">
              &quot;Different land. Different life.&quot;
            </h3>
            <p className="text-xs text-emerald-100 max-w-xs">
              When we respect and adapt to the natural laws of our geography, human society and nature both thrive.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-6">
          <button
            onClick={() => { soundEngine.playClick(); onRestart(); }}
            className="px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Expedition</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); onExploreMap(); }}
            className="px-10 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 transition transform hover:scale-105"
          >
            <Map className="w-4 h-4" />
            <span>Return to Interactive Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
