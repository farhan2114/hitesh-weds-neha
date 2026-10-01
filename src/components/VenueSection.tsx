import React from 'react';
import { MapPin } from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig, weddingData } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

export const VenueSection: React.FC = () => {
  const query = `${weddingConfig.venue.name} ${weddingConfig.venue.city}`;
  const mapsSearchUrl =
    weddingConfig.venue.mapsSearchUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  const mapsEmbedUrl =
    weddingConfig.venue.mapsEmbedUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const cityName = weddingConfig.venue.cityName || weddingConfig.venue.city;
  const locationUnderMap =
    weddingConfig.venue.locationUnderMap ||
    `${cityName} · ${weddingConfig.date.short || weddingData.dateShort}`;

  return (
    <section id="venue" className="relative overflow-hidden bg-[#A83B00] px-5 py-24 text-[#FFFDF5] sm:py-36">
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 select-none">
        <img
          src={assets.mandalaMaroon}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="animate-spin-soft h-full w-full object-contain opacity-15"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <RevealOnScroll>
          <p className="eyebrow text-[#F3E3C0]">The way to the wedding</p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl text-[#FFFDF5]">Join us in {cityName}</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#FFFDF5]/90">
            {weddingConfig.venue.description || `Follow the golden path to ${weddingData.venue}, where our families will be waiting to welcome you.`}
          </p>
          <div className="mt-8 border-l border-[#F3E3C0]/50 pl-5">
            <p className="font-title text-lg text-[#FFFDF5]">{weddingData.venue}</p>
            <p className="mt-1 text-sm text-[#F3E3C0]">{weddingData.city}</p>
          </div>
          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 border border-[#F3E3C0] px-6 py-3 text-xs uppercase tracking-[0.24em] text-[#F3E3C0] transition-colors hover:bg-[#F3E3C0]/15"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Open in maps
          </a>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden border border-[#F3E3C0]/40 bg-black/20">
            <iframe
              title={`Map to ${query}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allowFullScreen
            />
            <span className="pointer-events-none absolute inset-3 border border-[#F3E3C0]/30" />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-[#F3E3C0]">
            {locationUnderMap}
          </p>
        </RevealOnScroll>
      </div>

      <img
        src={assets.lotusDivider}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none mx-auto mt-20 w-full max-w-xl opacity-80"
      />
    </section>
  );
};
