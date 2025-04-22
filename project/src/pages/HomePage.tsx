import React from 'react';
import { Activity, FileText, Database, Cloud, Plane } from 'lucide-react';
import Header from '../components/Header';
import UploadZone from '../components/UploadZone';
import { UploadedImage } from '../types';

interface HomePageProps {
  onImageUpload: (image: UploadedImage) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onImageUpload }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              <span className="text-green-600">AI-Powered</span> Crop Disease Detection
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Upload high-resolution images of your crops to identify diseases, 
              get detailed diagnostics, and receive customized treatment recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-12">
            <UploadZone onImageUpload={onImageUpload} />
          </div>
          
          <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload</h3>
                <p className="text-gray-600">
                  Upload high-resolution images of your crops showing symptoms.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analyze</h3>
                <p className="text-gray-600">
                  Our AI processes your images to identify diseases with high accuracy.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Diagnose</h3>
                <p className="text-gray-600">
                  Get detailed reports with affected areas and confidence scores.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Treat</h3>
                <p className="text-gray-600">
                  Receive customized treatment plans based on the disease and severity.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold text-green-800 mb-4">
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-green-700">✓</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Multi-format Support</h3>
                  <p className="text-green-700">
                    Upload JPG, PNG, and TIFF images with minimum resolution of 1280x720px.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-green-700">✓</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Advanced Detection</h3>
                  <p className="text-green-700">
                    Identification of early symptoms and multiple diseases with similar symptoms.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-green-700">✓</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Customized Treatments</h3>
                  <p className="text-green-700">
                    Both organic and chemical treatment options tailored to disease severity.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-green-700">✓</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Offline Capability</h3>
                  <p className="text-green-700">
                    Basic functionality available offline for use in remote areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-green-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Plane className="h-6 w-6" />
                <span className="ml-2 text-lg font-semibold">CropGuard AI</span>
              </div>
              <p className="text-sm text-green-200 mt-1">
                &copy; {new Date().getFullYear()} CropGuard AI. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-green-200 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;