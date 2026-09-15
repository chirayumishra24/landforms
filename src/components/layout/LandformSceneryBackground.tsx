"use client";

import React from 'react';

export const LandformSceneryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Realistic Multi-Stop Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100/80" />

      {/* 2. Radiant Sun & Volumetric Crepuscular Sunbeams */}
      <div className="absolute top-[6%] right-[16%] w-72 h-72 rounded-full bg-gradient-to-tr from-amber-200/30 via-yellow-100/40 to-transparent blur-2xl animate-sun-pulse pointer-events-none" />
      <div className="absolute top-[8%] right-[19%] w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-100 to-white shadow-[0_0_60px_20px_rgba(253,224,71,0.55)] opacity-95 animate-sun-pulse" />

      {/* Sunbeams breaking across the sky */}
      <svg className="absolute top-0 right-[10%] w-[600px] h-[500px] opacity-25 pointer-events-none" viewBox="0 0 600 500">
        <defs>
          <linearGradient id="sunbeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#fde047" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="300,50 0,500 80,500" fill="url(#sunbeam)" />
        <polygon points="300,50 140,500 240,500" fill="url(#sunbeam)" />
        <polygon points="300,50 360,500 480,500" fill="url(#sunbeam)" />
      </svg>

      {/* 3. Soaring Eagle Silhouettes in High Atmosphere */}
      <svg className="absolute top-[14%] left-[28%] w-10 h-6 text-slate-800/40 opacity-70" viewBox="0 0 50 30" fill="currentColor">
        <path d="M0,15 Q15,0 25,12 Q35,0 50,15 Q35,8 25,16 Q15,8 0,15 Z" />
      </svg>
      <svg className="absolute top-[17%] left-[32%] w-6 h-4 text-slate-800/30 opacity-60" viewBox="0 0 50 30" fill="currentColor">
        <path d="M0,15 Q15,0 25,12 Q35,0 50,15 Q35,8 25,16 Q15,8 0,15 Z" />
      </svg>

      {/* 4. Drifting Realistic Cumulus Cloud Layers */}
      {/* High-altitude slow wisps */}
      <div className="absolute top-[10%] -left-40 w-[1400px] h-28 pointer-events-none animate-clouds-slow opacity-60">
        <svg viewBox="0 0 1000 120" className="w-full h-full fill-white/80 filter drop-shadow-[0_4px_8px_rgba(15,23,42,0.05)]">
          <path d="M120,80 Q140,40 190,45 Q230,20 280,45 Q330,25 380,55 Q420,40 460,65 Q480,55 520,70 L520,95 L120,95 Z" />
          <path d="M620,85 Q650,50 700,55 Q740,30 800,55 Q850,35 890,65 Q920,50 960,85 L960,95 L620,95 Z" />
        </svg>
      </div>

      {/* Mid-altitude faster fluffy clouds */}
      <div className="absolute top-[18%] -left-60 w-[1600px] h-32 pointer-events-none animate-clouds-fast opacity-75">
        <svg viewBox="0 0 1200 140" className="w-full h-full fill-white filter drop-shadow-[0_6px_12px_rgba(15,23,42,0.08)]">
          <path d="M40,110 Q60,60 110,65 Q145,35 200,60 Q240,40 280,70 Q320,50 360,80 Q390,65 420,95 L420,120 L40,120 Z" />
          <path d="M680,105 Q710,55 765,60 Q810,30 870,55 Q915,35 960,70 Q1000,50 1040,85 L1040,120 L680,120 Z" />
        </svg>
      </div>

      {/* 5. Realistic Alpine Snow-Capped Mountain Range with Light & Shadow Facets */}
      <svg
        className="absolute bottom-0 w-full h-[68%] min-h-[420px]"
        viewBox="0 0 1440 680"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mountainSunlit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="mountainShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="snowGlint" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="plateauStrata" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="waterfallSpray" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="riverFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="coastalDeep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* Distant Mountain Shadows (East-facing slopes) */}
        <polygon
          points="
            0,680 0,420 160,320 280,440 460,180 580,380 720,240 880,140 1020,360 1180,210 1320,400 1440,280 1440,680
          "
          fill="url(#mountainShadow)"
          opacity="0.85"
        />

        {/* Distant Mountain Sunlit Facets (West-facing slopes) */}
        <polygon
          points="
            0,680 0,420 160,320 220,380 460,180 510,290 720,240 800,290 880,140 950,260 1180,210 1250,310 1440,280 1440,680
          "
          fill="url(#mountainSunlit)"
          opacity="0.95"
        />

        {/* Arête Ridge Crevasses (Dark Strata Crags) */}
        <polygon points="460,180 455,270 480,290 460,180" fill="#1e293b" opacity="0.6" />
        <polygon points="880,140 870,230 900,270 880,140" fill="#1e293b" opacity="0.6" />
        <polygon points="1180,210 1170,290 1200,320 1180,210" fill="#1e293b" opacity="0.6" />

        {/* High Alpine Snow Caps & Glacial Cirques */}
        {/* Peak 1: 460, 180 */}
        <polygon points="460,180 500,245 465,235 435,250 415,240 460,180" fill="url(#snowGlint)" opacity="0.98" />
        {/* Peak 2: 880, 140 (Grand Summit) */}
        <polygon points="880,140 930,215 895,200 875,225 830,220 855,190 880,140" fill="url(#snowGlint)" opacity="0.98" />
        {/* Peak 3: 1180, 210 */}
        <polygon points="1180,210 1220,270 1195,260 1165,280 1145,265 1180,210" fill="url(#snowGlint)" opacity="0.98" />
        {/* Secondary Peak: 160, 320 */}
        <polygon points="160,320 190,365 165,355 135,370 160,320" fill="url(#snowGlint)" opacity="0.95" />
        {/* Secondary Peak: 720, 240 */}
        <polygon points="720,240 755,295 725,285 695,300 720,240" fill="url(#snowGlint)" opacity="0.95" />

        {/* Glacial Valley Couloirs (Snow tongues running downhill) */}
        <path d="M880,140 Q885,250 860,310 Q850,330 840,360" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.8" />
        <path d="M460,180 Q455,270 440,330" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.75" />
      </svg>

      {/* 6. Stepped Basalt Plateaus with Geological Stratification & Waterfall */}
      <svg
        className="absolute bottom-0 w-full h-[52%] min-h-[320px]"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
      >
        {/* Plateau Tablelands Shadow Silhouette */}
        <path
          d="
            M0,520 L0,320 
            L180,320 L210,350 L340,350 L370,390 
            L560,390 L590,310 L780,310 L820,380 
            L1020,380 L1060,280 L1260,280 L1320,360 L1440,340 
            L1440,520 Z
          "
          fill="#78350f"
          opacity="0.35"
        />

        {/* Plateau Tablelands Sunlit Front with Geological Sediment Strata */}
        <path
          d="
            M0,520 L0,330 
            L170,330 L200,365 L330,365 L360,400 
            L550,400 L580,320 L770,320 L810,395 
            L1010,395 L1050,290 L1250,290 L1310,370 L1440,355 
            L1440,520 Z
          "
          fill="url(#plateauStrata)"
          opacity="0.9"
        />

        {/* Horizontal Rock Striation Layers on Plateau Cliffs */}
        <path d="M0,360 L170,360 M200,385 L330,385 M580,350 L770,350 M1050,325 L1250,325" stroke="#451a03" strokeWidth="2.5" opacity="0.4" fill="none" />
        <path d="M0,385 L170,385 M200,410 L330,410 M580,375 L770,375 M1050,355 L1250,355" stroke="#fed7aa" strokeWidth="1.5" opacity="0.45" fill="none" />

        {/* Cascading Plateau Waterfall (at x=680) */}
        <rect x="676" y="320" width="8" height="110" fill="url(#waterfallSpray)" opacity="0.95" />
        <ellipse cx="680" cy="430" rx="20" ry="8" fill="#ffffff" opacity="0.8" />
        <circle cx="678" cy="428" r="14" fill="#bae6fd" opacity="0.5" className="animate-ping" />
      </svg>

      {/* 7. Low-Lying Valley Fog / Atmospheric Mist Rolling Through the Gaps */}
      <div className="absolute bottom-[28%] left-[18%] w-[55%] h-20 pointer-events-none animate-mist">
        <svg viewBox="0 0 800 100" className="w-full h-full opacity-60">
          <ellipse cx="200" cy="50" rx="180" ry="30" fill="#f8fafc" />
          <ellipse cx="450" cy="55" rx="220" ry="35" fill="#f1f5f9" />
          <ellipse cx="680" cy="45" rx="140" ry="25" fill="#ffffff" />
        </svg>
      </div>

      {/* 8. Rolling Foothills, Evergreen Pine Tree Ridges & Sheltered Valleys */}
      <svg
        className="absolute bottom-0 w-full h-[40%] min-h-[260px]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pineRidge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>

        {/* Foothills and Dense Pine Tree Canopy Silhouette */}
        <path
          d="
            M0,400 L0,240 
            Q80,220 160,250 T320,230 T480,260 
            Q640,210 740,230 T960,210 T1180,240 Q1320,220 1440,230 
            L1440,400 Z
          "
          fill="url(#pineRidge)"
          opacity="0.9"
        />

        {/* Serrated Pine Tree Silhouettes along the Ridge */}
        <polygon points="120,235 125,220 130,235" fill="#14532d" />
        <polygon points="140,238 146,218 152,238" fill="#14532d" />
        <polygon points="170,245 175,228 180,245" fill="#14532d" />
        <polygon points="340,228 346,210 352,228" fill="#14532d" />
        <polygon points="360,232 365,216 370,232" fill="#14532d" />
        <polygon points="760,218 766,198 772,218" fill="#14532d" />
        <polygon points="780,222 787,204 794,222" fill="#14532d" />
        <polygon points="1020,214 1027,196 1034,214" fill="#14532d" />
        <polygon points="1050,220 1056,202 1062,220" fill="#14532d" />
      </svg>

      {/* 9. Lush Alluvial Plains with S-Curve Meandering River */}
      <svg
        className="absolute bottom-0 w-full h-[28%] min-h-[190px]"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="plainsBasin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Rolling Grassland Plains */}
        <path
          d="
            M0,280 L0,140 
            Q240,110 520,135 T1020,115 Q1260,95 1440,120 
            L1440,280 Z
          "
          fill="url(#plainsBasin)"
          opacity="0.95"
        />

        {/* S-Shaped Meandering Perennial River (Flowing from mountain valley into coastal bay) */}
        <path
          d="
            M680,80 
            C710,120 620,140 660,180 
            C700,220 780,230 750,280 
            L820,280 
            C850,220 780,200 730,170 
            C690,130 750,110 710,80 Z
          "
          fill="url(#riverFlow)"
          opacity="0.95"
        />
        {/* River Water Surface Shimmer Highlight */}
        <path
          d="M685,110 C705,135 645,155 675,185 C710,215 765,225 750,265"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="12 8"
          fill="none"
          opacity="0.75"
          className="animate-water-shimmer"
        />
      </svg>

      {/* 10. Coastal Bay, Turquoise Shelf & Shoreline Wave Foam */}
      <svg
        className="absolute bottom-0 w-full h-[18%] min-h-[120px]"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="beachSand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>

        {/* Golden Sandy Beach Shoreline Barrier / Spit */}
        <path
          d="
            M0,180 L0,75 
            Q350,55 720,70 T1440,60 
            L1440,180 Z
          "
          fill="url(#beachSand)"
          opacity="0.95"
        />

        {/* Coastal Ocean Bay Waters (Deep Blue to Emerald Reef) */}
        <path
          d="
            M0,180 L0,90 
            C320,75 600,105 880,75 
            C1120,50 1320,85 1440,95 
            L1440,180 Z
          "
          fill="url(#coastalDeep)"
          opacity="0.9"
        />

        {/* Animated Surf Waves & Foam Ripples along the Coastline */}
        <path
          d="
            M0,91 
            C320,76 600,106 880,76 
            C1120,51 1320,86 1440,96
          "
          stroke="#ffffff"
          strokeWidth="3.5"
          fill="none"
          opacity="0.9"
          className="animate-water-shimmer"
        />
        <path
          d="
            M0,115 
            C280,105 560,125 840,100 
            C1100,80 1340,110 1440,120
          "
          stroke="#38bdf8"
          strokeWidth="2"
          strokeDasharray="24 16"
          fill="none"
          opacity="0.7"
          className="animate-water-shimmer"
        />
      </svg>

      {/* 11. Subtle Maximalist Signature Dot Grid Pattern (Soft overlay) */}
      <div className="absolute inset-0 bg-maximalist-dots opacity-25 pointer-events-none" />

      {/* 12. Soft Edge Vignette for Foreground Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-slate-900/5 pointer-events-none" />
    </div>
  );
};
