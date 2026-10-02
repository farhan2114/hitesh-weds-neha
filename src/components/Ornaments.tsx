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
  gold: assets.flowerLarge,
  leaf: assets.leafLine,
};

export const Ornament: React.FC<OrnamentProps> = ({ className = '', variant = 'large' }) => {
  return (
    <img
      src={ornamentSrc[variant]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute select-none opacity-85 sm:opacity-95 drop-shadow-[0_2px_8px_rgba(43,18,7,0.2)] hidden md:block ${className}`}
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
}) => {
  return (
    <div className={`pointer-events-none absolute select-none hidden md:block ${className}`}>
      <div className="h-full w-full">
        <img
          src={assets.mandalaSolidGold}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`h-full w-full object-contain opacity-95 sm:opacity-100 drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] drop-shadow-[0_6px_20px_rgba(168,59,0,0.35)] ${
            reverse ? 'animate-spin-soft-reverse' : 'animate-spin-soft'
          }`}
          style={{ transformOrigin: 'center center' }}
        />
      </div>
    </div>
  );
};
