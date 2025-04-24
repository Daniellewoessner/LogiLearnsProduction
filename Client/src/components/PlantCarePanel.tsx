import React, { useState, useEffect } from 'react';
import { PlantCarePanelProps } from '../types';
import { getPlantCareTips } from '../services/plantService';
import '../styles/PlantCarePanel.css';

const PlantCarePanel: React.FC<PlantCarePanelProps> = ({ plantName }) => {
  const [careTips, setCareTips] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadCareTips = async () => {
      if (!plantName) {
        setCareTips([]);
        return;
      }

      setLoading(true);
      try {
        const tips = await getPlantCareTips(plantName);
        setCareTips(tips);
      } catch (error) {
        console.error('Error loading plant care tips:', error);
        setCareTips([]);
      } finally {
        setLoading(false);
      }
    };

    loadCareTips();
  }, [plantName]);

  if (!plantName) {
    return null;
  }

  return (
    <div className="plant-care-panel">
      <h3 className="care-title">How to Care for {plantName}</h3>
      
      {loading ? (
        <div className="loading-tips">Loading care tips...</div>
      ) : careTips.length > 0 ? (
        <ul className="care-tips-list">
          {careTips.map((tip, index) => (
            <li key={index} className="care-tip-item">
              <div className="tip-icon">💧</div>
              <div className="tip-text">{tip}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-tips">
          <p>No specific care tips available for this plant.</p>
          <p>Remember to water regularly and ensure proper sunlight!</p>
        </div>
      )}
    </div>
  );
};

export default PlantCarePanel;