import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryPlayerProps {
  storyTitle: string;
  storyAudioUrl: string;
  storyText: string[];
  characterIcon?: string;
  highContrast?: boolean;
  fontSize?: number;
  lineSpacing?: number;
  letterSpacing?: number;
}

const StoryPlayer: React.FC<StoryPlayerProps> = ({
  storyTitle = "Professor Pancake",
  storyAudioUrl = "/stories/professor-pancake.mp3",
  storyText = ["Once upon a time, there was a professor who loved pancakes...", "Every morning, he would flip pancakes for his students...", "They called him Professor Pancake!"],
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
  
  // Calculate segment breakpoints (for a real implementation, these would come from a more sophisticated text-audio sync system)
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
      audioRef.current.play();
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
    <div 
      className={`max-w-lg mx-auto p-6 rounded-2xl shadow-lg text-center ${highContrast ? 'bg-yellow-100 text-black' : 'bg-yellow-50'}`}
      style={{
        fontFamily: "'Comic Sans MS', 'OpenDyslexic', Arial, sans-serif",
      }}
    >
      <h2 className="text-2xl font-bold mb-4">🎧 {storyTitle}</h2>

      {/* Character Animation */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="text-6xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            {characterIcon}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Display with Highlighting */}
      {showText && (
        <div 
          className="mb-6 text-left p-4 bg-white rounded-lg shadow-inner"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineSpacing,
            letterSpacing: `${letterSpacing}em`,
          }}
        >
          {storyText.map((segment, index) => (
            <p 
              key={index} 
              className={`mb-2 transition-all duration-300 ${index === currentSegment ? 'bg-yellow-200 font-bold' : 'opacity-70'}`}
            >
              {segment}
            </p>
          ))}
        </div>
      )}

      {/* Audio Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button 
          onClick={handleRewind}
          className={`p-2 rounded-full ${highContrast ? 'bg-yellow-400 text-black' : 'bg-yellow-200 hover:bg-yellow-300'}`}
          aria-label="Rewind 10 seconds"
        >
          ⏪ -10s
        </button>

        <button
          onClick={togglePlay}
          className={`text-lg font-bold py-2 px-6 rounded-full flex items-center justify-center gap-2 ${
            highContrast ? 'bg-yellow-500 text-black' : 'bg-yellow-300 hover:bg-yellow-400'
          }`}
          aria-label={isPlaying ? "Pause story" : "Play story"}
        >
          {isPlaying ? '❚❚' : '▶'}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button 
          onClick={handleForward}
          className={`p-2 rounded-full ${highContrast ? 'bg-yellow-400 text-black' : 'bg-yellow-200 hover:bg-yellow-300'}`}
          aria-label="Forward 10 seconds"
        >
          ⏩ +10s
        </button>
      </div>

      {/* Toggle Text Button */}
      <button
        onClick={toggleText}
        className={`mb-4 px-4 py-1 rounded-full text-sm ${
          highContrast ? 'bg-blue-700 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
        }`}
        aria-label={showText ? "Hide text" : "Show text"}
      >
        {showText ? '👁️ Hide Text' : '👁️ Show Text'}
      </button>

      {/* Syrup/Progress Meter */}
      <div className={`w-full h-5 ${highContrast ? 'bg-gray-300' : 'bg-yellow-200'} rounded-full overflow-hidden mb-2`}>
        <div
          className={`h-full ${highContrast ? 'bg-amber-700' : 'bg-amber-500'} transition-all duration-200 ease-linear`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <p className={`text-sm ${highContrast ? 'text-black' : 'text-yellow-700'}`}>
        Story Progress: {Math.round(progress)}%
      </p>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={storyAudioUrl}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }} 
      />
    </div>
  );
};

export default StoryPlayer;