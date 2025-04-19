'use client';
import React, { useState } from 'react';
import {
    RxHamburgerMenu,
  RxHome,
  RxAvatar,
  RxDashboard,
  RxGroup,
  RxChatBubble,
  RxCalendar,
  RxEnvelopeClosed,
  RxCross2
} from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { FaTools } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const icons = [
    { icon: <RxHome />, path: '/', label: 'Home' },
    { icon: <MdOutlineEmojiEvents />, path: '/events', label: 'Events' },
    { icon: <FaUsers />, path: '/alumini', label: 'Alumni' },
    { icon: <RiTeamLine />, path: '/team', label: 'Team' },
    { icon: <FaTools />, path: '/projects', label: 'Projects' },
    { icon: <FaRegEdit />, path: '/blogs', label: 'Blogs' },
    { icon: <FiPhone />, path: '/contactUs', label: 'Contact' },
  ];
  

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  const getTranslateY = () => {
    if (window.innerWidth < 640) return -130; // sm
    if (window.innerWidth < 768) return -150; // md
    return -180; // lg and above
  };
  

  return (
    <div className={`fixed bottom-0 w-full flex justify-center pl-10 pr-10 pt-5 z-[1000] h-full ${isOpen ? 'bg-black/70' : 'bg-transparent'}`}
    style={{
      pointerEvents: isOpen ? 'auto' : 'none',
    }}>
      <div className='relative flex justify-center items-end'>
        <div
          className={`absolute w-[30rem] h-[15rem] mb-[10px] transition-all duration-500 ease-in-out 
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} 
            z-10 rounded-t-full flex justify-center items-end overflow-visible`}
        >
    
          {icons.map(({ icon, path, label }, i) => {
            const angle = 270 + (i * (180 / (icons.length - 1)));
            return (
                <div
                key={`icon-${i}`}
                onClick={() => handleNavigation(path)}
                className={`absolute bg-white hover:bg-sky-400 hover:text-white text-black md:w-18 md:h-18 w-14 h-14 hover:scale-110 rounded-full border-2 border-white p-3 flex items-center justify-center transition-all duration-500 cursor-pointer 
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transform: `rotate(${angle}deg) translateY(${getTranslateY()}px) rotate(-${angle}deg)`,
                  transformOrigin: 'bottom center',
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
        <div
          onClick={toggleMenu}
          className='absolute w-28 h-16 flex justify-center items-center 
            border-t-2 border-l-2 border-r-2 cursor-pointer border-white 
            bg-[#1f1f1f] rounded-t-full z-[2000] transition-transform duration-300'  // Increased z-index for the hamburger

            style={{pointerEvents:'auto'}}
        >
          {!isOpen &&(<RxHamburgerMenu className='text-white mt-4 text-3xl' />)}
          {isOpen &&(<RxCross2 className='text-white mt-4 text-3xl' />)}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
