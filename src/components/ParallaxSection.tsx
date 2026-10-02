import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.parallax-img',
        { yPercent: -6, scale: 1.15 },
        {
          yPercent: 6,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const { banner } = weddingConfig;

  return (
    <div ref={containerRef} className="relative h-[60vh] min-h-[420px] overflow-hidden bg-[#180903] sm:h-[72vh]">
      <img
        src={banner.image || assets.hands}
        alt={banner.alt || 'Wedding ceremony quote banner'}
        loading="lazy"
        width={1200}
        height={1500}
        className="parallax-img absolute -top-[15%] left-0 h-[130%] w-full object-cover object-center will-change-transform"
      />
      {/* Natural cinematic overlay allowing photo colors to shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
      <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8">
        <div className="max-w-3xl rounded-sm border border-[#F3E3C0]/35 bg-black/45 px-6 py-8 sm:px-12 sm:py-10 backdrop-blur-xs text-center shadow-2xl">
          <p className="font-display text-xl sm:text-3xl md:text-4xl leading-relaxed text-[#FFFDF5] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            "{banner.quote}"
          </p>
        </div>
      </div>
    </div>
  );
};
