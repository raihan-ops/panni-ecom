import React, { useState } from 'react';

const CustomSlider = () => {
  // Example slides data
  const slides = [
    {
      id: 1,
      content: 'Slide 1 - Beautiful scenery',
    },
    {
      id: 2,
      content: 'Slide 2 - Another cool place',
    },
    {
      id: 3,
      content: 'Slide 3 - Amazing views',
    },
  ];

  // State to track current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden relative">
        {/* Slider Content */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-64 flex items-center justify-center bg-gray-200 text-2xl"
            >
              {slide.content}
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
        >
          Prev
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
        >
          Next
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 mx-2 rounded-full cursor-pointer ${
              index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
