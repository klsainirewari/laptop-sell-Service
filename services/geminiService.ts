import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, DiagnosisResponse } from "../types";

// Access API Key securely
let rawApiKey = process.env.API_KEY || "";

// SMART KEY CLEANING
// 1. Remove quotes and whitespace
let apiKey = rawApiKey.replace(/["'\s\n\r]/g, '');

// 2. Handle cases where user pastes "VITE_API_KEY=AIza..." or "key: AIza..."
if (apiKey.includes('=')) {
  apiKey = apiKey.split('=').pop() || apiKey;
} else if (apiKey.includes(':')) {
  apiKey = apiKey.split(':').pop() || apiKey;
}

// 3. Final trim just in case split left spaces (though step 1 handled most)
apiKey = apiKey.trim();

export const diagnoseDeviceProblem = async (
  deviceType: DeviceType,
  problemDescription: string
): Promise<DiagnosisResponse> => {
  
  // Create a masked version for debugging (shows first 4 and last 4 chars)
  const maskedKey = apiKey.length > 8 
    ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`
    : "Key-Too-Short";

  console.log(`AI Service: Initializing using key: ${maskedKey}`);

  // 1. Check if API Key is present and looks valid
  if (!apiKey || apiKey.length < 20 || apiKey.includes("API_KEY")) {
    console.error("CRITICAL ERROR: API Key is missing or invalid.");
    throw new Error("System Configuration Error: API Key missing or invalid. Please check Vercel/GitHub Settings.");
  }

  // 2. Initialize Client
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are an expert senior hardware engineer at "Khusboo Electric" with 15 years of experience in repairing laptops and electronics.
    
    A customer has described a problem with their ${deviceType}.
    Description: "${problemDescription}"

    Analyze this issue professionally. Do not act like a chatbot, act like a technician writing a preliminary job sheet diagnosis.
    
    Provide the output in valid JSON format adhering to the schema provided.
    - analysis: A brief technical explanation of what might be happening (2-3 sentences).
    - potentialCauses: A list of 2-3 likely hardware or software culprits.
    - recommendation: Specific steps they can try at home, BUT always conclude by advising them to bring it to Khusboo Electric (Sunder Lal Market) for a safe hardware inspection if simple steps fail.
    - estimatedSeverity: rate as Low, Medium, or High based on the description.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
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
    
    // 3. Clean and Parse JSON (Fix for markdown wrapping issues)
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanText) as DiagnosisResponse;

  } catch (error: any) {
    console.error("Gemini Diagnosis Error:", error);
    
    // Pass the actual error message if it's about the key or network
    if (error.message) {
        if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID") || error.message.includes("400")) {
            // Show the masked key in the error so the user knows what was sent
            return Promise.reject(new Error(`Invalid API Key (Used: ${maskedKey}). Please check GitHub/Vercel settings.`));
        }
        if (error.message.includes("fetch") || error.message.includes("network") || error.message.includes("Failed to fetch")) {
            return Promise.reject(new Error("Network Error: Unable to connect to Google AI. Check internet."));
        }
        // Pass through any other specific messages
        return Promise.reject(error);
    }
    
    // Fallback for generic AI errors
    throw new Error("AI Service Unavailable. Please try again later.");
  }
};
