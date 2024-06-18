import { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const imageNames = ['main', 'second', 'third', 'fourth'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % imageNames.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [imageNames.length]);

  return (
    <div className="hero__images--container layered-grid">
      {imageNames.map((image, index) => (
        <div
          key={image}
          className={`hero__image ${image} ${index === activeImageIndex ? 'active' : ''}`}
        ></div>
      ))}
      <div className="hero__images--foreground"></div>
    </div>
  );
};

export default HeroSlider;
