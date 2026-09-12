"use client";

import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import { TopScoreboard } from '@/components/layout/TopScoreboard';
import { StartScreen } from '@/components/stages/StartScreen';
import { StoryIntro } from '@/components/stages/StoryIntro';
import { TeamSelect } from '@/components/stages/TeamSelect';
import { HowToPlay } from '@/components/stages/HowToPlay';
import { MainGameMap } from '@/components/stages/MainGameMap';
import { Mission1Explorer } from '@/components/missions/Mission1Explorer';
import { Mission2LifeAdapts } from '@/components/missions/Mission2LifeAdapts';
import { Mission3Settlement } from '@/components/missions/Mission3Settlement';
import { Mission4Livelihoods } from '@/components/missions/Mission4Livelihoods';
import { Mission5Crisis } from '@/components/missions/Mission5Crisis';
import { LandformBlitz } from '@/components/missions/LandformBlitz';
import { RestoreRegion } from '@/components/missions/RestoreRegion';
import { FinalScore } from '@/components/stages/FinalScore';
import { LearningSummary } from '@/components/stages/LearningSummary';

export default function GamePage() {
  const {
    currentStage,
    setCurrentStage,
    turnTeam,
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
  } = useGameState();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
      {/* Persistent Top Scoreboard HUD */}
      <TopScoreboard
        currentStage={currentStage}
        teams={teams}
        turnTeam={turnTeam}
        onSwitchTurn={switchTurn}
        regionHealth={regionHealth}
        completedMissions={completedMissions}
        onReset={resetGame}
        onNavigateMap={() => setCurrentStage('map')}
      />

      {/* Main Content Area Routing Based on Current Stage */}
      <main className="flex-1 flex flex-col">
        {currentStage === 'start' && (
          <StartScreen onStart={() => setCurrentStage('story')} />
        )}

        {currentStage === 'story' && (
          <StoryIntro onContinue={() => setCurrentStage('team_select')} />
        )}

        {currentStage === 'team_select' && (
          <TeamSelect
            onContinue={() => setCurrentStage('how_to_play')}
          />
        )}

        {currentStage === 'how_to_play' && (
          <HowToPlay onContinue={() => setCurrentStage('map')} />
        )}

        {currentStage === 'map' && (
          <MainGameMap
            completedMissions={completedMissions}
            regionHealth={regionHealth}
            placedBuildings={placedBuildings}
            routeConnected={routeConnected}
            onSelectMission={(stage) => setCurrentStage(stage)}
          />
        )}

        {currentStage === 'mission_1' && (
          <Mission1Explorer
            turnTeam={turnTeam}
            teams={teams}
            onSwitchTurn={switchTurn}
            onComplete={() => {
              markMissionComplete('mission_1');
              setCurrentStage('map');
            }}
            onAwardPoints={(amt, cat) => awardPoints(amt, cat)}
          />
        )}

        {currentStage === 'mission_2' && (
          <Mission2LifeAdapts
            turnTeam={turnTeam}
            teams={teams}
            onSwitchTurn={switchTurn}
            onComplete={() => {
              markMissionComplete('mission_2');
              setCurrentStage('map');
            }}
            onAwardPoints={(amt, cat) => awardPoints(amt, cat)}
          />
        )}

        {currentStage === 'mission_3' && (
          <Mission3Settlement
            turnTeam={turnTeam}
            teams={teams}
            onSwitchTurn={switchTurn}
            placedBuildings={placedBuildings}
            onUpdateBuildings={setPlacedBuildings}
            buildingPoints={buildingPoints}
            onUpdatePoints={setBuildingPoints}
            routeConnected={routeConnected}
            onUpdateRouteConnected={setRouteConnected}
            onComplete={() => {
              markMissionComplete('mission_3');
              setCurrentStage('map');
            }}
            onAwardPoints={(amt, cat) => awardPoints(amt, cat)}
          />
        )}

        {currentStage === 'mission_4' && (
          <Mission4Livelihoods
            turnTeam={turnTeam}
            teams={teams}
            onSwitchTurn={switchTurn}
            onComplete={() => {
              markMissionComplete('mission_4');
              setCurrentStage('map');
            }}
            onAwardPoints={(amt, cat) => awardPoints(amt, cat)}
          />
        )}

        {currentStage === 'mission_5' && (
          <Mission5Crisis
            turnTeam={turnTeam}
            teams={teams}
            onSwitchTurn={switchTurn}
            onComplete={() => {
              markMissionComplete('mission_5');
              setCurrentStage('map');
            }}
            onAwardPoints={(amt, cat) => awardPoints(amt, cat)}
          />
        )}

        {currentStage === 'blitz' && (
          <LandformBlitz
            onComplete={() => setCurrentStage('map')}
            onAwardPoints={(amt, cat) => awardPoints(amt, cat)}
          />
        )}

        {currentStage === 'restore' && (
          <RestoreRegion
            restorationTasks={restorationState}
            onCompleteTask={completeRestorationTask}
            onFinishGame={() => setCurrentStage('final_score')}
          />
        )}

        {currentStage === 'final_score' && (
          <FinalScore
            teams={teams}
            onContinue={() => setCurrentStage('learning_summary')}
            onPlayAgain={resetGame}
          />
        )}

        {currentStage === 'learning_summary' && (
          <LearningSummary
            onRestart={resetGame}
            onExploreMap={() => setCurrentStage('map')}
          />
        )}
      </main>
    </div>
  );
}
