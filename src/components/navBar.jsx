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

  return (
    <div className={`fixed bottom-0 w-full flex justify-center pl-10 pr-10 pt-5 z-[1000] h-full ${isOpen?'bg-black/70':'bg-transparent'}`}>
      <div className='relative flex justify-center items-end'>
        <div
          className={`absolute w-[30rem] h-[15rem] mb-[10px] transition-all duration-500 ease-in-out 
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} 
            border-t-2 border-l-2 border-r-2 
            z-10 rounded-t-full flex justify-center items-end overflow-visible`}
        >
    
          {icons.map(({ icon, path, label }, i) => {
            const angle = 270 + (i * (180 / (icons.length - 1)));
            return (
                <div
                key={`icon-${i}`}
                onClick={() => handleNavigation(path)}
                className={`absolute bg-white hover:bg-sky-400 hover:text-white text-black w-18 h-18 hover:scale-110 rounded-full border-2 border-white p-3 flex items-center justify-center transition-all duration-500 cursor-pointer 
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                    transform: `rotate(${angle}deg) translateY(-180px) rotate(-${angle}deg)`,
                    transformOrigin: 'bottom center',
                }}
                >
                <div className="flex flex-col items-center">
                    <div className="text-3xl">{icon}</div>
                    <span className="text-[10px] mt-1 font-semibold">{label}</span>
                </div>
                </div>
            );
            })}
        </div>
        <div
          onClick={toggleMenu}
          className='absolute w-28 h-16 flex justify-center items-center 
            border-t-2 border-l-2 border-r-2 cursor-pointer border-white 
            bg-[#1f1f1f] rounded-t-full z-30 transition-transform duration-300'
        >
          {!isOpen &&(<RxHamburgerMenu className='text-white mt-4 text-3xl' />)}
          {isOpen &&(<RxCross2 className='text-white mt-4 text-3xl' />)}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
