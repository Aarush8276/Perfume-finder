import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const { name, house, vibe, notes } = await req.json();

    const keyPath = path.join(process.cwd(), "key.txt");
    let apiKey = "";
    try {
      apiKey = (await fs.readFile(keyPath, "utf-8")).trim();
    } catch {
      return NextResponse.json({ description: "A captivating scent that speaks without words." });
    }

    if (!apiKey) {
      return NextResponse.json({ description: "A captivating scent that speaks without words." });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a luxury perfume copywriter. Write exactly 3 sentences describing the perfume "${name}" by ${house}. 
It has a ${vibe} vibe. 
Top notes: ${notes.top.join(", ")}. Heart notes: ${notes.heart.join(", ")}. Base notes: ${notes.base.join(", ")}.
Make it poetic, sensory, and luxurious — like text from a high-end perfume boutique. No bullet points, just flowing prose. Return only the 3-sentence description, nothing else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ description: response.text.trim() });
  } catch (error) {
    console.error("Describe API Error:", error);
    return NextResponse.json({ description: "A captivating scent that leaves a lasting impression, as unique as the person who wears it." });
  }
}
