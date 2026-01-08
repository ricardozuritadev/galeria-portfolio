'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryImage as GalleryImageType } from '@/types/gallery';
import { getResponsiveImageUrl } from '@/lib/imagekit';

interface GalleryImageProps {
  image: GalleryImageType;
  onClick: () => void;
  priority?: boolean;
}

export default function GalleryImage({
  image,
  onClick,
  priority = false,
}: GalleryImageProps) {
  const [imageError, setImageError] = useState(false);
  
  // Calculate responsive width based on viewport
  // Mobile: ~100vw, Tablet: ~50vw, Desktop: ~33vw
  const src = image.url ? getResponsiveImageUrl(image.url, 800) : '';

  const handleError = () => {
    console.error('Failed to load image:', {
      originalUrl: image.url,
      processedUrl: src,
      alt: image.alt,
    });
    setImageError(true);
  };

  if (!image.url || imageError) {
    return (
      <div
        className="relative w-full cursor-pointer overflow-hidden rounded-lg group bg-gray-200 flex items-center justify-center min-h-[200px]"
        onClick={onClick}
      >
        <div className="text-gray-400 text-sm">Image not available</div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden rounded-lg group"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={image.alt}
        width={image.width || 800}
        height={image.height || 600}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={priority ? 'eager' : 'lazy'}
        unoptimized={image.url.startsWith('http')}
        onError={handleError}
      />
    </div>
  );
}
