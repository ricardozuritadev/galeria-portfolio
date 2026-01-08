'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Gallery from '@/components/Gallery';
import ImageModal from '@/components/ImageModal';
import { GalleryImage } from '@/types/gallery';

// Sample images - replace with your actual ImageKit.io image paths
const images: GalleryImage[] = [
  {
    id: '1',
    url: '/default-image.jpg',
    alt: 'Maternidad 1',
  },
  {
    id: '2',
    url: '/default-image.jpg',
    alt: 'Maternidad 2',
  },
  {
    id: '3',
    url: '/default-image.jpg',
    alt: 'Maternidad 3',
  },
];

export default function MaternidadPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (selectedImageIndex === images.length - 1) {
      setSelectedImageIndex(0);
    }
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (selectedImageIndex === 0) {
      setSelectedImageIndex(images.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Gallery images={images} onImageClick={handleImageClick} />
      {selectedImageIndex !== null && (
        <ImageModal
          images={images}
          currentIndex={selectedImageIndex}
          isOpen={true}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
