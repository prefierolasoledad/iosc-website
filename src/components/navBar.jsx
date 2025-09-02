'use client';
import React, { useState, useEffect } from 'react';
import {
  RxHamburgerMenu,
  RxHome,
  RxCross2,
} from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaUsers, FaTools, FaRegEdit, FaChalkboardTeacher } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();

  const icons = [
    { icon: <RxHome />, path: '/', label: 'Home' },
    { icon: <MdOutlineEmojiEvents />, path: '/events', label: 'Events' },
    { icon: <FaChalkboardTeacher />, path: '/mentors', label: 'Mentors' },
    { icon: <FaUsers />, path: '/alumni', label: 'Alumni' },
    { icon: <RiTeamLine />, path: '/team', label: 'Team' },
    { icon: <FaTools />, path: '/projects', label: 'Projects' },
    { icon: <FaRegEdit />, path: '/blogs', label: 'Blogs' },
    { icon: <FiPhone />, path: '/contactUs', label: 'Contact' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  const getTranslateY = () => {
    if (windowWidth < 640) return -140;
    if (windowWidth < 768) return -150;
    return -200;
  };

  return (
    <div
      className={`fixed bottom-0 w-full flex justify-center pl-10 pr-10 pt-5 z-[1000] h-full ${isOpen ? 'bg-black/70' : 'bg-transparent'}`}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div className='relative flex justify-center items-end'>
        {/* Menu Buttons */}
        <div
          className={`absolute w-[30rem] h-[15rem] mb-[10px] transition-all duration-500 ease-in-out
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            z-10 rounded-t-full flex justify-center items-end overflow-visible`}
        >
          {icons.map(({ icon, label, path }, i) => {
            const angle = 270 + (i * (180 / (icons.length - 1)));
            return (
              <div
                key={`icon-${i}`}
                onClick={() => handleNavigation(path)}
                className={`absolute text-white md:w-18 md:h-18 w-14 h-14 hover:scale-110
                    rounded-full p-3 flex flex-col items-center justify-center
                    cursor-pointer transition-all duration-500
                    bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg`}
                style={{
                  transform: `rotate(${angle}deg) translateY(${getTranslateY()}px) rotate(-${angle}deg)`,
                  transformOrigin: 'bottom center',
                  backgroundImage: `radial-gradient(circle at center,
                    rgba(255,255,255,0.05) 20%,
                    rgba(255,255,255,0.03) 50%,
                    rgba(255,255,255,0.02) 80%,
                    rgba(255,255,255,0) 100%)`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="md:text-3xl text-2xl">{icon}</div>
                  <span className="md:text-[10px] text-[8px] mt-[-2px] font-semibold">{label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle Button */}
        <div
          onClick={toggleMenu}
          className="absolute w-28 h-16 flex justify-center items-center cursor-pointer
            rounded-t-full z-[2000] transition-transform duration-300
            bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg hover:scale-105"
          style={{
            pointerEvents: 'auto',
            backgroundImage: `radial-gradient(circle at center,
              rgba(255,255,255,0.05) 20%,
              rgba(255,255,255,0.03) 50%,
              rgba(255,255,255,0.02) 80%,
              rgba(255,255,255,0) 100%)`,
          }}
        >
          {!isOpen && <RxHamburgerMenu className="text-white text-3xl" />}
          {isOpen && <RxCross2 className="text-white text-3xl" />}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
