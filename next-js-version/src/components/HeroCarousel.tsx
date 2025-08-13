'use client';
import { useState, useRef, useEffect } from 'react';
import HeroCard from './HeroCard';
import styles from './HeroCarousel.module.css';

interface HeroPost {
  id: number;
  title: string;
  href: string;
  imageSrc: string;
  category: string;
  publishedDate: string;
  dateTime: string;
  description: string;
}

interface HeroCarouselProps {
  posts: HeroPost[];
}

export default function HeroCarousel({ posts }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(800);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Only show first 3 posts
  const displayPosts = posts.slice(0, 3);
  const maxIndex = displayPosts.length - 1;

  // Calculate card width as 50% of viewport width
  const cardWidth = viewportWidth * 0.7;
  const gap = 16;
  const containerWidth = cardWidth * displayPosts.length + gap * (displayPosts.length - 1);
  const maxTranslate = -(containerWidth - (viewportWidth - 16));

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    // Set initial width
    updateViewportWidth();

    // Add resize listener
    window.addEventListener('resize', updateViewportWidth);

    // Cleanup
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : 0);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < maxIndex ? prev + 1 : maxIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Carousel content - full width */}
      <div className="w-full overflow-hidden">
        <div className="max-w-[1296px] mx-auto px-12">
          <div className="flex padding-left-0">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
                width: `${containerWidth}px`,
                gap: `${gap}px`
              } as React.CSSProperties}
            >
            {displayPosts.map((post, index) => (
              <div key={index} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
                <HeroCard
                  title={post.title}
                  href={post.href}
                  imageSrc={post.imageSrc}
                  category={post.category}
                  publishedDate={post.publishedDate}
                  dateTime={post.dateTime}
                  description={post.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Carousel Controls */}
      <div className="flex justify-center items-center gap-4 mt-8 max-w-[1296px] mx-auto px-12">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="p-2 rounded-full border-2 border-black hover:border-[var(--hover-green)] hover:text-[var(--hover-green)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <div className="flex gap-2">
          {displayPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-black' : 'bg-gray-300 hover:bg-[var(--hover-green)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          disabled={currentIndex === maxIndex}
          className="p-2 rounded-full border-2 border-black hover:border-[var(--hover-green)] hover:text-[var(--hover-green)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
      </div>
    </div>
  );
}