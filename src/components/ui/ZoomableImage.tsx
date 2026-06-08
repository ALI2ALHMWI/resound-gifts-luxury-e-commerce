import React, { useState, useRef } from 'react';
import SafeImage from './SafeImage';
import { Search } from 'lucide-react';

interface ZoomableImageProps {
  src: string;
  alt: string;
}

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div 
        className="relative aspect-square w-full max-w-lg cursor-crosshair overflow-hidden bg-background border border-border group"
        ref={containerRef}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <SafeImage 
          src={src} 
          alt={alt} 
          containerClassName="w-full h-full"
          imageClassName={`transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {isZoomed && (
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: '250%', // 2.5x zoom level
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}

        {!isZoomed && (
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Search size={18} className="text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
