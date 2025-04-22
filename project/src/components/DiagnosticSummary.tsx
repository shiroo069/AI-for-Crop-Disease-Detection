import React from 'react';
import { DiagnosticReport } from '../types';
import { AlertCircle, Leaf, Thermometer, CloudRain } from 'lucide-react';

interface DiagnosticSummaryProps {
  report: DiagnosticReport;
}

const DiagnosticSummary: React.FC<DiagnosticSummaryProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Diagnostic Summary</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
              Affected Plant Parts
            </h4>
            <div className="flex flex-wrap gap-2">
              {report.affectedPlantParts.map((part, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                >
                  <Leaf className="w-4 h-4 mr-1" />
                  {part}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
              Progression Stage
            </h4>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
              <Thermometer className="w-4 h-4 mr-1" />
              {report.progressionStage}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
              Confidence Level
            </h4>
            <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-blue-500 rounded-full"
                style={{ width: `${Math.round(report.confidenceScore * 100)}%` }}
              ></div>
            </div>
            <div className="mt-1 text-right text-sm text-gray-700">
              {Math.round(report.confidenceScore * 100)}%
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
            Environmental Risk Factors
          </h4>
          <div className="bg-blue-50 rounded-lg p-4">
            <ul className="space-y-2">
              {report.environmentalFactors.map((factor, index) => (
                <li key={index} className="flex items-start text-blue-700">
                  <CloudRain className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
              Key Recommendations
            </h4>
            <div className="bg-green-50 rounded-lg p-4">
              <ul className="space-y-2">
                {report.treatmentPlan.preventiveMeasures.slice(0, 3).map((measure, index) => (
                  <li key={index} className="flex items-start text-green-700">
                    <AlertCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    {measure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticSummary;