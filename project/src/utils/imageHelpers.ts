import { UploadedImage, ImageFormat, AffectedArea } from '../types';

/**
 * Validates image dimensions and format
 */
export const validateImage = (file: File): Promise<{ isValid: boolean; message?: string }> => {
  return new Promise((resolve) => {
    // Check file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
    if (!validImageTypes.includes(file.type)) {
      resolve({ 
        isValid: false, 
        message: 'Invalid file format. Please upload JPG, PNG, or TIFF images.' 
      });
      return;
    }

    // Create an image element to check dimensions
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      
      // Check minimum resolution (1280x720)
      if (img.width < 1280 || img.height < 720) {
        resolve({ 
          isValid: false, 
          message: `Image resolution too low. Minimum required: 1280x720. Current: ${img.width}x${img.height}` 
        });
        return;
      }
      
      resolve({ isValid: true });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ 
        isValid: false, 
        message: 'Error loading image. The file may be corrupted.' 
      });
    };
    
    img.src = objectUrl;
  });
};

/**
 * Creates a preview for the uploaded image
 */
export const createImagePreview = (file: File): Promise<UploadedImage> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const format = getImageFormat(file.type);
        
        const uploadedImage: UploadedImage = {
          id: crypto.randomUUID(),
          file,
          preview: e.target?.result as string,
          width: img.width,
          height: img.height,
          format,
          uploadedAt: new Date()
        };
        
        resolve(uploadedImage);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Gets the image format from mime type
 */
const getImageFormat = (mimeType: string): ImageFormat => {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpeg';
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/tiff':
      return 'tiff';
    default:
      return 'jpg'; // Default fallback
  }
};

/**
 * Draws affected areas on a canvas
 */
export const drawAffectedAreas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  affectedAreas: AffectedArea[],
  scaleFactor: number = 1
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Clear canvas and draw the original image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
  // Draw each affected area
  affectedAreas.forEach(area => {
    const { x, y, width, height, confidence, color } = area;
    
    // Scale coordinates based on canvas size
    const scaledX = x * scaleFactor;
    const scaledY = y * scaleFactor;
    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;
    
    // Set styles based on confidence
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.7;
    
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(scaledX, scaledY, scaledWidth, scaledHeight);
    ctx.stroke();
    
    // Fill with semi-transparent color
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.2;
    ctx.fill();
    
    // Reset global alpha
    ctx.globalAlpha = 1;
    
    // Add confidence label
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    const confidenceText = `${Math.round(confidence * 100)}%`;
    const textWidth = ctx.measureText(confidenceText).width;
    
    // Draw text background
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(
      scaledX + scaledWidth / 2 - textWidth / 2 - 2,
      scaledY - 20,
      textWidth + 4,
      16
    );
    
    // Draw text
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.fillText(confidenceText, scaledX + scaledWidth / 2, scaledY - 8);
  });
};

/**
 * Gets canvas scale factor based on the original image and canvas dimensions
 */
export const getCanvasScaleFactor = (
  canvas: HTMLCanvasElement,
  originalWidth: number,
  originalHeight: number
): number => {
  return Math.min(
    canvas.width / originalWidth,
    canvas.height / originalHeight
  );
};