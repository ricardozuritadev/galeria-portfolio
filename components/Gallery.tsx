'use client';

import { GalleryImage as GalleryImageType } from '@/types/gallery';
import GalleryImage from './GalleryImage';

interface GalleryProps {
  images: GalleryImageType[];
  onImageClick: (index: number) => void;
}

export default function Gallery({ images, onImageClick }: GalleryProps) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div
        className="
          columns-1
          sm:columns-2
          lg:columns-3
          xl:columns-4
          gap-4
          space-y-4
        "
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="break-inside-avoid mb-4"
          >
            <GalleryImage
              image={image}
              onClick={() => onImageClick(index)}
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
