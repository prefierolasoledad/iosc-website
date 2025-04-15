'use client';
import React, { useEffect, useState } from 'react';
import BACKGROUNDIMAGE from '@/assets/starting-bg.png';
import LOGO from '@/assets/logo.png';

const LoadingScreen = () => {
  const texts = [
    "BUILDING DREAMS",
    "TOGETHER",
    "WELCOME TO"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLogoVisible, setIsLogoVisible] = useState(false);  // Add state for logo visibility

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    // Check if all texts are shown
    if (currentIndex === texts.length - 1) {
      // Show the logo after the last text is displayed
      setTimeout(() => setIsLogoVisible(true), 2000); // Wait for the last text to finish before showing logo
    }

    return () => clearInterval(interval); // Clean up interval
  }, [currentIndex]); // Trigger the effect when currentIndex changes

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50"
      style={{
        backgroundImage: `url(${BACKGROUNDIMAGE.src})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center">
        {!isLogoVisible && (
          <h1 className="text-5xl text-sky-400 font-extrabold animate-pulse transition-all duration-1000">
            {texts[currentIndex]}
          </h1>
        )}
        {isLogoVisible && (
          <img src={LOGO.src} alt="Logo" className="mt-6" />
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
