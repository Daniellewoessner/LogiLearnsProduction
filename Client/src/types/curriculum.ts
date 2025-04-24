// types/curriculum.ts

/**
 * Learning modality types for activities
 * These represent different learning approaches for dyslexic students
 */
export type ActivityType = 'visual' | 'auditory' | 'tactile' | 'kinesthetic' | 'discussion';

/**
 * Represents a single activity within a curriculum week
 */
export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  durationMinutes: number;
  // Specific modifications for dyslexic learners
  adaptations: string[];
  // Optional properties
  materials?: string[];
  instructions?: string[];
  visualSupports?: string[];
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
}

/**
 * Structure for take-home projects
 */
export interface TakeHomeProject {
  title: string;
  description: string;
  materials: string[];
  instructions?: string[];
  visualGuide?: string;
  estimatedTime?: string;
  adaptations?: string[];
}

/**
 * Main data structure for a curriculum week
 */
export interface WeekData {
  id: string;
  weekNumber: number;
  title: string;
  theme: string;
  description: string;
  learningGoals: string[];
  activities: Activity[];
  takeHomeProject: TakeHomeProject;
  imageUrl: string;
  // Optional properties
  vocabulary?: {
    word: string;
    definition: string;
    visualCue: string;
  }[];
  parentTips?: string[];
  difficultyRating?: number;
  previousSkillsNeeded?: string[];
}

/**
 * Complete curriculum structure
 */
export interface Curriculum {
  id: string;
  title: string;
  description: string;
  ageRange: {
    min: number;
    max: number;
  };
  totalWeeks: number;
  learningObjectives: string[];
  weeks: WeekData[];
  // Metadata for filtering and search
  tags: string[];
  dyslexiaLevel: 'mild' | 'moderate' | 'severe';
  lastUpdated: string;
  createdBy: string;
}

/**
 * User progress tracking
 */
export interface UserProgress {
  userId: string;
  curriculumId: string;
  completedWeeks: string[];
  completedActivities: {
    activityId: string;
    completedOn: string;
    timeSpent: number;
    rating?: number;
    notes?: string;
  }[];
  currentWeek: string;
  startDate: string;
  lastAccessDate: string;
  achievements: {
    id: string;
    name: string;
    earnedOn: string;
  }[];
}

/**
 * Accessibility settings specific to curriculum display
 */
export interface CurriculumAccessibilitySettings {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  fontFamily: string;
  highContrast: boolean;
  audioEnabled: boolean;
  colorScheme: string;
  readingGuide: boolean;
  animationsReduced: boolean;
  readingSpeed: 'slow' | 'medium' | 'fast';
}