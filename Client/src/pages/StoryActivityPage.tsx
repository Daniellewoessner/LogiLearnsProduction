import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StoryPlayer from '../components/StoryPlayer';
import '../styles/StoryPlayer.css'; // Import your CSS styles
interface StoryActivityParams {
  id: string;
}

const StoryActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = parseInt(id || "101"); // Default to first activity if ID is missing
  
  // State for accessibility settings
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineSpacing, setLineSpacing] = useState<number>(1.6);
  const [letterSpacing, setLetterSpacing] = useState<number>(0.12);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [storyCompleted, setStoryCompleted] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  // Sample story data based on activity ID
  const storyData = {
    101: {
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
      questions: [
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
        },
        {
          question: "What makes Professor Pancake a hero in this story?",
          options: [
            "He is very tall", 
            "He can fly", 
            "He used his special skill to solve a problem", 
            "He knows how to cook many foods"
          ],
          correctAnswer: 2
        }
      ]
    },
    102: {
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
      questions: [
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
        },
        {
          question: "What special quality did Clay have that made him heroic?",
          options: [
            "He could talk", 
            "He was brave and adaptable", 
            "He was very colorful", 
            "He could fly"
          ],
          correctAnswer: 1
        }
      ]
    }
  };
  
  // Get the story data for the current activity
  const currentStory = storyData[activityId as keyof typeof storyData] || storyData[101];
  
  // Handle setting changes
  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handleLineSpacingChange = (spacing: number) => {
    setLineSpacing(spacing);
  };

  const handleLetterSpacingChange = (spacing: number) => {
    setLetterSpacing(spacing);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  // Handle story completion to show questions
  const handleStoryCompleted = () => {
    setStoryCompleted(true);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
  };
  
  // Handle moving to next question
  const handleNextQuestion = () => {
    if (activeQuestion < currentStory.questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // All questions answered - complete activity
      alert("Great job! You've completed the activity!");
    }
  };
  
  return (
    <div 
      className={`story-activity-container ${highContrast ? 'high-contrast' : ''}`}
      style={{
        fontFamily: "'Comic Sans MS', 'OpenDyslexic', Arial, sans-serif",
        fontSize: `${fontSize}px`,
        lineHeight: lineSpacing,
        letterSpacing: `${letterSpacing}em`
      }}
    >
      {/* Navigation Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link> &gt; 
        <Link to="/superhero">Superhero Curriculum</Link> &gt; 
        <span>Activity: {currentStory.title}</span>
      </div>
      
      <header className="activity-header">
        <Link to="/superhero" className="back-button">
          ← Back to Curriculum
        </Link>
        
        <h1>{currentStory.title}</h1>
        
        <div className="accessibility-controls">
          <button 
            onClick={() => handleFontSizeChange(fontSize - 2)}
            aria-label="Decrease font size"
            disabled={fontSize <= 14}
            className="text-control-button"
          >
            A-
          </button>
          <button 
            onClick={() => handleFontSizeChange(fontSize + 2)}
            aria-label="Increase font size"
            className="text-control-button"
          >
            A+
          </button>
          <button 
            onClick={toggleHighContrast}
            aria-label={highContrast ? "Use standard contrast" : "Use high contrast"}
            className="contrast-button"
          >
            {highContrast ? "Standard" : "High Contrast"}
          </button>
          <button 
            onClick={toggleAudio}
            aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
            className="audio-button"
          >
            {audioEnabled ? "Audio On" : "Audio Off"}
          </button>
        </div>
      </header>
      
      <main className="activity-content">
        <section className="story-section">
          <h2>Listen to the Story</h2>
          <p className="activity-instructions">
            Listen to the story and follow along with the text. You can pause or rewind at any time.
          </p>
          
          {/* Story Player Component */}
          <StoryPlayer 
            storyTitle={currentStory.title}
            storyAudioUrl={currentStory.audioUrl}
            storyText={currentStory.text}
            characterIcon={currentStory.characterIcon}
            highContrast={highContrast}
            fontSize={fontSize}
            lineSpacing={lineSpacing}
            letterSpacing={letterSpacing}
          />
          
          {!storyCompleted && (
            <button 
              onClick={handleStoryCompleted}
              className="activity-button"
            >
              I've Finished the Story
            </button>
          )}
        </section>
        
        {storyCompleted && (
          <section className="comprehension-section">
            <h2>Check Your Understanding</h2>
            <p className="activity-instructions">
              Answer these questions to see how well you understood the story.
            </p>
            
            <div className="question-card">
              <h3>Question {activeQuestion + 1} of {currentStory.questions.length}</h3>
              <p className="question-text">{currentStory.questions[activeQuestion].question}</p>
              
              <div className="answer-options">
                {currentStory.questions[activeQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`answer-option ${
                      selectedAnswer === index 
                        ? showFeedback
                          ? index === currentStory.questions[activeQuestion].correctAnswer
                            ? 'correct'
                            : 'incorrect'
                          : 'selected'
                        : ''
                    }`}
                    disabled={showFeedback}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {showFeedback && (
                <div className={`feedback ${
                  selectedAnswer === currentStory.questions[activeQuestion].correctAnswer
                    ? 'feedback-correct'
                    : 'feedback-incorrect'
                }`}>
                  {selectedAnswer === currentStory.questions[activeQuestion].correctAnswer ? (
                    <p>✅ Correct! Great job!</p>
                  ) : (
                    <p>
                      ❌ Not quite. The correct answer is: 
                      {currentStory.questions[activeQuestion].options[
                        currentStory.questions[activeQuestion].correctAnswer
                      ]}
                    </p>
                  )}
                  
                  <button
                    onClick={handleNextQuestion}
                    className="next-button"
                  >
                    {activeQuestion < currentStory.questions.length - 1
                      ? 'Next Question'
                      : 'Complete Activity'
                    }
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      
      <footer className="activity-footer">
        <div className="activity-navigation">
          <Link to="/superhero" className="nav-button">
            Back to Curriculum
          </Link>
          
          <Link to={`/activity/${Number(activityId) + 1}`} className="nav-button">
            Next Activity
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default StoryActivityPage;