import React, { useRef, useState, useEffect } from 'react';
import '../styles/StoryPlayer.css'; // Make sure to create this CSS file

interface StoryPlayerProps {
  storyTitle?: string;
  storyAudioUrl?: string;
  storyText?: string[];
  characterIcon?: string;
  highContrast?: boolean;
  fontSize?: number;
  lineSpacing?: number;
  letterSpacing?: number;
}

const StoryPlayer: React.FC<StoryPlayerProps> = ({
  storyTitle = "Professor Pancake",
  storyAudioUrl = "/stories/professor-pancake.mp3",
  storyText = [
    "Once upon a time, there was a professor who loved pancakes...", 
    "Every morning, he would flip pancakes for his students...", 
    "They called him Professor Pancake!"
  ],
  characterIcon = "🥞",
  highContrast = false,
  fontSize = 18,
  lineSpacing = 1.6,
  letterSpacing = 0.12
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSegment, setCurrentSegment] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showText, setShowText] = useState(true);
  
  // Calculate segment breakpoints based on story text segments
  const segmentBreakpoints = storyText.map((_, index) => 
    index === 0 ? 0 : index / storyText.length * 100
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        const { currentTime, duration } = audioRef.current;
        const newProgress = duration > 0 ? (currentTime / duration) * 100 : 0;
        setProgress(newProgress);
        
        // Update current text segment based on progress
        for (let i = segmentBreakpoints.length - 1; i >= 0; i--) {
          if (newProgress >= segmentBreakpoints[i]) {
            setCurrentSegment(i);
            break;
          }
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, segmentBreakpoints]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Check if audio needs to be reset
      if (progress >= 99.9) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
        // Show a fallback or error message to the user
      });
      setIsPlaying(true);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration, 
        audioRef.current.currentTime + 10
      );
    }
  };

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <div className={`story-player ${highContrast ? 'high-contrast' : ''}`}>
      <h2 className="story-title">{storyTitle}</h2>

      {/* Character Animation */}
      <div className="character-container">
        {isPlaying ? (
          <div className="character-bounce">
            {characterIcon}
          </div>
        ) : (
          <div className="character-static">
            {characterIcon}
          </div>
        )}
      </div>

      {/* Text Display with Highlighting */}
      {showText && (
        <div 
          className="story-text"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineSpacing,
            letterSpacing: `${letterSpacing}em`,
          }}
        >
          {storyText.map((segment, index) => (
            <p 
              key={index} 
              className={index === currentSegment ? 'active' : ''}
            >
              {segment}
            </p>
          ))}
        </div>
      )}

      {/* Audio Controls */}
      <div className="story-controls">
        <button 
          onClick={handleRewind}
          className="control-button rewind-button"
          aria-label="Rewind 10 seconds"
        >
          ⏪ -10s
        </button>

        <button
          onClick={togglePlay}
          className="play-button"
          aria-label={isPlaying ? "Pause story" : "Play story"}
        >
          {isPlaying ? '❚❚' : '▶'} {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button 
          onClick={handleForward}
          className="control-button forward-button"
          aria-label="Forward 10 seconds"
        >
          +10s ⏩
        </button>
      </div>

      {/* Toggle Text Button */}
      <button
        onClick={toggleText}
        className="toggle-text-button"
        aria-label={showText ? "Hide text" : "Show text"}
      >
        {showText ? '👁️ Hide Text' : '👁️ Show Text'}
      </button>

      {/* Progress Bar */}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <p className="progress-text">
        Story Progress: {Math.round(progress)}%
      </p>

      {/* Audio Element - Hidden but functional */}
      <audio 
        ref={audioRef} 
        src={storyAudioUrl}
        onEnded={() => {
          setIsPlaying(false);
        }} 
      />
    </div>
  );
};

export default StoryPlayer;