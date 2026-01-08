'use client';

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
  // Calculate responsive width based on viewport
  // Mobile: ~100vw, Tablet: ~50vw, Desktop: ~33vw
  const src = getResponsiveImageUrl(image.url, 800);

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
      />
    </div>
  );
}
