'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import STARS from "@/assets/stars.png";
import "./flipcard.css";


import DR_RAHUL_JOHARI from '@/assets/mentors/Dr. Rahul Johari.png';
import DR_KHYATI_CHOPRA from '@/assets/mentors/Dr Khyati Chopra.png';

const Mentors = () => {
  const [event, setEvent] = useState("2023-2024");
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    setFlippedIndex(null);
  }, [event]);

  const handleCardFlip = (idx) => {
    setFlippedIndex((prev) => (prev === idx ? null : idx));
  };

  const mentors = [
    {
      title: "2023-2024",
      mentors: [
        {
          name: "DR. RAHUL JOHARI",
          image: DR_RAHUL_JOHARI,
          quote: "In every challenge lies an opportunity to grow stronger and wiser.",
        },
        {
          name: "DR KHYATI CHOPRA",
          image: DR_KHYATI_CHOPRA,
          quote: "Inspire others not by showing them your power, but by helping them discover theirs.",
        },
      ],
    },
  ];

  const activeEvent = mentors.find((e) => e.title === event);

  return (
    <section className="bg-black w-full min-h-screen pt-10 overflow-hidden">
      <div className="w-full flex items-center justify-center">
        <div className="w-[400px] relative flex items-center justify-center">
          <div
            className="absolute left-[-50px] top-[-50px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <div
            className="absolute overflow-hidden right-[-70px] top-[-90px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150 delay-1000"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <h2 className="text-center font-extrabold text-6xl text-sky-400 mb-10 relative z-10">
            MENTORS
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] md:w-[50%] lg:h-[500px] md:h-[800px] h-[800px] mb-5 rounded-2xl bg-gray-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-4 px-4 py-6">
          {activeEvent?.mentors.map((lead, idx) => (
            <div
              key={idx}
              className={`flip-card h-[90%] w-full cursor-pointer ${flippedIndex === idx ? "flipped" : ""}`}
              onClick={() => handleCardFlip(idx)}
            >
              <div className="flip-inner">
                <div className="flip-front bg-white rounded-xl overflow-hidden shadow-lg flex flex-col justify-center items-center">
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    width={300}
                    height={300}
                    className="w-[90%] h-[80%] object-cover rounded-xl"
                  />
                  <div className="text-center w-full mt-2 px-2">
                    <h3 className="font-bold text-base">{lead.name}</h3>
                  </div>
                </div>
                <div className="flip-back bg-black text-center text-white rounded-xl flex items-center justify-center p-4">
                  <p>"{lead.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="w-[90%] md:w-[60%] mt-16 h-1 bg-gray-400 flex items-center justify-around">
          {alumini?.map((e, idx) => (
            <div
              key={idx}
              onClick={() => setEvent(e.title)}
              className={`h-10 transition-all duration-300 ${
                event === e.title ? "w-10" : "w-5"
              } bg-sky-400 rounded-xl cursor-pointer`}
            />
          ))}
        </div> */}

        {/* <div className="w-[90%] md:w-[60%] mt-6 mb-20 flex items-center justify-around">
          {mentors?.map((e, idx) => (
            <div key={idx} className="text-white text-sm md:text-lg">
              {e.title}
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Mentors;
