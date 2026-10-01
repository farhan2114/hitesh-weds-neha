import React from 'react';
import { weddingConfig, weddingData } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const IntroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:py-32">
      <SpinningMandala className="-left-20 top-1/2 w-52 -translate-y-1/2 sm:w-72" />
      <Ornament variant="gold" className="-left-6 top-8 w-32 rotate-12 sm:w-44" />
      <Ornament variant="gold" className="-right-6 bottom-8 w-32 -rotate-12 sm:w-44" />

      <RevealOnScroll>
        <p className="eyebrow">{weddingConfig.invitation.sanskritMantra || 'Om Sri Ganeshaya Namaha'}</p>
        
        <div className="mx-auto mt-8 max-w-2xl text-center space-y-3">
          <p className="font-title text-sm sm:text-base tracking-[0.28em] uppercase text-gold-deep font-semibold">
            The Adusumalli Family
          </p>
          <p className="font-serif italic text-xl sm:text-3xl text-foreground/90 leading-relaxed">
            Cordially Invites You to Celebrate
          </p>
          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground">
            the Wedding of
          </p>
          <h2 className="font-display text-4xl sm:text-6xl text-gold-foil animate-foil pt-2">
            {weddingData.groom} &amp; {weddingData.bride}
          </h2>
        </div>

        <div className="rule-gold mx-auto mt-10 w-40" />
        <p className="mt-6 font-title tracking-[0.25em] uppercase text-sm text-gold-deep">
          {weddingData.hashtag}
        </p>
      </RevealOnScroll>
    </section>
  );
};
