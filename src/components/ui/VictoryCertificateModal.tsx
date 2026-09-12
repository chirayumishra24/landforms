"use client";

import React from 'react';
import { TeamState, TeamId } from '@/types/game';
import { Printer, X, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '@/utils/soundEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teams: Record<TeamId, TeamState>;
}

export const VictoryCertificateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  teams
}) => {
  if (!isOpen) return null;

  const terra = teams.terraformers;
  const keeper = teams.earthkeepers;

  const isTerraWinner = terra.points >= keeper.points;
  const winner = isTerraWinner ? terra : keeper;
  const runnerUp = isTerraWinner ? keeper : terra;
  const isTie = terra.points === keeper.points;

  const handlePrint = () => {
    soundEngine.playVictoryFanfare();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm select-none overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden my-auto animate-fade-in">
        {/* Modal Action Bar (Hidden during Print) */}
        <div className="print:hidden bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-black text-sm uppercase tracking-wider">
              Official Geoscience Honors Diploma
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 font-black text-xs border-2 border-slate-900 shadow-[2px_2px_0px_0px_#ffffff] flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
              title="Close Certificate"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Document Body */}
        <div id="printable-diploma" className="p-6 sm:p-10 bg-amber-50/40 relative">
          {/* Certificate Decorative Border */}
          <div className="border-4 border-double border-slate-900 rounded-2xl p-6 sm:p-8 bg-white relative">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-xl select-none">🧭</div>
            <div className="absolute top-2 right-2 text-xl select-none">🗺️</div>
            <div className="absolute bottom-2 left-2 text-xl select-none">🏔️</div>
            <div className="absolute bottom-2 right-2 text-xl select-none">🌊</div>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-200 border-2 border-slate-900 text-[11px] font-black uppercase tracking-widest text-slate-950 mb-2 shadow-[2px_2px_0px_0px_#0f172a]">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Interplanetary Cartography & Geoscience Corps</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight font-serif uppercase">
                Certificate of Planetary Terraforming
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-bold uppercase tracking-widest mt-1">
                Highest Distinction in Physical Geography & Spatial Adaptation
              </p>
            </div>

            {/* Recipient */}
            <div className="text-center my-6 py-4 border-y-2 border-slate-200">
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1">
                This honor is hereby conferred upon
              </p>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-blue-900 uppercase">
                {isTie ? "TEAMS TERRAFORMERS & EARTHKEEPERS" : winner.name}
              </h2>
              <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 border border-slate-900 text-xs font-black text-slate-900">
                <span>🌟 {isTie ? "JOINT SUPREME CARTOGRAPHERS" : "GRAND CHAMPIONS OF THE EXPEDITION"}</span>
                <span>•</span>
                <span>{winner.points.toLocaleString()} Total Life Points</span>
              </div>
            </div>

            {/* Citation */}
            <p className="text-center text-xs sm:text-sm text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed mb-6">
              For exemplary mastery in diagnosing major earth landforms, balancing settlements across fragile valleys and plateaus, deploying resilient human livelihoods, and executing critical hazard disaster response.
            </p>

            {/* Team Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto mb-8 text-center">
              <div className="p-2 rounded-xl bg-blue-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <div className="text-xl">🏔️</div>
                <div className="text-[10px] font-black text-slate-900 mt-0.5">Alpine Geologist</div>
                <div className="text-[9px] text-emerald-700 font-black">Grade A+</div>
              </div>

              <div className="p-2 rounded-xl bg-amber-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <div className="text-xl">🟫</div>
                <div className="text-[10px] font-black text-slate-900 mt-0.5">Mineral Strategist</div>
                <div className="text-[9px] text-emerald-700 font-black">Certified</div>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <div className="text-xl">🌾</div>
                <div className="text-[10px] font-black text-slate-900 mt-0.5">Plains Agronomist</div>
                <div className="text-[9px] text-emerald-700 font-black">Distinction</div>
              </div>

              <div className="p-2 rounded-xl bg-cyan-50 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <div className="text-xl">🌊</div>
                <div className="text-[10px] font-black text-slate-900 mt-0.5">Coastal Guardian</div>
                <div className="text-[9px] text-emerald-700 font-black">Mastery</div>
              </div>
            </div>

            {/* Signatures & Seal Footer */}
            <div className="flex flex-wrap items-end justify-between gap-6 pt-6 border-t-2 border-slate-900 text-slate-900">
              {/* Date */}
              <div>
                <div className="font-mono text-xs font-black text-slate-950">{currentDate}</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Date of Commission</div>
              </div>

              {/* Official Gold Seal */}
              <div className="w-16 h-16 rounded-full bg-yellow-400 border-3 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] flex flex-col items-center justify-center text-center p-1">
                <span className="text-lg">🏅</span>
                <span className="text-[8px] font-black tracking-tighter uppercase leading-none">OFFICIAL SEAL</span>
              </div>

              {/* Signature Line */}
              <div className="text-right">
                <div className="font-serif italic font-black text-sm text-slate-900 border-b border-slate-900 pb-1 px-4">
                  Dr. Terra Geographica
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-0.5">
                  Chief Educator & Cartographer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
