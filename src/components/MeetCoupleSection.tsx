import React from 'react';
import { weddingConfig } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const MeetCoupleSection: React.FC = () => {
  const { couple } = weddingConfig;

  return (
    <section id="couple" className="relative overflow-hidden px-5 pt-4 pb-16 sm:pt-6 sm:pb-24">
      <SpinningMandala className="-right-24 bottom-10 w-56 sm:w-72" />
      <Ornament variant="large" className="-left-8 top-10 w-32 sm:w-44" />
      <Ornament variant="small" className="-left-6 bottom-16 w-20 rotate-45 sm:w-28" />

      <div className="relative mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">Together with their families</p>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-foreground">Meet the couple</h2>
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

        {/* ── Groom & Bride Names ── */}
        <div className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2 sm:gap-12 text-center">
          {/* Groom Card */}
          <RevealOnScroll delay={0.25}>
            <div className="flex flex-col items-center h-full px-2 sm:px-4">
              <p className="font-title text-[0.68rem] uppercase tracking-[0.3em] text-gold-deep font-semibold">
                {couple.groomRole || 'The Groom'}
              </p>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-foreground">
                {couple.groom}
              </h3>
              {couple.groomParentsNote && (
                <p className="mt-1 text-xs sm:text-sm font-sans tracking-wide text-gold-deep font-medium">
                  {couple.groomParentsNote}
                </p>
              )}
            </div>
          </RevealOnScroll>

          {/* Bride Card */}
          <RevealOnScroll delay={0.35}>
            <div className="flex flex-col items-center h-full px-2 sm:px-4">
              <p className="font-title text-[0.68rem] uppercase tracking-[0.3em] text-gold-deep font-semibold">
                {couple.brideRole || 'The Bride'}
              </p>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-foreground">
                {couple.bride}
              </h3>
              {couple.brideParentsNote && (
                <p className="mt-1 text-xs sm:text-sm font-sans tracking-wide text-gold-deep font-medium">
                  {couple.brideParentsNote}
                </p>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
