'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage as GalleryImageType } from '@/types/gallery';
import { getFullScreenImageUrl } from '@/lib/imagekit';

interface ImageModalProps {
  images: GalleryImageType[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ImageModalProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !currentImage) return null;

  const fullScreenUrl = getFullScreenImageUrl(currentImage.url);

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-800 transition-colors"
        aria-label="Close"
      >
        ×
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-800 transition-colors"
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-800 transition-colors"
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-full max-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={fullScreenUrl}
          alt={currentImage.alt}
          width={currentImage.width || 1920}
          height={currentImage.height || 1080}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
          unoptimized={currentImage.url.startsWith('http')}
          priority
        />
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
