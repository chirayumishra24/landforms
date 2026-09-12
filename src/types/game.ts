export type TeamId = 'terraformers' | 'earthkeepers';

export type GameStage = 
  | 'start' 
  | 'story' 
  | 'team_select' 
  | 'how_to_play' 
  | 'map' 
  | 'mission_1' 
  | 'mission_2' 
  | 'mission_3' 
  | 'mission_4' 
  | 'mission_5' 
  | 'blitz' 
  | 'restore' 
  | 'final_score' 
  | 'learning_summary';

export interface TeamState {
  id: TeamId;
  name: string;
  tagline: string;
  color: string;
  points: number;
  stats: {
    knowledge: number;
    planning: number;
    adaptation: number;
    decisions: number;
  };
}

export type LandformType = 'mountains' | 'plateaus' | 'plains' | 'valleys' | 'coasts';

export interface LandformDetail {
  id: LandformType;
  name: string;
  icon: string;
  elevation: string;
  slope: string;
  climate: string;
  description: string;
  keyFeatures: string[];
  humanLife: string[];
  realWorldExamples: string[];
  question: {
    prompt: string;
    options: string[];
    correctIdx: number;
    explanation: string;
  };
}

export interface AdaptationCharacter {
  id: string;
  title: string;
  icon: string;
  description: string;
  suitableLandforms: LandformType[];
  primaryLandform: LandformType;
  explanation: string;
}

export interface AdaptationAnimal {
  id: string;
  name: string;
  icon: string;
  suitableLandform: LandformType;
  adaptationTrait: string;
  reasoningQuestion: string;
  reasoningOptions: string[];
  correctReasonIdx: number;
  explanation: string;
}

export interface BuildingItem {
  id: string;
  name: string;
  icon: string;
  cost: number;
  description: string;
  preferredZones: LandformType[];
  forbiddenZones: LandformType[];
  warningMessage: string;
  successMessage: string;
}

export interface PlacedBuilding {
  id: string;
  buildingId: string;
  x: number; // percentage on map (0 - 100)
  y: number; // percentage on map (0 - 100)
  landform: LandformType;
}

export interface CrisisScenario {
  id: string;
  title: string;
  icon: string;
  landform: LandformType;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: string;
  points: number;
}

export interface BlitzQuestion {
  id: string;
  prompt: string;
  imageLandform?: LandformType;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface RestorationTask {
  id: string;
  title: string;
  icon: string;
  problem: string;
  actionText: string;
  solutionExplanation: string;
  points: number;
  isComplete: boolean;
}
