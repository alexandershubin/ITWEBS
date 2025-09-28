'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SafeImageProps } from '@/types/components';

export default function SafeImage({
  alt,
  className,
  fill,
  sizes,
  priority,
  width,
  height,
  photoId
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  const imageSources = [
    `https://picsum.photos/150/150?random=${photoId}`,
    `https://dummyimage.com/150x150/4f46e5/ffffff&text=Photo+${photoId}`,
  ];

  useEffect(() => {
    const firstSource = `https://picsum.photos/150/150?random=${photoId}`;
    setCurrentSrc(firstSource);
    setHasError(false);
  }, [photoId]);

  const handleImageError = () => {
    const currentIndex = imageSources.indexOf(currentSrc);
    if (currentIndex < imageSources.length - 1) {
      setCurrentSrc(imageSources[currentIndex + 1]);
    } else {
      setHasError(true);
    }
  };
  if (hasError || !currentSrc) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center`}>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-lg">📷</span>
          </div>
          <p className="text-xs text-gray-600">Photo {photoId}</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleImageError}
      unoptimized
    />
  );
}
