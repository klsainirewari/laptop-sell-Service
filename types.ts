export interface DiagnosisResponse {
  analysis: string;
  potentialCauses: string[];
  recommendation: string;
  estimatedSeverity: 'Low' | 'Medium' | 'High';
}

export enum DeviceType {
  LAPTOP = 'Laptop',
  OTHER = 'Other Electronics'
}