import { Plant } from '../types';

// Mock plant data for the application
const mockPlants: Plant[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    color: '#ff6b6b',
    width: 1,
    height: 1,
    spacing: 18,
    plantsPerSquareFoot: 1,
    sunlight: 'Full Sun',
    water: 'Regular',
    image: '/assets/images/plants/tomato.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    color: '#1dd1a1',
    width: 1,
    height: 1,
    spacing: 6,
    plantsPerSquareFoot: 4,
    sunlight: 'Partial Sun',
    water: 'Regular',
    image: '/assets/images/plants/lettuce.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'carrot',
    name: 'Carrot',
    color: '#ff9f43',
    width: 1,
    height: 1,
    spacing: 3,
    plantsPerSquareFoot: 16,
    sunlight: 'Full Sun',
    water: 'Moderate',
    image: '/assets/images/plants/carrot.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'basil',
    name: 'Basil',
    color: '#10ac84',
    width: 1,
    height: 1,
    spacing: 6,
    plantsPerSquareFoot: 4,
    sunlight: 'Full Sun',
    water: 'Regular',
    image: '/assets/images/plants/basil.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    color: '#f9ca24',
    width: 1,
    height: 1,
    spacing: 12,
    plantsPerSquareFoot: 1,
    sunlight: 'Full Sun',
    water: 'Moderate',
    image: '/assets/images/plants/sunflower.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'radish',
    name: 'Radish',
    color: '#eb4d4b',
    width: 1,
    height: 1,
    spacing: 3,
    plantsPerSquareFoot: 16,
    sunlight: 'Full Sun',
    water: 'Regular',
    image: '/assets/images/plants/radish.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    color: '#6ab04c',
    width: 1,
    height: 1,
    spacing: 12,
    plantsPerSquareFoot: 1,
    sunlight: 'Full Sun',
    water: 'Heavy',
    image: '/assets/images/plants/cucumber.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'corn',
    name: 'Corn',
    color: '#f6e58d',
    width: 1,
    height: 1,
    spacing: 12,
    plantsPerSquareFoot: 1,
    sunlight: 'Full Sun',
    water: 'Regular',
    image: '/assets/images/plants/corn.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'beans',
    name: 'Beans',
    color: '#badc58',
    width: 1,
    height: 1,
    spacing: 6,
    plantsPerSquareFoot: 4,
    sunlight: 'Full Sun',
    water: 'Moderate',
    image: '/assets/images/plants/beans.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  },
  {
    id: 'onion',
    name: 'Onion',
    color: '#dff9fb',
    width: 1,
    height: 1,
    spacing: 4,
    plantsPerSquareFoot: 9,
    sunlight: 'Full Sun',
    water: 'Moderate',
    image: '/assets/images/plants/onion.png',
    growthStage: 0,
    happiness: 100,
    needsWater: false
  }
];

// Function to fetch initial plants for the garden
export const getInitialPlants = async (): Promise<Plant[]> => {
  // Simulating an API call with timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlants);
    }, 500);
  });
};

// For future API implementation
export const searchPlants = async (searchTerm: string): Promise<Plant[]> => {
  // Simulating an API call with timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredPlants = mockPlants.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(filteredPlants);
    }, 500);
  });
};

// For future API implementation
export const getPlantDetails = async (plantId: string): Promise<Plant | null> => {
  // Simulating an API call with timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      const plant = mockPlants.find(p => p.id === plantId) || null;
      resolve(plant);
    }, 300);
  });
};

// Mock function for plant care tips - in a real app, this could come from an API
export const getPlantCareTips = async (plantName: string): Promise<string[]> => {
  const tips: Record<string, string[]> = {
    'Tomato': [
      'Plant tomatoes deeply, with 2/3 of the stem underground to develop a strong root system.',
      'Provide support with cages or stakes to keep fruit off the ground.',
      'Water consistently to prevent issues like blossom end rot.',
      'Remove suckers (side shoots) for larger fruit and better airflow.'
    ],
    'Lettuce': [
      'Lettuce grows best in cooler weather, plant in spring or fall.',
      'Harvest outer leaves as needed to allow plant to continue growing.',
      'Provide some afternoon shade in hot weather.',
      'Keep soil consistently moist but not soggy.'
    ],
    'Carrot': [
      'Carrots need loose, stone-free soil to grow straight roots.',
      'Thin seedlings to proper spacing to allow roots to develop.',
      'Keep soil evenly moist to prevent cracking.',
      'Protect tops from frost to prevent bitter taste.'
    ],
    'Basil': [
      'Pinch off flower buds to encourage leaf growth.',
      'Harvest from the top down, cutting stems just above a pair of leaves.',
      'Water at the base to keep leaves dry and prevent disease.',
      'Provide protection from cold temperatures below 50°F (10°C).'
    ],
    'Sunflower': [
      'Plant in a location that receives 6-8 hours of direct sunlight.',
      'Support tall varieties with stakes to prevent toppling in wind.',
      'Sunflowers are drought-tolerant once established.',
      'Keep bird feeders away if you want to harvest seeds yourself.'
    ]
  };
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tips[plantName] || [
        'Water regularly, keeping soil moist but not soggy.',
        'Ensure proper sunlight based on plant needs.',
        'Remove dead or yellowing leaves promptly.',
        'Monitor for pests and diseases regularly.'
      ]);
    }, 300);
  });
};