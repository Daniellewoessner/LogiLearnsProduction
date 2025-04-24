import React, { useState, useEffect, useContext } from 'react';
import { DyslexiaSettingsContext } from '../App';
import GamePointsDisplay from '../components/GamePointDisplay';
import GameMissionPanel from '../components/GameMissionPanel';
import PlantGrowthSimulator from '../components/PlantGrowthSimulator';
import AchievementBadges from '../components/AchievementBadges';
import GardenQuiz from '../components/GardenQuix';
import '../styles/GardenGame.css';
import { 
  Plant, 
  PlotSize, 
  Mission, 
  Achievement, 
  GameState 
} from '../types';
import { getInitialPlants } from '../services/plantService';

// Helper function to calculate plants per square foot
const calculatePlantsPerSquareFoot = (spacing: number): number => {
  if (spacing >= 18) return 0.25; // 1 plant per 4 squares
  if (spacing >= 12) return 1;
  if (spacing >= 6) return 4;
  if (spacing >= 4) return 9;
  return 16; // 3 inches or less spacing
};

// Helper function to check companion planting
const areCompanionPlants = (plant1: Plant, plant2: Plant): boolean => {
  // This would be expanded with actual companion planting data
  const companionPairs = [
    ['Tomato', 'Basil'],
    ['Carrot', 'Onion'],
    ['Cucumber', 'Sunflower'],
    ['Lettuce', 'Radish'],
    ['Corn', 'Beans']
  ];
  
  return companionPairs.some(pair => 
    (pair[0] === plant1.name && pair[1] === plant2.name) || 
    (pair[0] === plant2.name && pair[1] === plant1.name)
  );
};

// Calculate XP from a garden layout
const calculateGardenScore = (garden: (Plant | null)[][]): number => {
  let score = 0;
  const plants = garden.flat().filter(Boolean) as Plant[];
  
  // Base score: number of plants
  score += plants.length * 10;
  
  // Companion planting bonus
  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      const currentPlant = garden[i][j];
      if (!currentPlant) continue;
      
      // Check adjacent cells
      const adjacentCells = [
        i > 0 ? garden[i-1][j] : null, // up
        i < garden.length - 1 ? garden[i+1][j] : null, // down
        j > 0 ? garden[i][j-1] : null, // left
        j < garden[i].length - 1 ? garden[i][j+1] : null // right
      ];
      
      // Award points for companion planting
      adjacentCells.forEach(adjPlant => {
        if (adjPlant && areCompanionPlants(currentPlant, adjPlant)) {
          score += 25;
        }
      });
    }
  }
  
  // Variety bonus
  const uniquePlants = new Set(plants.map(p => p.name)).size;
  score += uniquePlants * 15;
  
  return score;
};

// Initial missions data
const initialMissions: Mission[] = [
  {
    id: 'mission1',
    title: 'First Garden',
    description: 'Place at least 3 plants in your garden.',
    xpReward: 100,
    requirements: {
      minPlants: 3
    },
    completed: false
  },
  {
    id: 'mission2',
    title: 'Companion Planting',
    description: 'Place tomatoes and basil next to each other.',
    xpReward: 150,
    requirements: {
      plantTypes: ['Tomato', 'Basil'],
      companionPlanting: true
    },
    completed: false
  },
  {
    id: 'mission3',
    title: 'Diverse Garden',
    description: 'Create a garden with at least 4 different types of plants.',
    xpReward: 200,
    requirements: {
      minPlants: 4
    },
    completed: false
  }
];

// Initial achievements data
const initialAchievements: Achievement[] = [
  {
    id: 'achievement1',
    name: 'Green Thumb',
    description: 'Plant your first garden',
    icon: '🌱',
    unlocked: false,
    progress: 0,
    target: 1
  },
  {
    id: 'achievement2',
    name: 'Master Gardener',
    description: 'Complete 3 garden layouts',
    icon: '🌻',
    unlocked: false,
    progress: 0,
    target: 3
  },
  {
    id: 'achievement3',
    name: 'Plant Expert',
    description: 'Correctly answer 5 plant quiz questions',
    icon: '🧠',
    unlocked: false,
    progress: 0,
    target: 5
  }
];

// Initial game state
const initialGameState: GameState = {
  level: 1,
  xp: 0,
  currentMission: initialMissions[0],
  completedMissions: [],
  achievements: initialAchievements,
  coins: 100,
  streak: 0,
  lastPlayed: null
};

const GardenGamePage: React.FC = () => {
  const dyslexiaSettings = useContext(DyslexiaSettingsContext);
  
  // Available plot sizes
  const plotSizes: PlotSize[] = [
    { id: 'xxs', name: 'Extra Small (2 x 2)', rows: 2, cols: 2 },
    { id: 'xs', name: 'Small (3 x 3)', rows: 3, cols: 3 },
    { id: 'small', name: 'Medium (4 x 4)', rows: 4, cols: 4 },
    { id: 'medium', name: 'Large (6 x 6)', rows: 6, cols: 6 },
  ];

  // State
  const [selectedPlotSize, setSelectedPlotSize] = useState<PlotSize>(plotSizes[0]);
  const [garden, setGarden] = useState<(Plant | null)[][]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [plantTypes, setPlantTypes] = useState<Plant[]>([]);
  const [gardenName, setGardenName] = useState('My First Garden');
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [activeTab, setActiveTab] = useState('garden');
  const [availableMissions, setAvailableMissions] = useState<Mission[]>(initialMissions);
  const [simulateGrowth, setSimulateGrowth] = useState(false);
  const [instructions, setInstructions] = useState<string[]>([
    "Pick a plant from the list below",
    "Click on a garden square to plant it",
    "Right-click to remove a plant",
    "Try to complete your first mission!"
  ]);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [showInstructionModal, setShowInstructionModal] = useState(true);

  // Initialize garden grid when plot size changes
  useEffect(() => {
    setGarden(
      Array(selectedPlotSize.rows).fill(null).map(() => Array(selectedPlotSize.cols).fill(null))
    );
  }, [selectedPlotSize]);

  // Load initial plants
  useEffect(() => {
    const loadPlants = async () => {
      const plants = await getInitialPlants();
      setPlantTypes(plants);
    };
    
    loadPlants();
  }, []);

  // Game mechanics - Growth simulation
  useEffect(() => {
    if (!simulateGrowth) return;
    
    const growthInterval = setInterval(() => {
      // Simulate plant growth and needs
      setGarden(prevGarden => {
        return prevGarden.map(row => 
          row.map(cell => {
            if (!cell) return null;
            
            // Random chance for plant to need water
            const needsWater = Math.random() < 0.2;
            
            // Growth only happens if plant is happy and watered
            let newGrowthStage = cell.growthStage || 0;
            let happiness = cell.happiness || 100;
            
            if (needsWater) {
              // Plant gets less happy when it needs water
              happiness = Math.max(0, happiness - 10);
            } else if (happiness > 90) {
              // Only grow if plant is happy
              newGrowthStage = Math.min(3, newGrowthStage + 1);
            }
            
            return {
              ...cell,
              growthStage: newGrowthStage,
              happiness: happiness,
              needsWater: needsWater
            };
          })
        );
      });
    }, 10000); // Growth tick every 10 seconds
    
    return () => clearInterval(growthInterval);
  }, [simulateGrowth]);

  // Game mechanics - Check mission completion
  useEffect(() => {
    // Skip if no current mission
    if (!gameState.currentMission) return;
    
    const mission = gameState.currentMission;
    const plants = garden.flat().filter(Boolean) as Plant[];
    
    // Check for mission completion
    let completed = false;
    
    // Check minimum plants requirement
    if (mission.requirements.minPlants && plants.length >= mission.requirements.minPlants) {
      completed = true;
    }
    
    // Check for specific plant types
    if (mission.requirements.plantTypes) {
      const plantNames = plants.map(p => p.name);
      const hasAllRequired = mission.requirements.plantTypes.every(type => 
        plantNames.includes(type)
      );
      
      if (!hasAllRequired) {
        completed = false;
      }
    }
    
    // Check for companion planting
    if (mission.requirements.companionPlanting) {
      let hasCompanions = false;
      
      // Check each plant's neighbors
      for (let i = 0; i < garden.length; i++) {
        for (let j = 0; j < garden[i].length; j++) {
          const currentPlant = garden[i][j];
          if (!currentPlant) continue;
          
          // Check adjacent cells
          const adjacentCells = [
            i > 0 ? garden[i-1][j] : null, // up
            i < garden.length - 1 ? garden[i+1][j] : null, // down
            j > 0 ? garden[i][j-1] : null, // left
            j < garden[i].length - 1 ? garden[i][j+1] : null // right
          ];
          
          // Check for companion plants
          adjacentCells.forEach(adjPlant => {
            if (adjPlant && areCompanionPlants(currentPlant, adjPlant)) {
              hasCompanions = true;
            }
          });
        }
      }
      
      if (!hasCompanions) {
        completed = false;
      }
    }
    
    // If mission is completed
    if (completed && !mission.completed) {
      // Mark mission as completed
      const updatedMission = { ...mission, completed: true };
      
      // Award XP
      awardXP(mission.xpReward, `Completed mission: ${mission.title}`);
      
      // Update available missions
      setAvailableMissions(prev => 
        prev.map(m => m.id === mission.id ? updatedMission : m)
      );
      
      // Set next mission
      const completedMissionIndex = availableMissions.findIndex(m => m.id === mission.id);
      const nextMission = availableMissions[completedMissionIndex + 1] || null;
      
      // Update game state
      setGameState(prev => ({
        ...prev,
        currentMission: nextMission,
        completedMissions: [...prev.completedMissions, mission.id]
      }));
      
      // Show congratulations
      alert(`🎉 Mission Complete! You've earned ${mission.xpReward} XP for completing "${mission.title}"`);
    }
  }, [garden, gameState.currentMission, availableMissions]);

  // Award XP function
  const awardXP = (amount: number, reason: string) => {
    setGameState(prev => {
      const newXP = prev.xp + amount;
      let newLevel = prev.level;
      
      // Level up if XP threshold reached (300 XP per level - easier for kids)
      if (newXP >= prev.level * 300) {
        newLevel = prev.level + 1;
        // Show level up notification
        alert(`🎉 Level Up! You are now level ${newLevel}! You received 50 coins as a reward.`);
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: prev.coins + (newLevel > prev.level ? 50 : 0) // Award 50 coins on level up
      };
    });
  };

  // Update achievement progress
  const updateAchievementProgress = (achievementId: string, increment: number) => {
    setGameState(prev => {
      const newAchievements = prev.achievements.map(achievement => {
        if (achievement.id === achievementId) {
          const newProgress = Math.min(achievement.target, achievement.progress + increment);
          const newlyUnlocked = !achievement.unlocked && newProgress >= achievement.target;
          
          // Show notification if achievement unlocked
          if (newlyUnlocked) {
            alert(`🏆 Achievement Unlocked: ${achievement.name}! You received 25 coins as a reward.`);
          }
          
          return {
            ...achievement,
            progress: newProgress,
            unlocked: achievement.unlocked || newlyUnlocked
          };
        }
        return achievement;
      });
      
      // Count newly unlocked achievements
      const newlyUnlockedCount = newAchievements.filter(a => 
        a.unlocked && !prev.achievements.find(pa => pa.id === a.id)?.unlocked
      ).length;
      
      // Award 25 coins per new achievement
      return {
        ...prev,
        achievements: newAchievements,
        coins: prev.coins + (newlyUnlockedCount * 25)
      };
    });
  };

  // Handle a correct answer in a quiz
  const handleQuizCorrect = () => {
    awardXP(20, "Correct quiz answer");
    updateAchievementProgress('achievement3', 1);
  };

  // Water a plant
  const handleWaterPlant = (rowIndex: number, colIndex: number) => {
    setGarden(prev => {
      const newGarden = [...prev];
      if (newGarden[rowIndex][colIndex]) {
        newGarden[rowIndex][colIndex] = {
          ...newGarden[rowIndex][colIndex] as Plant,
          needsWater: false,
          happiness: Math.min(100, (newGarden[rowIndex][colIndex]?.happiness || 0) + 15)
        };
        
        // Award a small amount of XP for caring for plants
        awardXP(2, "Watered a plant");
      }
      return newGarden;
    });
  };

  // Handle selecting a plant
  const handlePlantSelect = (plant: Plant): void => {
    setSelectedPlant(plant);
    // Progress to next instruction if this is the first instruction
    if (currentInstructionIndex === 0) {
      setCurrentInstructionIndex(1);
    }
  };

  // Handle placing a plant in the garden
  const handleCellClick = (rowIndex: number, colIndex: number): void => {
    if (!selectedPlant) return;

    // Check if space is available
    if (garden[rowIndex][colIndex]) return;
    
    // Check if player has enough coins (5 coins per plant)
    if (gameState.coins < 5) {
      alert("Not enough coins! You need 5 coins to place a plant.");
      return;
    }

    // Create a new garden grid with the selected plant placed
    const newGarden = [...garden];
    newGarden[rowIndex][colIndex] = {
      ...selectedPlant,
      image: selectedPlant.image || '',
      plantedDate: new Date(),
      growthStage: 0,
      happiness: 100,
      needsWater: false
    };
    
    setGarden(newGarden);
    
    // Deduct coins
    setGameState(prev => ({
      ...prev,
      coins: prev.coins - 5
    }));
    
    // Award XP for planting
    awardXP(3, `Planted a ${selectedPlant.name}`);
    
    // Update instruction if this is the first placement
    if (currentInstructionIndex === 1) {
      setCurrentInstructionIndex(2);
    }
  };

  // Handle removing a plant
  const handleRemovePlant = (rowIndex: number, colIndex: number): void => {
    if (!garden[rowIndex][colIndex]) return;

    const newGarden = [...garden];
    
    // Refund 2 coins when removing a plant
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + 2
    }));
    
    newGarden[rowIndex][colIndex] = null;
    setGarden(newGarden);
    
    // Update instruction if this is the first removal
    if (currentInstructionIndex === 2) {
      setCurrentInstructionIndex(3);
    }
  };

  // Clear the entire garden
  const handleClearGarden = (): void => {
    // Confirm clearing
    if (!window.confirm("Are you sure you want to clear your garden? You'll receive a partial coin refund.")) {
      return;
    }
    
    // Count plants for refund
    const plantCount = garden.flat().filter(Boolean).length;
    
    // Refund 2 coins per plant
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + (plantCount * 2)
    }));
    
    setGarden(
      Array(selectedPlotSize.rows).fill(null).map(() => Array(selectedPlotSize.cols).fill(null))
    );
  };

  // Change plot size
  const handlePlotSizeChange = (plotSizeId: string): void => {
    // Confirm if garden already has plants
    const hasPlants = garden.flat().some(Boolean);
    if (hasPlants) {
      if (!window.confirm("Changing plot size will clear your current garden. Continue?")) {
        return;
      }
    }
    
    const newPlotSize = plotSizes.find(size => size.id === plotSizeId);
    if (newPlotSize) {
      setSelectedPlotSize(newPlotSize);
      
      // Reset garden when changing plot size
      setGarden(
        Array(newPlotSize.rows).fill(null).map(() => Array(newPlotSize.cols).fill(null))
      );
    }
  };

  // Handle garden name change
  const handleGardenNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGardenName(e.target.value);
  };

  // Start growth simulation
  const handleToggleGrowth = () => {
    setSimulateGrowth(!simulateGrowth);
  };
  
  // Change active tab
  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
  };
  
  // Evaluate garden and provide feedback
  const handleEvaluateGarden = () => {
    const score = calculateGardenScore(garden);
    const plantCount = garden.flat().filter(Boolean).length;
    
    if (plantCount === 0) {
      alert("Your garden is empty! Try planting some vegetables and flowers.");
      return;
    }
    
    // Award XP based on score
    awardXP(Math.floor(score / 10), "Garden evaluation");
    
    // Provide feedback
    let feedback = `Garden Score: ${score} points\n\n`;
    
    // Count unique plant types
    const uniquePlants = new Set(garden.flat().filter(Boolean).map((p) => (p as Plant).name)).size;
    feedback += `You have ${plantCount} plants of ${uniquePlants} different types.\n\n`;
    
    // Check companion planting
    let companionCount = 0;
    for (let i = 0; i < garden.length; i++) {
      for (let j = 0; j < garden[i].length; j++) {
        const currentPlant = garden[i][j];
        if (!currentPlant) continue;
        
        // Check adjacent cells
        const adjacentCells = [
          i > 0 ? garden[i-1][j] : null, // up
          i < garden.length - 1 ? garden[i+1][j] : null, // down
          j > 0 ? garden[i][j-1] : null, // left
          j < garden[i].length - 1 ? garden[i][j+1] : null // right
        ];
        
        adjacentCells.forEach(adjPlant => {
          if (adjPlant && areCompanionPlants(currentPlant, adjPlant)) {
            companionCount++;
          }
        });
      }
    }
    
    if (companionCount > 0) {
      feedback += `Great job! You have ${companionCount} companion plant pairs that will help each other grow better.\n\n`;
    } else {
      feedback += "Tip: Try placing companion plants next to each other. For example, tomatoes grow better next to basil.\n\n";
    }
    
    // Educational tips based on garden contents
    const plantNames = garden.flat().filter(Boolean).map((p) => (p as Plant).name);
    
    if (plantNames.includes('Tomato')) {
      feedback += "Tomato Tip: Tomatoes need plenty of sun and consistent watering. They grow best with support structures.\n\n";
    }
    
    if (plantNames.includes('Lettuce')) {
      feedback += "Lettuce Tip: Lettuce prefers cooler weather and partial shade in hot climates. It's a quick-growing crop!\n\n";
    }
    
    alert(feedback);
  };

  // Determine current level progress percentage
  const levelProgress = () => {
    const currentLevelXP = gameState.level * 300;
    const previousLevelXP = (gameState.level - 1) * 300;
    const totalLevelXP = currentLevelXP - previousLevelXP;
    const currentXPInLevel = gameState.xp - previousLevelXP;
    
    return Math.min(100, Math.floor((currentXPInLevel / totalLevelXP) * 100));
  };

  // Handle dismissing the instruction modal
  const handleDismissInstructions = () => {
    setShowInstructionModal(false);
  };

  return (
    <div className="garden-game-page">
      {/* Instructions Modal */}
      {showInstructionModal && (
        <div className="instruction-modal">
          <div className="instruction-content">
            <h2>Welcome to Garden Explorer!</h2>
            <p>Let's learn how to create a garden:</p>
            <div className="current-instruction">
              <div className="instruction-number">{currentInstructionIndex + 1}</div>
              <div className="instruction-text">{instructions[currentInstructionIndex]}</div>
            </div>
            <div className="instruction-progress">
              {instructions.map((_, index) => (
                <div 
                  key={index} 
                  className={`progress-dot ${index <= currentInstructionIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            <button 
              className="dismiss-button"
              onClick={handleDismissInstructions}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Game Header with Points, Level, etc. */}
      <div className="game-header">
        <h1>Garden Explorer</h1>
        <p className="intro-text">Design your garden, learn about plants, and complete challenges!</p>
        
        <div className="game-stats">
          <GamePointsDisplay 
            level={gameState.level}
            xp={gameState.xp} 
            coins={gameState.coins}
            levelProgress={levelProgress()}
          />
          
          {gameState.currentMission && (
            <div className="current-mission">
              <h4>Current Mission: {gameState.currentMission.title}</h4>
              <p>{gameState.currentMission.description}</p>
              <div className="mission-reward">Reward: {gameState.currentMission.xpReward} XP</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="game-tabs">
        <button 
          className={`tab-button ${activeTab === 'garden' ? 'active' : ''}`}
          onClick={() => handleChangeTab('garden')}
        >
          Garden Designer
        </button>
        <button 
          className={`tab-button ${activeTab === 'missions' ? 'active' : ''}`}
          onClick={() => handleChangeTab('missions')}
        >
          Missions
        </button>
        <button 
          className={`tab-button ${activeTab === 'growth' ? 'active' : ''}`}
          onClick={() => handleChangeTab('growth')}
        >
          Growth Simulator
        </button>
        <button 
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => handleChangeTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => handleChangeTab('quiz')}
        >
          Plant Quiz
        </button>
      </div>

      {/* Main Content Area - Shows different content based on active tab */}
      <div className="game-content">
        {/* GARDEN DESIGNER TAB */}
        {activeTab === 'garden' && (
          <div className="garden-layout">
            <div className="garden-controls">
              {/* Plot Size Selector */}
              <div className="controls-row">
                <div className="plot-size-selector">
                  <label htmlFor="plotSize">Garden Size:</label>
                  <select
                    id="plotSize"
                    value={selectedPlotSize.id}
                    onChange={(e) => handlePlotSizeChange(e.target.value)}
                    className="plot-size-select"
                  >
                    {plotSizes.map(size => (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Garden name input */}
                <div className="garden-name-input">
                  <input
                    type="text"
                    placeholder="Garden Name"
                    value={gardenName}
                    onChange={handleGardenNameChange}
                    className="garden-name-field"
                  />
                </div>

                <button
                  className="clear-button"
                  onClick={handleClearGarden}
                >
                  Clear Garden
                </button>
                
                <button
                  className="evaluate-button"
                  onClick={handleEvaluateGarden}
                >
                  Evaluate Garden
                </button>
              </div>

              {/* Selected Plant Info */}
              {selectedPlant && (
                <div className="selected-plant-info">
                  <div className="selected-plant-header">
                    <div className="selected-plant-image">
                      <img src={selectedPlant.image} alt={selectedPlant.name} />
                    </div>
                    <h3>Selected: {selectedPlant.name}</h3>
                  </div>
                  <div className="plant-quick-info">
                    <span>Spacing: {selectedPlant.spacing} inches</span> |
                    <span>Plants per square foot: {selectedPlant.plantsPerSquareFoot}</span> |
                    <span>Sunlight: {selectedPlant.sunlight}</span> |
                    <span>Water: {selectedPlant.water}</span>
                  </div>
                  <div className="plant-cost">
                    <span className="coin-icon">🪙</span> Cost to plant: 5 coins
                  </div>
                </div>
              )}
            </div>

            {/* Garden Grid (main content) */}
            <div className="garden-area">
              <div className="garden-title">
                <h3>{gardenName || "My Garden"}</h3>
                <p>Grid size: {selectedPlotSize.rows} × {selectedPlotSize.cols} squares</p>
              </div>
              <div className="garden-grid-container">
                <div
                  className="garden-grid"
                  style={{
                    gridTemplateColumns: `repeat(${selectedPlotSize.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${selectedPlotSize.rows}, 1fr)`
                  }}
                >
                  {garden.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`grid-cell ${cell?.needsWater ? 'needs-water' : ''}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          handleRemovePlant(rowIndex, colIndex);
                        }}
                      >
                        {cell && (
                          <div
                            className={`plant-in-grid growth-stage-${cell.growthStage || 0}`}
                          >
                            <div className="plant-image-container">
                              <img
                                src={cell.image}
                                alt={cell.name}
                                style={{ 
                                  opacity: cell.happiness && cell.happiness < 50 ? 0.6 : 1
                                }}
                              />
                              
                              {/* Water droplet icon for plants that need water */}
                              {cell.needsWater && (
                                <div 
                                  className="water-indicator"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleWaterPlant(rowIndex, colIndex);
                                  }}
                                >
                                  💧
                                </div>
                              )}
                              
                              {/* Happiness indicator */}
                              {cell.happiness !== undefined && (
                                <div className="happiness-meter">
                                  <div 
                                    className="happiness-level"
                                    style={{ width: `${cell.happiness}%`, backgroundColor: 
                                      cell.happiness > 80 ? '#4CAF50' :
                                      cell.happiness > 50 ? '#FFC107' : '#F44336'
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="plant-name">
                              {cell.name}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ))}
                </div>
              </div>

              <div className="grid-info">
                <p>Left click to place a plant (costs 5 coins). Right click to remove (refunds 2 coins).</p>
                {simulateGrowth && <p>Growth simulation is active! Water your plants when they need it (💧).</p>}
              </div>
            </div>

            {/* Plant Selection (bottom) */}
            <div className="plant-selection">
              <h3>Available Plants</h3>
              <div className="plant-items">
                {plantTypes.map((plant) => (
                  <div
                    key={plant.id}
                    className={`plant-item ${selectedPlant?.id === plant.id ? 'selected' : ''}`}
                    onClick={() => handlePlantSelect(plant)}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                    />
                    <span className="plant-name">{plant.name}</span>
                    <div className="plant-per-foot">
                      {plant.plantsPerSquareFoot} per sq ft
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* MISSIONS TAB */}
        {activeTab === 'missions' && (
          <div className="missions-container">
            <GameMissionPanel 
              missions={availableMissions}
              currentMission={gameState.currentMission || null}
              completedMissions={gameState.completedMissions}
            />
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
        
        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div className="achievements-container">
            <AchievementBadges
              achievements={gameState.achievements}
            />
          </div>
        )}
        
        {/* QUIZ TAB */}
        {activeTab === 'quiz' && (
          <div className="quiz-container">
            <GardenQuiz 
              onCorrectAnswer={handleQuizCorrect} 
              currentLevel={gameState.level}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GardenGamePage;