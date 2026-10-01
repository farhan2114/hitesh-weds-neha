import { useState, useEffect } from 'react';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';

let globalAudio: HTMLAudioElement | null = null;
let isPrimed = false;
let shouldBePlaying = false;
const listeners = new Set<(playing: boolean) => void>();

function notify() {
  const isPlaying = !!globalAudio && !globalAudio.paused && !globalAudio.muted;
  listeners.forEach((l) => l(isPlaying));
}

export function getAudio(): HTMLAudioElement {
  if (!globalAudio && typeof window !== 'undefined') {
    globalAudio = new Audio(weddingConfig.music?.audioUrl || assets.music);
    globalAudio.loop = true;
    globalAudio.volume = 0.45;
    globalAudio.preload = 'auto';
    globalAudio.addEventListener('play', notify);
    globalAudio.addEventListener('pause', notify);
    globalAudio.addEventListener('volumechange', notify);
  }
  return globalAudio!;
}

/**
 * Primes the audio element on iOS Safari during the user's initial click gesture ("Open Invitation").
 * Safari strictly requires an audio play invocation inside a user gesture to grant media playback privileges.
 */
export function primeAudio() {
  if (typeof window === 'undefined') return;
  const audio = getAudio();
  if (isPrimed) return;
  isPrimed = true;

  // Start playback muted so it's silent during the video, but unlocked on iOS Safari
  audio.muted = true;
  const p = audio.play();
  if (p !== undefined) {
    p.catch(() => {});
  }
}

/**
 * Called when the intro video ends or is skipped.
 * Unmutes the primed audio, resets to the beginning, and sets volume.
 */
export function playAudio() {
  if (typeof window === 'undefined') return;
  shouldBePlaying = true;
  const audio = getAudio();

  audio.currentTime = 0;
  audio.muted = false;
  audio.volume = 0.45;

  const p = audio.play();
  if (p !== undefined) {
    p.catch(() => {
      // If iOS delayed playback, ensure next interaction resumes it
      armInteractionUnlock();
    });
  }
  notify();
}

/**
 * Universal interaction fallback: if Safari suspended audio during video playback,
 * the very next touch or scroll on the page resumes the audio.
 */
let hasArmedUnlock = false;
function armInteractionUnlock() {
  if (hasArmedUnlock || typeof window === 'undefined') return;
  hasArmedUnlock = true;

  const unlock = () => {
    if (!shouldBePlaying) return;
    const audio = getAudio();
    if (audio.paused || audio.muted) {
      audio.muted = false;
      audio.volume = 0.45;
      audio.play().catch(() => {});
    }
    window.removeEventListener('touchstart', unlock, true);
    window.removeEventListener('touchend', unlock, true);
    window.removeEventListener('click', unlock, true);
  };

  window.addEventListener('touchstart', unlock, { capture: true, passive: true });
  window.addEventListener('touchend', unlock, { capture: true, passive: true });
  window.addEventListener('click', unlock, { capture: true, passive: true });
}

export function toggleAudio() {
  const audio = getAudio();
  if (audio.paused || audio.muted) {
    shouldBePlaying = true;
    audio.muted = false;
    audio.volume = 0.45;
    audio.play().catch(() => {});
  } else {
    shouldBePlaying = false;
    audio.pause();
  }
  notify();
}

export function useIsAudioPlaying(): boolean {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    listeners.add(setPlaying);
    setPlaying(!!globalAudio && !globalAudio.paused && !globalAudio.muted);
    return () => {
      listeners.delete(setPlaying);
    };
  }, []);

  return playing;
}
