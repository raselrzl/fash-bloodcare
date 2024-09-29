"use client";
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

interface Slide {
  url: string;
}

export default function ImageSlider() {
  const slides: Slide[] = [
    { url: 'assets/images/b110.jpg' },
    { url: 'assets/images/b111.jpg' },
    { url: 'assets/images/b113.avif' },
    { url: 'assets/images/b111.jpg' },
    { url: 'assets/images/b114.webp' },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  return (
    <div className="relative max-w-[1000px] max-h-[600px] w-full mx-auto py-8 px-1/2 group m-20">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-[30vh] md:h-[30vh] lg:h-[30vh] xl:h-[30vh] bg-center bg-cover bg-no-repeat duration-500"
      ></div>

      {/* Left Arrow */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-4 sm:left-6 md:left-8 lg:left-10 text-xl sm:text-2xl md:text-3xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transition">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className="absolute top-[50%] translate-x-0 translate-y-[-50%] right-4 sm:right-6 md:right-8 lg:right-10 text-xl sm:text-2xl md:text-3xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transition">
        <BsChevronCompactRight onClick={() => setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))} size={30} />
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 w-full flex justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <p
              className={`w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center text-white bg-black mx-1 mb-4 cursor-pointer hover:bg-primary transition ${
                slideIndex === currentIndex ? 'bg-primary' : ''
              } rounded-full text-xs md:text-sm lg:text-base`}
            >
              {slideIndex + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
