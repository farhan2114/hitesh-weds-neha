import React from 'react';
import { assets } from '../data/assets';
import { weddingData } from '../data/weddingData';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const GratitudeSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDE8D4] via-[#FDF3E8] to-[#FCDCC3] px-5 py-24 sm:py-32">
      <SpinningMandala reverse className="-right-24 bottom-4 w-56 sm:w-80" />
      <Ornament variant="gold" className="-right-10 top-10 w-36 rotate-6 sm:w-52" />
      <Ornament variant="gold" className="-left-8 bottom-10 w-32 -rotate-12 sm:w-48" />

      <RevealOnScroll className="relative mx-auto max-w-4xl">
        <div className="paper-card relative overflow-hidden px-6 py-14 text-center sm:px-16 sm:py-20">
          <img
            src={assets.leafLine}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -left-16 -top-10 w-64 opacity-[0.13] sm:w-80"
          />
          <img
            src={assets.leafLine}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -bottom-16 -right-14 w-64 rotate-180 opacity-[0.13] sm:w-80"
          />
          <span className="pointer-events-none absolute inset-4 border border-gold/30" />

          <div className="relative">
            <img
              src={assets.kalash}
              alt="Traditional ceremonial kalash with mango leaves and coconut"
              loading="lazy"
              className="mx-auto w-20 sm:w-24"
            />
            <p className="eyebrow mt-7">With gratitude from both families</p>
            <h2 className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-2xl min-[360px]:text-3xl min-[480px]:text-5xl sm:text-7xl leading-[1.08] break-words">
              <span className="text-gold-foil animate-foil">{weddingData.groom}</span>
              <span className="mx-1.5 align-middle font-title text-lg sm:text-3xl text-[#F3E3C0]">&amp;</span>
              <span className="text-gold-foil animate-foil">{weddingData.bride}</span>
            </h2>
            <p className="mt-7 font-title text-sm uppercase tracking-[0.32em] text-[#F3E3C0] sm:text-base font-semibold">
              Thank you for blessing us
            </p>
            <img
              src={assets.lotusDivider}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="mx-auto mt-6 w-full max-w-sm opacity-90"
            />
            <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-[#FFFDF5]">
              Your presence, blessings, and affection would make this joyous beginning even more meaningful. With hearts full of happiness, we warmly invite you to join us as we celebrate this special occasion on December 18th and 19th, 2026, at the Indian Cultural Centre of South Jersey, Marlton, New Jersey.
            </p>
            <img
              src={assets.coupleNamaste}
              alt="Illustration of greeting guests with folded hands"
              loading="lazy"
              className="mx-auto mt-10 w-48 sm:w-60"
            />
            <p className="mt-8 font-telugu text-2xl sm:text-3xl md:text-4xl text-[#F3E3C0] font-normal leading-relaxed drop-shadow-sm">
              {weddingData.familyLine || 'మీ ఆశీస్సులే మా నూతన జీవితానికి తొలి అడుగు'}
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
