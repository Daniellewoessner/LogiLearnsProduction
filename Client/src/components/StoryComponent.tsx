import React, { useRef, useState } from 'react';

const StoryComponent: React.FC = () => {
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayStory = () => {
    setIsStoryPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="p-6 bg-yellow-50 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Professor Pancake and the Great Syrup Showdown</h1>
      
      <button
        onClick={handlePlayStory}
        className="px-4 py-2 bg-yellow-300 rounded-full hover:bg-yellow-400 font-semibold"
      >
        ▶️ Play Story
      </button>

      <audio ref={audioRef} src="/professor-pancake.mp3" />

      {isStoryPlaying && <p className="mt-4 text-green-600">Story is playing...</p>}
    </div>
  );
};

export default StoryComponent;
