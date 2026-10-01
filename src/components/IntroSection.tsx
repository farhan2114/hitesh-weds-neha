import React from 'react';
import { weddingConfig, weddingData } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const IntroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-5 pt-10 pb-4 text-center sm:pt-14 sm:pb-6">
      <SpinningMandala className="-left-20 top-1/2 w-52 -translate-y-1/2 sm:w-72" />
      <Ornament variant="gold" className="-left-6 top-8 w-32 rotate-12 sm:w-44" />
      <Ornament variant="gold" className="-right-6 bottom-8 w-32 -rotate-12 sm:w-44" />

      <RevealOnScroll>
        <p className="font-telugu text-2xl sm:text-3xl md:text-4xl text-gold-deep tracking-normal font-normal drop-shadow-sm">
          {weddingConfig.invitation.sanskritMantra || 'ఓం శ్రీ గణేశాయ నమః'}
        </p>
        
        <div className="mx-auto mt-6 max-w-2xl text-center space-y-3">
          <p className="font-telugu text-2xl sm:text-3xl md:text-4xl text-foreground/90 leading-relaxed font-normal">
            {weddingConfig.invitation.invitationLine || 'నూతన జీవితానికి నాంది పలుకుతూ...'}
          </p>
          <h2 className="font-display text-4xl sm:text-6xl text-gold-foil animate-foil pt-1">
            {weddingData.groom} &amp; {weddingData.bride}
          </h2>
        </div>

        <div className="rule-gold mx-auto mt-8 w-40" />
        <p className="mt-5 font-title tracking-[0.25em] uppercase text-sm text-gold-deep">
          {weddingData.hashtag}
        </p>
      </RevealOnScroll>
    </section>
  );
};
