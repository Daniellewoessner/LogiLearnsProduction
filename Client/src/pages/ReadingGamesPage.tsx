import React, { useState, useContext, useEffect } from 'react';
import { DyslexiaSettingsContext } from '../App';
import { ReadingActivity } from '../types';
import '../styles/ReadingGamesPage.css';

// Mock data for reading activities
const mockReadingActivities: ReadingActivity[] = [
  {
    id: 'story1',
    title: 'The Magic Garden',
    description: 'Read a story about a special garden where plants can talk!',
    level: 1,
    type: 'story',
    content: {
      text: `Once upon a time, there was a little girl named Mia. Mia loved to play in her garden.

One day, she planted some seeds. She watered them every day.

A few weeks later, something amazing happened. The plants began to grow, and they could talk!

"Thank you for taking care of us," said a red tomato.

"We love the sunshine you found for us," said a yellow sunflower.

Mia was so surprised! She made friends with all the plants in her magic garden.

Together, they had many adventures and learned about growing strong and healthy.

The End.`,
      questions: [
        {
          question: "What is the name of the girl in the story?",
          options: ["Maya", "Mia", "Maria", "Molly"],
          correctAnswer: 1
        },
        {
          question: "What did the plants do that was magical?",
          options: ["They grew overnight", "They gave gold coins", "They could talk", "They could fly"],
          correctAnswer: 2
        },
        {
          question: "What color was the sunflower?",
          options: ["Red", "Blue", "Green", "Yellow"],
          correctAnswer: 3
        }
      ]
    },
    completed: false
  },
  {
    id: 'word-rec1',
    title: 'Garden Words',
    description: 'Match words with pictures of things you find in a garden!',
    level: 1,
    type: 'word-recognition',
    content: {
      wordLists: [
        ['seed', 'soil', 'water', 'sun'],
        ['flower', 'tree', 'garden', 'plant'],
        ['grow', 'bloom', 'dig', 'harvest']
      ]
    },
    completed: false
  },
  {
    id: 'letter-sound1',
    title: 'Plant Sounds',
    description: 'Learn the sounds of letters with plant words!',
    level: 1,
    type: 'letter-sound',
    content: {
      letterSoundPairs: [
        {
          letter: 'S',
          sound: '/s/',
          examples: ['seed', 'soil', 'sun']
        },
        {
          letter: 'P',
          sound: '/p/',
          examples: ['plant', 'pot', 'petal']
        },
        {
          letter: 'B',
          sound: '/b/',
          examples: ['bloom', 'bean', 'bud']
        }
      ]
    },
    completed: false
  },
  {
    id: 'comprehension1',
    title: 'Garden Helper',
    description: 'Read instructions and help a friend take care of their garden!',
    level: 2,
    type: 'comprehension',
    content: {
      text: `How to Take Care of a Garden

1. Water your plants every morning.
2. Make sure they get enough sunlight.
3. Pull out any weeds you find.
4. Talk to your plants - they like it!
5. Add some soil if the plants look hungry.
6. Watch for bugs that might eat your plants.
7. Be patient and your plants will grow big!`,
      questions: [
        {
          question: "When should you water your plants?",
          options: ["At night", "In the morning", "Only when raining", "Once a week"],
          correctAnswer: 1
        },
        {
          question: "What should you pull out of the garden?",
          options: ["Flowers", "Vegetables", "Weeds", "Trees"],
          correctAnswer: 2
        },
        {
          question: "What do plants need to grow?",
          options: ["Sunlight", "Television", "Music", "Toys"],
          correctAnswer: 0
        }
      ]
    },
    completed: false
  }
];

const ReadingGamesPage: React.FC = () => {
  const dyslexiaSettings = useContext(DyslexiaSettingsContext);
  const [activities, setActivities] = useState<ReadingActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ReadingActivity | null>(null);
  const [activityStarted, setActivityStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    setActivities(mockReadingActivities);
  }, []);

  const handleSelectActivity = (activity: ReadingActivity) => {
    setSelectedActivity(activity);
    setActivityStarted(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleStartActivity = () => {
    setActivityStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!selectedActivity || selectedActivity.type !== 'story' && selectedActivity.type !== 'comprehension') return;
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    if (!selectedActivity || !selectedActivity.content.questions) return;
    
    if (currentQuestion < selectedActivity.content.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      userAnswers.forEach((answer, index) => {
        if (selectedActivity.content.questions && answer === selectedActivity.content.questions[index].correctAnswer) {
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

  return (
    <div className="reading-games-page">
      <div className="reading-header">
        <h1>Reading Adventures</h1>
        <p>Fun reading activities to practice your skills!</p>
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
                  {activity.type === 'story' && '📖'}
                  {activity.type === 'word-recognition' && '🔤'}
                  {activity.type === 'comprehension' && '🧠'}
                  {activity.type === 'letter-sound' && '🔊'}
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
                {selectedActivity.type === 'story' && 'Story Reading'}
                {selectedActivity.type === 'word-recognition' && 'Word Recognition'}
                {selectedActivity.type === 'comprehension' && 'Reading Comprehension'}
                {selectedActivity.type === 'letter-sound' && 'Letter Sounds'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Level:</span>
              <span className="info-value">{selectedActivity.level}</span>
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
            <div className="score">{score} / {selectedActivity.content.questions?.length}</div>
            <p>questions correct</p>
          </div>
          
          <div className="results-feedback">
            {score === selectedActivity.content.questions?.length ? (
              <p className="perfect-score">Amazing job! You got everything right!</p>
            ) : score >= (selectedActivity.content.questions?.length || 0) / 2 ? (
              <p className="good-score">Good job! Keep practicing to get even better.</p>
            ) : (
              <p className="low-score">Nice try! Let's practice some more to improve.</p>
            )}
          </div>
          
          <div className="results-buttons">
            <button className="try-again-button" onClick={() => {
              setActivityStarted(true);
              setCurrentQuestion(0);
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
        <div className="activity-content-container">
          <button className="back-button" onClick={handleBackToList}>
            &larr; Back to Activities
          </button>
          
          {selectedActivity.type === 'story' || selectedActivity.type === 'comprehension' ? (
            <div className="reading-activity">
              <h2>{selectedActivity.title}</h2>
              
              {!userAnswers[currentQuestion] && selectedActivity.content.text && (
                <div className="reading-text">
                  {selectedActivity.content.text.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              
              {selectedActivity.content.questions && (
                <div className="question-container">
                  <div className="question-progress">
                    Question {currentQuestion + 1} of {selectedActivity.content.questions.length}
                  </div>
                  <div className="question">
                    <h3>{selectedActivity.content.questions[currentQuestion].question}</h3>
                    <div className="answer-options">
                      {selectedActivity.content.questions[currentQuestion].options.map((option, index) => (
                        <div 
                          key={index}
                          className={`answer-option ${userAnswers[currentQuestion] === index ? 'selected' : ''}`}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          <div className="option-letter">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <div className="option-text">{option}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="next-button"
                    disabled={userAnswers[currentQuestion] === undefined}
                    onClick={handleNextQuestion}
                  >
                    {currentQuestion < (selectedActivity.content.questions.length - 1) ? 'Next Question' : 'Finish'}
                  </button>
                </div>
              )}
            </div>
          ) : selectedActivity.type === 'word-recognition' && selectedActivity.content.wordLists ? (
            <div className="word-recognition-activity">
              <h2>{selectedActivity.title}</h2>
              
              <div className="word-lists">
                {selectedActivity.content.wordLists.map((wordList, listIndex) => (
                  <div key={listIndex} className="word-list">
                    <h3>Word Set {listIndex + 1}</h3>
                    <div className="words-container">
                      {wordList.map((word, wordIndex) => (
                        <div key={wordIndex} className="word-card">
                          <div className="word-text">{word}</div>
                          <div className="word-image">
                            <img src={`/assets/images/word-images/${word}.png`} alt={word} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="activity-complete-button" onClick={() => setShowResults(true)}>
                Mark Activity Complete
              </button>
            </div>
          ) : selectedActivity.type === 'letter-sound' && selectedActivity.content.letterSoundPairs ? (
            <div className="letter-sound-activity">
              <h2>{selectedActivity.title}</h2>
              
              <div className="letter-sound-pairs">
                {selectedActivity.content.letterSoundPairs.map((pair, pairIndex) => (
                  <div key={pairIndex} className="letter-sound-pair">
                    <div className="letter-card">
                      <div className="letter">{pair.letter}</div>
                      <div className="sound">{pair.sound}</div>
                      <button className="play-sound-button">
                        🔊 Listen
                      </button>
                    </div>
                    <div className="example-words">
                      <h4>Example Words</h4>
                      <div className="examples-list">
                        {pair.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="example-word">
                            <span className="highlighted-letter">{example.charAt(0)}</span>
                            {example.slice(1)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="activity-complete-button" onClick={() => setShowResults(true)}>
                Mark Activity Complete
              </button>
            </div>
          ) : (
            <div className="activity-not-available">
              <p>This activity type is currently under development.</p>
              <button onClick={handleBackToList}>Go Back</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingGamesPage;