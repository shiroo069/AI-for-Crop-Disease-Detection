import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { validateImage, createImagePreview } from '../utils/imageHelpers';
import { UploadedImage } from '../types';

interface UploadZoneProps {
  onImageUpload: (image: UploadedImage) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);
    
    try {
      // Validate the image
      const validation = await validateImage(file);
      
      if (!validation.isValid) {
        setError(validation.message || 'Invalid image');
        setUploading(false);
        return;
      }
      
      // Create image preview
      const image = await createImagePreview(file);
      onImageUpload(image);
    } catch (err) {
      setError('Error processing image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all ${
          isDragging 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-400 bg-white'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/jpeg,image/jpg,image/png,image/tiff"
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="mb-4 p-4 bg-green-50 rounded-full">
            <Upload 
              className={`w-12 h-12 ${isDragging ? 'text-green-600' : 'text-green-500'}`} 
            />
          </div>
          
          <h3 className="mb-2 text-xl font-medium text-gray-700">
            Upload a crop image for analysis
          </h3>
          
          <p className="mb-4 text-sm text-gray-500">
            Drag and drop your image here, or click to browse
          </p>
          
          <button
            onClick={handleBrowseClick}
            disabled={uploading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Processing...' : 'Browse Files'}
          </button>
          
          <div className="mt-4 text-sm text-gray-500">
            <div className="flex items-center mb-1">
              <ImageIcon className="w-4 h-4 mr-1" />
              <span>Supported formats: JPG, PNG, TIFF</span>
            </div>
            <p>Minimum resolution: 1280x720 pixels</p>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-md">
          <div className="flex items-start justify-between">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={clearError}
              className="text-red-700 hover:text-red-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">Tips for better analysis:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Ensure good lighting when taking photos</li>
          <li>Include both healthy and affected parts for comparison</li>
          <li>Take close-ups of symptoms for detailed analysis</li>
          <li>Include wider shots to show distribution patterns</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadZone;