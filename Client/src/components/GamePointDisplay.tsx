import React from 'react';
import { GamePointsDisplayProps } from '../types';
import '../styles/GamePointDisplay.css';

const GamePointsDisplay: React.FC<GamePointsDisplayProps> = ({ 
  level, 
  xp, 
  coins, 
  levelProgress 
}) => {
  return (
    <div className="game-points-display">
      <div className="stat-container level-container">
        <div className="stat-label">Level</div>
        <div className="stat-value">{level}</div>
        <div className="level-progress-bar">
          <div 
            className="level-progress-fill" 
            style={{ width: `${levelProgress}%` }}
            aria-valuenow={levelProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="xp-label">
          {xp} XP • Next level: {level * 300} XP
        </div>
      </div>
      
      <div className="stat-container">
        <div className="stat-label">Coins</div>
        <div className="stat-value">
          <span className="coin-icon">🪙</span> {coins}
        </div>
      </div>
    </div>
  );
};

export default GamePointsDisplay;
