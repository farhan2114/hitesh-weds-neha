import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

interface OrnamentProps {
  className?: string;
  variant?: 'large' | 'small' | 'gold' | 'leaf';
}

const ornamentSrc: Record<string, string> = {
  large: assets.flowerLarge,
  small: assets.flowerSmall,
  gold: assets.goldLily,
  leaf: assets.leafLine,
};

export const Ornament: React.FC<OrnamentProps> = ({ className = '', variant = 'large' }) => {
  return (
    <img
      src={ornamentSrc[variant]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute select-none opacity-85 sm:opacity-95 drop-shadow-[0_4px_14px_rgba(168,59,0,0.18)] ${className}`}
    />
  );
};

interface MandalaProps {
  className?: string;
  reverse?: boolean;
  parallax?: boolean;
}

export const SpinningMandala: React.FC<MandalaProps> = ({
  className = '',
  reverse = false,
  parallax = true,
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax) return;
    const el = parallaxRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -40 },
        {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div className={`pointer-events-none absolute select-none ${className}`}>
      <div ref={parallaxRef} className="h-full w-full will-change-transform">
        <img
          src={assets.mandalaGold}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`h-full w-full object-contain opacity-70 sm:opacity-85 drop-shadow-[0_4px_20px_rgba(203,69,1,0.22)] ${
            reverse ? 'animate-spin-soft-reverse' : 'animate-spin-soft'
          }`}
          style={{ transformOrigin: 'center center' }}
        />
      </div>
    </div>
  );
};
