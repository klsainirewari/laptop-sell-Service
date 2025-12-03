import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, DiagnosisResponse, ShoppingResponse, ExchangeResponse, AIMode } from "../types";
import { CATALOG_PRODUCTS } from "../constants";

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

const getAIClient = () => {
  if (!apiKey || apiKey.length < 20 || apiKey.includes("API_KEY")) {
    console.error("CRITICAL ERROR: API Key is missing or invalid.");
    throw new Error("System Configuration Error: API Key missing. Please check Vercel/GitHub Settings.");
  }
  if (!apiKey.startsWith("AIza")) {
      const maskedKey = apiKey.length > 5 ? `${apiKey.substring(0, 4)}...` : "Key-Too-Short";
      throw new Error(`Invalid Key Format. Your key starts with '${maskedKey}', but a valid Google API Key must start with 'AIza'.`);
  }
  return new GoogleGenAI({ apiKey: apiKey });
}

export const diagnoseDeviceProblem = async (
  deviceType: DeviceType,
  problemDescription: string,
  imageBase64?: string
): Promise<DiagnosisResponse> => {
  const ai = getAIClient();
  const model = "gemini-2.5-flash";

  let systemPrompt = `
    You are an expert senior hardware engineer at "Khusboo Electric" with 15 years of experience.
    A customer has a problem with their ${deviceType}.
    Description: "${problemDescription}"
  `;

  if (imageBase64) {
    systemPrompt += `\n\nNOTE: The user has also provided an image. Analyze visual symptoms (cracks, error codes, damage).`;
  }

  systemPrompt += `
    Analyze professionally. Return JSON:
    - analysis: Technical explanation (2 sentences).
    - potentialCauses: 2-3 likely culprits.
    - recommendation: Specific steps, concluding with "Visit Khusboo Electric for chip-level repair".
    - estimatedSeverity: 'Low', 'Medium', or 'High'.
  `;

  const contentsPayload: any = { parts: [] };
  
  if (imageBase64) {
    const cleanBase64 = imageBase64.split(',').pop() || "";
    contentsPayload.parts.push({ inlineData: { mimeType: "image/jpeg", data: cleanBase64 } });
  }
  contentsPayload.parts.push({ text: systemPrompt });

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
            potentialCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendation: { type: Type.STRING },
            estimatedSeverity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
          },
          required: ["analysis", "potentialCauses", "recommendation", "estimatedSeverity"]
        }
      }
    });

    const cleanText = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || "{}";
    return JSON.parse(cleanText) as DiagnosisResponse;
  } catch (error: any) {
    throw handleGeminiError(error);
  }
};

export const recommendLaptop = async (userNeeds: string): Promise<ShoppingResponse> => {
  const ai = getAIClient();
  const model = "gemini-2.5-flash";
  
  // Create a simplified string of inventory
  const inventoryStr = CATALOG_PRODUCTS.map(p => `${p.name} (${p.specs}, ${p.price})`).join("; ");

  const systemPrompt = `
    You are a friendly sales expert at "Khusboo Electronics".
    User Needs: "${userNeeds}"
    
    Current Inventory: ${inventoryStr}
    
    Task: Recommend the BEST matching laptop from our inventory. If none match perfectly, recommend the closest one.
    Return JSON:
    - recommendedModel: Exact name from inventory.
    - reason: Why this specific laptop is good for their needs (student, coding, accounting, etc).
    - technicalSpecsNeeded: List 3 specs they should look for (e.g. "SSD is must for speed").
    - estimatedBudget: Comment on the price value (e.g., "Great deal under 15k").
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{ text: systemPrompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedModel: { type: Type.STRING },
            reason: { type: Type.STRING },
            technicalSpecsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
            estimatedBudget: { type: Type.STRING }
          },
          required: ["recommendedModel", "reason", "technicalSpecsNeeded", "estimatedBudget"]
        }
      }
    });

    const cleanText = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || "{}";
    return JSON.parse(cleanText) as ShoppingResponse;
  } catch (error: any) {
    throw handleGeminiError(error);
  }
};

export const estimateExchangeValue = async (laptopDetails: string): Promise<ExchangeResponse> => {
  const ai = getAIClient();
  const model = "gemini-2.5-flash";

  const systemPrompt = `
    You are a used laptop valuation expert in the Indian Market (Rewari, Haryana region).
    User wants to sell/exchange their old laptop.
    Laptop Details: "${laptopDetails}"

    Task: Provide a REALISTIC estimated cash/exchange value range in INR (Indian Rupees).
    Be conservative but fair. Old electronics depreciate fast. 
    
    Return JSON:
    - estimatedValueRange: e.g., "₹8,000 - ₹10,000" (Make it a range).
    - marketAnalysis: Brief comment on this model's current demand.
    - deductionFactors: List 2-3 things that might lower price (e.g. "Battery health", "Scratches").
    - nextSteps: "Bring to Khusboo Electric for final physical inspection."
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [{ text: systemPrompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedValueRange: { type: Type.STRING },
            marketAnalysis: { type: Type.STRING },
            deductionFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
            nextSteps: { type: Type.STRING }
          },
          required: ["estimatedValueRange", "marketAnalysis", "deductionFactors", "nextSteps"]
        }
      }
    });

    const cleanText = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || "{}";
    return JSON.parse(cleanText) as ExchangeResponse;
  } catch (error: any) {
    throw handleGeminiError(error);
  }
};

function handleGeminiError(error: any): Error {
  console.error("Gemini Error:", error);
  if (error.message) {
      if (error.message.includes("Invalid Key Format")) return error;
      if (error.message.includes("API key not valid") || error.message.includes("400")) {
          return new Error(`Google Rejected Key. Check settings.`);
      }
      if (error.message.includes("fetch") || error.message.includes("network")) {
          return new Error("Network Error: Unable to connect to Google AI.");
      }
  }
  return new Error("AI Service Unavailable.");
}