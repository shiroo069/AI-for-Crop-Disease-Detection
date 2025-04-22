import React, { useState } from 'react';
import { TreatmentPlan, TreatmentOption } from '../types';
import { getImpactClass, getCostClass } from '../utils/analysisService';
import { Leaf, FlaskRound as Flask, AlertTriangle, DollarSign, Droplet } from 'lucide-react';

interface TreatmentOptionsProps {
  treatmentPlan: TreatmentPlan;
}

const TreatmentOptionCard: React.FC<{
  option: TreatmentOption;
  type: 'organic' | 'chemical';
}> = ({ option, type }) => {
  const impactClass = getImpactClass(option.environmentalImpact);
  const costClass = getCostClass(option.costLevel);
  
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start mb-2">
        <div className={`p-2 rounded-full mr-3 ${type === 'organic' ? 'bg-green-100' : 'bg-blue-100'}`}>
          {type === 'organic' ? (
            <Leaf className="w-4 h-4 text-green-600" />
          ) : (
            <Flask className="w-4 h-4 text-blue-600" />
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900">{option.name}</h4>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{option.description}</p>
      
      <div className="text-xs text-gray-600 mb-3">
        <strong>Application:</strong> {option.applicationMethod}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          <Droplet className="w-3 h-3 mr-1" />
          Effectiveness: {option.effectiveness}%
        </div>
        
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${costClass}`}>
          <DollarSign className="w-3 h-3 mr-1" />
          {option.costLevel.charAt(0).toUpperCase() + option.costLevel.slice(1)} Cost
        </div>
        
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${impactClass}`}>
          <AlertTriangle className="w-3 h-3 mr-1" />
          {option.environmentalImpact.charAt(0).toUpperCase() + option.environmentalImpact.slice(1)} Impact
        </div>
      </div>
    </div>
  );
};

const TreatmentOptions: React.FC<TreatmentOptionsProps> = ({ treatmentPlan }) => {
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'preventive'>('organic');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Treatment Recommendations</h3>
      
      <div className="border-b mb-4">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('organic')}
            className={`pb-3 px-1 inline-flex items-center ${
              activeTab === 'organic'
                ? 'border-b-2 border-green-500 text-green-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Leaf className="w-4 h-4 mr-2" />
            Organic Options
          </button>
          
          <button
            onClick={() => setActiveTab('chemical')}
            className={`pb-3 px-1 inline-flex items-center ${
              activeTab === 'chemical'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Flask className="w-4 h-4 mr-2" />
            Chemical Options
          </button>
          
          <button
            onClick={() => setActiveTab('preventive')}
            className={`pb-3 px-1 inline-flex items-center ${
              activeTab === 'preventive'
                ? 'border-b-2 border-amber-500 text-amber-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Preventive Measures
          </button>
        </nav>
      </div>
      
      <div>
        {activeTab === 'organic' && (
          <div className="space-y-4">
            {treatmentPlan.organicOptions.map(option => (
              <TreatmentOptionCard 
                key={option.id} 
                option={option} 
                type="organic" 
              />
            ))}
          </div>
        )}
        
        {activeTab === 'chemical' && (
          <div className="space-y-4">
            {treatmentPlan.chemicalOptions.map(option => (
              <TreatmentOptionCard 
                key={option.id} 
                option={option} 
                type="chemical" 
              />
            ))}
          </div>
        )}
        
        {activeTab === 'preventive' && (
          <div>
            <div className="bg-amber-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-amber-800 mb-2">Preventive Measures</h4>
              <ul className="space-y-2">
                {treatmentPlan.preventiveMeasures.map((measure, index) => (
                  <li key={index} className="flex items-start text-amber-700">
                    <span className="text-amber-500 mr-2">•</span>
                    {measure}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-800 mb-2">Application Timing</h4>
              <p className="text-blue-700">{treatmentPlan.applicationTiming}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Environmental Considerations</h4>
              <ul className="space-y-2">
                {treatmentPlan.environmentalConsiderations.map((consideration, index) => (
                  <li key={index} className="flex items-start text-green-700">
                    <span className="text-green-500 mr-2">•</span>
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentOptions;