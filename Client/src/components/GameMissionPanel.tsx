import React from 'react';
import '../styles/GameMissionPanel.css';
import { Mission } from '../types';

export interface GameMissionPanelProps {
  missions: Mission[];
  currentMission: Mission | null;
  completedMissions: string[]; // Array of mission IDs
  isActive?: boolean; // Boolean, not boolean array
}

const GameMissionPanel: React.FC<GameMissionPanelProps> = ({ 
  missions,
  currentMission, 
  completedMissions,
  isActive = true // Default to true if not provided
}) => {
  if (!isActive) {
    return null; // Return null, not true, to not render anything
  }

  return (
    <div className="game-mission-panel">
      <h2>Garden Missions</h2>
      <p className="mission-intro">Complete missions to earn XP and unlock new garden features!</p>
      
      <div className="missions-list">
        {missions.map(mission => (
          <div 
            key={mission.id} 
            className={`mission-card ${mission.completed ? 'completed' : ''} ${currentMission?.id === mission.id ? 'current' : ''}`}
          >
            <div className="mission-status">
              {mission.completed ? (
                <span className="status-icon completed">✅</span>
              ) : currentMission?.id === mission.id ? (
                <span className="status-icon current">🔄</span>
              ) : (
                <span className="status-icon locked">🔒</span>
              )}
            </div>
            
            <div className="mission-content">
              <h3>{mission.title}</h3>
              <p>{mission.description}</p>
              <div className="mission-reward">
                <span className="reward-xp">+{mission.xpReward} XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {missions.length === 0 && (
        <div className="no-missions">
          <p>Great job! You've completed all available missions!</p>
          <p>Check back later for new challenges.</p>
        </div>
      )}
    </div>
  );
};

export default GameMissionPanel;