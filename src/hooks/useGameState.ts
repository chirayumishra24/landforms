import { useState, useCallback } from 'react';
import { GameStage, TeamId, TeamState, PlacedBuilding } from '@/types/game';
import { RESTORATION_TASKS } from '@/data/restorationTasks';
import { soundEngine } from '@/utils/soundEngine';

export function useGameState() {
  const [currentStage, setCurrentStage] = useState<GameStage>('start');
  const [selectedTeam, setSelectedTeam] = useState<TeamId>('terraformers');
  const [isTwoTeamMode] = useState<boolean>(true);
  const [turnTeam, setTurnTeam] = useState<TeamId>('terraformers');

  const switchTurn = useCallback(() => {
    soundEngine.playClick();
    setTurnTeam(prev => (prev === 'terraformers' ? 'earthkeepers' : 'terraformers'));
  }, []);

  const [teams, setTeams] = useState<Record<TeamId, TeamState>>({
    terraformers: {
      id: 'terraformers',
      name: 'Team A (Terraformers)',
      tagline: 'Explore • Plan • Discover',
      color: '#3b82f6',
      points: 0,
      stats: { knowledge: 0, planning: 0, adaptation: 0, decisions: 0 }
    },
    earthkeepers: {
      id: 'earthkeepers',
      name: 'Team B (Earthkeepers)',
      tagline: 'Observe • Adapt • Protect',
      color: '#f97316',
      points: 0,
      stats: { knowledge: 0, planning: 0, adaptation: 0, decisions: 0 }
    }
  });

  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [placedBuildings, setPlacedBuildings] = useState<PlacedBuilding[]>([]);
  const [restorationState, setRestorationState] = useState(RESTORATION_TASKS);
  const [routeConnected, setRouteConnected] = useState<boolean>(false);
  const [buildingPoints, setBuildingPoints] = useState<number>(100);

  // Region health calculated from completed milestones
  const calculateRegionHealth = useCallback(() => {
    let health = 16; // baseline starting health
    health += completedMissions.length * 16;
    if (routeConnected) health += 10;
    const completedRestores = restorationState.filter(r => r.isComplete).length;
    health += completedRestores * 5;
    return Math.min(health, 100);
  }, [completedMissions, routeConnected, restorationState]);

  const regionHealth = calculateRegionHealth();

  // Award Life Points with category breakdown
  const awardPoints = useCallback((
    amount: number,
    category: 'knowledge' | 'planning' | 'adaptation' | 'decisions',
    teamId?: TeamId
  ) => {
    const targetTeam = teamId || turnTeam;
    setTeams(prev => {
      const current = prev[targetTeam];
      return {
        ...prev,
        [targetTeam]: {
          ...current,
          points: current.points + amount,
          stats: {
            ...current.stats,
            [category]: current.stats[category] + amount
          }
        }
      };
    });
    soundEngine.playCorrect();

    // Toggle turn if in two team mode
    if (isTwoTeamMode) {
      setTurnTeam(prev => (prev === 'terraformers' ? 'earthkeepers' : 'terraformers'));
    }
  }, [turnTeam, isTwoTeamMode]);

  const markMissionComplete = useCallback((missionId: string) => {
    setCompletedMissions(prev => {
      if (prev.includes(missionId)) return prev;
      return [...prev, missionId];
    });
  }, []);

  const completeRestorationTask = useCallback((taskId: string) => {
    setRestorationState(prev => 
      prev.map(task => {
        if (task.id === taskId && !task.isComplete) {
          awardPoints(task.points, 'adaptation');
          return { ...task, isComplete: true };
        }
        return task;
      })
    );
  }, [awardPoints]);

  const resetGame = useCallback(() => {
    setCurrentStage('start');
    setTeams({
      terraformers: {
        id: 'terraformers',
        name: 'Team Terraformers',
        tagline: 'Explore • Plan • Discover',
        color: '#3b82f6',
        points: 0,
        stats: { knowledge: 0, planning: 0, adaptation: 0, decisions: 0 }
      },
      earthkeepers: {
        id: 'earthkeepers',
        name: 'Team Earthkeepers',
        tagline: 'Observe • Adapt • Protect',
        color: '#f97316',
        points: 0,
        stats: { knowledge: 0, planning: 0, adaptation: 0, decisions: 0 }
      }
    });
    setCompletedMissions([]);
    setPlacedBuildings([]);
    setRestorationState(RESTORATION_TASKS.map(t => ({ ...t, isComplete: false })));
    setRouteConnected(false);
    setBuildingPoints(100);
    setTurnTeam('terraformers');
  }, []);

  return {
    currentStage,
    setCurrentStage,
    selectedTeam,
    setSelectedTeam,
    isTwoTeamMode,
    turnTeam,
    setTurnTeam,
    switchTurn,
    teams,
    completedMissions,
    markMissionComplete,
    placedBuildings,
    setPlacedBuildings,
    buildingPoints,
    setBuildingPoints,
    routeConnected,
    setRouteConnected,
    restorationState,
    completeRestorationTask,
    regionHealth,
    awardPoints,
    resetGame
  };
}
