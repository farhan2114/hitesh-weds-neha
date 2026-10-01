import React from 'react';
import { weddingConfig } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const MeetCoupleSection: React.FC = () => {
  const { couple } = weddingConfig;

  return (
    <section id="couple" className="relative overflow-hidden px-5 py-20 sm:py-28">
      <SpinningMandala className="-right-24 bottom-10 w-56 sm:w-72" />
      <Ornament className="-left-8 top-10 w-36 sm:w-52" />
      <Ornament variant="small" className="right-2 top-1/3 w-24 rotate-45 sm:w-32" />

      <div className="relative mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">Together with their families</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">Meet the couple</h2>
          <div className="rule-gold mx-auto mt-6 w-32" />
        </RevealOnScroll>

        {/* ── Single Showcase Couple Portrait ── */}
        <RevealOnScroll delay={0.15}>
          <div className="mx-auto mt-10 sm:mt-14 max-w-md sm:max-w-lg text-center">
            <div className="relative mx-auto overflow-hidden border border-gold/40 bg-muted shadow-[var(--shadow-card)] rounded-sm">
              <img
                src={couple.couplePhoto || '/client-images/couple.jpg'}
                alt={couple.couplePhotoAlt || `${couple.groom} & ${couple.bride}`}
                loading="lazy"
                width={723}
                height={800}
                className="w-full h-auto block object-cover"
              />
              <span className="pointer-events-none absolute inset-2.5 sm:inset-3 border border-paper/25" />
            </div>
          </div>
        </RevealOnScroll>

        {/* ── Groom & Bride Descriptions ── */}
        <div className="mt-10 sm:mt-14 grid gap-10 sm:grid-cols-2 sm:gap-12 text-center">
          {/* Groom Card */}
          <RevealOnScroll delay={0.25}>
            <div className="flex flex-col items-center h-full px-2 sm:px-4">
              <p className="font-title text-[0.68rem] uppercase tracking-[0.3em] text-gold-deep">
                {couple.groomRole || 'The Groom'}
              </p>
              <h3 className="mt-2.5 font-display text-3xl sm:text-4xl text-foreground">
                {couple.groom}
              </h3>
              {couple.groomParentsNote && (
                <p className="mt-1.5 text-xs sm:text-sm font-sans tracking-wide text-gold-deep font-medium">
                  {couple.groomParentsNote}
                </p>
              )}
              <div className="rule-gold mx-auto mt-4 w-16" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-serif italic max-w-sm">
                {couple.groomDescription ||
                  'A gentleman of steadfast character, quiet strength, and genuine kindness. Grounded in wisdom and guided by warmth, his caring nature and unwavering dedication make him the perfect companion and partner for life.'}
              </p>
            </div>
          </RevealOnScroll>

          {/* Bride Card */}
          <RevealOnScroll delay={0.35}>
            <div className="flex flex-col items-center h-full px-2 sm:px-4">
              <p className="font-title text-[0.68rem] uppercase tracking-[0.3em] text-gold-deep">
                {couple.brideRole || 'The Bride'}
              </p>
              <h3 className="mt-2.5 font-display text-3xl sm:text-4xl text-foreground">
                {couple.bride}
              </h3>
              {couple.brideParentsNote && (
                <p className="mt-1.5 text-xs sm:text-sm font-sans tracking-wide text-gold-deep font-medium">
                  {couple.brideParentsNote}
                </p>
              )}
              <div className="rule-gold mx-auto mt-4 w-16" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-serif italic max-w-sm">
                {couple.brideDescription ||
                  'A soul of graceful warmth and radiant joy, her laughter lights up every room she enters. With a generous heart and spirited smile, she steps into this new chapter with boundless love, poise, and devotion to family.'}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
