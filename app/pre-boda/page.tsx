'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Gallery from '@/components/Gallery';
import ImageModal from '@/components/ImageModal';
import { GalleryImage } from '@/types/gallery';

export default function PreBodaPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/images?folder=pre-boda');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Error loading images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {images.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">No images found</p>
        </div>
      )}
    </div>
  );
}
