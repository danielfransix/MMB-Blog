'use client';
import { useState } from 'react';
import Image from 'next/image';

interface BlogImageCarouselProps {
  images?: string[];
}

export default function BlogImageCarousel({ 
  images = [
    '/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg',
    '/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg',
    '/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg'
  ]
}: BlogImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - 1;

  const goToPrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="blog-image-carousel-container">
      {/* Main Image Display */}
      <div className="blog-image-carousel-main">
        <Image
          src={images[currentIndex]}
          alt={`Carousel image ${currentIndex + 1}`}
          width={800}
          height={533}
          className="blog-image-carousel-image rounded-[2px]"
        />
      </div>
      
      {/* Carousel Controls */}
      <div className="blog-image-carousel-controls">
        <button
          onClick={goToPrevious}
          className="blog-image-carousel-nav-button"
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <div className="carousel-dots-container">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'active bg-black' : 'inactive bg-gray-300 hover:bg-[var(--hover-green)]'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          className="blog-image-carousel-nav-button"
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}