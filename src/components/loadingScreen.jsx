'use client';
import React, { useEffect, useState } from 'react';
import LOGO from '@/assets/logo.png';

const LoadingScreen = () => {
  const texts = [
    "BUILDING DREAMS",
    "TOGETHER",
    "WELCOME TO",
    "IOSC-EDC"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, 2000);

    // if (currentIndex === texts.length - 1) {
    //   setTimeout(() => setIsLogoVisible(true), 2000);
    // }

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Oval Pulses */}
      <div className="absolute w-full h-full flex items-center justify-center z-0">
        {/* Add more ovals with shorter interval delays for seamless loop */}
        <span className="oval animate-pulse-oval delay-0" />
        <span className="oval animate-pulse-oval delay-1000" />
        <span className="oval animate-pulse-oval delay-2000" />
        <span className="oval animate-pulse-oval delay-3000" />
        <span className="oval animate-pulse-oval delay-4000" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col text-center items-center z-10">
        {/* {!isLogoVisible ? ( */}
          <h1 className="text-7xl text-sky-400 font-extrabold animate-pulse transition-all duration-1000">
            {texts[currentIndex]}
          </h1>
        {/* ) : ( */}
          {/* <img src={LOGO.src} alt="Logo" className="mt-6 w-80 h-72" /> */}
        {/* )} */}
      </div>

      {/* Styles */}
      <style jsx>{`
        .oval {
          position: absolute;
          width: 200px;
          height: 100px;
          border: 0.1px solid rgba(255, 255, 255, 0.7);
          border-radius: 50%;
        }

        @keyframes pulse-oval {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(10);
            opacity: 0;
          }
        }

        .animate-pulse-oval {
          animation: pulse-oval 5s linear infinite;
        }

        .delay-0 { animation-delay: 0s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
