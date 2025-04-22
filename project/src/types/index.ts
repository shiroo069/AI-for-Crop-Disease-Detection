export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'tiff';

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  width: number;
  height: number;
  format: ImageFormat;
  uploadedAt: Date;
}

export interface AnalysisResult {
  id: string;
  imageId: string;
  completed: boolean;
  inProgress: boolean;
  confidenceScore: number;
  diseaseDetected: Disease | null;
  affectedAreas: AffectedArea[];
  timestamp: Date;
}

export interface Disease {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  causes: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AffectedArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  color: string;
}

export interface TreatmentPlan {
  id: string;
  diseaseId: string;
  organicOptions: TreatmentOption[];
  chemicalOptions: TreatmentOption[];
  preventiveMeasures: string[];
  applicationTiming: string;
  environmentalConsiderations: string[];
}

export interface TreatmentOption {
  id: string;
  name: string;
  description: string;
  applicationMethod: string;
  effectiveness: number; // 0-100
  costLevel: 'low' | 'medium' | 'high';
  environmentalImpact: 'low' | 'medium' | 'high';
}

export interface CropType {
  id: string;
  name: string;
  scientificName: string;
  growthStages: string[];
}

export interface DiagnosticReport {
  id: string;
  analysisId: string;
  diseaseName: string;
  diseaseDescription: string;
  confidenceScore: number;
  affectedPlantParts: string[];
  progressionStage: string;
  environmentalFactors: string[];
  treatmentPlan: TreatmentPlan;
  generatedAt: Date;
}

export type Language = 'en' | 'es' | 'fr' | 'zh' | 'hi' | 'ar';