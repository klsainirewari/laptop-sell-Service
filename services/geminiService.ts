import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, DiagnosisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const diagnoseDeviceProblem = async (
  deviceType: DeviceType,
  problemDescription: string
): Promise<DiagnosisResponse> => {
  
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
    
    return JSON.parse(text) as DiagnosisResponse;

  } catch (error) {
    console.error("Gemini Diagnosis Error:", error);
    throw new Error("Our virtual technician is currently offline. Please call us directly.");
  }
};