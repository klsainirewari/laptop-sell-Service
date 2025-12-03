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

export enum DeviceType {
  LAPTOP = 'Laptop',
  OTHER = 'Other Electronics'
}

export enum AIMode {
  DIAGNOSIS = 'diagnosis',
  SHOPPING = 'shopping'
}