import React, { useState, useEffect } from 'react';
import './GardenApp.css';

// Define the Plant type
interface Plant {
  id: string;
  name: string;
  type: string;
  growthStage: number;
  needsWater: boolean;
  lastWatered: Date;
  image: string;
}

// Define PlantGrowthSimulator props
interface PlantGrowthSimulatorProps {
  isActive: boolean;
  onToggle: () => void;
  garden: (Plant | null)[][];
  onWaterPlant: (rowIndex: number, colIndex: number) => void;
}

// PlantGrowthSimulator component
const PlantGrowthSimulator: React.FC<PlantGrowthSimulatorProps> = ({
  isActive,
  onToggle,
  garden,
  onWaterPlant
}) => {
  return (
    <div className="plant-growth-simulator">
      <div className="simulator-controls">
        <h3>Growth Simulator</h3>
        <button 
          className={`toggle-button ${isActive ? 'active' : ''}`}
          onClick={onToggle}
        >
          {isActive ? 'Pause Simulation' : 'Start Simulation'}
        </button>
      </div>
      
      <div className="garden-grid">
        {garden.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="garden-row">
            {row.map((plant, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className="garden-cell">
                {plant ? (
                  <div className="plant-card">
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      className={`plant-image stage-${plant.growthStage}`} 
                    />
                    <div className="plant-info">
                      <p>{plant.name}</p>
                      <p>Stage: {plant.growthStage}/5</p>
                      <div className={`water-indicator ${plant.needsWater ? 'needs-water' : ''}`}>
                        {plant.needsWater ? '💧 Needs water!' : '✓ Watered'}
                      </div>
                    </div>
                    <button 
                      className="water-button"
                      onClick={() => onWaterPlant(rowIndex, colIndex)}
                      disabled={!plant.needsWater}
                    >
                      Water Plant
                    </button>
                  </div>
                ) : (
                  <div className="empty-cell">Empty Plot</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Define the props for the main GardenApp component
interface GardenAppProps {
  initialGarden?: (Plant | null)[][];
}

// Main GardenApp component
const GardenApp: React.FC<GardenAppProps> = ({ initialGarden }) => {
  // Tab state
  const [activeTab, setActiveTab] = useState<'garden' | 'plants' | 'growth'>('garden');
  
  // Growth simulation state
  const [simulateGrowth, setSimulateGrowth] = useState<boolean>(false);
  
  // Garden state with default 3x3 empty garden
  const [garden, setGarden] = useState<(Plant | null)[][]>(() => {
    if (initialGarden) return initialGarden;
    
    // Create a default 3x3 empty garden
    return Array(3).fill(null).map(() => Array(3).fill(null));
  });

  // Available plants to add to garden
  const [availablePlants] = useState<Plant[]>([
    {
      id: 'tomato-1',
      name: 'Tomato',
      type: 'vegetable',
      growthStage: 1,
      needsWater: true,
      lastWatered: new Date(),
      image: '/images/tomato.png'
    },
    {
      id: 'carrot-1',
      name: 'Carrot',
      type: 'root',
      growthStage: 1,
      needsWater: true,
      lastWatered: new Date(),
      image: '/images/carrot.png'
    },
    {
      id: 'rose-1',
      name: 'Rose',
      type: 'flower',
      growthStage: 1,
      needsWater: true,
      lastWatered: new Date(),
      image: '/images/rose.png'
    }
  ]);

  // Toggle growth simulation
  const handleToggleGrowth = () => {
    setSimulateGrowth(prev => !prev);
  };

  // Add plant to garden
  const handleAddPlant = (plant: Plant, rowIndex: number, colIndex: number) => {
    const newGarden = [...garden];
    // Create a new plant instance to avoid reference issues
    const newPlant = { ...plant, id: `${plant.id}-${Date.now()}` };
    newGarden[rowIndex][colIndex] = newPlant;
    setGarden(newGarden);
  };

  // Water a plant
  const handleWaterPlant = (rowIndex: number, colIndex: number) => {
    const newGarden = [...garden];
    const plant = newGarden[rowIndex][colIndex];
    
    if (plant && plant.needsWater) {
      plant.needsWater = false;
      plant.lastWatered = new Date();
      setGarden(newGarden);
    }
  };

  // Simulate plant growth over time when active
  useEffect(() => {
    if (!simulateGrowth) return;

    const growthInterval = setInterval(() => {
      setGarden(prevGarden => {
        const newGarden = prevGarden.map(row => {
          return row.map(plant => {
            if (!plant) return null;
            
            // Clone the plant to avoid mutation
            const updatedPlant = { ...plant };
            
            // Determine if plant needs water (every 30 seconds in this simulation)
            const timeSinceWatered = new Date().getTime() - updatedPlant.lastWatered.getTime();
            if (timeSinceWatered > 30000) { // 30 seconds
              updatedPlant.needsWater = true;
            }
            
            // Only grow if the plant has been watered and isn't at max growth
            if (!updatedPlant.needsWater && updatedPlant.growthStage < 5) {
              // 10% chance to grow each interval if watered
              if (Math.random() < 0.1) {
                updatedPlant.growthStage += 1;
              }
            }
            
            return updatedPlant;
          });
        });
        
        return newGarden;
      });
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(growthInterval);
  }, [simulateGrowth]);

  return (
    <div className="garden-app">
      <header>
        <h1>Virtual Garden</h1>
        <nav>
          <button 
            className={activeTab === 'garden' ? 'active' : ''} 
            onClick={() => setActiveTab('garden')}
          >
            Garden
          </button>
          <button 
            className={activeTab === 'plants' ? 'active' : ''} 
            onClick={() => setActiveTab('plants')}
          >
            Plants
          </button>
          <button 
            className={activeTab === 'growth' ? 'active' : ''} 
            onClick={() => setActiveTab('growth')}
          >
            Growth Simulator
          </button>
        </nav>
      </header>
      
      <main>
        {/* GARDEN TAB */}
        {activeTab === 'garden' && (
          <div className="garden-container">
            <h2>Your Garden</h2>
            <div className="garden-grid">
              {garden.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="garden-row">
                  {row.map((plant, colIndex) => (
                    <div 
                      key={`cell-${rowIndex}-${colIndex}`} 
                      className="garden-cell"
                      onClick={() => !plant && setActiveTab('plants')}
                    >
                      {plant ? (
                        <div className="plant-card">
                          <img 
                            src={plant.image} 
                            alt={plant.name}
                            className={`plant-image stage-${plant.growthStage}`}
                          />
                          <p>{plant.name}</p>
                        </div>
                      ) : (
                        <div className="empty-cell">Click to add plant</div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* PLANTS TAB */}
        {activeTab === 'plants' && (
          <div className="plants-container">
            <h2>Available Plants</h2>
            <div className="plants-grid">
              {availablePlants.map(plant => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>Type: {plant.type}</p>
                  <div className="garden-selector">
                    <p>Add to garden:</p>
                    <div className="garden-grid-selector">
                      {garden.map((row, rowIndex) => (
                        <div key={`select-row-${rowIndex}`} className="garden-row">
                          {row.map((cell, colIndex) => (
                            <button
                              key={`select-cell-${rowIndex}-${colIndex}`}
                              disabled={cell !== null}
                              onClick={() => {
                                handleAddPlant(plant, rowIndex, colIndex);
                                setActiveTab('garden');
                              }}
                              className={cell !== null ? 'occupied' : ''}
                            >
                              {rowIndex},{colIndex}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* GROWTH SIMULATOR TAB */}
        {activeTab === 'growth' && (
          <div className="growth-simulator-container">
            <PlantGrowthSimulator
              isActive={simulateGrowth}
              onToggle={handleToggleGrowth}
              garden={garden}
              onWaterPlant={handleWaterPlant}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default GardenApp;