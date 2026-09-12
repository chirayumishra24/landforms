import { CrisisScenario } from "@/types/game";

export const CRISIS_SCENARIOS: CrisisScenario[] = [
  {
    id: "coastal_storm",
    title: "Category 4 Cyclone & Storm Surge Warning",
    icon: "🌪️",
    landform: "coasts",
    situation: "A massive tropical cyclone is churning over the ocean and projected to hit the coastal port and fishing village within 18 hours with 4-meter tidal surges.",
    options: [
      {
        text: "A. Issue immediate sirens, evacuate residents to elevated inland shelters, and moor all fishing vessels in protected mangrove creeks",
        isCorrect: true,
        feedback: "✓ EXCELLENT DISASTER MANAGEMENT: Elevated shelters save lives, and natural mangrove buffers absorb violent tidal surge kinetic energy!"
      },
      {
        text: "B. Encourage fishing trawlers to sail out deeper to sea to fish during high winds",
        isCorrect: false,
        feedback: "⚠️ CATASTROPHIC: Open seas experience mountainous waves up to 10 meters that capsize ships instantly."
      },
      {
        text: "C. Build new hotels on the sandy beach to welcome cyclone storm watchers",
        isCorrect: false,
        feedback: "⚠️ DANGEROUS: Beachfront constructions face complete destruction from high velocity storm surges."
      },
      {
        text: "D. Do nothing because sea breezes will blow the cyclone away",
        isCorrect: false,
        feedback: "⚠️ UNPREPARED: Cyclones are massive low-pressure vortexes that do not dissipate without substantial inland friction."
      }
    ],
    explanation: "Coastal zones are vulnerable to tropical cyclones and tidal surges. Early evacuation to higher ground and preserving mangrove bio-shields are critical geographical safety adaptations.",
    points: 200
  },
  {
    id: "mountain_landslide",
    title: "Monsoon Downpour & Mountain Slope Instability",
    icon: "🏔️",
    landform: "mountains",
    situation: "Five days of torrential monsoon rainfall have saturated the steep weathered rock slopes above the valley mountain highway, triggering fissures and stone rolls.",
    options: [
      {
        text: "A. Clear more forest trees on the cliff to let water evaporate faster into the air",
        isCorrect: false,
        feedback: "⚠️ DISASTROUS: Cutting tree roots removes the natural anchor holding topsoil to bedrock, triggering catastrophic debris flows!"
      },
      {
        text: "B. Divert surface runoff with stepped drainage channels, stabilize slopes with deep-root vetiver planting, and halt traffic on vulnerable roads",
        isCorrect: true,
        feedback: "✓ SMART GEOTECHNICAL ACTION: Controlling water saturation through drainage and vegetative anchoring halts slope liquefaction."
      },
      {
        text: "C. Blast the base of the mountain with dynamite to make room for more cars",
        isCorrect: false,
        feedback: "⚠️ GRAVE HAZARD: Blasting removes the toe support of the hill slope, causing an immediate mountain collapse."
      }
    ],
    explanation: "Steep mountain slopes become unstable when heavy rain saturates loose soil. Controlling drainage and preserving tree root systems prevents deadly landslides.",
    points: 200
  },
  {
    id: "river_flooding",
    title: "Rapid Himalayan Snowmelt & River Plains Spate",
    icon: "🌊",
    landform: "plains",
    situation: "Spring heatwaves have melted high mountain snowpacks simultaneously, swelling the perennial river beyond its embankments and submerging floodplain paddies.",
    options: [
      {
        text: "A. Pave the entire riverbank with concrete to speed up water flow towards the city",
        isCorrect: false,
        feedback: "⚠️ RECKLESS: Concrete prevents natural soil water absorption and transfers destructive flash floods downstream."
      },
      {
        text: "B. Restore natural wetlands and floodplain retention basins to soak up excess floodwaters, and reinforce earthen bunds",
        isCorrect: true,
        feedback: "✓ ECOLOGICAL FLOOD DEFENSE: Floodplains and marshes act as giant natural sponges, slowing flood crests and replenishing groundwater."
      },
      {
        text: "C. Build high density apartments right on the active river sandbars",
        isCorrect: false,
        feedback: "⚠️ HIGH RISK: River sandbars are temporary dynamic deposits that submerge and shift during annual floods."
      }
    ],
    explanation: "Rivers naturally overflow their banks during peak discharge. Preserving natural floodplains and wetlands cushions downstream cities from devastating flood damage.",
    points: 200
  },
  {
    id: "plateau_drought",
    title: "Prolonged Dry Spell on the High Plateau",
    icon: "☀️",
    landform: "plateaus",
    situation: "The rain-shadow plateau has received 60% below average rainfall for two consecutive years. Shallow dug wells have dried up, threatening livestock and crops.",
    options: [
      {
        text: "A. Build check dams across seasonal streams, dig percolation ponds, and shift to drought-hardy millets and drip irrigation",
        isCorrect: true,
        feedback: "✓ RESILIENT ADAPTATION: Harvesting every drop of seasonal runoff into percolation tanks recharges the hard-rock plateau aquifers."
      },
      {
        text: "B. Drill deeper borewells continuously until underground magma is reached",
        isCorrect: false,
        feedback: "⚠️ UNSUSTAINABLE: Over-drilling in hard crystalline rock rapidly exhausts fossil aquifers without recharging them."
      },
      {
        text: "C. Plant water-thirsty sugarcane and rice fields to invite rain clouds",
        isCorrect: false,
        feedback: "⚠️ CROP FAILURE: High water consumption crops deplete remaining reservoir reserves in weeks during a drought."
      }
    ],
    explanation: "Plateaus often sit on impervious basaltic or granitic rock with limited deep groundwater. Rainwater harvesting check dams and cultivating drought-resilient crops (millets) are essential.",
    points: 200
  }
];
