/**
 * =======================================================================
 * 💍 WEDDING INVITATION — MASTER CLIENT CONFIGURATION FILE
 * =======================================================================
 */

export const weddingConfig = {
  // -------------------------------------------------------------
  // 1. COUPLE & PARENTS INFORMATION
  // -------------------------------------------------------------
  couple: {
    groom: 'Hitesh',
    bride: 'Neha',
    hashtag: '#HiteshWedsNeha',

    groomRole: 'The Groom',
    groomParentsNote: 'S/o: Adusumalli SrinivasaRao & Padmavathi',
    groomDescription:
      'A gentleman of steadfast character, quiet strength, and genuine kindness. Grounded in wisdom and guided by warmth, his caring nature and unwavering dedication make him the perfect companion and partner for life.',
    groomPhoto: '/client-images/groom.jpg',
    groomPhotoAlt: 'Hitesh, the groom',

    brideRole: 'The Bride',
    brideParentsNote: 'D/o: Ramachander Srinivas & Madhuri Diwan',
    brideDescription:
      'A soul of graceful warmth and radiant joy, her laughter lights up every room she enters. With a generous heart and spirited smile, she steps into this new chapter with boundless love, poise, and devotion to family.',
    bridePhoto: '/client-images/bride.jpg',
    bridePhotoAlt: 'Neha, the bride',

    couplePhoto: '/client-images/couple.jpg',
    couplePhotoAlt: 'Hitesh & Neha',
  },

  // -------------------------------------------------------------
  // 2. DATES & CEREMONY TIME
  // -------------------------------------------------------------
  date: {
    label: 'Friday, 18 December 2026',
    short: '18 . 12 . 2026',
    muhurtham: 'Sumuhurtham at 7:05 PM',
  },

  // -------------------------------------------------------------
  // 3. INVITATION MESSAGE & FAMILY HOSTS
  // -------------------------------------------------------------
  invitation: {
    sanskritMantra: 'ఓం శ్రీ గణేశాయ నమః',
    familyTitle: 'The Adusumalli Family',
    invitationLine: 'నూతన జీవితానికి నాంది పలుకుతూ...',
    familyLine: 'మీ ఆశీస్సులే మా నూతన జీవితానికి తొలి అడుగు',
    doorsButtonText: 'Open Invitation',
    doorsSubText: 'Music will play softly',
    introVideo: '/client-images/intro.mp4',
    introPoster: '/client-images/intro-poster.jpg',
  },

  // -------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS LOCATION
  // -------------------------------------------------------------
  venue: {
    name: 'Indian Cultural Centre Of South Jersey',
    city: 'Marlton, New Jersey',
    cityName: 'Marlton',
    address: '820 NJ-73, Marlton, New Jersey 08053',
    locationUnderMap: 'Marlton · New Jersey · 18 . 12 . 2026',
    description:
      'Follow the golden path to the Indian Cultural Centre Of South Jersey, where our families will gather to celebrate love, togetherness, and a beautiful new beginning.',
    mapsSearchUrl:
      'https://www.google.com/maps/search/?api=1&query=Indian+Cultural+Center+of+South+Jersey,+820+NJ-73,+Marlton,+NJ+08053',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3062.4789917748626!2d-74.92050792401626!3d39.8635074715339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c1330a7015403f%3A0x98b7d3f2d86de76f!2sIndian%20Cultural%20Center%20of%20South%20Jersey!5e0!3m2!1sen!2sin!4v1790787135035!5m2!1sen!2sin',
  },

  // -------------------------------------------------------------
  // 5. PARALLAX QUOTE BANNER
  // -------------------------------------------------------------
  banner: {
    image: '/client-images/mandap-beach.jpg',
    alt: 'Beachside Wedding Mandap',
    quote: 'Two families, one thread, and a sacred celebration we will cherish for a lifetime.',
  },

  // -------------------------------------------------------------
  // 6. ORDER OF CELEBRATIONS / EVENTS
  // -------------------------------------------------------------
  events: [
    {
      id: 'haldi',
      name: 'Haldi',
      tagline: 'A splash of sun, laughter & sacred turmeric',
      day: 'Thursday, 17 Dec',
      time: '11:00 AM onwards',
      place: 'Family Residence, Cherry Hill',
      address: '1018 Edgemoor Road, Cherry Hill Township, NJ 08034',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=1018+Edgemoor+Road,+Cherry+Hill+Township,+NJ+08034',
      image: '/client-images/event-haldi.jpg',
      note: 'Haldi celebrations with family and loved ones',
      funLines:
        'Get ready to get drenched in bright turmeric paste, marigold petals, laughter, and endless blessing rituals! Wear something festive! 💛',
      dressCode: 'Shades of Sun: Yellow, Mustard, Ochre & Festive Florals 🌼',
    },
    {
      id: 'wedding',
      name: 'Marriage',
      tagline: 'Wedding Procession & The Sacred Sumuhurtham',
      day: 'Friday, 18 Dec',
      time: 'Wedding Procession: 5:30 PM onwards · Sumuhurtham: 07:05 PM',
      place: 'Indian Cultural Centre Of South Jersey',
      address: '820 NJ-73, Marlton, New Jersey 08053',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Indian+Cultural+Center+of+South+Jersey,+820+NJ-73,+Marlton,+NJ+08053',
      image: '/client-images/event-wedding.jpg',
      note: 'Wedding procession followed by the marriage ceremony',
      funLines:
        'Witness Hitesh & Neha take their sacred vows of eternal companionship and love under divine blessings. 💍🪷',
      dressCode: 'Timeless Heritage: Traditional Silk Sarees, Dhotis, Kurta Sets & Royal Pastels 🪷',
    },
    {
      id: 'sangeet',
      name: 'Sangeet & Cocktail',
      tagline: 'An evening of music, dance, cocktails & celebrations',
      day: 'Saturday, 19 Dec',
      time: '6:00 PM onwards',
      place: 'Indian Cultural Centre Of South Jersey',
      address: '820 NJ-73, Marlton, New Jersey 08053',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Indian+Cultural+Center+of+South+Jersey,+820+NJ-73,+Marlton,+NJ+08053',
      image: '/client-images/event-sangeet.jpg',
      note: 'An evening of music, dance, cocktails and celebrations',
      funLines:
        'Dust off your dancing shoes! From high-voltage Bollywood beats to dhol dhamaka, tonight we celebrate and dance until the stars fade. 🎶✨',
      dressCode: 'Glam & Glitter: Royal Jewel Tones, Sequins, Indo-Western & Shimmer ✨',
    },
    {
      id: 'vratham',
      name: 'Satyanarayana Vratham',
      tagline: 'Sacred prayers, divine blessings & auspicious feast',
      day: 'Sunday, 20 Dec',
      time: '11:00 AM onwards',
      place: 'Family Residence, Piscataway',
      address: '348 Lunar Road, Piscataway, New Jersey 08854',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=348+Lunar+Road,+Piscataway,+NJ+08854',
      image: '/client-images/event-reception.jpg',
      note: 'Satyanarayana Vratham and family celebrations',
      funLines:
        'Join the family in invoking the divine blessings of Lord Satyanarayana Swamy for a joyous, blessed married life followed by mahaprasadam lunch. 🙏✨',
      dressCode: 'Traditional Elegance: Kurtas, Silk Sarees & Ethnic Attire 🪔',
    },
  ],

  // -------------------------------------------------------------
  // 7. BACKGROUND MUSIC
  // -------------------------------------------------------------
  music: {
    audioUrl: '/client-images/music.mp3',
  },

  // -------------------------------------------------------------
  // 8. RSVP & DATABASE (SUPABASE & GOOGLE SHEETS)
  // -------------------------------------------------------------
  rsvp: {
    enabled: true,
    supabaseUrl: 'https://lyukxpzpcjedvrkwrcur.supabase.co',
    supabaseAnonKey: 'sb_publishable_7USKYo1sBAT7p3_kqWdrqg_RCxNm3yd',
    supabaseTable: 'rsvps',
    googleSheetWebhookUrl:
      'https://script.google.com/macros/s/AKfycbwEEeApUbQYYgPQyy_Hc6eq1cFgX8RR559gHa8K295TSVgVFykPHBHTLrrwvBbDVhd3/exec',
  },
};

// Backwards-compatible export for existing components
export const weddingData = {
  ...weddingConfig.couple,
  ...weddingConfig.date,
  dateLabel: weddingConfig.date.label,
  dateShort: weddingConfig.date.short,
  muhurtham: weddingConfig.date.muhurtham,
  venue: weddingConfig.venue.name,
  city: weddingConfig.venue.city,
  cityName: weddingConfig.venue.cityName,
  invitationLine: weddingConfig.invitation.invitationLine,
  familyLine: weddingConfig.invitation.familyLine,
  introVideo: weddingConfig.invitation.introVideo,
  introPoster: weddingConfig.invitation.introPoster,
  events: weddingConfig.events,
  banner: weddingConfig.banner,
};
