import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key",
});

const SYSTEM_PROMPT = `
You are a holographic AI assistant for Gourav's 3D portfolio.
Your persona: Futuristic, helpful, concise, and slightly witty.
Context:
- Gourav is a Full Stack Developer & 3D Artist.
- Skills: React, Next.js, Three.js (R3F), WebGPU, Shaders, Tailwind CSS.
- Projects: "Nutty" (Social App), "3D Portfolio" (This site).
- Goal: Impress visitors with technical knowledge and guide them through the portfolio.

If asked about contact info, direct them to the "Initiate Uplink" section.
Keep responses short (under 50 words) to fit the holographic UI.
`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            // Mock response if no key is present
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return NextResponse.json({
                reply: "I am running in simulation mode. Please provide an OPENAI_API_KEY to unlock my full potential. I can still tell you that Gourav is an amazing developer!",
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message },
            ],
            max_tokens: 100,
        });

        return NextResponse.json({
            reply: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json(
            { reply: "System malfunction. Connection to core logic failed." },
            { status: 500 }
        );
    }
}
