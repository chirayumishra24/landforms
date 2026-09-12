import { BlitzQuestion } from "@/types/game";

export const BLITZ_QUESTIONS: BlitzQuestion[] = [
  {
    id: "blitz_1",
    prompt: "Which landform is known as a 'tableland' with steep sides and a relatively flat top?",
    imageLandform: "plateaus",
    options: ["Mountain", "Plateau", "Plain", "Valley"],
    correctIdx: 1,
    explanation: "A plateau is an elevated flat-topped tableland standing distinctly above surrounding terrain."
  },
  {
    id: "blitz_2",
    prompt: "Which landform is composed of rich alluvial silt deposited by rivers, making it best for farming?",
    imageLandform: "plains",
    options: ["Plains", "Plateau", "Mountain Cliff", "Canyon"],
    correctIdx: 0,
    explanation: "Plains have thick deposits of fertile alluvium brought down by rivers."
  },
  {
    id: "blitz_3",
    prompt: "Which human economic activity is predominantly tied to coastal landforms with sheltered bays?",
    imageLandform: "coasts",
    options: ["Terrace apple farming", "Deep-sea fishing & maritime shipping", "Highland yak breeding", "Underground coal mining"],
    correctIdx: 1,
    explanation: "Coasts provide access to ocean fisheries and maritime sea routes for global cargo trade."
  },
  {
    id: "blitz_4",
    prompt: "Terrace farming is an ingenious agricultural technique specifically practiced on which landform?",
    imageLandform: "mountains",
    options: ["Coastal beaches", "Mountain slopes", "Dry plateau beds", "River delta flats"],
    correctIdx: 1,
    explanation: "Stepped terraces carved into mountain slopes slow water runoff and prevent heavy soil erosion."
  },
  {
    id: "blitz_5",
    prompt: "An elongated depression between two mountain ridges often carved by a river or glacier is called a:",
    imageLandform: "valleys",
    options: ["Plateau", "Valley", "Dune", "Cape"],
    correctIdx: 1,
    explanation: "Valleys are low areas between mountains that offer natural sheltered corridors."
  },
  {
    id: "blitz_6",
    prompt: "Why are plateaus often called 'storehouses of minerals'?",
    imageLandform: "plateaus",
    options: ["They are made purely of diamonds", "Ancient volcanic and tectonic activity formed rich mineral veins", "Rivers wash all minerals onto their peaks", "No one has ever mined there"],
    correctIdx: 1,
    explanation: "Plateau geological history makes them rich in iron ore, coal, manganese, bauxite, and gold."
  },
  {
    id: "blitz_7",
    prompt: "What is the primary danger faced by communities building houses directly on steep mountain slopes without retaining walls?",
    imageLandform: "mountains",
    options: ["Tsunamis", "Landslides and rockfalls", "Shark attacks", "Excessive heat waves"],
    correctIdx: 1,
    explanation: "Gravity, rain saturation, and loose slope debris make mountain sides vulnerable to sudden landslides."
  },
  {
    id: "blitz_8",
    prompt: "Which natural ecosystem protects coastal areas from the destructive force of cyclone storm surges?",
    imageLandform: "coasts",
    options: ["Mangrove forests and coastal sand dunes", "Concrete parking lots", "Mountain pine trees", "Desert cacti"],
    correctIdx: 0,
    explanation: "Mangrove root webs and sand dunes absorb high wave energy and shield inland settlements."
  },
  {
    id: "blitz_9",
    prompt: "The highest plateau in the entire world, often referred to as the 'Roof of the World', is the:",
    imageLandform: "plateaus",
    options: ["Deccan Plateau", "Tibetan Plateau", "Colorado Plateau", "Anatolian Plateau"],
    correctIdx: 1,
    explanation: "The Tibetan Plateau sits at an average elevation exceeding 4,500 meters above sea level."
  },
  {
    id: "blitz_10",
    prompt: "Why are rivers in their plain course much slower and prone to depositing sediments compared to their mountain course?",
    imageLandform: "plains",
    options: ["The land has a very gentle gradient/slope", "The water becomes colder", "Fish drink all the water", "The river flows backwards"],
    correctIdx: 0,
    explanation: "Gentle low gradients reduce water speed, causing the river to drop its heavy load of silt and sand."
  }
];
