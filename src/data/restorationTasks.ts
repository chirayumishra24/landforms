import { RestorationTask } from "@/types/game";

export const RESTORATION_TASKS: RestorationTask[] = [
  {
    id: "restore_1",
    title: "1. Relocate Unsuitable Mountain Settlement",
    icon: "🏘️",
    problem: "A residential settlement was precariously built on a fractured mountain cliff slope prone to rockfalls.",
    actionText: "Relocate homes down to the sheltered, stable valley river terrace",
    solutionExplanation: "The community is now sheltered from landslide debris and harsh alpine blizzards, with safe access to roads and freshwater.",
    points: 150,
    isComplete: false
  },
  {
    id: "restore_2",
    title: "2. Clear & Rebuild Blocked Transport Artery",
    icon: "🛣️",
    problem: "A vital trade road was buried under mud and boulders after heavy rains because it lacked hillside drainage channels.",
    actionText: "Construct contour road with stepped culverts and retaining wire gabions",
    solutionExplanation: "The new valley-hugging route bypasses landslide choke-points, safely reconnecting the farm, market, and coastal sea port.",
    points: 150,
    isComplete: false
  },
  {
    id: "restore_3",
    title: "3. Revitalize Failing Agriculture Near Riverbank",
    icon: "🌾",
    problem: "Crops planted on dry, rocky high ground dried out and failed due to lack of organic soil and irrigation water.",
    actionText: "Re-establish multi-crop agro-farms on the rich alluvial river floodplain",
    solutionExplanation: "Deep natural alluvium and gravity canal irrigation allow grains, pulses, and greens to flourish sustainably.",
    points: 150,
    isComplete: false
  },
  {
    id: "restore_4",
    title: "4. Install Hazard Defenses & Slope Stabilization",
    icon: "🛡️",
    problem: "Deforested hillsides are causing rapid sheet erosion, and coastal winds are scouring the unshielded fishing harbor.",
    actionText: "Plant deep-root pine forests on upper slopes & plant dense mangrove belts along the coast",
    solutionExplanation: "Tree roots firmly anchor topsoil against erosion, while mangrove root-webs dissipate up to 66% of cyclone wave energy.",
    points: 150,
    isComplete: false
  },
  {
    id: "restore_5",
    title: "5. Establish a Balanced Regional Wildlife Sanctuary",
    icon: "🌳",
    problem: "Natural wildlife corridors between mountain highlands and lowland wetlands were fragmented by uncoordinated expansion.",
    actionText: "Designate contiguous protected ecological corridor for goats, eagles, and river fauna",
    solutionExplanation: "Biodiversity rebounds! The region achieves ecological equilibrium where human settlements, farming, and pristine wilderness thrive together.",
    points: 200,
    isComplete: false
  }
];
