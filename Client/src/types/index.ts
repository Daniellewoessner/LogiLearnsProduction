// Type definitions for Logi Learns application

// ===== Garden Game Types =====

export interface Plant {
    id: string;
    name: string;
    color: string;
    width: number;
    height: number;
    spacing: number;
    sunlight: string;
    water: string;
    plantsPerSquareFoot: number;
    image?: string;
    growthStage?: number; // 0-3 representing stages of growth
    plantedDate?: Date;
    happiness?: number; // 0-100
    needsWater?: boolean;
  }
  
  export interface PlotSize {
    id: string;
    name: string;
    rows: number;
    cols: number;
  }
  
  export interface Mission {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    requirements: {
      plantTypes?: string[];
      minPlants?: number;
      specificArrangement?: boolean;
      companionPlanting?: boolean;
    };
    completed: boolean;
  }
  
  export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress: number;
    target: number;
  }
  
  export interface GameState {
    level: number;
    xp: number;
    currentMission: Mission | null;
    completedMissions: string[];
    achievements: Achievement[];
    coins: number;
    streak: number;
    lastPlayed: Date | null;
  }
  
  // ===== Quiz Types =====
  
  export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
  export interface QuizData {
    beginner: QuizQuestion[];
    intermediate: QuizQuestion[];
    advanced: QuizQuestion[];
  }
  
  export interface QuizResult {
    totalQuestions: number;
    correctAnswers: number;
    xpEarned: number;
    completedAt: Date;
  }
  
  // ===== User Types =====
  
  export interface UserProfile {
    id: string;
    name: string;
    age?: number;
    avatar?: string;
    gameState: GameState;
    settings: DyslexiaSettings;
    readingLevel?: number;
    quizHistory: QuizResult[];
    savedGardens: SavedGarden[];
  }
  
  export interface SavedGarden {
    id: string;
    name: string;
    rows: number;
    cols: number;
    plants: SavedPlant[];
    createdAt: Date;
    lastModified: Date;
  }
  
  export interface SavedPlant {
    plantId: string;
    row: number;
    col: number;
    plantName: string;
    color: string;
    spacing: number;
    plantsPerSquareFoot: number;
    sunlight: string;
    water: string;
    image?: string;
    growthStage?: number;
    happiness?: number;
    needsWater?: boolean;
  }
  
  // ===== Dyslexia Settings Types =====
  
  export type FontFamily = 'OpenDyslexic' | 'Comic Sans' | 'Arial';
  export type FontSize = 'small' | 'medium' | 'large';
  export type LineSpacing = 'tight' | 'normal' | 'wide';
  export type ColorTheme = 'neutral' | 'cream' | 'dark' | 'blue';
  
  export interface DyslexiaSettings {
    fontFamily: FontFamily;
    fontSize: FontSize;
    lineSpacing: LineSpacing;
    colorTheme: ColorTheme;
  }
  
  // ===== Component Props Types =====
  
  export interface GamePointsDisplayProps {
    level: number;
    xp: number;
    coins: number;
    levelProgress: number;
  }
  
  export interface GameMissionPanelProps {
    missions: Mission[];
    currentMission: Mission | null;
    completedMissions: string[];
  }
  
  export interface PlantGrowthSimulatorProps {
    isActive: boolean;
    onToggle: () => void;
    garden: (Plant | null)[][];
    onWaterPlant: (rowIndex: number, colIndex: number) => void;
  }
  
  export interface AchievementBadgesProps {
    achievements: Achievement[];
  }
  
  export interface GardenQuizProps {
    onCorrectAnswer: () => void;
    currentLevel: number;
  }
  
  export interface PlantCarePanelProps {
    plantName: string;
  }
  
  export interface DyslexiaSettingsContextType extends DyslexiaSettings {
    updateSettings: (settings: Partial<DyslexiaSettings>) => void;
  }
  
  // ===== Reading Game Types =====
  
  export interface ReadingActivity {
    id: string;
    title: string;
    description: string;
    level: number;
    type: 'story' | 'word-recognition' | 'comprehension' | 'letter-sound';
    content: ReadingContent;
    completed: boolean;
  }
  
  export interface ReadingContent {
    text?: string;
    questions?: ReadingQuestion[];
    wordLists?: string[][];
    letterSoundPairs?: LetterSoundPair[];
  }
  
  export interface ReadingQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface LetterSoundPair {
    letter: string;
    sound: string;
    examples: string[];
  }
  
  // ===== Phonics Lab Types =====
  
  export interface PhonicsActivity {
    id: string;
    title: string;
    description: string;
    type: 'letter-sounds' | 'blending' | 'segmenting' | 'rhyming';
    level: number;
    content: PhonicsContent;
    completed: boolean;
  }
  
  export interface PhonicsContent {
    instructions: string;
    examples: string[];
    exercises: PhonicsExercise[];
    audioFiles?: string[];
  }
  
  export interface PhonicsExercise {
    id: string;
    prompt: string;
    options?: string[];
    correctAnswer: string | number;
    audioPrompt?: string;
    imagePrompt?: string;
  }
  
  // ===== API Response Types =====
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  // ===== Service Types =====
  
  export interface PlantService {
    getInitialPlants: () => Promise<Plant[]>;
    searchPlants: (searchTerm: string) => Promise<Plant[]>;
    getPlantDetails: (plantId: string) => Promise<Plant | null>;
    getPlantCareTips: (plantName: string) => Promise<string[]>;
  }
  
  export interface UserService {
    getCurrentUser: () => Promise<UserProfile | null>;
    updateUserProfile: (user: Partial<UserProfile>) => Promise<UserProfile>;
    saveGarden: (garden: SavedGarden) => Promise<SavedGarden>;
    loadGarden: (gardenId: string) => Promise<SavedGarden | null>;
    saveGameState: (gameState: GameState) => Promise<void>;
    updateSettings: (settings: Partial<DyslexiaSettings>) => Promise<DyslexiaSettings>;
  }
  
  export interface ReadingService {
    getReadingActivities: (level?: number) => Promise<ReadingActivity[]>;
    getReadingActivity: (activityId: string) => Promise<ReadingActivity | null>;
    markActivityComplete: (activityId: string) => Promise<void>;
  }
  
  export interface PhonicsService {
    getPhonicsActivities: (level?: number) => Promise<PhonicsActivity[]>;
    getPhonicsActivity: (activityId: string) => Promise<PhonicsActivity | null>;
    markActivityComplete: (activityId: string) => Promise<void>;
  }