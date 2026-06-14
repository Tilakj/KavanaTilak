// Kavana & Tilak Wedding Website Configuration

export interface WeddingEvent {
  id: string;
  name: string;
  date: string; // E.g., "November 26, 2026"
  time: string; // E.g., "10:30 AM onwards"
  venue: string;
  mapsLink: string;
  dressCode?: string;
  description: string;
}

export const weddingConfig = {
  // General Info
  couple: {
    first: "Kavana",
    second: "Tilak",
    groom: "Tilak",
    bride: "Kavana",
    groomParents: "Sri. & Smt. Groom's Parents Name", // Customizable
    brideParents: "Sri. & Smt. Bride's Parents Name",
    hashtag: "#KavanaTilakWedding",
  },

  // Main Wedding Date for Countdown (Muhurtha: Nov 29, 2026)
  weddingDate: new Date("2026-11-29T10:30:00+05:30"),

  // Venue link provided by user
  venueMapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",

  // Background Music
  musicSrc: "/wedding/music.mp3", 
  defaultMusicSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Temporary fallback

  // Video Background Loop
  heroVideoSrc: "https://res.cloudinary.com/db03zgsfl/video/upload/q_auto,f_auto/v1781435895/gemini_generated_video_D88547FD_fhgnl9.mp4",

  // Photo Gallery References (Engagement Gallery Photos)
  galleryPhotos: [
    { src: "/wedding/Edited - 38.JPEG", alt: "Kavana and Tilak Engagement portrait" },
    { src: "/wedding/Edited - 42.JPEG", alt: "Kavana and Tilak laughing candidly" },
    { src: "/wedding/Edited - 98.JPEG", alt: "Kavana and Tilak traditional pose" },
    { src: "/wedding/Edited - 100.JPEG", alt: "Kavana and Tilak during engagement ceremony" },
    { src: "/wedding/Edited - 101.JPEG", alt: "Kavana and Tilak sweet moment" },
  ],

  // Detailed Itinerary Timeline (Only Reception & Muhurtha)
  events: [
    {
      id: "reception",
      name: "Reception",
      date: "November 28, 2026",
      time: "7:00 PM onwards",
      venue: "S S Samudhaya bhavana",
      mapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",
      description: "Join us for an evening of celebrations, greetings, dinner, and music as we welcome our guests before the big day."
    },
    {
      id: "muhurtha",
      name: "Muhurtha",
      date: "November 29, 2026",
      time: "10:30 AM onwards",
      venue: "S S Samudhaya bhavana",
      mapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",
      description: "Witness the sacred union of Kavana and Tilak as they perform the traditional pheras and take their wedding vows."
    }
  ] as WeddingEvent[],

  // Love Story Highlights
  loveStory: [
    { title: "First Meeting", date: "April 2024", desc: "A brief conversation that sparked a lifelong connection." },
    { title: "The Proposal", date: "January 2025", desc: "Under a starry sky, a simple 'Yes' sealed their future." },
    { title: "The Engagement", date: "May 10, 2026", desc: "Exchanging rings and promises in front of beloved family." },
  ]
};
