import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DyslexiaSettingsContext } from '../App';
import '../styles/ActivityComponent.css';

interface ActivityProps {
  id: number;
  title: string;
  type: 'visual' | 'auditory' | 'tactile' | 'kinesthetic' | 'discussion';
  weekId: number;
  weekTitle: string;
  description: string;
  learningGoals: string[];
  materials: string[];
  instructions: string[];
  adaptations: string[];
  visualSupports: string[];
  completionSteps: string[];
}

// Sample data that would normally come from your API or data store
const activityData: ActivityProps = {
  id: 101,
  title: "Hero Stories",
  type: "visual",
  weekId: 1,
  weekTitle: "Introduction to Heroes",
  description: "Listen to short, illustrated superhero stories with synchronized highlighting of text",
  learningGoals: [
    "Improve reading comprehension",
    "Build vocabulary related to hero qualities",
    "Practice active listening skills"
  ],
  materials: [
    "Story cards with dyslexia-friendly text",
    "Audio recordings of stories",
    "Visual vocabulary cards",
    "Character trait icons"
  ],
  instructions: [
    "Find a comfortable spot where you can see the screen clearly",
    "Click the 'Start Story' button to begin",
    "Follow along with the highlighted text as the story plays",
    "Use the pause button if you need more time",
    "After each story, click on the hero qualities shown in the story",
    "Complete the reflection activity"
  ],
  adaptations: [
    "Text highlighting follows audio narration",
    "Pause and replay buttons for each segment",
    "Visual vocabulary support with images",
    "Option to adjust reading speed",
    "Alternative keyboard navigation"
  ],
  visualSupports: [
    "/images/activities/story-card-example.png",
    "/images/activities/hero-traits-visual.png"
  ],
  completionSteps: [
    "Listen to at least one story",
    "Identify 3 hero qualities from the story",
    "Complete the matching activity",
    "Record your favorite part (draw, write, or record)"
  ]
};

// Define all activities
const allActivities: Record<string, ActivityProps> = {
  "101": {
    ...activityData
  },
  "102": {
    ...activityData,
    id: 102,
    title: "Hero Sculpting",
    type: "tactile",
    description: "Create 3D hero figures using clay while discussing hero traits"
  },
  "103": {
    ...activityData,
    id: 103,
    title: "Real Heroes Circle",
    type: "discussion",
    description: "Share about real-life heroes using visual prompt cards"
  }
};

const ActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dyslexiaSettings = useContext(DyslexiaSettingsContext);
  const [activity, setActivity] = useState<ActivityProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Simulate fetching activity data based on ID
  useEffect(() => {
    const fetchActivity = () => {
      setLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        if (id && allActivities[id as keyof typeof allActivities]) {
          setActivity(allActivities[id as keyof typeof allActivities]);
        } else {
          // Default to first activity if ID not found
          setActivity(activityData);
        }
        setLoading(false);
      }, 500);
    };
    
    fetchActivity();
  }, [id]);

  // Apply dyslexia settings
  useEffect(() => {
    if (dyslexiaSettings) {
      // Map your app's dyslexia settings to this component's settings
      setFontSize(dyslexiaSettings.fontSize === 'large' ? 20 : 
                 dyslexiaSettings.fontSize === 'medium' ? 18 : 16);
      
      // You could also apply other settings here
    }
  }, [dyslexiaSettings]);

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleNextStep = () => {
    if (activity && currentStep < activity.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handlePlayStory = () => {
    setIsStoryPlaying(true);
    // In a real app, this would trigger your audio/visual story player
  };

  const handlePauseStory = () => {
    setIsStoryPlaying(false);
  };

  // Get activity type icon
  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'visual': return '👁️';
      case 'auditory': return '👂';
      case 'tactile': return '✋';
      case 'kinesthetic': return '🏃';
      case 'discussion': return '💬';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading activity...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="error-container">
        <h2>Activity Not Found</h2>
        <p>Sorry, we couldn't find the activity you're looking for.</p>
        <button onClick={() => navigate('/superhero')} className="back-button">
          Back to Curriculum
        </button>
      </div>
    );
  }

  // Define related activities for navigation (excluding current activity)
  const relatedActivities = Object.values(allActivities)
    .filter(a => a.id !== activity.id && a.weekId === activity.weekId)
    .map(a => ({
      id: a.id,
      title: a.title,
      type: a.type
    }));

  return (
    <div 
      className="activity-container"
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Breadcrumb navigation */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link> &gt; 
        <Link to="/superhero">Superhero Curriculum</Link> &gt; 
        <span>Activity: {activity.title}</span>
      </div>
      
      <div className="activity-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        
        <div className="activity-title-section">
          <div className="breadcrumbs">
            Week {activity.weekId}: {activity.weekTitle} / Activity
          </div>
          <h1>
            <span className="activity-type-icon">
              {getActivityTypeIcon(activity.type)}
            </span>
            {activity.title}
          </h1>
          <div className="activity-type">
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Activity
          </div>
        </div>
        
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
            onClick={toggleAudio}
            aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
            className="audio-button"
          >
            {audioEnabled ? "Audio On" : "Audio Off"}
          </button>
        </div>
      </div>

      <div className="activity-content">
        <div className="activity-info">
          <div className="activity-description">
            <h2>What We'll Do</h2>
            <p>{activity.description}</p>
            {audioEnabled && (
              <button 
                className="audio-button"
                aria-label="Listen to description"
              >
                🔊 Listen
              </button>
            )}
          </div>

          <div className="learning-goals">
            <h2>Learning Goals</h2>
            <ul>
              {activity.learningGoals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>

          <div className="materials-needed">
            <h2>Materials Needed</h2>
            <ul className="materials-list">
              {activity.materials.map((material, index) => (
                <li key={index}>
                  <span className="material-check">✓</span>
                  {material}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="activity-instructions">
          <h2>Activity Steps</h2>
          <div className="steps-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${(completedSteps.length / activity.instructions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="step-navigation">
            <button 
              onClick={handlePrevStep} 
              disabled={currentStep === 0}
              className="step-button"
            >
              ← Previous
            </button>
            <span className="step-counter">
              Step {currentStep + 1} of {activity.instructions.length}
            </span>
            <button 
              onClick={handleNextStep}
              disabled={currentStep === activity.instructions.length - 1}
              className="step-button"
            >
              Next →
            </button>
          </div>
          
          <div className="current-step">
            <h3>Step {currentStep + 1}:</h3>
            <p>{activity.instructions[currentStep]}</p>
            
            {audioEnabled && (
              <button className="listen-button">
                🔊 Listen to this step
              </button>
            )}
            
            <button 
              onClick={() => handleStepComplete(currentStep)}
              className={`complete-step-button ${completedSteps.includes(currentStep) ? 'completed' : ''}`}
            >
              {completedSteps.includes(currentStep) ? "✓ Completed" : "Mark as Complete"}
            </button>
          </div>
          
          {activity.type === 'visual' && (
            <div className="story-player">
              <h3>Story Player</h3>
              <div className="story-container">
                {!isStoryPlaying ? (
                  <div className="story-start-screen">
                    <img 
                      src="/images/placeholder.png"
                      alt="Story thumbnail"
                      style={{ width: '400px', height: '300px' }}
                    />
                    <button 
                      onClick={handlePlayStory}
                      className="start-story-button"
                    >
                      Start Story
                    </button>
                  </div>
                ) : (
                  <div className="story-playing-screen">
                    <div className="story-visual">
                      <img 
                        src="/images/placeholder.png"
                        alt="Story scene"
                        style={{ width: '400px', height: '300px' }}
                      />
                    </div>
                    <div className="story-text">
                      <p className="highlighted-text">
                        <span className="highlighted">Once upon a time</span>, there was a hero named Bright Star who could shine light in the darkest places.
                      </p>
                    </div>
                    <div className="story-controls">
                      <button className="story-control-button">⏮️ Rewind</button>
                      <button 
                        onClick={handlePauseStory}
                        className="story-control-button"
                      >
                        ⏸️ Pause
                      </button>
                      <button className="story-control-button">⏭️ Forward</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="adaptations-section">
          <h2>Dyslexia-Friendly Adaptations</h2>
          <div className="adaptations-list">
            {activity.adaptations.map((adaptation, index) => (
              <div key={index} className="adaptation-item">
                <span className="adaptation-icon">🔍</span>
                <span>{adaptation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="completion-tracker">
          <h2>Activity Completion</h2>
          <div className="completion-steps">
            {activity.completionSteps.map((step, index) => (
              <div 
                key={index} 
                className={`completion-step ${completedSteps.includes(index) ? 'completed' : ''}`}
              >
                <div className="completion-checkbox">
                  {completedSteps.includes(index) ? "✓" : (index + 1)}
                </div>
                <div className="completion-text">{step}</div>
              </div>
            ))}
          </div>
          
          <button 
            disabled={completedSteps.length < activity.completionSteps.length}
            className="finish-activity-button"
          >
            {completedSteps.length < activity.completionSteps.length 
              ? `Complete ${activity.completionSteps.length - completedSteps.length} more steps` 
              : "Finish Activity!"}
          </button>
        </div>
        
        {/* Navigation Links section */}
        <div className="navigation-links">
          <h2>Continue Learning</h2>
          <div className="links-grid">
            <Link to={`/superhero`} className="nav-link">
              <span className="link-icon">📚</span>
              <span>Back to Curriculum</span>
            </Link>
            
            <Link to="/reading" className="nav-link">
              <span className="link-icon">🎮</span>
              <span>Reading Games</span>
            </Link>
            
            <Link to={`/project/${activity.weekId}`} className="nav-link">
              <span className="link-icon">🏠</span>
              <span>Week {activity.weekId} Take-Home Project</span>
            </Link>
          </div>
          
          {relatedActivities.length > 0 && (
            <>
              <h3>Related Activities</h3>
              <div className="related-activities">
                {relatedActivities.map(relatedActivity => (
                  <Link 
                    to={`/activity/${relatedActivity.id}`} 
                    key={relatedActivity.id} 
                    className={`related-activity ${relatedActivity.type}`}
                  >
                    <span className="activity-type-icon">
                      {getActivityTypeIcon(relatedActivity.type)}
                    </span>
                    <span>{relatedActivity.title}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;