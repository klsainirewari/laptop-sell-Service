import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, DiagnosisResponse } from "../types";

// Access API Key securely
const apiKey = process.env.API_KEY;

export const diagnoseDeviceProblem = async (
  deviceType: DeviceType,
  problemDescription: string
): Promise<DiagnosisResponse> => {
  
  // 1. Check if API Key is present
  if (!apiKey || apiKey.length === 0 || apiKey.includes("API_KEY")) {
    console.error("CRITICAL ERROR: API Key is missing or invalid.");
    throw new Error("System Configuration Error: API Key missing. Please check Vercel/GitHub Settings.");
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
    if (error.message && (error.message.includes("API Key") || error.message.includes("fetch"))) {
        throw error;
    }
    
    // Fallback for generic AI errors
    throw new Error("AI Service Unavailable. Please verify internet connection or API Quota.");
  }
};
