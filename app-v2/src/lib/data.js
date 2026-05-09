// ============================================================
// SCENTROPOLIS — Mock Data Store (replaces hardcoded HTML data)
// ============================================================

export const moods = [
  { id: "confident", label: "Confident", icon: "🔥" },
  { id: "calm",      label: "Calm",      icon: "🌿" },
  { id: "romantic",  label: "Romantic",  icon: "💖" },
  { id: "mysterious",label: "Mysterious",icon: "🌙" },
];

export const lifestyles = [
  { id: "student",      label: "Student",     icon: "🎓" },
  { id: "corporate",    label: "Corporate",   icon: "💼" },
  { id: "party lover",  label: "Party Lover", icon: "🎉" },
];

export const weathers = [
  { id: "hot",    label: "Hot",    icon: "☀️"  },
  { id: "cold",   label: "Cold",   icon: "❄️"  },
  { id: "humid",  label: "Humid",  icon: "💧"  },
  { id: "breezy", label: "Breezy", icon: "🌬️" },
];

export const occasions = [
  { id: "casual",      label: "Casual",      icon: "👕" },
  { id: "date night",  label: "Date Night",  icon: "🍷" },
  { id: "office",      label: "Office",      icon: "💻" },
  { id: "gym",         label: "Gym",         icon: "🏋️" },
];

export const moodMap = {
  confident:  { vibe: "woody",    notes: { top: ["Black Pepper","Bergamot"],   heart: ["Oud","Saffron"],          base: ["Sandalwood","Leather"]   }},
  calm:       { vibe: "fresh",    notes: { top: ["Sea Salt","Citron"],         heart: ["White Tea","Lotus"],       base: ["Cedar","White Musk"]     }},
  romantic:   { vibe: "floral",   notes: { top: ["Pink Pepper","Pear"],        heart: ["Rose","Jasmine"],          base: ["Amber","Vanilla"]        }},
  mysterious: { vibe: "oriental", notes: { top: ["Cardamom","Incense"],        heart: ["Iris","Violet"],           base: ["Patchouli","Oud"]        }},
};

export const lifestyleMod = {
  student:        ["Mandarin","Mint"],
  corporate:      ["Vetiver","Cashmeran"],
  "party lover":  ["Tonka Bean","Praline"],
};

export const weatherMod = {
  hot:    ["Neroli","Marine Accord"],
  cold:   ["Cinnamon","Tobacco"],
  humid:  ["Aquatic Notes","Bamboo"],
  breezy: ["Lavender","Green Tea"],
};

export const occasionMod = {
  casual:       ["Apple", "Musk"],
  "date night": ["Plum", "Cacao"],
  office:       ["Cedarwood", "Iris"],
  gym:          ["Grapefruit", "Eucalyptus"],
};

export const namePool = [
  // Original Perfumes
  ["Nocturne",   "Maison Noir",    "NOCTURNE.png"      ],
  ["Velvet Hour","Atelier Lune",   "VELVET HOUR.png"   ],
  ["Ember & Silk","Casa Rosso",    "ENBER AND SILK.png"],
  ["Solstice",   "Hèlix Parfums",  "SOLSTICE.png"      ],
  ["Liaison",    "Bleu Encens",    "LIAISON.png"       ],
  ["Aurora 07",  "Studio Verde",   "AURORA 07.png"     ],
  ["Mirage",     "Orris & Co.",    "MIRAGE.png"        ],
  ["Reverie",    "Sable Blanc",    "REVERIE.png"       ],
  ["Halcyon",    "North Atelier",  "HALCYON.png"       ],
  // New Perfumes
  ["Arctic Breeze",  "Polar Scents",   "ARCTIC BREEZE.jpeg"],
  ["Blossom Silk",   "Flora Haus",     "BLOSSOM SILK.jpeg"],
  ["Blue Haven",     "Oceanic",        "BLUE HAVEN.jpeg"],
  ["Celeste Oud",    "Oud Atelier",    "CELESTE OUD.jpeg"],
  ["Cherry Muse",    "Fruité",         "CHERRY MUSE.jpeg"],
  ["Citrus Wave",    "Lemon Lab",      "CITRUS WAVE.jpeg"],
  ["Desert Crown",   "Oasis Parfums",  "DESERT CROWN.jpeg"],
  ["Fusion One",     "Modernist",      "FUSION ONE.jpeg"],
  ["Golden Veil",    "Aura Luxe",      "GOLDEN VEIL.jpeg"],
  ["Inferno Muse",   "Fire & Spice",   "INFERNO MUSE.jpeg"],
  ["Midnight Dubai", "Arabian Nights", "MIDNIGHT DUBAI.jpeg"],
  ["Neon Rush",      "Cyber Scents",   "NEON RUSH.jpeg"],
  ["Opaline Mist",   "Crystal Co",     "OPALINE MIST.jpeg"],
  ["Phantom Oud",    "Mystic Wood",    "PHANTOM OUD.jpeg"],
  ["Rose Eclipse",   "Midnight Rose",  "ROSE ECLIPSE.jpeg"],
  ["Royal Sin",      "Empire",         "ROYAL SIN.jpeg"],
  ["Shadow Scent",   "Dark Velvet",    "SHADOW SCENT.jpeg"],
  ["Sultan Oud",     "Emirate Scents", "SULTAN OUD.jpeg"],
  ["Urban Drift",    "City Vibe",      "URBAN DRIFT.jpeg"],
  ["Vibe 24",        "Gen Z",          "VIBE 24.jpeg"],
  ["Vortex",         "Quantum",        "VORTEX.jpeg"],
  ["Zenith",         "Peak Parfums",   "ZENITH.jpeg"],
];

export const taglines = [
  "A whisper turned wearable.",
  "Quiet luxury, loudly remembered.",
  "Skin-close, soul-deep.",
  "The dusk between two thoughts.",
  "Your aura, distilled.",
  "Worn like a secret.",
  "Elevate your everyday.",
  "Unapologetically you.",
  "A symphony of scent.",
  "Memories captured in a bottle."
];

export const notesFamilies = [
  "Oud","Bergamot","Vanilla","Sandalwood","Jasmine","Amber","Vetiver","Rose",
  "Musk","Iris","Patchouli","Sea Salt","Cardamom","Leather","Tonka Bean","Neroli",
  "Grapefruit","Plum","Cacao","Eucalyptus","Apple","Cedarwood"
];
