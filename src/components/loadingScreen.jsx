import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);

  const fullText = "WELCOME TO IOSC-EDC";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        // Faster typing speed between 40-70ms
        setTimeout(typeWriter, Math.random() * 30 + 40);
      } else {
        // Hide cursor quickly after typing completes
        setTimeout(() => setShowCursor(false), 300);
        // Start progress bar immediately
        startProgress();
      }
    };

    // Start typewriter effect after 0.5 seconds
    setTimeout(typeWriter, 500);
  }, []);

  const startProgress = () => {
    let currentProgress = 0;
    const updateProgress = () => {
      if (currentProgress <= 100) {
        setProgress(currentProgress);
        currentProgress += 3; // Faster progress increment
        setTimeout(updateProgress, 25); // Faster progress updates
      }
    };
    updateProgress();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {/* Hexagonal Grid Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #00ffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'gridPulse 4s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Scanning Lines */}
      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 animate-scan-1" />
      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 animate-scan-2 top-1/3" />
      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 animate-scan-3 top-2/3" />
      
      {/* HUD Frame - Responsive padding */}
      <div className="absolute inset-2 sm:inset-4 border-2 border-cyan-400 rounded-lg opacity-30 pointer-events-none">
        <div className="absolute -top-0.5 -left-0.5 w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyan-400 border-r-0 border-b-0" />
        <div className="absolute -top-0.5 -right-0.5 w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyan-400 border-l-0 border-b-0" />
        <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyan-400 border-r-0 border-t-0" />
        <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-8 sm:h-8 border-2 border-cyan-400 border-l-0 border-t-0" />
      </div>
      
      {/* Corner System Status - Mobile responsive */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 text-cyan-400 text-xs sm:text-sm font-mono z-20">
        <div className="mb-0.5">SYS STATUS: ONLINE</div>
        <div className="w-12 sm:w-16 h-1 bg-gray-800 border border-cyan-400 mb-0.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-3/4 animate-pulse" />
        </div>
        <div className="hidden sm:block">NET: CONNECTED</div>
      </div>
      
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 text-cyan-400 text-xs sm:text-sm font-mono text-right z-20">
        <div>CPU: 67%</div>
        <div className="hidden sm:block">MEM: 42%</div>
        <div className="w-12 sm:w-16 h-1 bg-gray-800 border border-cyan-400 ml-auto mt-0.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-2/3 animate-pulse" />
        </div>
      </div>
      
      <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-cyan-400 text-xs sm:text-sm font-mono z-20">
        <div>PWR: OPTIMAL</div>
        <div className="hidden sm:block">TEMP: NORMAL</div>
      </div>
      
      <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 text-cyan-400 text-xs sm:text-sm font-mono text-right z-20">
        <div>V2.1.4</div>
        <div>BUILD: 2025</div>
      </div>
      
      {/* Main Loading Content - Centered and Mobile Responsive */}
      <div className="flex flex-col items-center justify-center z-10 relative px-4 w-full max-w-screen-lg">
        <div 
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white border-2 border-cyan-400 px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-5 rounded-lg bg-black bg-opacity-80 mb-6 sm:mb-8 md:mb-10 font-mono text-center"
          style={{
            textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 2px 2px 0px #000000',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span className="inline-block">
            {displayedText}
            {showCursor && (
              <span className="inline-block w-0.5 sm:w-1 h-8 sm:h-12 md:h-16 bg-cyan-400 ml-1 animate-blink" />
            )}
          </span>
        </div>
        
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="text-cyan-400 text-sm sm:text-base text-center mb-2 font-mono">
            INITIALIZING SYSTEM...
          </div>
          <div 
            className="w-full h-4 sm:h-5 bg-gray-800 border-2 border-cyan-400 rounded-lg overflow-hidden mx-auto"
            style={{
              boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.1)'
            }}
          >
            <div 
              className="h-full bg-gradient-to-r from-teal-800 via-cyan-400 to-blue-500 rounded-md transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)'
              }}
            />
          </div>
          <div className="text-cyan-400 text-sm sm:text-base text-center mt-2 font-mono">
            {progress}%
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .font-mono {
          font-family: 'Orbitron', monospace;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }

        @keyframes scan-move {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateX(100vw); opacity: 0; }
        }

        .animate-scan-1 {
          animation: scan-move 2s linear infinite;
        }

        .animate-scan-2 {
          animation: scan-move 2s linear infinite 0.5s;
        }

        .animate-scan-3 {
          animation: scan-move 2s linear infinite 1s;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
