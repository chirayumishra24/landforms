"use client";

import React, { useState } from 'react';
import { BuildingItem, PlacedBuilding, LandformType } from '@/types/game';
import { BUILDING_ITEMS, FARM_DECISION, ROUTE_WAYPOINTS } from '@/data/settlementData';
import { CheckCircle2, AlertTriangle, Hammer, Compass, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  placedBuildings: PlacedBuilding[];
  onUpdateBuildings: (buildings: PlacedBuilding[]) => void;
  buildingPoints: number;
  onUpdatePoints: (points: number) => void;
  routeConnected: boolean;
  onUpdateRouteConnected: (connected: boolean) => void;
  onComplete: () => void;
  onAwardPoints: (amount: number, category: 'planning') => void;
}

export const Mission3Settlement: React.FC<Props> = ({
  placedBuildings,
  onUpdateBuildings,
  buildingPoints,
  onUpdatePoints,
  routeConnected,
  onUpdateRouteConnected,
  onComplete,
  onAwardPoints
}) => {
  const [activeTab, setActiveTab] = useState<'build' | 'farming' | 'roads'>('build');
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingItem>(BUILDING_ITEMS[0]);
  const [placementNotice, setPlacementNotice] = useState<{ isWarning: boolean; text: string } | null>(null);

  // Farming Decision State
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [farmingReasonIdx, setFarmingReasonIdx] = useState<number | null>(null);
  const [farmingFeedback, setFarmingFeedback] = useState<string | null>(null);
  const [isFarmingDone, setIsFarmingDone] = useState<boolean>(false);

  // Road Waypoint Connection State
  const [connectedPath, setConnectedPath] = useState<string[]>(['settlement']);
  const [roadFeedback, setRoadFeedback] = useState<string | null>(null);

  // Grid zones on interactive map
  const mapZones: { id: string; name: string; landform: LandformType; x: number; y: number; width: number; height: number }[] = [
    { id: 'zone_mountain', name: 'Steep Mountain Cliffs', landform: 'mountains', x: 5, y: 5, width: 35, height: 35 },
    { id: 'zone_plateau', name: 'High Mineral Plateau', landform: 'plateaus', x: 60, y: 8, width: 35, height: 32 },
    { id: 'zone_valley', name: 'Sheltered Valley Basin', landform: 'valleys', x: 12, y: 48, width: 30, height: 40 },
    { id: 'zone_plains', name: 'Broad Alluvial Plain', landform: 'plains', x: 45, y: 45, width: 35, height: 45 },
    { id: 'zone_coast', name: 'Ocean Shoreline & Port', landform: 'coasts', x: 75, y: 55, width: 22, height: 40 }
  ];

  const handlePlaceItem = (zone: typeof mapZones[0]) => {
    if (buildingPoints < selectedBuilding.cost) {
      soundEngine.playWrong();
      setPlacementNotice({
        isWarning: true,
        text: `⚠️ INSUFFICIENT BUILDING POINTS! You have ${buildingPoints} pts remaining, but ${selectedBuilding.name} costs ${selectedBuilding.cost} pts.`
      });
      return;
    }

    // Check if zone is forbidden (e.g. building huge settlement on steep mountain cliff)
    if (selectedBuilding.forbiddenZones.includes(zone.landform)) {
      soundEngine.playWrong();
      setPlacementNotice({
        isWarning: true,
        text: selectedBuilding.warningMessage || `⚠️ Difficult location: ${zone.name} is unsuitable for ${selectedBuilding.name}. Reposition it to a safer plain or valley!`
      });
      return;
    }

    // Smart placement!
    soundEngine.playPlacement();
    const newPlaced: PlacedBuilding = {
      id: `bld_${Date.now()}`,
      buildingId: selectedBuilding.id,
      x: zone.x + Math.random() * (zone.width - 8) + 4,
      y: zone.y + Math.random() * (zone.height - 8) + 4,
      landform: zone.landform
    };

    onUpdateBuildings([...placedBuildings, newPlaced]);
    onUpdatePoints(buildingPoints - selectedBuilding.cost);
    onAwardPoints(100, 'planning');

    setPlacementNotice({
      isWarning: false,
      text: selectedBuilding.successMessage || `✓ SMART CHOICE (+100 LP): Successfully constructed ${selectedBuilding.name} in ${zone.name}!`
    });
  };

  // Handle Farming Decision
  const handleSelectZone = (zoneId: string) => {
    soundEngine.playClick();
    setSelectedZoneId(zoneId);
  };

  const handleSelectFarmingReason = (idx: number) => {
    soundEngine.playClick();
    setFarmingReasonIdx(idx);
    const chosenOption = FARM_DECISION.reasoningOptions[idx];

    if (chosenOption.isCorrect && selectedZoneId === 'zone_plain') {
      soundEngine.playCorrect();
      setIsFarmingDone(true);
      onAwardPoints(150, 'planning');
      setFarmingFeedback(`✓ MASTER PLANNER (+150 LP): ${chosenOption.explanation}`);
    } else {
      soundEngine.playWrong();
      setFarmingFeedback("⚠️ Re-evaluate your choice. Focus on flat topography, river silt deposition, and ease of irrigation canals.");
    }
  };

  // Road Waypoints Connection
  const handleConnectWaypoint = (wpId: string) => {
    soundEngine.playClick();
    const order = ['settlement', 'farm', 'town', 'port'];
    const nextExpected = order[connectedPath.length];

    if (wpId === nextExpected) {
      soundEngine.playPlacement();
      const updated = [...connectedPath, wpId];
      setConnectedPath(updated);

      if (updated.length === order.length) {
        soundEngine.playVictoryFanfare();
        onUpdateRouteConnected(true);
        onAwardPoints(150, 'planning');
        setRoadFeedback("✓ VITAL TRANSPORT CORRIDOR ESTABLISHED (+150 LP): Valley Settlement ➔ Farm ➔ Marketplace ➔ Sea Port is now smoothly linked!");
      } else {
        setRoadFeedback(`✓ Waypoint connected: Next link towards ${order[updated.length].toUpperCase()}!`);
      }
    } else {
      soundEngine.playWrong();
      setRoadFeedback("⚠️ Natural barrier in between! Follow the logical valley contour: Settlement ➔ Farm ➔ Marketplace ➔ Port.");
    }
  };

  const isMissionComplete = placedBuildings.length >= 3 && isFarmingDone && routeConnected;

  return (
    <div className="relative min-h-[calc(100vh-60px)] p-4 sm:p-6 bg-slate-950 text-white select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1 border border-amber-500/30">
              <Hammer className="w-3.5 h-3.5" />
              <span>Mission 3 of 5 • Spatial Strategy</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
              <span>🏘️ BUILD A SETTLEMENT & TRANSIT GRID</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage your 100 Building Points budget. Plan settlements, place fertile farms, and connect trade corridors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Building Points Pill */}
            <div className="bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-lg">
              <span className="text-xs text-slate-300 font-medium">BUILDING POINTS:</span>
              <span className="text-lg font-black text-amber-400 tabular-nums">
                {buildingPoints} <span className="text-xs font-normal text-amber-200">PTS</span>
              </span>
            </div>

            {isMissionComplete && (
              <button
                onClick={() => { soundEngine.playClick(); onComplete(); }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2 animate-bounce"
              >
                <span>COMPLETE MISSION ➔</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Simulation Sub-Tabs */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('build'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 border ${
              activeTab === 'build'
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🏘️ 1. Interactive Settlement Grid</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 font-bold">
              {placedBuildings.length} Placed
            </span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('farming'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 border ${
              activeTab === 'farming'
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🌾 2. Farming Decision & Reasoning</span>
            {isFarmingDone && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('roads'); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 border ${
              activeTab === 'roads'
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🛣️ 3. Road & Valley Connector</span>
            {routeConnected && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
          </button>
        </div>

        {/* ================= TAB 1: INTERACTIVE SETTLEMENT BUILDER ================= */}
        {activeTab === 'build' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Building Palette (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Building Palette</span>
                <span className="text-amber-400">Select an item, then click a map zone</span>
              </div>

              <div className="space-y-2">
                {BUILDING_ITEMS.map((item) => {
                  const isSelected = selectedBuilding.id === item.id;
                  const canAfford = buildingPoints >= item.cost;

                  return (
                    <button
                      key={item.id}
                      onClick={() => { soundEngine.playClick(); setSelectedBuilding(item); }}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-600/30 border-amber-400 ring-2 ring-amber-500/50 text-white'
                          : 'bg-slate-900/80 border-white/10 text-slate-300 hover:bg-slate-800'
                      } ${!canAfford ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className="font-extrabold text-sm">{item.name}</h4>
                          <p className="text-[11px] text-slate-400">{item.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-amber-400 block">{item.cost} PTS</span>
                        <span className="text-[9px] text-slate-500">Cost</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Interactive Terrain Map Grid (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-slate-900">
                {/* SVG Background Representation of Geography */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Mountain upper left */}
                  <polygon points="0,0 45,0 35,45 0,35" fill="#475569" opacity="0.4" />
                  {/* Plateau upper right */}
                  <polygon points="55,0 100,0 100,45 60,40" fill="#78350f" opacity="0.4" />
                  {/* Valley center left */}
                  <polygon points="0,35 35,45 30,100 0,100" fill="#15803d" opacity="0.4" />
                  {/* Plains center */}
                  <polygon points="35,45 60,40 75,100 30,100" fill="#65a30d" opacity="0.4" />
                  {/* Coast right */}
                  <polygon points="60,40 100,45 100,100 75,100" fill="#0284c7" opacity="0.5" />
                  {/* River line */}
                  <path d="M 20,20 Q 40,50 50,70 T 85,90" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="1,1" />
                </svg>

                {/* Clickable Zone Rectangles */}
                {mapZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => handlePlaceItem(zone)}
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`
                    }}
                    className="absolute rounded-2xl border-2 border-dashed border-white/20 hover:border-amber-400 hover:bg-amber-400/10 transition-all flex flex-col items-center justify-center p-2 text-center group cursor-pointer"
                  >
                    <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-black/60 text-amber-300 border border-white/10 group-hover:scale-105 transition-transform">
                      {zone.name}
                    </span>
                    <span className="text-[9px] text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to place {selectedBuilding.name}
                    </span>
                  </button>
                ))}

                {/* Render Placed Buildings */}
                {placedBuildings.map((b) => (
                  <div
                    key={b.id}
                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl filter drop-shadow-md animate-bounce"
                  >
                    {b.buildingId === 'settlement' && '🏘️'}
                    {b.buildingId === 'farm' && '🌾'}
                    {b.buildingId === 'water_canal' && '💧'}
                    {b.buildingId === 'school' && '🏫'}
                    {b.buildingId === 'hospital' && '🏥'}
                    {b.buildingId === 'road' && '🛣️'}
                    {b.buildingId === 'eco_reserve' && '🌳'}
                  </div>
                ))}
              </div>

              {/* Placement Result Banner */}
              {placementNotice && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 shadow-xl ${
                  placementNotice.isWarning
                    ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                    : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                }`}>
                  {placementNotice.isWarning ? (
                    <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
                  ) : (
                    <Sparkles className="w-5 h-5 shrink-0 text-amber-300" />
                  )}
                  <span>{placementNotice.text}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: FARMING DECISION & REASONING ================= */}
        {activeTab === 'farming' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Agricultural Geography Decision
                </span>
                <span className="text-xs font-black text-emerald-400">⭐ +150 LIFE POINTS</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                {FARM_DECISION.prompt}
              </h3>

              {/* 3 Zone Choices */}
              <div className="space-y-3 mb-6">
                {FARM_DECISION.zones.map((zone) => {
                  const isSelected = selectedZoneId === zone.id;

                  return (
                    <button
                      key={zone.id}
                      onClick={() => handleSelectZone(zone.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-900/40 border-emerald-400 ring-2 ring-emerald-500/50 text-white'
                          : 'bg-slate-800/60 border-white/10 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-white">{zone.title}</h4>
                        <p className="text-xs text-slate-300 mt-1">{zone.description}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-3" />}
                    </button>
                  );
                })}
              </div>

              {/* Follow-up "WHY?" Reasoning Question */}
              {selectedZoneId && (
                <div className="pt-6 border-t border-white/10">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                    Signature &quot;Why?&quot; Reasoning Check
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-4">
                    {FARM_DECISION.reasoningQuestion}
                  </h4>

                  <div className="space-y-3">
                    {FARM_DECISION.reasoningOptions.map((opt, idx) => {
                      const isSelected = farmingReasonIdx === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectFarmingReason(idx)}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition ${
                            isSelected && opt.isCorrect
                              ? 'bg-emerald-900/60 border-emerald-400 text-white font-bold ring-2 ring-emerald-500/50'
                              : isSelected && !opt.isCorrect
                              ? 'bg-red-900/50 border-red-500 text-red-200'
                              : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-blue-400'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {farmingFeedback && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-xs sm:text-sm text-emerald-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
                  <span>{farmingFeedback}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ROAD BUILDER CORRIDOR ================= */}
        {activeTab === 'roads' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  Corridor Planning: Avoid High Mountain Obstacles
                </span>
                <span className="text-xs font-black text-amber-400">⭐ +150 LIFE POINTS</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Connect the Regional Supply Chain
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Mountain peaks act as natural barriers. Connect each waypoint in sequence through valley gaps:
                <strong className="text-emerald-400 block mt-1">Settlement ➔ Farm ➔ Marketplace ➔ Sea Port</strong>
              </p>

              {/* Waypoint Connection Progress Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {ROUTE_WAYPOINTS.map((wp, idx) => {
                  const isConnected = connectedPath.includes(wp.id);
                  const isNext = !isConnected && (
                    (idx === 1 && connectedPath.includes('settlement')) ||
                    (idx === 2 && connectedPath.includes('farm')) ||
                    (idx === 3 && connectedPath.includes('town'))
                  );

                  return (
                    <button
                      key={wp.id}
                      onClick={() => handleConnectWaypoint(wp.id)}
                      disabled={isConnected}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center ${
                        isConnected
                          ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200'
                          : isNext
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/50 animate-pulse'
                          : 'bg-slate-800/60 border-white/10 text-slate-400 opacity-60'
                      }`}
                    >
                      <span className="text-3xl mb-1">{wp.icon}</span>
                      <span className="text-xs font-extrabold">{wp.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase mt-0.5">{wp.landform}</span>
                      {isConnected && (
                        <span className="text-[10px] font-bold text-emerald-400 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Linked
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Visual Route SVG */}
              <div className="relative w-full h-32 bg-slate-950 rounded-2xl border border-white/10 p-3 overflow-hidden flex items-center justify-between px-8">
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 50,65 C 180,30 350,90 550,55"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="6"
                  />
                  {routeConnected && (
                    <path
                      d="M 50,65 C 180,30 350,90 550,55"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="6"
                      strokeDasharray="8,4"
                      className="animate-pulse"
                    />
                  )}
                </svg>
                <span className="relative z-10 text-2xl">🏘️</span>
                <span className="relative z-10 text-2xl">🌾</span>
                <span className="relative z-10 text-2xl">🏙️</span>
                <span className="relative z-10 text-2xl">🚢</span>
              </div>

              {/* Feedback */}
              {roadFeedback && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-800 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
                  <span>{roadFeedback}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
