import React, { useEffect, useRef, useState } from 'react';
import { UploadedImage, AffectedArea } from '../types';
import { drawAffectedAreas, getCanvasScaleFactor } from '../utils/imageHelpers';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface ImageViewerProps {
  image: UploadedImage;
  affectedAreas?: AffectedArea[];
  isAnalyzing?: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ 
  image, 
  affectedAreas = [], 
  isAnalyzing = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Draw image and affected areas when component mounts or when image/areas change
  useEffect(() => {
    if (!canvasRef.current || !image.preview) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    imgRef.current = img;
    
    img.onload = () => {
      // Set canvas dimensions
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Determine appropriate canvas size
        const aspectRatio = img.width / img.height;
        
        let canvasWidth = containerWidth;
        let canvasHeight = canvasWidth / aspectRatio;
        
        // If height exceeds container, scale down
        if (canvasHeight > containerHeight) {
          canvasHeight = containerHeight;
          canvasWidth = canvasHeight * aspectRatio;
        }
        
        canvas.width = canvasWidth * zoomLevel;
        canvas.height = canvasHeight * zoomLevel;
        
        // Draw the image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // If we have affected areas and aren't analyzing, draw them
        if (affectedAreas.length > 0 && !isAnalyzing) {
          const scaleFactor = getCanvasScaleFactor(canvas, img.width, img.height);
          drawAffectedAreas(canvas, img, affectedAreas, scaleFactor);
        }
        
        setIsImageLoaded(true);
      }
    };
    
    img.src = image.preview;
    
    // Cleanup function
    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
      }
    };
  }, [image, affectedAreas, isAnalyzing, zoomLevel]);
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="text-sm text-gray-700">
          Resolution: {image.width} x {image.height}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5 text-gray-700" />
          </button>
          
          <span className="text-sm text-gray-700">{Math.round(zoomLevel * 100)}%</span>
          
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={handleResetZoom}
            className="p-1 rounded hover:bg-gray-100"
            title="Reset zoom"
          >
            <RefreshCw className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="relative flex-1 overflow-auto border rounded-lg bg-gray-100 flex items-center justify-center"
      >
        <canvas 
          ref={canvasRef} 
          className="max-w-full max-h-full"
        />
        
        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center text-white p-4">
              <RefreshCw className="w-10 h-10 animate-spin mx-auto mb-2" />
              <p className="text-lg font-medium">Analyzing image...</p>
              <p className="text-sm">Please wait while our AI processes your image</p>
            </div>
          </div>
        )}
        
        {!isImageLoaded && !isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="w-10 h-10 animate-spin text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;