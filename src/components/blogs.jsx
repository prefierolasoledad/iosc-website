'use client';
import React, { useState } from 'react';
import STARS from "@/assets/stars.png";
import { RxCross2 } from "react-icons/rx";
import './sprinkleAnimation.css';

function Blogs() {

  const [isPopUpShow,setIsPopUpShow]=useState(false);
  const [selectedIndex,setSelectedIndex]=useState(-1);

  const blogs = [
    {
      name: 'AI in Daily Life',
      detail: 'Exploring how AI shapes our everyday decisions.',
      desc:'NO description 1'
    },
    {
      name: 'Next-Gen Web',
      detail: 'What’s coming with Web 4.0 and beyond.',
      desc:'NO description 2'
    },
    {
      name: 'UX Secrets',
      detail: 'Tips to design experiences users love.',
      desc:'NO description 3'
    },
    {
      name: 'Code Zen',
      detail: 'How writing clean code boosts dev productivity.',
      desc:'NO description 4'
    },
    {
        name: 'Code Zen',
        detail: 'How writing clean code boosts dev productivity.',
        desc:'NO description 5'
      },
  ];

  return (
    <section className="w-full min-h-[100vh] bg-black pt-10 text-white">
      <div className="w-full flex items-center justify-center">
          <div className="w-[400px] relative flex items-center justify-center">
            <div
              className="absolute left-[-50px] top-[-50px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150"
              style={{
                backgroundImage: `url(${STARS.src})`,
              }}
            />    
          <div
            className="absolute right-[-70px] top-[-90px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150 delay-1000"
            style={{
              backgroundImage: `url(${STARS.src})`,
            }}
          />
                  
          <h2 className="text-center font-extrabold text-6xl text-sky-400 mb-10 relative z-10">
            BLOGS
          </h2>
        </div>
      </div>
      <div className="flex flex-row items-start justify-between px-10">
        {/* Left: Featured Blog Box */}
        <div className="relative w-120 h-[400px]">
          <div className="absolute top-[15%] left-[15%] w-80 h-80 bg-black border-4 border-white rotate-45" />
          <div className="absolute top-[15%] left-[15%] w-80 h-80 bg-gray-200 rounded-xl border-4 border-sky-400 flex items-center justify-center text-center px-4">
            <p className="text-black text-3xl font-bold">
              "Tech Unplugged: Ideas in Action!"
            </p>
          </div>
        </div>

        {/* Right: Blog List */}
        <div className="w-200 flex flex-col gap-6">
          {blogs.map((blog, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-3">
              <div className="flex flex-col">
                <span className="font-bold text-3xl">{blog.name}</span>
                <span className="text-lg text-gray-300">{blog.detail}</span>
              </div>
              <span onClick={()=>{setIsPopUpShow(true); setSelectedIndex(index)}} className="text-sky-400 font-semibold text-2xl cursor-pointer hover:font-bold">view &gt;</span>
            </div>
          ))}
        </div>
      </div>
      {isPopUpShow && (
          <div className='absolute z-50 flex items-center justify-center top-0 w-full h-[100vh] bg-black/50'>
            <div className='w-120 h-80 bg-black border-2 border-sky-400 rounded-2xl drop-shadow-[0_0_10px_rgba(56,189,248,0.7)] relative p-6 flex flex-col'>
              <button 
                onClick={() => setIsPopUpShow(false)} 
                className='absolute top-2 right-2 text-white text-4xl hover:text-red-400'>
                <RxCross2 />
              </button>
              <h3 className="text-sky-400 pt-6 text-4xl font-bold mb-4">
                {blogs[selectedIndex].name}
              </h3>
              <p className="text-gray-300 text-lg">
                {blogs[selectedIndex].desc}
              </p>
            </div>
          </div>
        )}

    </section>
  );
}

export default Blogs;
