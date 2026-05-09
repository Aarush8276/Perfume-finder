import { NextResponse } from "next/server";
import { moodMap, lifestyleMod, weatherMod, occasionMod, namePool, taglines } from "@/lib/data";

function shuffle(a) { return a.slice().sort(() => Math.random() - 0.5); }

export async function POST(req) {
  const { mood, lifestyle, weather, occasion } = await req.json();

  const base  = moodMap[mood]           || moodMap.confident;
  const lMod  = lifestyleMod[lifestyle] || lifestyleMod.corporate;
  const wMod  = weatherMod[weather]     || weatherMod.cold;
  const oMod  = occasionMod[occasion]   || occasionMod.casual;

  const names = shuffle(namePool).slice(0, 3);
  const tls   = shuffle(taglines);

  const results = names.map((n, i) => ({
    name:    n[0],
    house:   n[1],
    image:   n[2],
    vibe:    base.vibe,
    match:   78 + Math.floor(Math.random() * 20),
    tagline: tls[i],
    notes: {
      top:   shuffle([...base.notes.top,   wMod[i % 2], oMod[0]]).slice(0, 3),
      heart: shuffle([...base.notes.heart, lMod[i % 2], oMod[1]]).slice(0, 3),
      base:  shuffle(base.notes.base).slice(0, 2),
    },
  }));

  return NextResponse.json({ results });
}
