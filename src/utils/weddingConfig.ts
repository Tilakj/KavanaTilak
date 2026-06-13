// Kavana & Tilak Wedding Website Configuration

export interface WeddingEvent {
  id: string;
  name: string;
  date: string; // E.g., "November 26, 2026"
  time: string; // E.g., "10:30 AM onwards"
  venue: string;
  mapsLink: string;
  dressCode: string;
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

  // Main Wedding Date for Countdown and Scratch Card
  weddingDate: new Date("2026-11-26T10:30:00+05:30"), // Target date for countdown (Customizable)

  // Venue link provided by user
  venueMapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",

  // Google Drive link for Engagement Photos
  engagementDriveLink: "https://drive.google.com/drive/folders/1A2B3C4D5E6F7G8H9I0J", // Placeholder: Change this to your actual Drive Link

  // Background Music (Falls back to a high-quality shehnai/flute MP3 or user-provided file)
  musicSrc: "/wedding/music.mp3", 
  defaultMusicSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Temporary fallback

  // Video Background Loop
  heroVideoSrc: "/wedding/gemini_generated_video_D88547FD.MP4",

  // Photo Gallery References (Optimized for Next.js Image component)
  galleryPhotos: [
    { src: "/wedding/Edited - 38.JPEG", alt: "Kavana and Tilak Pre-wedding shoot portrait" },
    { src: "/wedding/Edited - 42.JPEG", alt: "Kavana and Tilak laughing candidly" },
    { src: "/wedding/Edited - 98.JPEG", alt: "Kavana and Tilak traditional pose" },
    { src: "/wedding/Edited - 100.JPEG", alt: "Kavana and Tilak dynamic shot" },
    { src: "/wedding/Edited - 101.JPEG", alt: "Kavana and Tilak sweet moment" },
  ],

  // Detailed Itinerary Timeline
  events: [
    {
      id: "haldi",
      name: "Haldi Ceremony",
      date: "November 25, 2026",
      time: "9:00 AM - 11:30 AM",
      venue: "Groom's / Bride's Residence / Lawn Area",
      mapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",
      dressCode: "Traditional Yellow / Ochre ethnic wear",
      description: "A joyful morning filled with laughter, music, and splashing of turmeric paste to bless the couple with glowing happiness."
    },
    {
      id: "sangeet",
      name: "Sangeet & Celebration Night",
      date: "November 25, 2026",
      time: "6:30 PM onwards",
      venue: "Banquet Hall, Celebration Venue",
      mapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",
      dressCode: "Glamorous Indo-Western / Designer Lehengas & Bandhgalas",
      description: "Get ready to hit the dance floor! An evening of musical performances, family dances, and delicious dining."
    },
    {
      id: "muhurtham",
      name: "The Wedding (Muhurtham)",
      date: "November 26, 2026",
      time: "10:30 AM - 12:30 PM",
      venue: "Main Mandap Hall, Wedding Venue",
      mapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",
      dressCode: "Traditional Kanchipuram Sarees & Silk Dhotis/Sherwanis",
      description: "Witness the sacred union of Kavana and Tilak as they perform the traditional pheras and take their wedding vows."
    },
    {
      id: "reception",
      name: "Grand Reception",
      date: "November 26, 2026",
      time: "7:00 PM onwards",
      venue: "Grand Ballroom / Royal Lawn",
      mapsLink: "https://share.google/mMvuqc9fTZH9hwnnH",
      dressCode: "Formal Suits, Tuxedos, and Elegant Evening Gowns",
      description: "Celebrate the newlywed couple as they embark on their life journey. Join us for photos, greetings, and dinner."
    }
  ] as WeddingEvent[],

  // Love Story Highlights
  loveStory: [
    { title: "First Meeting", date: "April 2024", desc: "A brief conversation that sparked a lifelong connection." },
    { title: "The Proposal", date: "January 2025", desc: "Under a starry sky, a simple 'Yes' sealed their future." },
    { title: "The Engagement", date: "May 10, 2025", desc: "Exchanging rings and promises in front of beloved family. (Click below to view the photos!)" },
  ]
};
