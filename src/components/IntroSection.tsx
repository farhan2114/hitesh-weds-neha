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
        <p className="font-serif text-lg sm:text-2xl text-gold-deep tracking-wider font-semibold">
          {weddingConfig.invitation.sanskritMantra || 'ఓం శ్రీ గణేశాయ నమః'}
        </p>
        
        <div className="mx-auto mt-8 max-w-2xl text-center space-y-4">
          <p className="font-serif italic text-xl sm:text-3xl text-foreground/90 leading-relaxed font-medium">
            {weddingConfig.invitation.invitationLine || 'నూతన జీవితానికి నాంది పలుకుతూ...'}
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
