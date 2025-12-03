export interface DiagnosisResponse {
  analysis: string;
  potentialCauses: string[];
  recommendation: string;
  estimatedSeverity: 'Low' | 'Medium' | 'High';
}

export interface ShoppingResponse {
  recommendedModel: string;
  reason: string;
  technicalSpecsNeeded: string[];
  estimatedBudget: string;
}

export interface ExchangeResponse {
  estimatedValueRange: string;
  marketAnalysis: string;
  deductionFactors: string[];
  nextSteps: string;
}

export enum DeviceType {
  LAPTOP = 'Laptop',
  OTHER = 'Other Electronics'
}

export enum AIMode {
  DIAGNOSIS = 'diagnosis',
  SHOPPING = 'shopping',
  EXCHANGE = 'exchange'
}