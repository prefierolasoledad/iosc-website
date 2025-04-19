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
      name: "Humanoids in Half-Marathons",
      detail: "Robots run alongside humans in China's Yizhuang race.",
      desc: "In an unprecedented event in Beijing, 21 humanoid robots participated in the Yizhuang half-marathon. Developed by companies like DroidUP and Noetix Robotics, these robots ran side-by-side with thousands of humans, showcasing breakthroughs in mobility, AI decision-making, and endurance. One robot even completed the race in just under 2 hours and 40 minutes, signaling a new era for human-robot collaboration in physical domains."
    },
    {
      name: "The Rise of AGI",
      detail: "DeepMind CEO predicts Artificial General Intelligence within a decade.",
      desc: "Demis Hassabis, CEO of Google DeepMind, recently announced his belief that AGI (Artificial General Intelligence) could emerge in the next 5 to 10 years. Speaking at TIME100, he highlighted the transformative potential of AGI in solving global issues such as disease, climate change, and education — while also warning of ethical and regulatory challenges ahead."
    },
    {
      name: "Robots Take Over Warehouses",
      detail: "Tech giants roll out humanoids to automate industry.",
      desc: "Companies like Tesla, Figure AI, and Agility Robotics are deploying humanoid robots in logistics and manufacturing to tackle labor shortages. Amazon and BMW are already testing these machines, which are designed to lift, walk, and adapt. With over $3 billion in venture funding projected this year, the humanoid workforce revolution is closer than ever."
    },
    {
      name: "Open-Source Robotics Boom",
      detail: "Hugging Face acquires Pollen Robotics to democratize AI + hardware.",
      desc: "Hugging Face has acquired Pollen Robotics, the creators of Reachy 2, a modular humanoid robot. This collaboration merges open-source software with hardware, encouraging global developers to contribute to and access robotics innovation like never before. It represents a massive shift towards accessible, community-driven robotics development."
    },
    {
      name: "Securing the IoT Future",
      detail: "AI meets cybersecurity in IoT networks.",
      desc: "With billions of devices connected globally, securing the Internet of Things has never been more critical. In 2025, trends focus on enhanced encryption, AI-powered threat detection, and real-time monitoring to prevent breaches and protect sensitive data across smart homes, cities, and industries."
    }
  ];
  
  
  

  return (
    <section className="w-full min-h-[100vh] bg-black pt-10 text-white overflow-hidden">
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
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
        {/* Featured Blog Box */}
        <div className="relative w-full lg:w-1/2 h-72 sm:h-[400px] flex items-center md:mt-20 justify-center">
          <div className="absolute top-[15%]  w-64 sm:w-80 h-64 sm:h-80 bg-black border-4 border-white rotate-45" />
          <div className="absolute top-[15%] w-64 sm:w-80 h-64 sm:h-80 bg-gray-200 rounded-xl border-4 border-sky-400 flex items-center justify-center text-center px-4">
            <p className="text-black text-xl sm:text-3xl font-bold">
              "Tech Unplugged: Ideas in Action!"
            </p>
          </div>
        </div>

        {/* Blog List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 mt-16 pl-5 md:pl-0 mb-16 md:mb-0 md:ml-9">
          {blogs.map((blog, index) => (
            <div key={index} className="flex justify-between items-start sm:items-center border-b border-gray-700 pb-4 flex-col sm:flex-row">
              <div className="flex flex-col mb-2 sm:mb-0">
                <span className="font-bold text-2xl sm:text-3xl">{blog.name}</span>
                <span className="text-md sm:text-lg text-gray-300">{blog.detail}</span>
              </div>
              <span onClick={() => { setIsPopUpShow(true); setSelectedIndex(index); }}
                className="text-sky-400 font-semibold text-xl sm:text-2xl cursor-pointer hover:font-bold mt-1 sm:pr-5 sm:mt-0">
                view &gt;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {isPopUpShow && (
        <div className="fixed z-50 inset-0 bg-black/60 flex items-center justify-center p-4 sm:p-10">
          <div className="w-full max-w-md bg-black border-2 border-sky-400 rounded-2xl drop-shadow-[0_0_10px_rgba(56,189,248,0.7)] relative p-6">
            <button onClick={() => setIsPopUpShow(false)}
              className="absolute top-3 right-3 text-white text-3xl sm:text-4xl hover:text-red-400">
              <RxCross2 />
            </button>
            <h3 className="text-sky-400 pt-8 text-2xl sm:text-3xl font-bold mb-4">
              {blogs[selectedIndex].name}
            </h3>
            <p className="text-gray-300 text-md sm:text-lg">
              {blogs[selectedIndex].desc}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}

export default Blogs;
