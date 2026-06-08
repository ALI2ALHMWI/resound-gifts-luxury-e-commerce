import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import SafeImage from './SafeImage';

interface Product360ViewerProps {
  images: string[];
}

export default function Product360Viewer({ images }: Product360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const startX = useRef(0);
  const startFrame = useRef(0);
  
  // Preload images
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    let loadedCount = 0;
    images.forEach(src => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback for failed images to prevent infinite loading state
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoaded(true);
        }
      };
    });
  }, [images]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startFrame.current = currentFrame;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isLoaded) return;
    const deltaX = e.clientX - startX.current;
    
    // Sensitivity: 15 pixels per frame
    const framesToMove = Math.floor(deltaX / 15);
    
    let nextFrame = (startFrame.current + framesToMove) % images.length;
    if (nextFrame < 0) {
      nextFrame += images.length;
    }
    setCurrentFrame(nextFrame);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative aspect-square w-full max-w-lg cursor-ew-resize select-none overflow-hidden bg-background border border-border"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <span className="text-primary text-sm uppercase tracking-widest animate-pulse">Loading 360°...</span>
          </div>
        )}
        
        {isLoaded && (
          <div className="w-full h-full pointer-events-none">
            <SafeImage 
              src={images[currentFrame]} 
              alt={`360 view frame ${currentFrame}`}
              containerClassName="w-full h-full"
              disableTransition={true}
            />
          </div>
        )}
        
        {isLoaded && !isDragging && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/80 backdrop-blur-md px-6 py-3 border border-border text-xs uppercase tracking-widest font-medium text-foreground shadow-xl pointer-events-none">
             <RefreshCw size={14} className="text-primary" /> Drag to rotate
          </div>
        )}
      </div>
    </div>
  );
}
