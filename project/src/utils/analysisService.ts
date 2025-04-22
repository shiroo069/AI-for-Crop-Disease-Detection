import { UploadedImage, AnalysisResult, Disease, AffectedArea, DiagnosticReport, TreatmentPlan } from '../types';
import { mockDiseases, mockTreatmentPlans } from '../data/mockData';

/**
 * Simulates an AI analysis of the crop image
 * In a real application, this would call an actual AI service
 */
export const analyzeImage = async (image: UploadedImage): Promise<AnalysisResult> => {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Determine if we detect a disease (80% chance for demo purposes)
  const detectsDisease = Math.random() < 0.8;
  
  if (!detectsDisease) {
    return {
      id: crypto.randomUUID(),
      imageId: image.id,
      completed: true,
      inProgress: false,
      confidenceScore: 0,
      diseaseDetected: null,
      affectedAreas: [],
      timestamp: new Date()
    };
  }
  
  // Randomly select a disease
  const randomDiseaseIndex = Math.floor(Math.random() * mockDiseases.length);
  const selectedDisease = mockDiseases[randomDiseaseIndex];
  
  // Generate random confidence score (65-98%)
  const confidenceScore = 0.65 + Math.random() * 0.33;
  
  // Generate random affected areas
  const numAreas = 1 + Math.floor(Math.random() * 3); // 1-3 affected areas
  const affectedAreas: AffectedArea[] = [];
  
  const colors = [
    'rgba(255, 0, 0, 1)',    // Red
    'rgba(255, 165, 0, 1)',  // Orange
    'rgba(255, 255, 0, 1)'   // Yellow
  ];
  
  for (let i = 0; i < numAreas; i++) {
    const width = 50 + Math.floor(Math.random() * 150);
    const height = 50 + Math.floor(Math.random() * 150);
    const x = Math.floor(Math.random() * (image.width - width));
    const y = Math.floor(Math.random() * (image.height - height));
    
    affectedAreas.push({
      id: crypto.randomUUID(),
      x,
      y,
      width,
      height,
      confidence: 0.7 + Math.random() * 0.25, // 70-95% confidence
      color: colors[i % colors.length]
    });
  }
  
  return {
    id: crypto.randomUUID(),
    imageId: image.id,
    completed: true,
    inProgress: false,
    confidenceScore,
    diseaseDetected: selectedDisease,
    affectedAreas,
    timestamp: new Date()
  };
};

/**
 * Generates a diagnostic report based on the analysis results
 */
export const generateDiagnosticReport = (
  analysis: AnalysisResult,
  cropType: string
): DiagnosticReport | null => {
  if (!analysis.diseaseDetected) {
    return null;
  }
  
  const disease = analysis.diseaseDetected;
  const treatmentPlan = mockTreatmentPlans.find(tp => tp.diseaseId === disease.id) || mockTreatmentPlans[0];
  
  const affectedPlantParts = ['Leaves'];
  if (Math.random() > 0.5) affectedPlantParts.push('Stems');
  if (Math.random() > 0.7) affectedPlantParts.push('Fruit');
  
  const progressionStages = ['Early', 'Moderate', 'Advanced'];
  const progressionStage = progressionStages[Math.floor(Math.random() * progressionStages.length)];
  
  const possibleFactors = [
    'High humidity',
    'Recent rainfall',
    'Overcrowded planting',
    'Poor air circulation',
    'Overhead irrigation',
    'Temperature fluctuations',
    'Previous disease presence',
    'Nutrient imbalance'
  ];
  
  // Randomly select 2-4 environmental factors
  const numFactors = 2 + Math.floor(Math.random() * 3);
  const shuffledFactors = [...possibleFactors].sort(() => 0.5 - Math.random());
  const environmentalFactors = shuffledFactors.slice(0, numFactors);
  
  return {
    id: crypto.randomUUID(),
    analysisId: analysis.id,
    diseaseName: disease.name,
    diseaseDescription: disease.description,
    confidenceScore: analysis.confidenceScore,
    affectedPlantParts,
    progressionStage,
    environmentalFactors,
    treatmentPlan,
    generatedAt: new Date()
  };
};

/**
 * Gets disease severity class for styling
 */
export const getSeverityClass = (severity: string): string => {
  switch (severity) {
    case 'low':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'medium':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'high':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'critical':
      return 'bg-red-200 text-red-900 border-red-400';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

/**
 * Gets environmental impact class for styling
 */
export const getImpactClass = (impact: string): string => {
  switch (impact) {
    case 'low':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'high':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

/**
 * Gets cost level class for styling
 */
export const getCostClass = (cost: string): string => {
  switch (cost) {
    case 'low':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'high':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};