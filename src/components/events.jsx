'use client';

import { useState } from "react";

const Events = () => {
  const [event, setEvent] = useState("VESPERA’24");

  const events = [
    {
      title: "VESPERA’24",
      images: [
        "/images/vespera1.jpg",
        "/images/vespera2.jpg"
      ],
    },
    {
      title: "AZINTEK’23",
      images: [
        "/images/azintek1.jpg",
        "/images/azintek2.jpg"
      ],
    },
  ];

  const activeEvent = events.find((e) => e.title === event);

  return (
    <section className="bg-black w-full min-h-screen pt-10">
      <h2 className="text-center font-extrabold text-6xl text-sky-400 mb-10">
        EVENTS
      </h2>

      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] md:w-[80%] h-[400px] rounded-2xl bg-gray-400 grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-4 py-6">
          <div className="text-center text-4xl md:text-6xl font-extrabold text-white flex justify-center items-center">
            {activeEvent.title}
          </div>

          {activeEvent.images.map((imgSrc, idx) => (
            <div
              key={idx}
              className="h-[90%] w-full bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={imgSrc}
                alt={`${activeEvent.title} - ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Selector Bar */}
        <div className="w-[60%] mt-16 h-1 bg-gray-400  flex items-center justify-around">
          {events.map((e, idx) => (
            <div
              key={idx}
              onClick={() => setEvent(e.title)}
              className={`h-10 transition-all duration-300 ${
                event === e.title ? "w-10" : "w-5"
              } bg-sky-400 rounded-xl cursor-pointer`}
            />
          ))}
        </div>

        {/* Labels */}
        <div className="w-[60%] mt-6 flex items-center justify-around">
          {events.map((e, idx) => (
            <div key={idx} className="text-white text-sm md:text-lg">
              {e.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
