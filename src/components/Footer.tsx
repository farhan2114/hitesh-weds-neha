import React from 'react';
import { weddingData } from '../data/weddingData';
import { weddingConfig } from '../wedding.config';

export const Footer: React.FC = () => {
  const query = `${weddingData.venue} ${weddingData.city}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  return (
    <footer className="border-t border-[#FAC12C]/40 bg-[#801B05] px-5 py-16 text-center text-[#FFFDF5]">
      <p className="flex flex-wrap items-center justify-center gap-x-2.5 font-display text-2xl min-[360px]:text-3xl sm:text-4xl text-[#FFFDF5] font-semibold break-words">
        <span>{weddingData.groom}</span>
        <span className="font-title text-base sm:text-2xl text-[#FAC12C]">&amp;</span>
        <span>{weddingData.bride}</span>
      </p>

      {/* Parents & Family Invitation */}
      <div className="mx-auto mt-6 max-w-md text-center border-y border-[#F3E3C0]/20 py-5 my-6 space-y-1.5">
        <p className="font-serif italic text-xs sm:text-sm text-[#F3E3C0] uppercase tracking-widest">
          Warmly Invited With Love &amp; Blessings By
        </p>
        <p className="font-display text-xl sm:text-2xl text-[#FFFDF5] font-semibold">
          Adusumalli SrinivasaRao &amp; Padmavathi
        </p>
        <p className="font-title text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F3E3C0]">
          The Adusumalli Family
        </p>
      </div>

      <p className="mt-4 text-sm text-[#F3E3C0]">
        {weddingData.dateLabel} · {weddingData.venue}, {weddingData.city}
      </p>
      <a
        className="mt-8 inline-block border border-[#F3E3C0]/70 px-7 py-3 text-[0.7rem] uppercase tracking-[0.3em] text-[#F3E3C0] transition-colors hover:bg-[#F3E3C0]/15"
        href={weddingConfig.venue.mapsSearchUrl || mapsSearchUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open venue in maps
      </a>
    </footer>
  );
};
