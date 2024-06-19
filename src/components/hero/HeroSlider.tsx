import React, { useState, useEffect, useMemo } from "react";

const HeroSlider = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const imageNames = useMemo(() => [
    "stellingstartdag",
    "etenopkamp",
    "vierkantsformatie",
    "kampsfeer",
  ], []);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(Array(imageNames.length).fill(false));
  const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    if(!allImagesLoaded) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % imageNames.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [imageNames.length, allImagesLoaded]);

  useEffect(() => {
    const loadImages = () => {
      imageNames.forEach((imageName, index) => {
        const img = new Image();
        img.src = `../../assets/hero/${imageName}.jpg`;
        img.onload = () => {
          setLoadedImages((prev) => {
            const updated = [...prev];
            updated[index] = true;
            if (updated.every((status) => status)) {
              setAllImagesLoaded(true);
            }
            return updated;
          });
        };
      });
    };

    loadImages();
  }, [imageNames]);

  return (
    <div className="hero__images--container layered-grid">
      {imageNames.map((imageName, index) => (
        <div
          key={imageName}
          className={`hero__image ${
            index === activeImageIndex ? "active" : ""
          }`}
        >
          <img
            src={`../../assets/hero/${imageName}.jpg`}
            alt={`KSA Oosterzele ${imageName}`}
            style={{ display: loadedImages[index] ? "block" : "none" }}
          />
        </div>
      ))}
      {!allImagesLoaded && (
        <div className="hero__image active">
          <img
            src={`../../assets/hero/blur.jpg`}
            alt="KSA Oosterzele blurred image"
          />
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
