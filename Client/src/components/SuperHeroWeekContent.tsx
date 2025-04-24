import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'; // Assuming you use framer-motion for animations

// Import your existing context or hook for dyslexia settings
// import { useDyslexiaSettings } from '../../contexts/DyslexiaContext';

interface Activity {
  id: string;
  title: string;
  type: 'visual' | 'auditory' | 'tactile' | 'kinesthetic' | 'discussion';
  description: string;
  durationMinutes: number;
  adaptations: string[];
}

interface WeekData {
  id: string;
  weekNumber: number;
  title: string;
  theme: string;
  description: string;
  learningGoals: string[];
  activities: Activity[];
  takeHomeProject: {
    title: string;
    description: string;
    materials: string[];
  };
  imageUrl: string;
}

interface SuperheroWeekContentProps {
  weekData: WeekData;
  previousWeekId?: string;
  nextWeekId?: string;
}

const SuperheroWeekContent: React.FC<SuperheroWeekContentProps> = ({
  weekData,
  previousWeekId,
  nextWeekId
}) => {
  const router = useRouter();
  
  // Uncomment and use your actual dyslexia settings hook
  // const { settings } = useDyslexiaSettings();
  
  // For now, we'll use these placeholder values - replace with your actual settings
  const settings = {
    fontSize: 18,
    lineHeight: 1.6,
    letterSpacing: 0.12,
    fontFamily: "'Comic Sans MS', 'OpenDyslexic', sans-serif",
    highContrast: false,
    audioEnabled: true
  };

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

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'visual': return '#4cc9f0';
      case 'auditory': return '#f72585';
      case 'tactile': return '#7209b7'; 
      case 'kinesthetic': return '#4361ee';
      case 'discussion': return '#3a0ca3';
      default: return '#3d7c98';
    }
  };

  return (
    <div 
      className="superhero-week-container"
      style={{
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight,
        letterSpacing: `${settings.letterSpacing}em`,
        fontFamily: settings.fontFamily,
        backgroundColor: settings.highContrast ? '#f7f3e9' : '#ffffff',
        color: settings.highContrast ? '#000000' : '#333333',
      }}
    >
      <div className="week-header">
        <motion.div 
          className="week-title-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Week {weekData.weekNumber}: {weekData.title}</h1>
          <div className="week-theme">Theme: {weekData.theme}</div>
        </motion.div>

        {settings.audioEnabled && (
          <button className="audio-narration-button">
            🔊 Listen to description
          </button>
        )}
      </div>

      <div className="week-content-grid">
        <motion.div 
          className="week-description-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="week-description">
            <p>{weekData.description}</p>
          </div>

          <div className="learning-goals">
            <h2>Learning Goals</h2>
            <ul>
              {weekData.learningGoals.map((goal, index) => (
                <li key={index}>
                  <span className="goal-check">✓</span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          <div className="week-image">
            <Image 
              src={weekData.imageUrl || "/images/placeholder/400/300"} 
              alt={`Visual for ${weekData.title}`}
              width={400}
              height={300}
              layout="responsive"
            />
          </div>
        </motion.div>

        <motion.div 
          className="activities-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>Activities</h2>
          <div className="activities-list">
            {weekData.activities.map((activity, index) => (
              <motion.div 
                key={activity.id}
                className="activity-card"
                style={{ 
                  borderTopColor: getActivityTypeColor(activity.type)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="activity-type-badge" style={{ backgroundColor: getActivityTypeColor(activity.type) }}>
                  <span className="activity-icon">{getActivityTypeIcon(activity.type)}</span>
                  <span className="activity-type">{activity.type}</span>
                </div>
                
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                
                <div className="activity-meta">
                  <span className="activity-duration">⏱️ {activity.durationMinutes} minutes</span>
                </div>
                
                <div className="activity-adaptations">
                  <h4>Dyslexia-Friendly Features:</h4>
                  <ul>
                    {activity.adaptations.slice(0, 2).map((adaptation, i) => (
                      <li key={i}>{adaptation}</li>
                    ))}
                    {activity.adaptations.length > 2 && (
                      <li className="more-adaptations">+{activity.adaptations.length - 2} more</li>
                    )}
                  </ul>
                </div>
                
                <Link href={`/activities/${activity.id}`}>
                  <a className="start-activity-button">Start Activity</a>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="take-home-project"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2>Take Home Project</h2>
        <div className="project-card">
          <h3>{weekData.takeHomeProject.title}</h3>
          <p>{weekData.takeHomeProject.description}</p>
          
          <div className="project-materials">
            <h4>Materials Needed:</h4>
            <ul>
              {weekData.takeHomeProject.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>
          
          <Link href={`/projects/${weekData.id}`}>
            <a className="view-project-details">View Complete Instructions</a>
          </Link>
        </div>
      </motion.div>

      <div className="week-navigation">
        {previousWeekId ? (
          <Link href={`/curriculum/${previousWeekId}`}>
            <a className="prev-week-button">← Previous Week</a>
          </Link>
        ) : (
          <div className="nav-spacer"></div>
        )}
        
        <Link href="/curriculum">
          <a className="curriculum-overview-button">Curriculum Overview</a>
        </Link>
        
        {nextWeekId ? (
          <Link href={`/curriculum/${nextWeekId}`}>
            <a className="next-week-button">Next Week →</a>
          </Link>
        ) : (
          <div className="nav-spacer"></div>
        )}
      </div>
    </div>
  );
};

export default SuperheroWeekContent;