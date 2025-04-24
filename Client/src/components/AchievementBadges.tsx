import React from 'react';
import { AchievementBadgesProps } from '../types';
import '../styles/AchievementBadges.css';

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ achievements }) => {
  return (
    <div className="achievement-badges">
      <h2>Gardening Achievements</h2>
      <p className="achievement-intro">Earn badges by completing different gardening activities!</p>
      
      <div className="badges-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`badge-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          >
            <div className="badge-icon">{achievement.icon}</div>
            <div className="badge-content">
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
              <div className="badge-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    aria-valuenow={(achievement.progress / achievement.target) * 100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="progress-text">
                  {achievement.progress} / {achievement.target}
                </div>
              </div>
            </div>
            {achievement.unlocked && (
              <div className="unlocked-badge">
                <span className="unlocked-icon">🏆</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;