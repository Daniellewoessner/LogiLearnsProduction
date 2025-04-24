// src/data/superheroWeeks.ts
import { WeekData } from '../types/curriculum';

export const superheroWeeks: WeekData[] = [
  {
    id: "week-1",
    weekNumber: 1,
    title: "Introduction to Heroes",
    theme: "Different Kinds of Strength",
    description: "Discover what makes someone a hero and explore different types of strengths we all have. Through stories, activities, and discussions, we'll learn that heroes come in many forms and that everyone has special abilities that make them unique.",
    learningGoals: [
      "Identify qualities that make someone a hero",
      "Recognize different types of strengths in ourselves and others",
      "Begin to build vocabulary related to character traits",
      "Practice active listening and visual learning skills"
    ],
    activities: [
      {
        id: "w1-activity1",
        title: "Hero Stories",
        type: "visual",
        description: "Listen to short, illustrated superhero stories with synchronized highlighting of text to improve reading comprehension.",
        durationMinutes: 25,
        adaptations: [
          "Text highlighting follows audio narration",
          "Pause and replay buttons for each segment",
          "Visual vocabulary cards with images",
          "Simple sentence structure with clear fonts",
          "Color-coded character dialogue"
        ]
      },
      {
        id: "w1-activity2",
        title: "Hero Sculpting",
        type: "tactile",
        description: "Create 3D hero figures using clay while discussing different hero qualities and strengths.",
        durationMinutes: 30,
        adaptations: [
          "Trait cards with images and simple text",
          "Step-by-step visual guide for sculpting",
          "Audio instructions available",
          "Simplified vocabulary with visual supports",
          "Multi-sensory approach to reinforce concepts"
        ]
      },
      {
        id: "w1-activity3",
        title: "Real Heroes Circle",
        type: "discussion",
        description: "Share about real-life heroes using visual prompt cards and guided discussion techniques.",
        durationMinutes: 20,
        adaptations: [
          "Picture support on all prompt cards",
          "Sentence starters provided",
          "Option to draw instead of write",
          "Visual timer for turn-taking",
          "Sharing circle with clear visual rules"
        ]
      }
    ],
    takeHomeProject: {
      title: "My Hero Interview",
      description: "Interview a family member about someone they consider a hero, then create a presentation about what you learned. You can record audio, draw pictures, or use the provided template to share your findings.",
      materials: [
        "Hero Interview Cards (provided)",
        "Audio recorder or smartphone (optional)",
        "Drawing supplies",
        "Hero profile template"
      ]
    },
    imageUrl: "/images/curriculum/week1-heroes.png"
  },
  {
    id: "week-2",
    weekNumber: 2,
    title: "Origin Stories",
    theme: "Everyone Starts Somewhere",
    description: "Explore how heroes begin their journeys and discover the importance of origin stories in superhero narratives. Learn how challenges and special moments help shape heroes, and create your own origin story.",
    learningGoals: [
      "Identify common elements in origin stories",
      "Understand narrative structure with beginnings, challenges, and transformations",
      "Practice sequencing events in a story",
      "Develop creative storytelling skills"
    ],
    activities: [
      {
        id: "w2-activity1",
        title: "Origin Story Analysis",
        type: "visual",
        description: "Examine simplified superhero origin stories to identify common patterns and story elements.",
        durationMinutes: 25,
        adaptations: [
          "Story maps with visual cues",
          "Color-coded story elements",
          "Audio narration with text highlighting",
          "Simplified text with controlled vocabulary",
          "Break-down of complex narrative concepts"
        ]
      },
      {
        id: "w2-activity2",
        title: "Transformation Sequence",
        type: "kinesthetic",
        description: "Act out and sequence the stages of a hero's transformation using movement and simple props.",
        durationMinutes: 30,
        adaptations: [
          "Visual sequence cards",
          "Physical movement to reinforce concepts",
          "Simple verbal cues with gestures",
          "Step-by-step visual guides",
          "Buddy system for support"
        ]
      },
      {
        id: "w2-activity3",
        title: "My Beginning",
        type: "tactile",
        description: "Create a storyboard showing the beginning of your own superhero character's journey.",
        durationMinutes: 35,
        adaptations: [
          "Pre-drawn templates with minimal text requirements",
          "Speech-to-text options for captions",
          "Word banks with visual supports",
          "Stickers and visual elements to use instead of writing",
          "Step-by-step guided creation process"
        ]
      }
    ],
    takeHomeProject: {
      title: "Hero Origins Comic Strip",
      description: "Using the provided template, create a 4-panel comic strip showing how your superhero character got their abilities or decided to become a hero.",
      materials: [
        "Comic strip template",
        "Drawing supplies",
        "Hero trait stickers (provided)",
        "Word bank for common superhero terms"
      ]
    },
    imageUrl: "/images/curriculum/week2-origins.png"
  }
  // Additional weeks would be added here
];

export default superheroWeeks;