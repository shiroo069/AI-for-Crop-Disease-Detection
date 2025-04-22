import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ImageViewer from '../components/ImageViewer';
import DiseaseInfo from '../components/DiseaseInfo';
import TreatmentOptions from '../components/TreatmentOptions';
import DiagnosticSummary from '../components/DiagnosticSummary';
import ReportActions from '../components/ReportActions';
import { UploadedImage, AnalysisResult, DiagnosticReport, CropType } from '../types';
import { analyzeImage, generateDiagnosticReport } from '../utils/analysisService';
import { ArrowLeft, RefreshCw, X } from 'lucide-react';
import { mockCropTypes } from '../data/mockData';

interface AnalysisPageProps {
  image: UploadedImage;
  onBack: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ image, onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>(mockCropTypes[0].name);
  const [cropTypes] = useState<CropType[]>(mockCropTypes);
  
  useEffect(() => {
    const runAnalysis = async () => {
      try {
        setIsAnalyzing(true);
        const result = await analyzeImage(image);
        setAnalysis(result);
        
        if (result.diseaseDetected) {
          const diagnosticReport = generateDiagnosticReport(result, selectedCrop);
          setReport(diagnosticReport);
        }
      } catch (error) {
        console.error('Analysis error:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    runAnalysis();
  }, [image, selectedCrop]);
  
  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(e.target.value);
    
    // Regenerate report with new crop type
    if (analysis?.diseaseDetected) {
      const diagnosticReport = generateDiagnosticReport(analysis, e.target.value);
      setReport(diagnosticReport);
    }
  };
  
  const handleReanalyze = async () => {
    try {
      setIsAnalyzing(true);
      const result = await analyzeImage(image);
      setAnalysis(result);
      
      if (result.diseaseDetected) {
        const diagnosticReport = generateDiagnosticReport(result, selectedCrop);
        setReport(diagnosticReport);
      } else {
        setReport(null);
      }
    } catch (error) {
      console.error('Reanalysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </button>
            
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type
                </label>
                <select
                  id="cropType"
                  value={selectedCrop}
                  onChange={handleCropChange}
                  disabled={isAnalyzing}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  {cropTypes.map((crop) => (
                    <option key={crop.id} value={crop.name}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleReanalyze}
                disabled={isAnalyzing}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reanalyze
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Image Analysis</h2>
              <div className="h-96">
                <ImageViewer 
                  image={image} 
                  affectedAreas={analysis?.affectedAreas || []}
                  isAnalyzing={isAnalyzing}
                />
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>File: {image.file.name}</span>
                  <span>Format: {image.format.toUpperCase()}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Size: {Math.round(image.file.size / 1024)} KB</span>
                  <span>Uploaded: {image.uploadedAt.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div>
              {isAnalyzing ? (
                <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-96">
                  <div className="text-center">
                    <RefreshCw className="w-16 h-16 text-green-500 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Analyzing Your Image
                    </h3>
                    <p className="text-gray-600 max-w-md">
                      Our AI is processing your image to identify diseases, assess severity, 
                      and generate treatment recommendations. This may take a moment...
                    </p>
                  </div>
                </div>
              ) : analysis?.diseaseDetected ? (
                <DiseaseInfo 
                  disease={analysis.diseaseDetected} 
                  confidenceScore={analysis.confidenceScore} 
                />
              ) : (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No Disease Detected
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Good news! Our AI didn't detect any diseases in your crop image. 
                      For more accurate results, try uploading a different image or ensure 
                      that symptomatic areas are clearly visible.
                    </p>
                    <button
                      onClick={handleReanalyze}
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reanalyze Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {report && analysis?.diseaseDetected && (
            <div className="space-y-8">
              <DiagnosticSummary report={report} />
              
              <TreatmentOptions treatmentPlan={report.treatmentPlan} />
              
              <ReportActions 
                report={report} 
                analysis={analysis} 
                image={image} 
              />
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-green-900 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          &copy; {new Date().getFullYear()} CropGuard AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AnalysisPage;