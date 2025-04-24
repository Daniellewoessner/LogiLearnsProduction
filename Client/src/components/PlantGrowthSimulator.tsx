import React from 'react';
import '../styles/PlantGrowthSimulator.css';
import { Plant } from '../types';

// Define the props interface for the PlantGrowthSimulator component
interface PlantGrowthSimulatorProps {
  isActive: boolean;
  onToggle: () => void;
  garden: (Plant | null)[][];
  onWaterPlant: (rowIndex: number, colIndex: number) => void;
}

/**
 * PlantGrowthSimulator Component
 * 
 * Displays a simulation of plant growth in the garden and allows users
 * to interact with plants (water them, see their growth status, etc.)
 */
const PlantGrowthSimulator: React.FC<PlantGrowthSimulatorProps> = ({
  isActive,
  onToggle,
  garden,
  onWaterPlant
}) => {
  // Calculate how many plants need water
  const plantsNeedingWater = garden.flat()
    .filter(plant => plant && plant.needsWater)
    .length;

  // Calculate average plant happiness
  const plantHappinessValues = garden.flat()
    .filter(plant => plant && plant.happiness !== undefined)
    .map(plant => (plant as Plant).happiness || 0);
  
  const averageHappiness = plantHappinessValues.length 
    ? Math.round(plantHappinessValues.reduce((sum, val) => sum + val, 0) / plantHappinessValues.length) 
    : 0;

  // Calculate growth stages distribution
  const growthStages = [0, 0, 0, 0]; // Stages 0-3
  garden.flat()
    .filter(Boolean)
    .forEach(plant => {
      const stage = (plant as Plant).growthStage || 0;
      if (stage >= 0 && stage < 4) {
        growthStages[stage]++;
      }
    });

  return (
    <div className="plant-growth-simulator">
      <div className="simulator-header">
        <h2>Plant Growth Simulator</h2>
        <div className="simulation-toggle">
          <button 
            className={`toggle-button ${isActive ? 'active' : ''}`}
            onClick={onToggle}
          >
            {isActive ? 'Stop Simulation' : 'Start Simulation'}
          </button>
          <div className="simulator-status">
            Status: {isActive ? 'Running' : 'Paused'}
          </div>
        </div>
      </div>

      <div className="garden-overview">
        <div className="garden-stats">
          <div className="stat-card">
            <div className="stat-title">Plants</div>
            <div className="stat-value">{garden.flat().filter(Boolean).length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Need Water</div>
            <div className="stat-value">{plantsNeedingWater} 💧</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Average Happiness</div>
            <div className="stat-value">
              {averageHappiness}%
              <div 
                className="happiness-indicator" 
                style={{ 
                  backgroundColor: 
                    averageHappiness > 80 ? '#4CAF50' :
                    averageHappiness > 50 ? '#FFC107' : '#F44336'
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="growth-stages">
          <h3>Growth Stages</h3>
          <div className="stages-display">
            <div className="stage-bar">
              {growthStages.map((count, index) => (
                <div 
                  key={`stage-${index}`} 
                  className={`stage-segment stage-${index}`}
                  style={{ 
                    flex: count || 0.5, // Ensure some visibility even if 0
                  }}
                >
                  {count > 0 && (
                    <span className="stage-count">Stage {index}: {count}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="simulator-tutorial">
        {isActive ? (
          <div className="active-tips">
            <h3>Simulation Active!</h3>
            <ul>
              <li>Plants will grow slowly over time if they're happy and watered</li>
              <li>Plants will occasionally need water (💧 icon)</li>
              <li>Plant happiness decreases if they need water for too long</li>
              <li>Only happy plants will continue to grow</li>
            </ul>
          </div>
        ) : (
          <div className="inactive-tips">
            <h3>Start the Simulation</h3>
            <p>Click the Start Simulation button to see your plants grow over time!</p>
          </div>
        )}
      </div>

      <div className="garden-state">
        <h3>Garden State</h3>
        
        {garden.flat().filter(Boolean).length === 0 ? (
          <div className="empty-garden-message">
            Your garden is empty. Add some plants in the Garden Designer tab first!
          </div>
        ) : (
          <div className="garden-grid simulator-grid">
            {garden.map((row, rowIndex) => (
              <div key={`sim-row-${rowIndex}`} className="simulator-row">
                {row.map((plant, colIndex) => (
                  <div 
                    key={`sim-cell-${rowIndex}-${colIndex}`} 
                    className={`simulator-cell ${plant ? 'has-plant' : 'empty'}`}
                  >
                    {plant && (
                      <div className="simulator-plant">
                        <div className="plant-image-container">
                          <img 
                            src={plant.image} 
                            alt={plant.name}
                            className={`growth-stage-${plant.growthStage || 0}`}
                          />
                          
                          {/* Plant stage indicator */}
                          <div className="growth-stage-indicator">
                            Stage: {plant.growthStage || 0}/3
                          </div>
                          
                          {/* Water indicator and button */}
                          {plant.needsWater && (
                            <button 
                              className="water-button"
                              onClick={() => onWaterPlant(rowIndex, colIndex)}
                            >
                              💧 Water Me!
                            </button>
                          )}
                          
                          {/* Happiness indicator */}
                          <div className="plant-happiness">
                            <div className="happiness-label">Happiness:</div>
                            <div className="happiness-meter">
                              <div 
                                className="happiness-level"
                                style={{ 
                                  width: `${plant.happiness || 0}%`,
                                  backgroundColor: 
                                    (plant.happiness || 0) > 80 ? '#4CAF50' :
                                    (plant.happiness || 0) > 50 ? '#FFC107' : '#F44336'
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="plant-name">{plant.name}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantGrowthSimulator;