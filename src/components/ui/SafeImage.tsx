import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  disableTransition?: boolean;
}

export default function SafeImage({ src, alt, containerClassName = '', imageClassName = '', disableTransition = false }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setFallbackAttempted(false);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    // Check if image is already loaded from cache
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleImgError = () => {
    if (!fallbackAttempted && src) {
      setFallbackAttempted(true);
      
      const lowerSrc = src.toLowerCase();
      const lowerAlt = alt.toLowerCase();
      const query = lowerSrc + ' ' + lowerAlt;

      let fallbackUrl = '/src/assets/images/gift_wrapping_1780873727156.png';
      
      if (query.includes('hero') || query.includes('background') || query.includes('banner')) {
        fallbackUrl = '/src/assets/images/brand_hero_1780873667975.png';
      } else if (query.includes('flower') || query.includes('rose') || query.includes('bouquet') || query.includes('peony') || query.includes('blossom') || query.includes('floral')) {
        fallbackUrl = '/src/assets/images/luxury_flowers_1780873684175.png';
      } else if (query.includes('perfume') || query.includes('fragrance') || query.includes('oud') || query.includes('musk') || query.includes('bottle') || query.includes('scent')) {
        fallbackUrl = '/src/assets/images/luxury_perfumes_1780873697555.png';
      } else if (query.includes('gift') || query.includes('set') || query.includes('box') || query.includes('wrap') || query.includes('hamper')) {
        fallbackUrl = '/src/assets/images/luxury_gifts_1780873711033.png';
      }
      
      setCurrentSrc(fallbackUrl);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-surface border border-border text-foreground-muted ${containerClassName.includes('absolute') ? '' : 'relative'} ${containerClassName}`}>
        <ImageIcon size={24} className="mb-2 opacity-50" />
        <span className="text-[10px] uppercase tracking-widest text-center px-4 opacity-70">Image Unavailable</span>
      </div>
    );
  }

  const isAbsolute = containerClassName.includes('absolute');
  const positionedClass = isAbsolute ? '' : 'relative';

  return (
    <div className={`${positionedClass} bg-surface overflow-hidden ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-primary/10 z-10" />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover p-0 m-0 ${disableTransition ? '' : 'transition-opacity duration-700'} ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleImgError}
      />
    </div>
  );
}
