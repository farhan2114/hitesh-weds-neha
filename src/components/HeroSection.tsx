import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig, weddingData } from '../wedding.config';
import { playAudio, primeAudio } from '../lib/audio';

const paperCards = [
  { x: -320, y: 180, r: -24, d: 0, w: 120, h: 158 },
  { x: 300, y: 220, r: 18, d: 0.08, w: 96, h: 126 },
  { x: -190, y: -160, r: 32, d: 0.16, w: 84, h: 110 },
  { x: 230, y: -140, r: -30, d: 0.24, w: 108, h: 142 },
  { x: -400, y: -40, r: 12, d: 0.32, w: 76, h: 100 },
  { x: 420, y: 40, r: -14, d: 0.4, w: 88, h: 116 },
];

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [opened, setOpened] = useState(false);
  const [started, setStarted] = useState(false);
  const [videoOver, setVideoOver] = useState(false);
  const [fading, setFading] = useState(false);

  /* ── Configure video element for iOS Safari on mount ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
  }, []);

  /* ── Lock scroll until invitation revealed ── */
  useEffect(() => {
    const docEl = document.documentElement;
    if (opened) {
      document.body.classList.remove('doors-locked');
      docEl.classList.remove('doors-locked');
      return;
    }
    window.scrollTo(0, 0);
    document.body.classList.add('doors-locked');
    docEl.classList.add('doors-locked');

    const prevent = (e: Event) => e.preventDefault();
    const handleKey = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    window.addEventListener('keydown', handleKey, { passive: false });

    return () => {
      document.body.classList.remove('doors-locked');
      docEl.classList.remove('doors-locked');
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
      window.removeEventListener('keydown', handleKey);
    };
  }, [opened]);

  /* ── GSAP invite-card reveal ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => setOpened(true),
      });

      tl.fromTo(
        '.temple',
        { scale: 1.18, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: prefersReduced ? 0.4 : 1.8, ease: 'power2.out' },
        0
      )
        .fromTo(
          '.paper',
          { autoAlpha: 0, x: 0, y: 60, scale: 0.4, rotate: 0 },
          {
            autoAlpha: 1,
            x: (i) => paperCards[i].x,
            y: (i) => paperCards[i].y,
            scale: 1,
            rotate: (i) => paperCards[i].r,
            duration: prefersReduced ? 0.4 : 1.6,
            ease: 'power2.out',
            stagger: 0.07,
          },
          prefersReduced ? 0 : 0.4
        )
        .fromTo(
          '.invite-card',
          { autoAlpha: 0, y: 140, scale: 0.62, rotateX: 42 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: prefersReduced ? 0.4 : 1.5, ease: 'power4.out' },
          prefersReduced ? 0 : 0.6
        )
        .fromTo(
          '.invite-line',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.8'
        );

      tlRef.current = tl;
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Video ends or user skips ── */
  const handleVideoEnd = useCallback(() => {
    if (videoOver || fading) return;
    setFading(true);
    playAudio(false);
    tlRef.current?.play();
    setTimeout(() => {
      setVideoOver(true);
      setOpened(true);
    }, 1000);
  }, [videoOver, fading]);

  /* ── Smoothly trigger fadeout right before video ends to prevent freeze-frames ── */
  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid || fading || videoOver) return;
    if (vid.duration && vid.duration > 2 && vid.currentTime >= vid.duration - 1.2) {
      handleVideoEnd();
    }
  }, [fading, videoOver, handleVideoEnd]);

  /* ── Direct user-gesture playback for Safari iOS compatibility ── */
  const handleStart = useCallback(() => {
    setStarted(true);
    playAudio(true); // Plays music at the exact same moment the video starts playing
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.defaultMuted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video playback restricted or file missing:', err);
          handleVideoEnd();
        });
      }
    }
  }, [handleVideoEnd]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background"
    >
      {/* Temple Backdrop */}
      <img
        src={assets.temple}
        alt="Temple gopuram archway"
        className="temple pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover opacity-0 blur-[1px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/54" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[var(--gradient-veil)]" />

      {/* Floating Paper Cards */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {paperCards.map((card, i) => (
          <div
            key={i}
            className="paper absolute opacity-0 shadow-[var(--shadow-card)]"
            style={{ width: `${card.w}px`, height: `${card.h}px` }}
          >
            <div className="h-full w-full border border-gold/40 bg-paper">
              <div className="m-2 h-full border border-gold/25 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)]" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Invitation Card */}
      <div className="relative z-20 w-full px-4 [perspective:1400px]">
        <div className="invite-card mx-auto max-w-lg opacity-0">
          <div className="paper-card arch-top relative px-4 py-6 sm:px-9 sm:py-8 text-center shadow-2xl">
            <img
              src={assets.mandalaGold}
              alt=""
              aria-hidden="true"
              width="1024"
              height="1024"
              className="pointer-events-none absolute -top-12 left-1/2 w-24 -translate-x-1/2 opacity-55 sm:-top-16 sm:w-28"
            />
            <p className="invite-line eyebrow mt-3 sm:mt-4 text-[0.62rem] sm:text-[0.68rem]">{weddingData.dateShort}</p>
            <div className="invite-line mx-auto mt-3 max-w-sm text-center">
              <p className="font-title text-[0.7rem] sm:text-xs uppercase tracking-[0.24em] text-gold-deep font-semibold">
                {weddingConfig.invitation.familyTitle || 'The Adusumalli Family'}
              </p>
              <p className="mt-1 font-serif italic text-xs sm:text-sm text-foreground/80">
                Cordially Invites You to Celebrate the Wedding of
              </p>
            </div>
            <h1 className="invite-line mt-2.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 font-display text-2xl min-[360px]:text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl leading-[1.08] break-words">
              <span className="text-gold-foil animate-foil">{weddingData.groom}</span>
              <span className="mx-1 font-title text-base sm:text-xl md:text-2xl align-middle text-maroon">&amp;</span>
              <span className="text-gold-foil animate-foil">{weddingData.bride}</span>
            </h1>
            <div className="invite-line rule-gold mx-auto my-3 sm:my-3.5 w-1/2" />
            <p className="invite-line font-title text-sm sm:text-base tracking-wide text-foreground/90">{weddingData.dateLabel}</p>
            <p className="invite-line mt-0.5 text-xs sm:text-sm text-muted-foreground">
              {weddingData.muhurtham} · {weddingData.venue}, {weddingData.city}
            </p>

            {/* Scroll Down Indicator (Just like Hanisha) */}
            <a
              href="#intro"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('intro');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll down to invitation details"
              className="invite-line group mt-4 sm:mt-5 flex flex-col items-center gap-1 cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105"
            >
              <span className="font-title text-xs sm:text-sm uppercase tracking-[0.26em] text-[#4A1521] font-bold -mr-[0.26em] select-none text-center animate-scroll-blink">
                Scroll Down
              </span>
              <div className="animate-arrow-down flex items-center justify-center">
                <ChevronDown className="size-4 sm:size-5 text-[#8A6D3B] stroke-[2.5] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] drop-shadow-[0_0_8px_rgba(218,165,32,0.5)] group-hover:text-[#4A1521] transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── Intro Video Overlay (Ronish weds Hanisha style) ── */}
      {!videoOver && (
        <div
          className="fixed inset-0 z-[200] w-screen h-[100svh] overflow-hidden bg-black transition-opacity duration-1000 ease-out"
          style={{
            opacity: fading ? 0 : 1,
            pointerEvents: fading ? 'none' : 'auto',
          }}
        >
          {/* Instant First-Frame Poster (renders 0ms without waiting for video decoding) */}
          <img
            src={weddingData.introPoster || '/client-images/intro-poster.jpg'}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
            style={{ width: '100vw', height: '100svh' }}
          />

          {/* Video — configured with iOS Safari webkit-playsinline and muted attributes */}
          <video
            ref={videoRef}
            src={weddingData.introVideo || '/client-images/intro.mp4'}
            poster={weddingData.introPoster || '/client-images/intro-poster.jpg'}
            muted
            playsInline
            autoPlay={false}
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ width: '100vw', height: '100svh', transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          />

          {/* Card overlay on top of frozen first frame — smoothly fades on tap */}
          <div
            onClick={!started ? handleStart : undefined}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] px-4 transition-opacity duration-500 ease-out cursor-pointer"
            style={{
              opacity: started ? 0 : 1,
              pointerEvents: started ? 'none' : 'auto',
            }}
          >
            <div className="paper-card arch-top relative flex flex-col items-center px-6 py-9 text-center sm:px-14 sm:py-14 w-[85%] max-w-[320px] sm:max-w-sm border border-gold/50 shadow-2xl">
              {/* Mandala: spins centered above card */}
              <div className="pointer-events-none absolute -top-11 sm:-top-14 left-1/2 -translate-x-1/2">
                <img
                  src={assets.mandalaGold}
                  alt=""
                  aria-hidden="true"
                  className="w-20 sm:w-28 animate-[spin_16s_linear_infinite]"
                />
              </div>

              {/* Date */}
              <p className="eyebrow mt-5 sm:mt-6 text-[0.62rem] text-gold-deep">{weddingData.dateShort}</p>

              {/* Names */}
              <h2 className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-x-1.5 font-display text-2xl min-[360px]:text-3xl sm:text-4xl leading-tight">
                <span className="text-gold-foil animate-foil">{weddingData.groom}</span>
                <span className="font-title text-base sm:text-lg text-maroon sm:text-2xl">&amp;</span>
                <span className="text-gold-foil animate-foil">{weddingData.bride}</span>
              </h2>

              {/* Divider */}
              <div className="rule-gold mx-auto my-5 sm:my-6 w-24 sm:w-32 opacity-70" />

              {/* Tap to begin */}
              <button
                type="button"
                onClick={handleStart}
                aria-label="Tap to open the invitation"
                className="group relative overflow-hidden rounded-full border border-gold/70 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 px-8 py-3.5 transition-all hover:border-gold hover:bg-gold/30 active:scale-95 cursor-pointer shadow-lg"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative font-title text-[0.7rem] uppercase tracking-[0.34em] text-gold-deep font-bold">
                  Open Invitation
                </span>
              </button>

              <p className="mt-4 text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
                Music will play softly
              </p>
            </div>
          </div>

          {/* Skip button — only visible after video starts playing */}
          <button
            type="button"
            onClick={handleVideoEnd}
            aria-label="Skip intro"
            className={`absolute bottom-6 right-5 z-20 rounded-full border border-gold/50 bg-black/60 px-5 py-2.5 font-title text-[0.68rem] uppercase tracking-[0.25em] text-paper backdrop-blur-md transition-all duration-500 hover:bg-black/80 cursor-pointer sm:bottom-10 sm:right-10 ${
              started ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            Skip intro
          </button>
        </div>
      )}
    </section>
  );
};
