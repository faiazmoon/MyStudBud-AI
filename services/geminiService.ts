import { GoogleGenAI, ChatSession, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

let chatSession: ChatSession | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY not found in environment variables");
      throw new Error("API Key missing");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const initChatSession = async (systemInstruction: string) => {
  const ai = getGenAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
      temperature: 0.7,
    },
    history: []
  });
  chatSession = chat;
  return chat;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized");
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({
      message
    });
    return result.text || "I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};
