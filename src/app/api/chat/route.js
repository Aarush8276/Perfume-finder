import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { message, state, history } = await req.json();

    // Read the API key from environment variables
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API key not found in environment variables");
      return NextResponse.json({ reply: "API key is not configured in environment variables.", stateUpdate: {} });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Define the schema for structured JSON output
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        reply: {
          type: Type.STRING,
          description: "The response message to the user. If the user asks for a recommendation, suggestion, or to find a perfume, this MUST be exactly 'TRIGGER_RECOMMEND'. Otherwise, it should be a helpful, engaging response about perfumes, matching their vibe, weather, or lifestyle."
        },
        stateUpdate: {
          type: Type.OBJECT,
          description: "Any state updates based on the user's message. Only include keys if they are mentioned.",
          properties: {
            mood: { type: Type.STRING, description: "e.g., romantic, confident, calm, mysterious" },
            weather: { type: Type.STRING, description: "e.g., hot, cold, humid, breezy" },
            lifestyle: { type: Type.STRING, description: "e.g., student, corporate, party lover" },
            occasion: { type: Type.STRING, description: "e.g., casual, date night, office, gym" }
          }
        }
      },
      required: ["reply", "stateUpdate"]
    };

    // Build conversation history context
    const historyText = (history || []).map(h =>
      `${h.role === "user" ? "User" : "Aura AI"}: ${h.content}`
    ).join("\n");

    const prompt = `You are Aura AI, a helpful perfume assistant. 
Current state: ${JSON.stringify(state || {})}
${historyText ? `\nConversation so far:\n${historyText}\n` : ""}
User message: "${message}"

Analyze the user message and respond in the required JSON format. 
If they mention moods, weather, lifestyle, or an occasion (like office, dates, gym, casual), update the stateUpdate object accordingly. 
If they ask for a recommendation or suggestion, set the reply field to exactly 'TRIGGER_RECOMMEND'.
Keep responses concise, engaging, and friendly (include an emoji).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const result = JSON.parse(response.text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API Error:", error);
    
    // Check if the error is due to a leaked or invalid API key
    let errorMsg = "Oops, I'm having trouble thinking right now! Please make sure your API key is valid.";
    if (error.status === 403 || error.message?.includes("PERMISSION_DENIED") || error.message?.includes("leaked")) {
      errorMsg = "Your API key was reported as leaked or invalid. Please generate a new one from Google AI Studio and update the environment variable.";
    }

    return NextResponse.json({ 
      reply: errorMsg, 
      stateUpdate: {} 
    });
  }
}
