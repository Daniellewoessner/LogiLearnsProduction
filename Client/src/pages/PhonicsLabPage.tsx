import React, { useState, useContext, useEffect } from 'react';
import { DyslexiaSettingsContext } from '../App';
import { PhonicsActivity } from '../types';
import '../styles/Phonicslabpage.css';

// Mock data for phonics activities
const mockPhonicsActivities: PhonicsActivity[] = [
  {
    id: 'letter-sounds1',
    title: 'Initial Sounds',
    description: 'Learn the sounds at the beginning of words',
    type: 'letter-sounds',
    level: 1,
    content: {
      instructions: "Listen to the sound and choose the letter that makes that sound.",
      examples: ["bat", "cat", "hat", "mat", "rat"],
      exercises: [
        {
          id: 'ls1-1',
          prompt: "What letter makes the sound /b/ as in 'ball'?",
          options: ["B", "D", "P", "T"],
          correctAnswer: 0,
          audioPrompt: "/assets/audio/phonics/b-sound.mp3"
        },
        {
          id: 'ls1-2',
          prompt: "What letter makes the sound /m/ as in 'moon'?",
          options: ["N", "M", "W", "V"],
          correctAnswer: 1,
          audioPrompt: "/assets/audio/phonics/m-sound.mp3"
        },
        {
          id: 'ls1-3',
          prompt: "What letter makes the sound /s/ as in 'sun'?",
          options: ["Z", "C", "S", "F"],
          correctAnswer: 2,
          audioPrompt: "/assets/audio/phonics/s-sound.mp3"
        }
      ]
    },
    completed: false
  },
  {
    id: 'blending1',
    title: 'Sound Blending',
    description: 'Learn to blend sounds together to make words',
    type: 'blending',
    level: 1,
    content: {
      instructions: "Listen to the sounds and blend them together to make a word.",
      examples: ["c-a-t → cat", "d-o-g → dog", "s-u-n → sun"],
      exercises: [
        {
          id: 'bl1-1',
          prompt: "Blend these sounds: /m/ /a/ /p/",
          options: ["map", "cap", "nap", "tap"],
          correctAnswer: 0,
          audioPrompt: "/assets/audio/phonics/m-a-p.mp3"
        },
        {
          id: 'bl1-2',
          prompt: "Blend these sounds: /b/ /e/ /d/",
          options: ["bad", "bid", "bed", "bud"],
          correctAnswer: 2,
          audioPrompt: "/assets/audio/phonics/b-e-d.mp3"
        },
        {
          id: 'bl1-3',
          prompt: "Blend these sounds: /s/ /i/ /t/",
          options: ["sit", "set", "sat", "sut"],
          correctAnswer: 0,
          audioPrompt: "/assets/audio/phonics/s-i-t.mp3"
        }
      ]
    },
    completed: false
  },
  {
    id: 'segmenting1',
    title: 'Sound Segmenting',
    description: 'Learn to break words into individual sounds',
    type: 'segmenting',
    level: 2,
    content: {
      instructions: "Listen to the word and identify the individual sounds.",
      examples: ["cat → c-a-t", "dog → d-o-g", "sun → s-u-n"],
      exercises: [
        {
          id: 'sg1-1',
          prompt: "Break the word 'pig' into its sounds",
          options: ["p-i-g", "p-i-k", "b-i-g", "p-e-g"],
          correctAnswer: 0,
          audioPrompt: "/assets/audio/phonics/pig.mp3"
        },
        {
          id: 'sg1-2',
          prompt: "Break the word 'fan' into its sounds",
          options: ["f-o-n", "v-a-n", "f-a-n", "f-a-m"],
          correctAnswer: 2,
          audioPrompt: "/assets/audio/phonics/fan.mp3"
        },
        {
          id: 'sg1-3',
          prompt: "Break the word 'cup' into its sounds",
          options: ["k-u-p", "c-u-p", "c-a-p", "k-u-b"],
          correctAnswer: 1,
          audioPrompt: "/assets/audio/phonics/cup.mp3"
        }
      ]
    },
    completed: false
  },
  {
    id: 'rhyming1',
    title: 'Rhyming Words',
    description: 'Learn to identify and create rhyming words',
    type: 'rhyming',
    level: 1,
    content: {
      instructions: "Find the word that rhymes with the given word.",
      examples: ["cat - hat", "dog - log", "run - fun"],
      exercises: [
        {
          id: 'rh1-1',
          prompt: "Which word rhymes with 'cake'?",
          options: ["cat", "lake", "cup", "car"],
          correctAnswer: 1,
          audioPrompt: "/assets/audio/phonics/cake.mp3"
        },
        {
          id: 'rh1-2',
          prompt: "Which word rhymes with 'hop'?",
          options: ["hip", "hat", "top", "tap"],
          correctAnswer: 2,
          audioPrompt: "/assets/audio/phonics/hop.mp3"
        },
        {
          id: 'rh1-3',
          prompt: "Which word rhymes with 'ring'?",
          options: ["sing", "rang", "run", "rip"],
          correctAnswer: 0,
          audioPrompt: "/assets/audio/phonics/ring.mp3"
        }
      ]
    },
    completed: false
  }
];

const PhonicsLabPage: React.FC = () => {
  const dyslexiaSettings = useContext(DyslexiaSettingsContext);
  const [activities, setActivities] = useState<PhonicsActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<PhonicsActivity | null>(null);
  const [activityStarted, setActivityStarted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    setActivities(mockPhonicsActivities);
  }, []);

  const handleSelectActivity = (activity: PhonicsActivity) => {
    setSelectedActivity(activity);
    setActivityStarted(false);
    setCurrentExerciseIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleStartActivity = () => {
    setActivityStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!selectedActivity) return;
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentExerciseIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleNextExercise = () => {
    if (!selectedActivity) return;
    
    if (currentExerciseIndex < selectedActivity.content.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      userAnswers.forEach((answer, index) => {
        const correctAnswer = selectedActivity.content.exercises[index].correctAnswer;
        if (typeof correctAnswer === 'number' && answer === correctAnswer) {
          correctCount++;
        }
      });
      
      setScore(correctCount);
      setShowResults(true);
    }
  };

  const handleBackToList = () => {
    setSelectedActivity(null);
    setActivityStarted(false);
  };

  const playAudio = (audioSrc: string | undefined) => {
    if (!audioSrc) return;
    
    // In a real app, this would play an audio file
    setIsPlaying(true);
    console.log(`Playing audio: ${audioSrc}`);
    
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <div className="phonics-lab-page">
      <div className="phonics-header">
        <h1>Phonics Lab</h1>
        <p>Fun activities to learn letter sounds and how words are made!</p>
      </div>

      {!selectedActivity ? (
        <div className="activities-list">
          <h2>Choose an Activity</h2>
          <div className="activity-cards">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className={`activity-card ${activity.completed ? 'completed' : ''}`}
                onClick={() => handleSelectActivity(activity)}
              >
                <div className="activity-icon">
                  {activity.type === 'letter-sounds' && '🔤'}
                  {activity.type === 'blending' && '🔡'}
                  {activity.type === 'segmenting' && '📝'}
                  {activity.type === 'rhyming' && '🎵'}
                </div>
                <div className="activity-content">
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <div className="activity-level">
                    Level: {activity.level}
                  </div>
                </div>
                {activity.completed && (
                  <div className="completed-badge">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : !activityStarted ? (
        <div className="activity-details">
          <button className="back-button" onClick={handleBackToList}>
            &larr; Back to Activities
          </button>
          <h2>{selectedActivity.title}</h2>
          <p className="activity-description">{selectedActivity.description}</p>
          
          <div className="activity-info">
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className="info-value">
                {selectedActivity.type === 'letter-sounds' && 'Letter Sounds'}
                {selectedActivity.type === 'blending' && 'Sound Blending'}
                {selectedActivity.type === 'segmenting' && 'Sound Segmenting'}
                {selectedActivity.type === 'rhyming' && 'Rhyming Words'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Level:</span>
              <span className="info-value">{selectedActivity.level}</span>
            </div>
          </div>
          
          <div className="activity-instructions">
            <h3>Instructions</h3>
            <p>{selectedActivity.content.instructions}</p>
            
            <div className="examples-section">
              <h4>Examples:</h4>
              <div className="examples-list">
                {selectedActivity.content.examples.map((example, index) => (
                  <div key={index} className="example-item">
                    {example}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button className="start-activity-button" onClick={handleStartActivity}>
            Start Activity
          </button>
        </div>
      ) : showResults ? (
        <div className="activity-results">
          <h2>Activity Complete!</h2>
          <div className="results-score">
            <p>You got</p>
            <div className="score">{score} / {selectedActivity.content.exercises.length}</div>
            <p>exercises correct</p>
          </div>
          
          <div className="results-feedback">
            {score === selectedActivity.content.exercises.length ? (
              <p className="perfect-score">Amazing job! You got everything right!</p>
            ) : score >= selectedActivity.content.exercises.length / 2 ? (
              <p className="good-score">Good job! Keep practicing to get even better.</p>
            ) : (
              <p className="low-score">Nice try! Let's practice some more to improve.</p>
            )}
          </div>
          
          <div className="results-buttons">
            <button className="try-again-button" onClick={() => {
              setActivityStarted(true);
              setCurrentExerciseIndex(0);
              setUserAnswers([]);
              setShowResults(false);
              setScore(0);
            }}>
              Try Again
            </button>
            <button className="back-to-list-button" onClick={handleBackToList}>
              Back to Activities
            </button>
          </div>
        </div>
      ) : (
        <div className="exercise-content">
          <div className="exercise-progress">
            Exercise {currentExerciseIndex + 1} of {selectedActivity.content.exercises.length}
          </div>
          
          <div className="current-exercise">
            <div className="exercise-prompt">
              <h3>{selectedActivity.content.exercises[currentExerciseIndex].prompt}</h3>
              
              {selectedActivity.content.exercises[currentExerciseIndex].audioPrompt && (
                <button 
                  className={`play-audio-button ${isPlaying ? 'playing' : ''}`}
                  onClick={() => playAudio(selectedActivity.content.exercises[currentExerciseIndex].audioPrompt)}
                  disabled={isPlaying}
                >
                  {isPlaying ? 'Playing...' : 'Play Sound 🔊'}
                </button>
              )}
            </div>
            
            <div className="answer-options">
              {selectedActivity.content.exercises[currentExerciseIndex].options?.map((option, index) => (
                <div 
                  key={index}
                  className={`answer-option ${userAnswers[currentExerciseIndex] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          
          <div className="exercise-navigation">
            <button 
              className="next-button"
              disabled={userAnswers[currentExerciseIndex] === undefined}
              onClick={handleNextExercise}
            >
              {currentExerciseIndex < selectedActivity.content.exercises.length - 1 ? 'Next Exercise' : 'Finish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhonicsLabPage;