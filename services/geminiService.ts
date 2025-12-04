import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, DiagnosisResponse, ShoppingResponse, ExchangeResponse, AIMode } from "../types";
import { CATALOG_PRODUCTS } from "../constants";

// Initialize the Gemini client using the API key strictly from process.env.API_KEY
// as per the @google/genai coding guidelines.
const getAIClient = () => {
  // Triple-fallback strategy to ensure Key is found
  const apiKey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY || process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key Missing. Please check Vercel/GitHub Settings.");
  }

  // Clean the key (Remove spaces, quotes, newlines)
  const cleanKey = apiKey.toString().replace(/["'\s\n\r]/g, '').trim();

  // Prefix Check
  if (!cleanKey.startsWith("AIza")) {
     const masked = cleanKey.substring(0, 4) + "..." + cleanKey.substring(cleanKey.length - 4);
     throw new Error(`Invalid Key Format. Key must start with 'AIza'. Used: ${masked}`);
  }

  return new GoogleGenAI({ apiKey: cleanKey });
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

  const parts: any[] = [];
  
  if (imageBase64) {
    const cleanBase64 = imageBase64.split(',').pop() || "";
    parts.push({ inlineData: { mimeType: "image/jpeg", data: cleanBase64 } });
  }
  parts.push({ text: systemPrompt });

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
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

    const cleanText = response.text?.replace(/```json/g, '').replace(/```/g, '').trim();
    if (!cleanText) {
       throw new Error("AI returned empty response (possibly blocked).");
    }
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

    const cleanText = response.text?.replace(/```json/g, '').replace(/```/g, '').trim();
    if (!cleanText) {
        throw new Error("AI returned empty response.");
    }
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

    const cleanText = response.text?.replace(/```json/g, '').replace(/```/g, '').trim();
    if (!cleanText) {
        throw new Error("AI returned empty response.");
    }
    return JSON.parse(cleanText) as ExchangeResponse;
  } catch (error: any) {
    throw handleGeminiError(error);
  }
};

function handleGeminiError(error: any): Error {
  console.error("Gemini Error:", error);
  const msg = (error.message || error.toString()).toLowerCase();

  // --- TEMPORARY ERRORS (Rate Limit) ---
  if (msg.includes("429") || msg.includes("quota") || msg.includes("exhausted")) {
      return new Error("AI_BUSY"); // Special code for UI to show "Wait 1 min"
  }
  if (msg.includes("fetch") || msg.includes("network") || msg.includes("failed to fetch")) {
      return new Error("Network Error. Please check your internet connection.");
  }

  // --- PERMANENT ERRORS (Configuration) ---
  if (msg.includes("403") || msg.includes("permission_denied")) {
      return new Error("Access Denied (403). Ensure 'Generative Language API' is enabled in Google Cloud Console.");
  }
  if (msg.includes("400") || msg.includes("invalid_argument") || msg.includes("api key not valid")) {
      return new Error("Invalid API Key. Please check Vercel/GitHub Settings.");
  }
  
  // Fallback
  return new Error(`AI Service Unavailable: ${msg.substring(0, 100)}`);
}