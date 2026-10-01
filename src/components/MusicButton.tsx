import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useIsAudioPlaying, toggleAudio } from '../lib/audio';

export const MusicButton: React.FC = () => {
  const isPlaying = useIsAudioPlaying();

  return (
    <button
      type="button"
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Turn music off' : 'Turn music on'}
      className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full border border-[#F3E3C0] bg-[#A83B00]/95 text-[#F3E3C0] shadow-xl backdrop-blur transition-all hover:bg-[#C43907] hover:scale-105 active:scale-95 cursor-pointer"
    >
      {isPlaying ? (
        <Volume2 className="size-5" aria-hidden="true" />
      ) : (
        <VolumeX className="size-5" aria-hidden="true" />
      )}
    </button>
  );
};
