import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json(); // Take the user's message from the request body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Call OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );

    // Extract AI response safely
    const aiReply = response.data?.choices?.[0]?.message?.content;
    if (!aiReply) {
      return NextResponse.json({ error: "Invalid response from OpenAI" }, { status: 500 });
    }

    return NextResponse.json({ reply: aiReply });

  } catch (error) {
    console.error("Error fetching AI response:", error.response?.data || error.message);

    return NextResponse.json(
      { error: error.response?.data?.error?.message || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}
