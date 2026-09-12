import { BuildingItem, LandformType } from "@/types/game";

export const BUILDING_ITEMS: BuildingItem[] = [
  {
    id: "settlement",
    name: "Residential Settlement",
    icon: "🏘️",
    cost: 25,
    description: "Houses, markets, and municipal centers for the regional community.",
    preferredZones: ["plains", "valleys"],
    forbiddenZones: ["mountains"],
    warningMessage: "⚠️ DIFFICULT LOCATION: Steep mountain slopes make building foundations fragile and expose residents to devastating rockfalls and landslides!",
    successMessage: "✓ SMART CHOICE: Flat, accessible land with water access makes construction safe, stable, and convenient for family living."
  },
  {
    id: "farm",
    name: "Alluvial Agro-Farm",
    icon: "🌾",
    cost: 20,
    description: "Multi-crop agricultural fields requiring deep fertile silt and easy irrigation.",
    preferredZones: ["plains", "valleys"],
    forbiddenZones: ["mountains", "coasts"],
    warningMessage: "⚠️ UNFAVORABLE SOIL: Rocky slopes or saline coastal sands lack deep fertile topsoil and will yield stunted crops!",
    successMessage: "✓ FERTILE HARVEST: Rich alluvial floodplains supply constant moisture and organic nutrients for bumper crop yields."
  },
  {
    id: "water_canal",
    name: "River Canal & Water Station",
    icon: "💧",
    cost: 15,
    description: "Freshwater intake and distribution grid bringing river water to homes and farms.",
    preferredZones: ["plains", "valleys"],
    forbiddenZones: ["plateaus"],
    warningMessage: "⚠️ ELEVATION BARRIER: Pumping river water up high dry plateau escarpments requires unsustainable energy without local check dams.",
    successMessage: "✓ VITAL LIFELINE: Channeling perennial river flow guarantees drinking water and agricultural resilience."
  },
  {
    id: "school",
    name: "Community School & Library",
    icon: "🏫",
    cost: 15,
    description: "Educational center providing geography, science, and vocational training.",
    preferredZones: ["plains", "valleys"],
    forbiddenZones: ["mountains"],
    warningMessage: "⚠️ ISOLATED HAZARD: Placing a school on steep isolated cliffs makes student commuting dangerous during winter storms.",
    successMessage: "✓ ACCESSIBLE EDUCATION: Central lowland placement ensures children from surrounding hamlets can walk safely to class."
  },
  {
    id: "hospital",
    name: "Regional Health Center",
    icon: "🏥",
    cost: 15,
    description: "Emergency care, ambulance dispatch, and clinic for public health.",
    preferredZones: ["plains", "valleys", "plateaus"],
    forbiddenZones: ["mountains"],
    warningMessage: "⚠️ AMBULANCE BOTTLENECK: Rocky, single-track mountain roads prevent rapid ambulance response times during emergencies!",
    successMessage: "✓ CRITICAL CARE LINK: Strategic central positioning lets emergency vehicles reach settlements and work zones swiftly."
  },
  {
    id: "road",
    name: "Transit Corridor / Road",
    icon: "🛣️",
    cost: 10,
    description: "All-weather paved link connecting settlements, farms, and trade centers.",
    preferredZones: ["plains", "valleys", "coasts"],
    forbiddenZones: [],
    warningMessage: "⚠️ MOUNTAIN CUTTING: Roads cutting across sheer mountain faces require expensive blast tunnels and retainment walls.",
    successMessage: "✓ CONNECTED ARTERY: Smooth transport allows farmers to reach urban markets and ports in record time."
  },
  {
    id: "eco_reserve",
    name: "Protected Eco-Reserve & Mangrove",
    icon: "🌳",
    cost: 10,
    description: "Natural forest and mangrove barrier preserving biodiversity and preventing soil erosion.",
    preferredZones: ["mountains", "coasts", "valleys"],
    forbiddenZones: [],
    warningMessage: "",
    successMessage: "✓ ECOLOGICAL SHIELD: Natural root systems stabilize steep hillsides and buffer coastal communities against ferocious storm surges."
  }
];

export interface FarmDecisionQuestion {
  prompt: string;
  zones: {
    id: string;
    title: string;
    landform: LandformType;
    isOptimal: boolean;
    description: string;
  }[];
  reasoningQuestion: string;
  reasoningOptions: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const FARM_DECISION: FarmDecisionQuestion = {
  prompt: "Where should your primary agricultural heartland be established?",
  zones: [
    {
      id: "zone_plain",
      title: "Zone A: Broad River Alluvial Plain",
      landform: "plains",
      isOptimal: true,
      description: "Low-lying flat expanse formed by thousands of years of river silt deposition with perennial stream channels."
    },
    {
      id: "zone_cliff",
      title: "Zone B: Upper Mountain Ridge",
      landform: "mountains",
      isOptimal: false,
      description: "Steep rocky crags with thin topsoil, exposed to high winds and freezing night temperatures."
    },
    {
      id: "zone_dry_plateau",
      title: "Zone C: High Arid Plateau Tableland",
      landform: "plateaus",
      isOptimal: false,
      description: "Dry gravelly surface 800m above water table with erratic seasonal showers."
    }
  ],
  reasoningQuestion: "WHY is the broad river alluvial plain the most suitable choice for staple food crops?",
  reasoningOptions: [
    {
      text: "A. Because mountains are too close to the clouds and receive too much sunlight",
      isCorrect: false,
      explanation: "Mountain elevation does not prevent farming because of sunlight; it is steep terrain, soil erosion, and cold temperatures that restrict it."
    },
    {
      text: "B. Flat land prevents soil erosion, while perennial river alluvium provides deep organic fertility and effortless gravity canal irrigation",
      isCorrect: true,
      explanation: "Exactly! Level terrain permits heavy equipment and gravity-fed irrigation canals, while river alluvium is naturally rich in vital plant nutrients."
    },
    {
      text: "C. Because crops only grow when planted at exactly sea level",
      isCorrect: false,
      explanation: "Crops can grow at various elevations, but flat terrain and alluvial soils provide the most productive and sustainable yields."
    }
  ]
};

export interface RouteWaypoint {
  id: string;
  name: string;
  icon: string;
  x: number; // percentage
  y: number; // percentage
  landform: LandformType;
}

export const ROUTE_WAYPOINTS: RouteWaypoint[] = [
  { id: "settlement", name: "Valley Settlement", icon: "🏘️", x: 22, y: 55, landform: "valleys" },
  { id: "farm", name: "Riverside Farm", icon: "🌾", x: 45, y: 62, landform: "plains" },
  { id: "town", name: "Central Marketplace", icon: "🏙️", x: 68, y: 48, landform: "plains" },
  { id: "port", name: "Deepwater Sea Port", icon: "🚢", x: 88, y: 76, landform: "coasts" }
];
