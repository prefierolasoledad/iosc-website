'use client';

import { useState, useEffect } from "react";
import STARS from "@/assets/stars.png";
import "./flipcard.css";


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
          image: "/images/vespera1.jpg",
        },
        {
          name: "XYZ",
          position: "CO-LEAD",
          image: "/images/vespera2.jpg",
        },
        {
          name: "XYZ",
          position: "TECHNICAL LEAD",
          image: "/images/vespera2.jpg",
        },
        {
          name: "XYZ",
          position: "TECHNICAL CO-LEAD",
          image: "/images/vespera2.jpg",
        },
      ],
    },
    {
      title: "2024-2025",
      leads: [
        {
          name: "PARTH AWASTHI",
          position: "LEAD",
          image: "/images/azintek1.jpg",
        },
        {
          name: "DIPTI SINGH",
          position: "CO-LEAD",
          image: "/images/azintek2.jpg",
        },
        {
          name: "JAY TOMAR",
          position: "TECHNICAL LEAD",
          image: "/images/azintek1.jpg",
        },
        {
          name: "AKSHAT SARASWAT",
          position: "TECHNICAL CO-LEAD",
          image: "/images/azintek2.jpg",
        },
      ],
    },
  ];

  const activeEvent = alumini.find((e) => e.title === event);

  return (
    <section className="bg-black w-full min-h-screen pt-10">
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
                  ALUMINI
                </h2>
              </div>
            </div>

      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] md:w-[80%] h-[400px] rounded-2xl bg-gray-400 grid grid-cols-1 md:grid-cols-4 items-center gap-4 px-4 py-6">
          {activeEvent.leads.map((lead, idx) => (
            <div
              key={idx}
              className="flip-card h-[90%] w-full cursor-pointer"
              onClick={() => handleCardFlip(idx)}
            >
              <div className={`flip-inner ${flippedIndex === idx ? "flipped" : ""}`}>
                {/* Front */}
                <div className="flip-front bg-white rounded-xl overflow-hidden shadow-lg flex flex-col justify-center items-center">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-full h-[70%] object-cover rounded-t-xl"
                  />
                  <div className="text-left w-full mt-2 px-2">
                    <h3 className="font-bold text-base">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.position}</p>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-back bg-black rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="w-[60%] mt-16 h-1 bg-gray-400 flex items-center justify-around">
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

        <div className="w-[60%] mt-6 flex items-center justify-around">
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
