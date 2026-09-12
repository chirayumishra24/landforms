import { AdaptationCharacter, AdaptationAnimal } from "@/types/game";

export const ADAPTATION_CHARACTERS: AdaptationCharacter[] = [
  {
    id: "farmer",
    title: "Alluvial Farmer",
    icon: "👨‍🌾",
    description: "Cultivates rice, wheat, and vegetables requiring fertile deep soil and reliable irrigation.",
    suitableLandforms: ["plains", "valleys"],
    primaryLandform: "plains",
    explanation: "Plains have thick, nutrient-rich alluvial soil deposited by rivers and level ground that allows easy irrigation canals and tractor machinery."
  },
  {
    id: "fisher",
    title: "Deep-Sea Fisher",
    icon: "🎣",
    description: "Harvests fish, prawns, and crabs using trawlers and sets fishing nets near marine bays.",
    suitableLandforms: ["coasts"],
    primaryLandform: "coasts",
    explanation: "Coastal zones provide immediate access to marine fisheries, sheltered natural harbors for docking boats, and proximity to seafood processing markets."
  },
  {
    id: "shepherd",
    title: "Highland Shepherd",
    icon: "🐐",
    description: "Pastoral grazer herding wool-producing sheep and goats in seasonal high-altitude meadows (Bugyals).",
    suitableLandforms: ["mountains", "plateaus"],
    primaryLandform: "mountains",
    explanation: "Mountain pastures provide lush seasonal grasses for sheep grazing. Shepherds practice transhumance—moving up in summer and down to valleys in winter."
  },
  {
    id: "miner",
    title: "Mineral Miner",
    icon: "⛏️",
    description: "Extracts coal, iron ore, bauxite, and limestone using quarry machinery.",
    suitableLandforms: ["plateaus"],
    primaryLandform: "plateaus",
    explanation: "Plateaus are ancient volcanic or uplifted geological formations rich in dense metallic and non-metallic mineral veins."
  },
  {
    id: "mountain_guide",
    title: "Alpine Trekker & Guide",
    icon: "🧗",
    description: "Leads mountaineering expeditions, rock climbing, and adventure tourism across rugged heights.",
    suitableLandforms: ["mountains"],
    primaryLandform: "mountains",
    explanation: "High mountains attract global adventure tourists, trekkers, and climbers seeking challenging peaks, glaciers, and panoramic scenery."
  },
  {
    id: "coastal_worker",
    title: "Port Logistics Officer",
    icon: "🚢",
    description: "Manages cargo container shipping, vessel berthing, and maritime customs at sea terminals.",
    suitableLandforms: ["coasts"],
    primaryLandform: "coasts",
    explanation: "Deepwater coastal bays allow massive ocean container vessels to dock safely, facilitating bulk international trade and commercial exchanges."
  }
];

export const ADAPTATION_ANIMALS: AdaptationAnimal[] = [
  {
    id: "mountain_goat",
    name: "Himalayan Ibex / Mountain Goat",
    icon: "🐐",
    suitableLandform: "mountains",
    adaptationTrait: "Concave, rubbery cloven hooves and powerful muscular shoulders.",
    reasoningQuestion: "What physical adaptation enables the mountain goat to sprint across near-vertical rocky precipices without falling?",
    reasoningOptions: [
      "A. Hollow bones that make it float on air currents",
      "B. Flexible, split hooves with hard outer edges and soft rubbery inner suction pads",
      "C. Sticky tree-sap secreted from their fur",
      "D. Very wide webbed feet designed for swimming"
    ],
    correctReasonIdx: 1,
    explanation: "Mountain goats have split (cloven) hooves with sharp outer rims that dig into tiny rock cracks, and soft rubbery pads underneath that act like traction shoes!"
  },
  {
    id: "camel",
    name: "Bactrian / Desert Plateau Camel",
    icon: "🐪",
    suitableLandform: "plateaus",
    adaptationTrait: "Broad padded footpads, fat-storing humps, and thick insulating coat.",
    reasoningQuestion: "Why can camels thrive in high arid plateaus with sparse water and extreme temperature fluctuations?",
    reasoningOptions: [
      "A. They store fat in humps to convert into energy & water, with wide padded feet preventing sinking into loose stony soil",
      "B. They drink ocean water and desalinate it through their nostrils",
      "C. They hibernate underground through the entire summer",
      "D. They do not require any food or water for their entire lifetime"
    ],
    correctReasonIdx: 0,
    explanation: "Camels store dense fat in their humps which metabolizes into energy and water. Their wide cushioned footpads distribute weight over gravelly plateau grounds."
  },
  {
    id: "estuary_fish",
    name: "Hilsa / Coastal Estuary Fish",
    icon: "🐟",
    suitableLandform: "coasts",
    adaptationTrait: "Osmoregulatory gills capable of transitioning between salty sea and brackish river estuaries.",
    reasoningQuestion: "How do coastal estuary fish adapt to the fluctuating salinity where river fresh water meets ocean salt water?",
    reasoningOptions: [
      "A. They only breathe air using lungs at the surface",
      "B. Highly specialized cellular ion pumps in their gills that balance salt levels in changing water salinity",
      "C. They wrap their bodies in protective seaweed coats",
      "D. They transform into freshwater amphibians during high tide"
    ],
    correctReasonIdx: 1,
    explanation: "Estuary fish possess adaptable osmoregulatory cells in their gills that pump salts in or out, allowing them to swim between ocean saltwater and river freshwater."
  },
  {
    id: "eagle",
    name: "Golden Mountain Eagle",
    icon: "🦅",
    suitableLandform: "mountains",
    adaptationTrait: "Broad wingspan to harness mountain updrafts and ultra-sharp stereoscopic vision.",
    reasoningQuestion: "How do high-altitude raptors like the Golden Eagle conserve flight energy in thin, turbulent mountain atmosphere?",
    reasoningOptions: [
      "A. By flapping wings continuously at 100 beats per second",
      "B. By soaring effortlessly along rising thermal air currents (updrafts) deflected by mountain slopes",
      "C. By hanging onto mountain goats as transport",
      "D. By remaining motionless on tree tops at all times"
    ],
    correctReasonIdx: 1,
    explanation: "Mountain ridges create powerful upward air currents (orographic thermals). Raptors have enormous wings that catch these drafts to soar for hours without expending energy."
  }
];
