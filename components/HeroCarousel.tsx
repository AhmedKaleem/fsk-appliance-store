"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type CarouselSlide = {
  id: string;
  image: string;
  alt: string;
  link?: string;
};

const slides: CarouselSlide[] = [
  {
    id: "1",
    image:
      "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Shop%20Banner%204.png",
    alt: "Shop Banner 4",
    link: "/search",
  },
  {
    id: "2",
    image:
      "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Shop%20Banner%201.png",
    alt: "Shop Banner 1",
    link: "/search",
  },
  {
    id: "3",
    image:
      "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Shop%20Banner%202.png",
    alt: "Shop Banner 2",
    link: "/search",
  },
  {
    id: "4",
    image:
      "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Shop%20Banner%203.png",
    alt: "Shop Banner 3",
    link: "/search",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Container */}
      <div className="relative aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.link ? (
              <Link href={slide.link} className="block h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                />
              </Link>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white p-2 shadow-lg transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white p-2 shadow-lg transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
