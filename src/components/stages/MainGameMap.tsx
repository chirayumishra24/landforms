"use client";

import React, { useState } from 'react';
import { GameStage, PlacedBuilding } from '@/types/game';
import { CheckCircle2, Lock, Sparkles, MapPin, Compass, Trophy, Zap, AlertTriangle, ArrowRight } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  completedMissions: string[];
  regionHealth: number;
  placedBuildings: PlacedBuilding[];
  routeConnected: boolean;
  onSelectMission: (stage: GameStage) => void;
}

export const MainGameMap: React.FC<Props> = ({
  completedMissions,
  regionHealth,
  placedBuildings,
  routeConnected,
  onSelectMission
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const missions = [
    {
      id: "mission_1",
      stage: "mission_1" as GameStage,
      number: 1,
      title: "Landform Explorer",
      icon: "🔍",
      x: 24, // percentage
      y: 18,
      landform: "Mountains & Plateaus",
      description: "Explore elevations, slopes, and identify major physical landforms."
    },
    {
      id: "mission_2",
      stage: "mission_2" as GameStage,
      number: 2,
      title: "Life Adapts",
      icon: "🌱",
      x: 16,
      y: 52,
      landform: "River Valley",
      description: "Match human livelihoods and animal adaptations to their terrain."
    },
    {
      id: "mission_3",
      stage: "mission_3" as GameStage,
      number: 3,
      title: "Build a Settlement",
      icon: "🏘️",
      x: 78,
      y: 28,
      landform: "Plateau & Highland Plain",
      description: "Construct settlements, choose fertile farmland, and route roads."
    },
    {
      id: "mission_4",
      stage: "mission_4" as GameStage,
      number: 4,
      title: "Land & Livelihoods",
      icon: "💼",
      x: 52,
      y: 56,
      landform: "Alluvial Plains",
      description: "Allocate agriculture, mining, fishing, and tourism strategically."
    },
    {
      id: "mission_5",
      stage: "mission_5" as GameStage,
      number: 5,
      title: "Geography Crisis",
      icon: "🚨",
      x: 82,
      y: 65,
      landform: "Coastal Zone & Estuary",
      description: "Respond to cyclones, floods, landslides, and seasonal droughts."
    }
  ];

  const isMissionUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevMission = missions[index - 1];
    return completedMissions.includes(prevMission.id);
  };

  const isBlitzUnlocked = completedMissions.includes("mission_5");
  const isRestoreUnlocked = completedMissions.includes("mission_5");

  const handleNodeClick = (stage: GameStage, unlocked: boolean) => {
    if (!unlocked) {
      soundEngine.playWrong();
      return;
    }
    soundEngine.playClick();
    onSelectMission(stage);
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-3 sm:p-6 bg-slate-950 text-white flex flex-col items-center justify-between select-none">
      {/* Map Header Controls */}
      <div className="w-full max-w-7xl flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
            <span>🗺️ REGIONAL TACTICAL MAP</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              Interactive Territory
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click on unlocked mission sites to survey the geography, make decisions, and evolve the landscape.
          </p>
        </div>

        {/* Region Evolution Pill */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-white/10 px-4 py-2 rounded-2xl shadow-lg">
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Region Evolution</div>
            <div className="text-xs sm:text-sm font-extrabold text-emerald-400">
              {regionHealth < 25 && "Stage 0: Uncharted Wilderness"}
              {regionHealth >= 25 && regionHealth < 50 && "Stage 1: First Settlements (25%)"}
              {regionHealth >= 50 && regionHealth < 75 && "Stage 2: Agricultural Bloom (50%)"}
              {regionHealth >= 75 && regionHealth < 95 && "Stage 3: Connected Infrastructure (75%)"}
              {regionHealth >= 95 && "Stage 4: Thriving Eco-Civilisation (100%)"}
            </div>
          </div>
          <div className="text-2xl">
            {regionHealth < 25 ? "⛰️" : regionHealth < 50 ? "🏘️" : regionHealth < 75 ? "🌾" : "🌟"}
          </div>
        </div>
      </div>

      {/* Main Interactive Geographic Map Canvas */}
      <div className="relative w-full max-w-7xl aspect-[16/9] max-h-[72vh] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-slate-900">
        {/* SVG Detailed Geographic Illustrated Terrain */}
        <svg
          viewBox="0 0 1200 675"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Mountain Gradient */}
            <linearGradient id="snowPeak" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="35%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            {/* Plateau Gradient */}
            <linearGradient id="plateauGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="40%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            {/* Plains Gradient */}
            <linearGradient id="plainsGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4d7c0f" />
              <stop offset="50%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
            {/* River Gradient */}
            <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            {/* Ocean Gradient */}
            <radialGradient id="oceanGrad" cx="85%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>

          {/* 1. Base Sea & Ocean Coastline (Bottom & Right) */}
          <rect width="1200" height="675" fill="url(#oceanGrad)" />

          {/* Coastal Beach & Sandbars */}
          <path
            d="M 550,675 C 650,560 720,530 840,480 C 960,430 1020,380 1200,320 L 1200,0 L 0,0 L 0,675 Z"
            fill="#fef08a"
            opacity="0.9"
          />

          {/* 2. Main Continental Landmass (Plains Base) */}
          <path
            d="M 520,675 C 620,550 690,520 810,470 C 930,420 990,370 1200,300 L 1200,0 L 0,0 L 0,675 Z"
            fill="url(#plainsGrad)"
          />

          {/* 3. Elevated Plateau (Upper Right Tableland) */}
          <polygon
            points="680,110 980,90 1140,240 820,290 680,180"
            fill="url(#plateauGrad)"
            stroke="#b45309"
            strokeWidth="4"
          />
          {/* Plateau Escarpment Shadow */}
          <polygon
            points="820,290 1140,240 1150,270 830,320"
            fill="#451a03"
            opacity="0.8"
          />
          {/* Plateau Waterfall Cascading into Valley */}
          <path
            d="M 825,290 C 828,320 830,350 845,390"
            stroke="#bae6fd"
            strokeWidth="5"
            strokeDasharray="4,2"
            fill="none"
          />

          {/* 4. High Mountain Range (Upper Left to Center) */}
          {/* Mountain Ridge 1 (Far peaks) */}
          <polygon points="40,220 180,60 300,240" fill="url(#snowPeak)" />
          <polygon points="180,60 210,120 150,120" fill="#ffffff" />

          {/* Mountain Ridge 2 (Highest Pinnacle) */}
          <polygon points="170,240 330,30 480,260" fill="url(#snowPeak)" />
          <polygon points="330,30 370,110 290,110" fill="#ffffff" />

          {/* Mountain Ridge 3 (Valley flank) */}
          <polygon points="340,260 490,70 620,270" fill="url(#snowPeak)" />
          <polygon points="490,70 530,140 450,140" fill="#ffffff" />

          {/* Rocky Foothills & Scree Slopes */}
          <path
            d="M 30,240 Q 200,280 340,260 T 630,280"
            stroke="#475569"
            strokeWidth="8"
            fill="none"
            opacity="0.6"
          />

          {/* 5. Forest Belts (Alpine Pines & Riparian Woods) */}
          {/* Alpine Forest along mountain slopes */}
          {[
            { x: 120, y: 220 }, { x: 160, y: 240 }, { x: 200, y: 210 },
            { x: 260, y: 230 }, { x: 320, y: 250 }, { x: 420, y: 240 },
            { x: 500, y: 260 }, { x: 580, y: 270 }
          ].map((pt, i) => (
            <text key={`tree-${i}`} x={pt.x} y={pt.y} fontSize="20" opacity="0.85">🌲</text>
          ))}

          {/* 6. Perennial River & Valley Corridor */}
          {/* River emerges from mountain glacier, winds through valley, passes plains, splits into delta */}
          <path
            d="M 330,110 C 320,180 280,260 230,340 C 180,410 260,470 380,450 C 490,430 580,480 660,440 C 740,400 810,480 880,510 C 950,540 1020,530 1100,610"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* River Tributary from Plateau Waterfall */}
          <path
            d="M 845,390 C 850,430 870,470 880,510"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* 7. Delta & Mangrove Estuary on Coast */}
          {[
            { x: 920, y: 550 }, { x: 960, y: 580 }, { x: 1010, y: 560 }, { x: 1060, y: 620 }
          ].map((pt, i) => (
            <text key={`mangrove-${i}`} x={pt.x} y={pt.y} fontSize="18" opacity="0.9">🌳</text>
          ))}

          {/* Dynamic Region Evolution Elements (Buildings, Farms, Roads, Ships) */}
          {/* 25% Health: Settlements appear */}
          {regionHealth >= 25 && (
            <g className="transition-opacity duration-1000">
              <text x="260" y="380" fontSize="26">🏘️</text>
              <text x="300" y="395" fontSize="22">🏠</text>
              <text x="720" y="390" fontSize="28">🏙️</text>
              <text x="890" y="470" fontSize="24">🏘️</text>
            </g>
          )}

          {/* 50% Health: Farms & Crops appear */}
          {regionHealth >= 50 && (
            <g className="transition-opacity duration-1000">
              <text x="440" y="420" fontSize="26">🌾</text>
              <text x="480" y="415" fontSize="26">🌾</text>
              <text x="520" y="430" fontSize="26">🌾</text>
              <text x="600" y="380" fontSize="24">🚜</text>
              <text x="730" y="240" fontSize="22">⛏️</text>
            </g>
          )}

          {/* 75% Health: Roads, Bridges, and Infrastructure */}
          {regionHealth >= 75 && (
            <g className="transition-opacity duration-1000">
              {/* Road network linking settlement to farm to town to port */}
              <path
                d="M 280,390 Q 420,440 460,420 T 730,400 T 960,530"
                fill="none"
                stroke="#fed7aa"
                strokeWidth="4"
                strokeDasharray="6,4"
              />
              <text x="420" y="460" fontSize="20">🌉</text>
              <text x="960" y="530" fontSize="28">🚢</text>
              <text x="680" y="420" fontSize="20">🏥</text>
              <text x="340" y="410" fontSize="20">🏫</text>
            </g>
          )}

          {/* 100% Health: Thriving Ecosystem, Birds & Wildlife */}
          {regionHealth >= 95 && (
            <g className="transition-opacity duration-1000">
              <text x="180" y="160" fontSize="22">🦅</text>
              <text x="760" y="160" fontSize="20">🐐</text>
              <text x="1050" y="520" fontSize="22">⛵</text>
              <text x="1120" y="580" fontSize="20">🐬</text>
              <circle cx="960" cy="530" r="40" fill="#38bdf8" opacity="0.2" className="animate-ping" />
            </g>
          )}

          {/* Render User Placed Custom Buildings (from Mission 3) */}
          {placedBuildings.map((b) => (
            <text
              key={b.id}
              x={(b.x / 100) * 1200}
              y={(b.y / 100) * 675}
              fontSize="28"
              className="drop-shadow-lg animate-bounce"
            >
              {b.buildingId === 'settlement' && '🏘️'}
              {b.buildingId === 'farm' && '🌾'}
              {b.buildingId === 'water_canal' && '💧'}
              {b.buildingId === 'school' && '🏫'}
              {b.buildingId === 'hospital' && '🏥'}
              {b.buildingId === 'road' && '🛣️'}
              {b.buildingId === 'eco_reserve' && '🌳'}
            </text>
          ))}
        </svg>

        {/* Interactive Mission Nodes Placed On Map */}
        {missions.map((m, idx) => {
          const unlocked = isMissionUnlocked(idx);
          const isComplete = completedMissions.includes(m.id);

          return (
            <div
              key={m.id}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              onMouseEnter={() => setHoveredNode(m.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <button
                onClick={() => handleNodeClick(m.stage, unlocked)}
                disabled={!unlocked}
                className={`relative group flex flex-col items-center transition-transform duration-300 ${
                  unlocked ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed opacity-65'
                }`}
              >
                {/* Ping animation when unlocked and not yet completed */}
                {unlocked && !isComplete && (
                  <span className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping" />
                )}

                {/* Node Circle Badge */}
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-base sm:text-xl shadow-2xl border-2 transition-all ${
                    isComplete
                      ? 'bg-emerald-600 border-emerald-300 text-white ring-4 ring-emerald-500/40'
                      : unlocked
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-amber-200 text-slate-950 ring-4 ring-amber-500/50 animate-pulse'
                      : 'bg-slate-800 border-slate-600 text-slate-400'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  ) : unlocked ? (
                    <span className="flex items-center gap-0.5">
                      <span>{m.number}</span>
                    </span>
                  ) : (
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />
                  )}
                </div>

                {/* Node Label Ribbon */}
                <div
                  className={`mt-1.5 px-2.5 py-0.5 rounded-xl text-[10px] sm:text-xs font-black tracking-wide whitespace-nowrap shadow-md border backdrop-blur-md transition-colors ${
                    isComplete
                      ? 'bg-emerald-900/90 text-emerald-200 border-emerald-500/50'
                      : unlocked
                      ? 'bg-slate-900/95 text-white border-amber-400/60'
                      : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
                >
                  {isComplete ? `✓ M${m.number}: DONE` : `M${m.number}: ${m.title}`}
                </div>
              </button>
            </div>
          );
        })}

        {/* Special Node 6: Landform Blitz */}
        <div
          style={{ left: '42%', top: '78%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <button
            onClick={() => handleNodeClick('blitz', isBlitzUnlocked)}
            disabled={!isBlitzUnlocked}
            className={`group flex flex-col items-center transition-transform ${
              isBlitzUnlocked ? 'hover:scale-110 cursor-pointer animate-bounce' : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-cyan-200 text-white flex items-center justify-center text-xl shadow-xl">
              ⚡
            </div>
            <span className="mt-1 px-2 py-0.5 rounded-lg bg-slate-900/90 border border-cyan-500/50 text-[10px] sm:text-xs font-bold text-cyan-300">
              Blitz 45s
            </span>
          </button>
        </div>

        {/* Special Node 7: Final Challenge Restore Region */}
        <div
          style={{ left: '88%', top: '82%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <button
            onClick={() => handleNodeClick('restore', isRestoreUnlocked)}
            disabled={!isRestoreUnlocked}
            className={`group flex flex-col items-center transition-transform ${
              isRestoreUnlocked ? 'hover:scale-110 cursor-pointer' : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 border-2 border-yellow-200 text-white flex items-center justify-center text-2xl shadow-2xl ring-4 ring-amber-400/40">
              🏆
            </div>
            <span className="mt-1 px-2.5 py-0.5 rounded-lg bg-slate-900/95 border border-amber-400 text-[10px] sm:text-xs font-black text-amber-300 shadow-md">
              Final Challenge
            </span>
          </button>
        </div>

        {/* Floating Landform Terrain Identification Badges */}
        <div className="absolute top-4 left-6 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-300">
          🏔️ Alpine Mountain Ridge
        </div>
        <div className="absolute top-4 right-6 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-300">
          🟫 Elevated Mineral Plateau
        </div>
        <div className="absolute bottom-6 left-6 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-300">
          🏞️ River Valley Corridor
        </div>
        <div className="absolute bottom-6 right-28 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-300">
          🌊 Coastal Port & Estuary
        </div>
      </div>

      {/* Quick Launch Bottom Bar */}
      <div className="w-full max-w-7xl mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 bg-slate-900/80 p-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>Completed Missions: <strong className="text-white">{completedMissions.length} / 5</strong></span>
        </div>

        <div className="flex items-center gap-2">
          {completedMissions.length === 5 && (
            <button
              onClick={() => onSelectMission('restore')}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black flex items-center gap-1.5 animate-pulse"
            >
              <span>RESTORE THE REGION ➔</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
