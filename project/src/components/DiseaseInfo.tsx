import React from 'react';
import { Disease } from '../types';
import { getSeverityClass } from '../utils/analysisService';
import { AlertCircle } from 'lucide-react';

interface DiseaseInfoProps {
  disease: Disease;
  confidenceScore: number;
}

const DiseaseInfo: React.FC<DiseaseInfoProps> = ({ disease, confidenceScore }) => {
  const severityClass = getSeverityClass(disease.severity);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{disease.name}</h3>
          <p className="text-sm text-gray-500 italic">{disease.scientificName}</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-sm font-medium mb-1">Confidence</div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {Math.round(confidenceScore * 100)}%
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div 
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${severityClass} mb-2`}
        >
          <AlertCircle className="w-3 h-3 mr-1" />
          {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Severity
        </div>
        <p className="text-gray-700">{disease.description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            {disease.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {symptom}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Causes</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            {disease.causes.map((cause, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;