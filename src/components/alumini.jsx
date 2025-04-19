'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import STARS from "@/assets/stars.png";
import "./flipcard.css";

import ARYANKHANNA from '@/assets/alumini/Aryan Khanna.jpg';
import AVINASHSRIVASTAVA from '@/assets/alumini/Avinash Srivastava.jpg';
import DIVYANSH from '@/assets/alumini/Divyansh.jpg';
import SIDDHARTHGUPTA from '@/assets/alumini/Siddharth Gupta.jpg';

const Alumini = () => {
  const [event, setEvent] = useState("2023-2024");
  const [flippedIndex, setFlippedIndex] = useState(null); // Track flipped card index

  // Reset all flips when event changes
  useEffect(() => {
    setFlippedIndex(null);
  }, [event]);

  const handleCardFlip = (idx) => {
    setFlippedIndex((prev) => (prev === idx ? null : idx));
  };

  const alumini = [
    {
      title: "2023-2024",
      leads: [
        {
          name: "ARYAN KHANNA",
          position: "LEAD",
          image: ARYANKHANNA,
          quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        },
        {
          name: "AVINASH SRIVASTAVA",
          position: "",
          image: AVINASHSRIVASTAVA,
          quote: "Dream big, work hard, stay focused, and surround yourself with good people.",
        },
        {
          name: "DIVYANSH",
          position: "",
          image: DIVYANSH,
          quote: "Great things never come from comfort zones.",
        },
        {
          name: "SIDDHARTH GUPTA",
          position: "",
          image: SIDDHARTHGUPTA,
          quote: "Push yourself, because no one else is going to do it for you.",
        },
      ],
    },
    // {
    //   title: "2024-2025",
    //   leads: [
    //     {
    //       name: "PARTH AWASTHI",
    //       position: "LEAD",
    //       image: "/images/azintek1.jpg",
    //     },
    //     {
    //       name: "DIPTI SINGH",
    //       position: "CO-LEAD",
    //       image: "/images/azintek2.jpg",
    //     },
    //     {
    //       name: "JAY TOMAR",
    //       position: "TECHNICAL LEAD",
    //       image: "/images/azintek1.jpg",
    //     },
    //     {
    //       name: "AKSHAT SARASWAT",
    //       position: "TECHNICAL CO-LEAD",
    //       image: "/images/azintek2.jpg",
    //     },
    //   ],
    // },
  ];

  const activeEvent = alumini.find((e) => e.title === event);

  return (
    <section className="bg-black w-full min-h-screen pt-10 overflow-hidden">
      <div className="w-full flex items-center justify-center">
              <div className="w-[400px] relative flex items-center justify-center">
                <div
                  className="absolute left-[-50px] top-[-50px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150"
                  style={{
                    backgroundImage: `url(${STARS.src})`,
                  }}
                />
      
                <div
                  className="absolute overflow-hidden right-[-70px] top-[-90px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150 delay-1000"
                  style={{
                    backgroundImage: `url(${STARS.src})`,
                  }}
                />
      
                <h2 className="text-center font-extrabold text-6xl text-sky-400 mb-10 relative z-10">
                  ALUMINI
                </h2>
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
            <div className="w-[90%] md:w-[80%]  lg:h-[400px] md:h-[800px] h-[1600px] rounded-2xl bg-gray-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4 px-4 py-6">
              {activeEvent.leads.map((lead, idx) => (
                <div key={idx} className="flip-card h-[90%] w-full cursor-pointer">
                  <div className="flip-inner">
                    {/* Front */}
                    <div className="flip-front bg-white rounded-xl overflow-hidden shadow-lg flex flex-col justify-center items-center">
                      <Image
                        src={lead.image}
                        alt={lead.name}
                        width='90%'
                        height='90%'
                        className="w-[90%] h-[80%] object-cover rounded-xl"
                      />
                      <div className="text-center w-full mt-2 px-2">
                        <h3 className="font-bold text-base">{lead.name}</h3>
                        {/* <p className="text-sm text-gray-600">{lead.position}</p> */}
                      </div>
                    </div>

                    {/* Back */}
                    <div className="flip-back bg-black text-center text-white rounded-xl flex items-center justify-center p-4">
                      <p>"{lead.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>


        <div className="w-[90%] md:w-[60%] mt-16 h-1 bg-gray-400 flex items-center justify-around">
          {alumini.map((e, idx) => (
            <div
              key={idx}
              onClick={() => setEvent(e.title)}
              className={`h-10 transition-all duration-300 ${
                event === e.title ? "w-10" : "w-5"
              } bg-sky-400 rounded-xl cursor-pointer`}
            />
          ))}
        </div>

        <div className="w-[90%] md:w-[60%] mt-6 mb-20 flex items-center justify-around">
          {alumini.map((e, idx) => (
            <div key={idx} className="text-white text-sm md:text-lg">
              {e.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Alumini;
