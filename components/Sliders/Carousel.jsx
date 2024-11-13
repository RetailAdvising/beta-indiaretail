import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={goToPrev}>Previous</button>
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="carousel-image"
      />
      <button onClick={goToNext}>Next</button>
    </div>
  );
};

export default Carousel;
