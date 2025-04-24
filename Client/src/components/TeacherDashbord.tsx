import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StoryPlayer from './StoryPlayer';

interface LessonPlan {
  id: number;
  title: string;
  objective: string;
  durationMinutes: number;
  materials: string[];
  steps: {
    id: number;
    title: string;
    duration: number;
    instructions: string;
    adaptations: string[];
  }[];
  assessment: string;
  storyId: number;
  standards: string[];
}

interface TeacherDashboardProps {
  curriculumWeek: number;
  activityId: number;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  curriculumWeek = 1,
  activityId = 101
}) => {
  // Teacher dashboard state
  const [printMode, setPrintMode] = useState<boolean>(false);
  const [enabledAdaptations, setEnabledAdaptations] = useState<{
    visual: boolean;
    auditory: boolean;
    tactile: boolean;
    textModifications: boolean;
  }>({
    visual: true,
    auditory: true,
    tactile: true,
    textModifications: true
  });
  
  // Sample story data - in a real app, this would come from your API
  const story = {
    id: 101,
    title: "Professor Pancake Saves the Day",
    audioUrl: "/stories/professor-pancake.mp3",
    characterIcon: "🥞",
    text: [
      "Once upon a time, there was a professor who loved pancakes more than anything.",
      "Every morning, he would flip pancakes for his students before class.",
      "They called him Professor Pancake!",
      "One day, the school's electricity went out right before a big presentation.",
      "Professor Pancake knew just what to do.",
      "He used his special solar-powered pancake griddle to power up the computers!",
      "Everyone cheered for Professor Pancake - a true hero with a delicious superpower!"
    ]
  };
  
  // Sample lesson plan data
  const lessonPlan: LessonPlan = {
    id: 201,
    title: "Everyday Heroes: Professor Pancake",
    objective: "Students will identify traits of everyday heroes and explain how ordinary skills can help others in need.",
    durationMinutes: 45,
    materials: [
      "Professor Pancake story audio and text",
      "Character trait cards",
      "Drawing supplies",
      "Hero action worksheet"
    ],
    steps: [
      {
        id: 1,
        title: "Introduction & Story",
        duration: 10,
        instructions: "Begin by asking students what makes someone a hero. Introduce the concept of everyday heroes - people who use their unique skills to help others. Play the Professor Pancake story.",
        adaptations: [
          "Provide visual story maps for students who benefit from visual supports",
          "Use the story player's text highlighting feature for reading support"
        ]
      },
      {
        id: 2,
        title: "Hero Trait Discussion",
        duration: 10,
        instructions: "After the story, discuss what traits made Professor Pancake a hero (resourcefulness, creative problem-solving, willingness to help). Have students identify these traits on character cards.",
        adaptations: [
          "Provide picture-supported trait cards",
          "Allow students to draw their answers instead of writing"
        ]
      },
      {
        id: 3,
        title: "Personal Skills Activity",
        duration: 15,
        instructions: "Students identify their own unique skills or talents. How could these be used to help others? Students complete the \"My Hero Power\" worksheet by drawing or writing about how they could use their talents to solve a problem.",
        adaptations: [
          "Offer speech-to-text options for writing portions",
          "Provide partially completed worksheets for scaffolding"
        ]
      },
      {
        id: 4,
        title: "Share & Reflect",
        duration: 10,
        instructions: "Students share their hero powers with partners or small groups. Conclude with a whole-class discussion about how everyone has the potential to be an everyday hero.",
        adaptations: [
          "Allow students to present in alternative formats",
          "Provide sentence starters for sharing"
        ]
      }
    ],
    assessment: "Students will be assessed on their ability to identify hero traits in the story character and make connections to their own potential contributions as everyday heroes.",
    storyId: 101,
    standards: [
      "ELA.SL.3.2: Determine main ideas and supporting details of information presented in diverse media formats",
      "SEL.3.1: Recognize personal qualities and external supports",
      "SEL.3.4: Demonstrate ability to solve problems and help others"
    ]
  };
  
  const toggleAdaptation = (type: keyof typeof enabledAdaptations) => {
    setEnabledAdaptations({
      ...enabledAdaptations,
      [type]: !enabledAdaptations[type]
    });
  };
  
  return (
    <div className={`teacher-dashboard p-6 ${printMode ? 'print-mode' : ''}`}>
      <div className="print-controls mb-6 flex justify-between items-center bg-blue-50 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-blue-800">Teacher Dashboard: Week {curriculumWeek}</h1>
        <div className="controls flex gap-2">
          <button 
            onClick={() => setPrintMode(!printMode)} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {printMode ? "Exit Print Mode" : "Print Mode"}
          </button>
          {printMode && (
            <button 
              onClick={() => window.print()} 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Print Lesson Plan
            </button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar with story player in non-print mode */}
        {!printMode && (
          <div className="story-preview lg:w-1/3">
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <h2 className="text-xl font-bold text-purple-800 mb-2">Story Preview</h2>
              <p className="mb-4">Preview how students will experience the story with current accessibility settings.</p>
            </div>
            
            <StoryPlayer
              storyTitle={story.title}
              storyAudioUrl={story.audioUrl}
              storyText={story.text}
              characterIcon={story.characterIcon}
              highContrast={enabledAdaptations.textModifications}
              fontSize={enabledAdaptations.textModifications ? 20 : 16}
              lineSpacing={enabledAdaptations.textModifications ? 1.8 : 1.4}
              letterSpacing={enabledAdaptations.textModifications ? 0.12 : 0.05}
            />
            
            <div className="adaptation-toggles bg-purple-50 rounded-lg p-4 mt-4">
              <h3 className="font-bold mb-2">Adaptation Settings</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => toggleAdaptation('visual')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    enabledAdaptations.visual 
                      ? 'bg-purple-200 text-purple-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {enabledAdaptations.visual ? '✓ Visual Supports' : 'Visual Supports'}
                </button>
                <button 
                  onClick={() => toggleAdaptation('auditory')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    enabledAdaptations.auditory 
                      ? 'bg-purple-200 text-purple-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {enabledAdaptations.auditory ? '✓ Audio Supports' : 'Audio Supports'}
                </button>
                <button 
                  onClick={() => toggleAdaptation('tactile')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    enabledAdaptations.tactile 
                      ? 'bg-purple-200 text-purple-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {enabledAdaptations.tactile ? '✓ Tactile Supports' : 'Tactile Supports'}
                </button>
                <button 
                  onClick={() => toggleAdaptation('textModifications')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    enabledAdaptations.textModifications 
                      ? 'bg-purple-200 text-purple-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {enabledAdaptations.textModifications ? '✓ Text Modifications' : 'Text Modifications'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Right side with lesson plan */}
        <div className={printMode ? "w-full" : "lg:w-2/3"}>
          <div className="lesson-plan bg-white border-2 border-blue-100 rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{lessonPlan.title}</h2>
                <p className="text-gray-600">Week {curriculumWeek} - Activity {activityId}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Duration: {lessonPlan.durationMinutes} minutes</p>
                <p className="text-sm text-blue-600">Story: {story.title}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-blue-800">Learning Objective</h3>
              <p>{lessonPlan.objective}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-blue-800">Materials Needed</h3>
              <ul className="list-disc pl-5">
                {lessonPlan.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-blue-800">Lesson Steps</h3>
              <div className="space-y-4 mt-2">
                {lessonPlan.steps.map(step => (
                  <div key={step.id} className="border-l-4 border-blue-200 pl-4 py-1">
                    <div className="flex justify-between">
                      <h4 className="font-bold">{step.id}. {step.title}</h4>
                      <span className="text-sm text-gray-600">{step.duration} min</span>
                    </div>
                    <p className="mt-1">{step.instructions}</p>
                    
                    {enabledAdaptations.visual && step.adaptations.length > 0 && (
                      <div className="mt-2 bg-yellow-50 p-2 rounded">
                        <h5 className="text-sm font-medium text-yellow-800">Adaptations:</h5>
                        <ul className="text-sm list-disc pl-5">
                          {step.adaptations.map((adaptation, index) => (
                            <li key={index}>{adaptation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-blue-800">Assessment</h3>
              <p>{lessonPlan.assessment}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-blue-800">Standards Addressed</h3>
              <ul className="list-disc pl-5 text-sm">
                {lessonPlan.standards.map((standard, index) => (
                  <li key={index}>{standard}</li>
                ))}
              </ul>
            </div>
            
            {!printMode && (
              <div className="flex gap-2 mt-6">
                <Link 
                  to={`/curriculum/week/${curriculumWeek}`}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  Back to Week Plan
                </Link>
                <Link 
                  to={`/activity/${activityId}/resources`}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
                >
                  Additional Resources
                </Link>
                <Link 
                  to={`/activity/${activityId}/student`}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                >
                  Student View
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;