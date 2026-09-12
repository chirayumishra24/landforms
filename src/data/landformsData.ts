import { LandformDetail } from "@/types/game";

export const LANDFORMS_DATA: Record<string, LandformDetail> = {
  mountains: {
    id: "mountains",
    name: "Mountains",
    icon: "🏔️",
    elevation: "High Elevation (Typically > 600m to 8,000m+)",
    slope: "Steep, rocky slopes & narrow peaks",
    climate: "Cool to freezing cold; heavy snowfall at peaks",
    description: "Mountains are massive elevated landforms rising prominently above the surrounding land. Rivers often originate from mountain glaciers.",
    keyFeatures: [
      "Conical peaks and rugged steep terrain",
      "Glaciers serve as perennial sources for major river systems",
      "Thin topsoil subject to rapid erosion",
      "Rich coniferous alpine vegetation (pines, deodars)"
    ],
    humanLife: [
      "Terrace farming on carved hillside steps to prevent soil erosion",
      "Transhumance / pastoral sheep and yak herding in highland pastures",
      "Hydroelectric power generation from fast-flowing streams",
      "Eco-tourism, mountaineering, skiing, and pilgrimage sites"
    ],
    realWorldExamples: ["Himalayas (Asia)", "Alps (Europe)", "Andes (South America)", "Rockies (North America)"],
    question: {
      prompt: "Why is building broad transport networks (like multi-lane highways and rail) particularly difficult in mountain regions?",
      options: [
        "A. Mountains have too much flat land",
        "B. Steep slopes, rugged terrain, and frequent landslide hazards require tunnels and bridges",
        "C. Mountain air has too much oxygen for engines",
        "D. Trains cannot operate in cool climates"
      ],
      correctIdx: 1,
      explanation: "Rugged terrain, sheer cliff slopes, and landslide risks make constructing roads and railways costly and engineering-intensive in mountains."
    }
  },
  plateaus: {
    id: "plateaus",
    name: "Plateaus",
    icon: "🟫",
    elevation: "Moderate to High Elevation (300m to over 4,000m)",
    slope: "Steep sides with a broad, relatively flat table-like summit",
    climate: "Moderate to dry; cooler than low-lying plains",
    description: "A plateau is an elevated flat land — a tableland standing prominently above surrounding areas. Often called 'Storehouses of Minerals'.",
    keyFeatures: [
      "Flat top summit with one or more steep side escarpments",
      "Formed through volcanic lava flows or tectonic uplifting",
      "Enormous wealth of mineral deposits (iron ore, coal, bauxite, gold)",
      "Spectacular waterfalls formed where rivers drop over steep plateau edges"
    ],
    humanLife: [
      "Mining and metallurgical industries located near mineral belts",
      "Black soil areas (lava plateaus) are famous for cotton and sugarcane cultivation",
      "Cattle and sheep grazing on drier plateau grasslands",
      "Waterfalls harnessed for hydropower and scenic tourism"
    ],
    realWorldExamples: ["Deccan Plateau (India)", "Chota Nagpur Plateau (India)", "Tibetan Plateau (Highest in world)", "African Plateau (Rich in gold/diamonds)"],
    question: {
      prompt: "Why are plateaus like the Chota Nagpur Plateau in India or African plateaus economically vital for industries?",
      options: [
        "A. They are vast oceans suitable for submarine docking",
        "B. They contain rich mineral deposits like coal, iron ore, and bauxite essential for manufacturing",
        "C. They receive continuous snowfall all year round",
        "D. They have deep alluvial soils ideal for submerged paddy farming"
      ],
      correctIdx: 1,
      explanation: "Plateaus are geologic storehouses of minerals. Mining, smelting, and heavy industries cluster around plateau mineral reserves."
    }
  },
  plains: {
    id: "plains",
    name: "Plains",
    icon: "🟩",
    elevation: "Low Elevation (Usually not more than 200m above sea level)",
    slope: "Broad, flat, gently rolling or level surface",
    climate: "Temperate to warm; distinct seasonal cycles",
    description: "Plains are vast stretches of flat low-lying land, predominantly formed by rivers and their tributaries depositing rich silt and clay (alluvium).",
    keyFeatures: [
      "Extremely fertile alluvial soil ideal for multiple crop cycles",
      "Perennial river channels providing abundant freshwater",
      "Easy terrain for building straight roads, railway grids, and airports",
      "Highest population density on Earth due to favorable living conditions"
    ],
    humanLife: [
      "Intensive agriculture (rice, wheat, pulses, vegetables)",
      "High concentration of major cities, trade markets, and industries",
      "Extensive interconnected transport and canal networks",
      "Historical cradles of great civilizations (Indus, Nile, Tigris-Euphrates)"
    ],
    realWorldExamples: ["Indo-Gangetic Plains (India)", "Yangtze River Plains (China)", "Mississippi River Basin (USA)", "Northern European Plain"],
    question: {
      prompt: "What makes river plains the most densely populated landforms on the planet?",
      options: [
        "A. Steep cliffs protect houses from high winds",
        "B. Fertile soil, abundant freshwater, flat land for construction, and easy transportation",
        "C. Perpetual winter freezing reduces crop pests",
        "D. Complete absence of rainfall keeps skies sunny"
      ],
      correctIdx: 1,
      explanation: "Vast fertile alluvial soils from rivers, flat terrain for construction, easy transport links, and ample water make plains ideal for dense human civilization."
    }
  },
  valleys: {
    id: "valleys",
    name: "Valleys",
    icon: "🏞️",
    elevation: "Low relative to surrounding mountain ridges",
    slope: "V-shaped (carved by rivers) or U-shaped (carved by glaciers)",
    climate: "Sheltered from harsh mountain winds; mild and pleasant",
    description: "A valley is an elongated low area between mountains or hills, usually with a river running along its floor.",
    keyFeatures: [
      "Natural conduits and corridors through mountain barriers",
      "Sheltered microclimate protected by surrounding hill slopes",
      "Nutrient-rich river silt washed down and deposited on valley floors",
      "Confluence points where tributary rivers merge"
    ],
    humanLife: [
      "Fruit orchards (apples, apricots, walnuts, pears)",
      "Historic trade routes and mountain passes connecting civilizations",
      "Settlements concentrated on dry river terraces safe from high water",
      "River-based tourism, rafting, and serene hill retreat resorts"
    ],
    realWorldExamples: ["Kashmir Valley (India)", "Rift Valley (East Africa)", "Rhine Valley (Europe)", "Shenandoah Valley (USA)"],
    question: {
      prompt: "How do valleys naturally facilitate human trade and travel across mountainous regions?",
      options: [
        "A. By acting as natural corridors and passes between steep mountain ridges",
        "B. By blocking all winds so airplanes can hover",
        "C. By freezing into solid ice bridges year-round",
        "D. By removing gravity from heavy cargo carts"
      ],
      correctIdx: 0,
      explanation: "Valleys carve natural gaps and passes through rugged mountain barriers, allowing traders, roads, and railways to connect isolated communities."
    }
  },
  coasts: {
    id: "coasts",
    name: "Coastal Areas",
    icon: "🌊",
    elevation: "Sea Level (0m) transitioning inland",
    slope: "Gentle beaches, tidal mudflats, estuaries, or sea cliffs",
    climate: "Maritime / moderate; humid with sea breezes; prone to tropical cyclones",
    description: "The dynamic zone where the land meets the ocean or sea. Coasts are vital gateways for global trade and rich marine ecosystems.",
    keyFeatures: [
      "Natural harbors and sheltered bays protected from deep ocean waves",
      "Mangrove forests and sand dunes acting as coastal bio-shields",
      "Tidal zones, lagoons, coral reefs, and nutrient-rich estuaries",
      "High vulnerability to storm surges, tsunamis, and coastal erosion"
    ],
    humanLife: [
      "Commercial fishing, fish processing, and aquaculture",
      "Deepwater seaports enabling international trade and shipping",
      "Beach tourism, water sports, and seaside hospitality",
      "Salt panning and coconut / palm agro-forestry"
    ],
    realWorldExamples: ["Coromandel & Malabar Coasts (India)", "Mediterranean Coast (Southern Europe)", "Pacific Rim Coasts", "Atlantic Seaboard"],
    question: {
      prompt: "What is a major geographical vulnerability that coastal communities must plan for when building settlements?",
      options: [
        "A. Mountain snow avalanches",
        "B. Ocean storm surges, cyclones, coastal erosion, and tsunamis",
        "C. Lack of access to ocean trade routes",
        "D. Total lack of marine life"
      ],
      correctIdx: 1,
      explanation: "Coastal zones face extreme meteorological events like cyclones, storm surges, and sea level rise, requiring protective buffers like mangroves and sea walls."
    }
  }
};
