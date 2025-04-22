import { DiagnosticReport, AnalysisResult, UploadedImage } from '../types';

/**
 * Generates a PDF report for download
 * This is a mock implementation - in a real app, you'd use a library like jsPDF
 */
export const generatePDFReport = (
  report: DiagnosticReport,
  analysis: AnalysisResult,
  image: UploadedImage
): Blob => {
  // Mock implementation - in a real app, you'd generate an actual PDF
  const reportText = `
  CROP DISEASE DIAGNOSTIC REPORT
  
  Date: ${report.generatedAt.toLocaleString()}
  
  DISEASE INFORMATION
  Name: ${report.diseaseName}
  Scientific Name: ${analysis.diseaseDetected?.scientificName || 'N/A'}
  Confidence: ${Math.round(report.confidenceScore * 100)}%
  
  DESCRIPTION
  ${report.diseaseDescription}
  
  AFFECTED PARTS
  ${report.affectedPlantParts.join(', ')}
  
  PROGRESSION STAGE
  ${report.progressionStage}
  
  ENVIRONMENTAL FACTORS
  ${report.environmentalFactors.join('\n')}
  
  TREATMENT RECOMMENDATIONS
  
  Organic Options:
  ${report.treatmentPlan.organicOptions.map(option => 
    `- ${option.name}: ${option.description}\n  Application: ${option.applicationMethod}`
  ).join('\n')}
  
  Chemical Options:
  ${report.treatmentPlan.chemicalOptions.map(option => 
    `- ${option.name}: ${option.description}\n  Application: ${option.applicationMethod}`
  ).join('\n')}
  
  Preventive Measures:
  ${report.treatmentPlan.preventiveMeasures.join('\n')}
  
  Application Timing:
  ${report.treatmentPlan.applicationTiming}
  
  Environmental Considerations:
  ${report.treatmentPlan.environmentalConsiderations.join('\n')}
  `;
  
  // Create a text blob (in a real app, this would be a PDF)
  return new Blob([reportText], { type: 'text/plain' });
};

/**
 * Generates a JSON file for the diagnostic data
 */
export const exportAsJSON = (
  report: DiagnosticReport,
  analysis: AnalysisResult
): Blob => {
  const data = {
    report,
    analysis: {
      ...analysis,
      // Remove circular references and non-serializable items
      imageId: analysis.imageId
    }
  };
  
  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

/**
 * Generates a CSV file for the diagnostic data
 */
export const exportAsCSV = (
  report: DiagnosticReport,
  analysis: AnalysisResult
): Blob => {
  const headers = [
    'Report ID',
    'Disease Name',
    'Confidence Score',
    'Affected Parts',
    'Progression Stage',
    'Environmental Factors',
    'Generation Date'
  ].join(',');
  
  const values = [
    report.id,
    report.diseaseName,
    Math.round(report.confidenceScore * 100) + '%',
    report.affectedPlantParts.join(';'),
    report.progressionStage,
    report.environmentalFactors.join(';'),
    report.generatedAt.toISOString()
  ].join(',');
  
  return new Blob([`${headers}\n${values}`], { type: 'text/csv' });
};

/**
 * Downloads a file
 */
export const downloadFile = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};