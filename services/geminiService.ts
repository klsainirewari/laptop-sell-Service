import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, DiagnosisResponse } from "../types";

// Access API Key securely
let rawApiKey = process.env.API_KEY || "";

// SMART KEY CLEANING
let apiKey = rawApiKey.replace(/["'\s\n\r]/g, '');

if (apiKey.includes('=')) {
  apiKey = apiKey.split('=').pop() || apiKey;
} else if (apiKey.includes(':')) {
  apiKey = apiKey.split(':').pop() || apiKey;
}

apiKey = apiKey.trim();

export const diagnoseDeviceProblem = async (
  deviceType: DeviceType,
  problemDescription: string,
  imageBase64?: string // New optional parameter for image
): Promise<DiagnosisResponse> => {
  
  const maskedKey = apiKey.length > 5 
    ? `${apiKey.substring(0, 4)}...`
    : "Key-Too-Short";

  console.log(`AI Service: Initializing. Image provided: ${!!imageBase64}`);

  if (!apiKey || apiKey.length < 20 || apiKey.includes("API_KEY")) {
    console.error("CRITICAL ERROR: API Key is missing or invalid.");
    throw new Error("System Configuration Error: API Key missing. Please check Vercel/GitHub Settings.");
  }

  if (!apiKey.startsWith("AIza")) {
      throw new Error(`Invalid Key Format. Your key starts with '${maskedKey}', but a valid Google API Key must start with 'AIza'.`);
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  const model = "gemini-2.5-flash"; // Flash supports images well
  
  // Construct the prompt
  let systemPrompt = `
    You are an expert senior hardware engineer at "Khusboo Electric" with 15 years of experience.
    A customer has a problem with their ${deviceType}.
    
    Description: "${problemDescription}"
  `;

  if (imageBase64) {
    systemPrompt += `\n\nNOTE: The user has also provided an image of the device/error. Analyze the visual symptoms in the image (like cracked screen lines, blue screen error codes, physical damage, burnt components) combined with their description.`;
  }

  systemPrompt += `
    Analyze this issue professionally.
    Provide output in valid JSON:
    - analysis: Technical explanation (2-3 sentences).
    - potentialCauses: List of 2-3 likely culprits.
    - recommendation: Specific steps to try, concluding with advising them to visit Khusboo Electric.
    - estimatedSeverity: 'Low', 'Medium', or 'High'.
  `;

  // Prepare contents (Multimodal if image exists)
  let contentsPayload: any = {
    parts: []
  };

  // Add Image Part if available
  if (imageBase64) {
    // Remove header if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = imageBase64.split(',').pop() || "";
    contentsPayload.parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: cleanBase64
      }
    });
  }

  // Add Text Part
  contentsPayload.parts.push({
    text: systemPrompt
  });

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: contentsPayload,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            potentialCauses: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendation: { type: Type.STRING },
            estimatedSeverity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
          },
          required: ["analysis", "potentialCauses", "recommendation", "estimatedSeverity"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as DiagnosisResponse;

  } catch (error: any) {
    console.error("Gemini Diagnosis Error:", error);
    
    if (error.message) {
        if (error.message.includes("Invalid Key Format")) return Promise.reject(error);
        if (error.message.includes("API key not valid") || error.message.includes("400")) {
            return Promise.reject(new Error(`Google Rejected Key (Used: ${maskedKey}). Check settings.`));
        }
        if (error.message.includes("fetch") || error.message.includes("network")) {
            return Promise.reject(new Error("Network Error: Unable to connect to Google AI."));
        }
        return Promise.reject(error);
    }
    throw new Error("AI Service Unavailable.");
  }
};
