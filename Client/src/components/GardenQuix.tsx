import React, { useState, useEffect } from 'react';
import { GardenQuizProps, QuizData } from '../types';
import '../styles/GardenQuiz.css';

// Quiz questions organized by difficulty levels
const quizQuestions: QuizData = {
  beginner: [
    {
      question: "What does 'annual' mean in gardening terms?",
      options: [
        "A plant that completes its lifecycle in one year",
        "A plant that returns every year",
        "A plant that blooms once a month",
        "A plant that requires annual maintenance"
      ],
      correctAnswer: 0,
      explanation: "An annual plant completes its entire lifecycle (germination, reproduction, death) within one growing season."
    },
    {
      question: "Which of these is NOT a common way to water plants?",
      options: [
        "Drip irrigation",
        "Sprinkler system",
        "Bottom watering",
        "Light misting daily"
      ],
      correctAnswer: 3,
      explanation: "Light daily misting is generally not effective for watering plants. It doesn't provide enough water to reach the roots and can promote fungal diseases."
    },
    {
      question: "What does 'companion planting' refer to?",
      options: [
        "Growing plants that look good together",
        "Growing plants that help each other thrive",
        "Growing the same plants every year",
        "Growing plants in pairs"
      ],
      correctAnswer: 1,
      explanation: "Companion planting is the practice of growing different plants together that benefit each other, such as pest deterrence, pollination, or providing nutrients."
    }
  ],
  intermediate: [
    {
      question: "Which of these plants fixes nitrogen in the soil?",
      options: [
        "Tomatoes",
        "Peas",
        "Lettuce",
        "Cucumbers"
      ],
      correctAnswer: 1,
      explanation: "Peas, like other legumes, have a symbiotic relationship with bacteria that allows them to 'fix' nitrogen from the air into the soil, improving soil fertility."
    },
    {
      question: "What is 'hardening off' in gardening?",
      options: [
        "Making the soil more compact",
        "Gradually exposing seedlings to outdoor conditions",
        "Strengthening plant stems by brushing them",
        "Pruning to encourage woody growth"
      ],
      correctAnswer: 1,
      explanation: "Hardening off is the process of gradually exposing indoor-grown seedlings to outdoor conditions to prepare them for transplanting."
    },
    {
      question: "How many hours of direct sunlight does a 'full sun' plant typically require?",
      options: [
        "2-4 hours",
        "4-6 hours",
        "6-8 hours",
        "8+ hours"
      ],
      correctAnswer: 3,
      explanation: "Plants designated as 'full sun' typically require at least 8 hours of direct sunlight per day to thrive."
    }
  ],
  advanced: [
    {
      question: "What is the square foot gardening method?",
      options: [
        "Growing only square-shaped vegetables",
        "Dividing garden beds into 1ft × 1ft squares for organized planting",
        "Planting in rows exactly one foot apart",
        "Using one square foot of space per plant"
      ],
      correctAnswer: 1,
      explanation: "Square foot gardening is a method that divides garden beds into 1ft × 1ft squares, with each square containing a specific number of plants based on their size."
    },
    {
      question: "Which of these plants are typically NOT good companions for tomatoes?",
      options: [
        "Basil",
        "Carrots",
        "Potatoes",
        "Marigolds"
      ],
      correctAnswer: 2,
      explanation: "Potatoes and tomatoes are both members of the nightshade family and share similar diseases and pests, making them poor companions."
    },
    {
      question: "What is 'succession planting' in gardening?",
      options: [
        "Planting the same crop in the same spot year after year",
        "Planting different crops in the same space throughout the season",
        "Planting crops in a particular sequence over several years",
        "Planting seedlings after mature plants to ensure continuous growth"
      ],
      correctAnswer: 1,
      explanation: "Succession planting means planting new crops in the same space after one crop is harvested, or planting the same crop at staggered intervals for a continuous harvest."
    }
  ]
};

const GardenQuiz: React.FC<GardenQuizProps> = ({ onCorrectAnswer, currentLevel }) => {
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);
  
  // Initialize a new question
  const initializeQuestion = () => {
    // Determine difficulty based on level
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (currentLevel >= 5) difficulty = 'intermediate';
    if (currentLevel >= 10) difficulty = 'advanced';
    
    // Get a random question from appropriate difficulty
    const questions = quizQuestions[difficulty];
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };
  
  // Start with a question
  useEffect(() => {
    initializeQuestion();
  }, [currentLevel]);
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (isCorrect !== null) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      onCorrectAnswer();
      setScore(prev => prev + 1);
    }
    
    setQuestionCount(prev => prev + 1);
    
    // Check if quiz session completed (5 questions)
    if (questionCount >= 4) {
      setQuizCompleted(true);
    }
  };
  
  // Handle moving to next question
  const handleNextQuestion = () => {
    initializeQuestion();
  };
  
  // Reset quiz
  const handleResetQuiz = () => {
    setScore(0);
    setQuestionCount(0);
    setQuizCompleted(false);
    initializeQuestion();
  };
  
  return (
    <div className="garden-quiz">
      <h2>Garden Knowledge Quiz</h2>
      <p className="quiz-intro">Test your gardening knowledge and earn XP! 20 XP for each correct answer.</p>
      
      {quizCompleted ? (
        <div className="quiz-completed">
          <h3>Quiz Completed!</h3>
          <div className="quiz-score">
            <span className="score-text">Your score:</span>
            <span className="score-value">{score}/5</span>
          </div>
          <p>{score >= 4 ? 'Excellent job! You have great gardening knowledge!' : 
              score >= 2 ? 'Good job! Keep learning about gardening.' :
              'Keep practicing! You\'ll learn more as you go.'}</p>
          <button className="quiz-button reset-button" onClick={handleResetQuiz}>
            Start New Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-question-container">
          <div className="question-counter">Question {questionCount + 1}/5</div>
          
          {currentQuestion && (
            <>
              <div className="quiz-question">
                <h3>{currentQuestion.question}</h3>
              </div>
              
              <div className="quiz-options">
                {currentQuestion.options.map((option: string, index: number) => (
                  <div 
                    key={index}
                    className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} 
                              ${isCorrect !== null && index === currentQuestion.correctAnswer ? 'correct' : ''}
                              ${isCorrect === false && selectedAnswer === index ? 'incorrect' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">{option}</span>
                  </div>
                ))}
              </div>
              
              {isCorrect !== null && (
                <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="feedback-icon">
                    {isCorrect ? '✅' : '❌'}
                  </div>
                  <div className="feedback-text">
                    {isCorrect ? 'Correct!' : 'Incorrect!'} 
                    <p>{currentQuestion.explanation}</p>
                  </div>
                  
                  <button 
                    className="quiz-button next-button"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GardenQuiz;