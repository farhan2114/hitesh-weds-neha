import React from 'react';
import { weddingConfig, weddingData } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const IntroSection: React.FC = () => {
  return (
    <section id="intro" className="relative overflow-hidden px-5 pt-10 pb-4 text-center sm:pt-14 sm:pb-6">
      <SpinningMandala className="-left-16 sm:-left-20 top-1/2 w-48 sm:w-64 -translate-y-1/2" />

      <RevealOnScroll>
        <p className="font-telugu text-2xl sm:text-3xl md:text-4xl text-gold-deep tracking-normal font-normal drop-shadow-sm">
          {weddingConfig.invitation.sanskritMantra || 'ఓం శ్రీ గణేశాయ నమః'}
        </p>
        
        <div className="mx-auto mt-6 max-w-2xl text-center space-y-3">
          <p className="font-telugu text-2xl sm:text-3xl md:text-4xl text-foreground/90 leading-relaxed font-normal">
            {weddingConfig.invitation.invitationLine || 'నూతన జీవితానికి నాంది పలుకుతూ...'}
          </p>
          <h2 className="font-telugu text-4xl sm:text-6xl md:text-7xl text-gold-foil animate-foil pt-1 font-normal">
            హితేష్ &amp; నేహా
          </h2>
        </div>

        <div className="rule-gold mx-auto mt-8 w-40" />
      </RevealOnScroll>
    </section>
  );
};
