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
    groomParentsNote: 'Son of Adusumalli SrinivasaRao & Padmavathi',
    groomDescription:
      'A gentleman of steadfast character, quiet strength, and genuine kindness. Grounded in wisdom and guided by warmth, his caring nature and unwavering dedication make him the perfect companion and partner for life.',
    groomPhoto: '/client-images/groom.jpg',
    groomPhotoAlt: 'Hitesh, the groom',

    brideRole: 'The Bride',
    brideParentsNote: 'Daughter of Ramachander Srinivas & Madhuri Diwan',
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
    sanskritMantra: 'Om Sri Ganeshaya Namaha',
    familyTitle: 'The Adusumalli Family',
    invitationLine: `The Adusumalli Family
Cordially Invites You to Celebrate
the Wedding of
Hitesh & Neha`,
    familyLine: `The Adusumalli Family
Cordially Invites You to Celebrate
the Wedding of
Hitesh & Neha`,
    doorsButtonText: 'Tap to open the doors',
    doorsSubText: 'Music will play softly',
  },

  // -------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS LOCATION
  // -------------------------------------------------------------
  venue: {
    name: 'Indian Cultural Center of South Jersey',
    city: 'Marlton, New Jersey',
    cityName: 'Marlton',
    locationUnderMap: 'Marlton · New Jersey · 18 . 12 . 2026',
    description:
      'Follow the golden path to the Indian Cultural Center of South Jersey, where our families will gather to celebrate love, togetherness, and a beautiful new beginning.',
    mapsSearchUrl: 'https://maps.app.goo.gl/1ijyBLo5g4rztGseA',
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
      place: 'Family Home, Cherry Hill',
      address: 'Cherry Hill, New Jersey',
      mapsUrl: 'https://maps.app.goo.gl/1ijyBLo5g4rztGseA',
      image: '/client-images/event-haldi.jpg',
      note: 'Haldi celebrations with family and loved ones',
      funLines:
        'Get ready to get drenched in bright turmeric paste, marigold petals, laughter, and endless blessing rituals! Wear something festive! 💛',
      dressCode: 'Shades of Sun: Yellow, Mustard, Ochre & Festive Florals 🌼',
    },
    {
      id: 'wedding',
      name: 'Marriage',
      tagline: 'The sacred Sumuhurtham & holy wedding vows',
      day: 'Friday, 18 Dec',
      time: '5:30 PM onwards · Sumuhurtham 7:05 PM',
      place: 'Indian Cultural Center of South Jersey',
      address: '130 Old Marlton Pike, Marlton, NJ 08053',
      mapsUrl: 'https://maps.app.goo.gl/1ijyBLo5g4rztGseA',
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
      place: 'Indian Cultural Center of South Jersey',
      address: '130 Old Marlton Pike, Marlton, NJ 08053',
      mapsUrl: 'https://maps.app.goo.gl/1ijyBLo5g4rztGseA',
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
      place: 'Piscataway, New Jersey',
      address: 'Piscataway, New Jersey',
      mapsUrl: 'https://maps.app.goo.gl/1ijyBLo5g4rztGseA',
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
      'https://script.google.com/macros/s/AKfycbz9ar1L74KCKJgym2fztj8CGbptrG807JaMgYu3wMTzIhLVxFzLUUy3JKDJBkZkakP7/exec',
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
  events: weddingConfig.events,
  banner: weddingConfig.banner,
};
