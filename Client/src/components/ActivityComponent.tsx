import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StoryPlayer from '../components/StoryPlayer';
import "../styles/SuperheroCurriculum.css";

interface ActivityParams {
  id: string;
}

const ActivityPage: React.FC = () => {
  const { id } = useParams() as unknown as ActivityParams;
  const activityId = parseInt(id || "0");
  
  // State for accessibility settings (would be managed globally in a real app)
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineSpacing, setLineSpacing] = useState<number>(1.6);
  const [letterSpacing, setLetterSpacing] = useState<number>(0.12);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  
  // Sample stories data - in a real app, this data would come from your API or data store
  const stories = [
    {
      id: 101, // This matches the activityId from the curriculum
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
      ],
      comprehensionQuestions: [
        {
          question: "What did Professor Pancake love more than anything?",
          options: ["Waffles", "Pancakes", "Teaching", "Computers"],
          correctAnswer: 1
        },
        {
          question: "How did Professor Pancake help during the power outage?",
          options: [
            "He called an electrician", 
            "He used his solar-powered griddle", 
            "He canceled the presentation", 
            "He made pancakes for everyone"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 102,
      title: "Clay the Brave",
      audioUrl: "/stories/clay-brave.mp3",
      characterIcon: "🧩",
      text: [
        "Clay was a small lump of modeling clay who lived in a classroom.",
        "The children would mold Clay into different shapes every day.",
        "Sometimes Clay was a dinosaur, sometimes a rocket ship!",
        "Clay was brave and never afraid to change shape.",
        "One day, a new student came to class. He was very shy.",
        "Clay helped the boy create a superhero figure.",
        "As the boy shaped Clay, he began to smile and talk to the other kids.",
        "Clay was a hero because he helped the boy find courage to be himself!"
      ],
      comprehensionQuestions: [
        {
          question: "Where did Clay live?",
          options: ["In a toy store", "In a classroom", "In a garden", "In a museum"],
          correctAnswer: 1
        },
        {
          question: "How did Clay help the new student?",
          options: [
            "He taught him how to read", 
            "He introduced him to the teacher", 
            "He helped him make a superhero", 
            "He showed him around the school"
          ],
          correctAnswer: 2
        }
      ]
    }
  ];
  
  const selectedStory = stories.find(story => story.id === activityId) || stories[0];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  
  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedStory.comprehensionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };
  
  return (
    <div 
      className={`activity-page ${highContrast ? 'high-contrast' : ''}`}
      style={{
        fontFamily: "'Comic Sans MS', 'OpenDyslexic', Arial, sans-serif",
        fontSize: `${fontSize}px`,
        lineHeight: lineSpacing,
        letterSpacing: `${letterSpacing}em`,
        backgroundColor: highContrast ? '#f7f3e9' : '#ffffff',
        color: highContrast ? '#000000' : '#333333',
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}
    >
      {/* Navigation Breadcrumbs */}
      <div className="breadcrumbs mb-4">
        <Link to="/">Home</Link> &gt; 
        <Link to="/curriculum">Superhero Curriculum</Link> &gt;
        <span>{selectedStory.title}</span>
      </div>
      
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">{selectedStory.title}</h1>
        <p className="text-lg">Listen to the story and follow along with the text</p>
      </header>
      
      {/* Story Player Component */}
      <StoryPlayer
        storyTitle={selectedStory.title}
        storyAudioUrl={selectedStory.audioUrl}
        storyText={selectedStory.text}
        characterIcon={selectedStory.characterIcon}
        highContrast={highContrast}
        fontSize={fontSize}
        lineSpacing={lineSpacing}
        letterSpacing={letterSpacing}
      />
      
      {/* Comprehension Questions */}
      {!completed ? (
        <div className="comprehension-section mt-8 p-6 rounded-xl bg-blue-50 shadow-md">
          <h2 className="text-xl font-bold mb-4">Check Your Understanding</h2>
          
          <div className="question-card">
            <h3 className="text-lg font-semibold mb-3">
              Question {currentQuestionIndex + 1} of {selectedStory.comprehensionQuestions.length}:
            </h3>
            <p className="mb-4">{selectedStory.comprehensionQuestions[currentQuestionIndex].question}</p>
            
            <div className="answer-options flex flex-col gap-2">
              {selectedStory.comprehensionQuestions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    selectedAnswer === index 
                      ? showFeedback
                        ? index === selectedStory.comprehensionQuestions[currentQuestionIndex].correctAnswer
                          ? 'bg-green-200 border-2 border-green-500'
                          : 'bg-red-200 border-2 border-red-500'
                        : 'bg-blue-200 border-2 border-blue-500'
                      : 'bg-white hover:bg-blue-100 border-2 border-gray-200'
                  }`}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showFeedback && (
              <div className={`feedback mt-4 p-3 rounded-lg ${
                selectedAnswer === selectedStory.comprehensionQuestions[currentQuestionIndex].correctAnswer
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <p>
                  {selectedAnswer === selectedStory.comprehensionQuestions[currentQuestionIndex].correctAnswer
                    ? '✅ Correct! Great job!'
                    : `❌ Not quite. The correct answer is: ${
                        selectedStory.comprehensionQuestions[currentQuestionIndex].options[
                          selectedStory.comprehensionQuestions[currentQuestionIndex].correctAnswer
                        ]
                      }`
                  }
                </p>
                <button
                  onClick={handleNextQuestion}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  {currentQuestionIndex < selectedStory.comprehensionQuestions.length - 1
                    ? 'Next Question'
                    : 'Complete Activity'
                  }
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="completion-section mt-8 p-6 rounded-xl bg-green-50 text-center">
          <h2 className="text-2xl font-bold mb-2">✨ Activity Completed! ✨</h2>
          <p className="mb-4">Great job understanding the story!</p>
          
          <div className="flex justify-center gap-4">
            <Link to="/curriculum" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
              Back to Curriculum
            </Link>
            <button 
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setShowFeedback(false);
                setCompleted(false);
              }}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      {/* Accessibility Controls */}
      <div className="accessibility-controls mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Reading Settings</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFontSize(Math.max(14, fontSize - 2))}
            aria-label="Decrease font size"
            disabled={fontSize <= 14}
            className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            A-
          </button>
          <button 
            onClick={() => setFontSize(fontSize + 2)}
            aria-label="Increase font size"
            className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200"
          >
            A+
          </button>
          <button 
            onClick={() => setLineSpacing(Math.max(1.2, lineSpacing - 0.2))}
            aria-label="Decrease line spacing"
            disabled={lineSpacing <= 1.2}
            className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Line-
          </button>
          <button 
            onClick={() => setLineSpacing(lineSpacing + 0.2)}
            aria-label="Increase line spacing"
            className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200"
          >
            Line+
          </button>
          <button 
            onClick={() => setHighContrast(!highContrast)}
            aria-label={highContrast ? "Use standard contrast" : "Use high contrast"}
            className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200"
          >
            {highContrast ? "Standard Contrast" : "High Contrast"}
          </button>
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
            className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200"
          >
            {audioEnabled ? "Audio On" : "Audio Off"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;