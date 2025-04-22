import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import { UploadedImage } from './types';

function App() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  
  const handleImageUpload = (image: UploadedImage) => {
    setUploadedImage(image);
  };
  
  const handleBackToUpload = () => {
    setUploadedImage(null);
  };
  
  return (
    <div className="App">
      {uploadedImage ? (
        <AnalysisPage 
          image={uploadedImage} 
          onBack={handleBackToUpload} 
        />
      ) : (
        <HomePage onImageUpload={handleImageUpload} />
      )}
    </div>
  );
}

export default App;