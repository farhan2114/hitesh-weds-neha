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
    <div ref={containerRef} className="relative h-[62vh] min-h-[440px] overflow-hidden bg-[#A83B00] sm:h-[75vh]">
      <img
        src={banner.image || assets.hands}
        alt={banner.alt || 'Wedding ceremony quote banner'}
        loading="lazy"
        width={1200}
        height={1500}
        className="parallax-img absolute -top-[15%] left-0 h-[130%] w-full object-cover object-center will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#A83B00] via-[#A83B00]/40 to-transparent sm:bg-[#A83B00]/30" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p className="max-w-2xl text-center font-display text-2xl leading-relaxed text-[#FFFDF5] sm:text-5xl drop-shadow-[0_2px_4px_rgba(59,31,20,0.7)]">
          {banner.quote}
        </p>
      </div>
    </div>
  );
};
