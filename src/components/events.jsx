"use client";

import { useState } from "react";
import STARS from "@/assets/stars.png";
import Image from "next/image";

import Bashabandhu1 from "@/assets/events/bhasha bandhu.jpg";
import Bashabandhu2 from "@/assets/events/basha bandhu 2.jpg";

import StudentOfTheYear from "@/assets/events/student of the year.jpg";
import StudentOfTheYear2 from "@/assets/events/soty2.jpg";

import INTELDEVCLOUD from "@/assets/events/intel dev cloud.jpg";
import INTELDEVCLOUD2 from "@/assets/events/dev cloud2.jpg";

import SHARKTANK from "@/assets/events/shark tank.jpg";
import SHARKTANK2 from "@/assets/events/shark tank2.jpg";

import AZINTEK from "@/assets/events/azientek.jpg";
import AZINTEK2 from "@/assets/events/azientek2.jpg";

import REACTBOOTCAMP from "@/assets/events/react boot camp.jpg";
import REACTBOOTCAMP2 from "@/assets/events/react boot camp2.jpg";

import VESPERA from "@/assets/events/vespera1.jpg";
import VESPERA2 from "@/assets/events/vespera2.jpg";

import GITTOGETHER from "@/assets/events/gitTogether.jpg";
import GITTOGETHER2 from "@/assets/events/gitTogether2.jpg";

import "./sprinkleAnimation.css";

const Events = () => {
  const [event, setEvent] = useState("VESPERA’24");

  const events = [
    {
      title: "REACT BOOT CAMP",
      images: [REACTBOOTCAMP, REACTBOOTCAMP2],
      descriptions: [
        "Our React Bootcamp was a hands-on learning experience where students dove into the world of modern web development. From building dynamic UIs to understanding React hooks and components, participants gained practical skills and built their very first React apps. Students coded along and made it a success!",
        '"Learning React is like learning to think differently — and our students did just that."',
      ],
    },
    {
      title: "AZINTEK",
      images: [AZINTEK, AZINTEK2],
      descriptions: [
        "Azintek marked a major milestone as our tech club's first-ever tech fest, bringing together innovation, creativity, and pure tech energy under one roof! The fest featured an action-packed lineup including a high-stakes Hackathon, an inspiring Designathon, intense Coding Competitions, thrilling Gaming Events, and engaging sessions with a Global Speaker who lit up the stage with insights from the industry. The night wrapped up on a high note with a Musical Eve that kept the vibes alive long after the code stopped compiling.",
        '"It wasn’t just a fest — it was the beginning of something iconic."',
      ],
    },
    {
      title: "INTEL DEV CLOUD",
      images: [INTELDEVCLOUD, INTELDEVCLOUD2],
      descriptions: [
        "As part of our learning series, we hosted an interactive session on Intel DevCloud, where students explored the fundamentals of cloud computing and got hands-on experience with Intel’s powerful cloud platform. From deploying AI models to understanding edge-to-cloud workflows, participants gained practical insights into real-world applications of cloud technology.",
        '"From zero to cloud hero — that’s how fast we move."',
      ],
    },
    // {
    //   title: "GEN AI WORKSHOP",
    //   images: [
    //     "/images/azintek1.jpg",
    //     "/images/azintek2.jpg"
    //   ],
    // },
    {
      title: "SHARK TANK",
      images: [SHARKTANK, SHARKTANK2],
      descriptions: [
        "In our very own Shark Tank event, students stepped into the spotlight to pitch their innovative ideas to a panel of judges. From tech startups to creative solutions for real-world problems, the event was a showcase of entrepreneurial spirit, critical thinking, and bold vision. It was inspiring to see young minds turn ideas into impactful pitches!",
        '"Ideas don’t need wings to fly — just courage to pitch."',
      ],
    },
    {
      title: "STUDENT OF THE YEAR",
      images: [StudentOfTheYear, StudentOfTheYear2],
      descriptions: [
        "Our Student of the Year award celebrated a well-rounded achiever who excelled not just in coding and technical skills, but also in leadership, creativity, and extracurricular involvement. This recognition highlights the spirit of all-round excellence — where passion for tech meets dedication beyond the screen. A true role model for the community!",
        '"Greatness isn’t just in the code — it’s in the character."',
      ],
    },
    {
      title: "VESPERA’24",
      images: [VESPERA, VESPERA2],
      descriptions: [
        "Vespera, our second annual tech fest, was nothing short of spectacular! Building on the success of our first edition, this time we went bigger and bolder — with a thrilling Hackathon, creative Designathon, thought-provoking Case Study competition, and a unique Filmmaking Challenge. The fest also brought out the fun side of tech with an adventurous Treasure Hunt and an unforgettable Stand-up Comedy Night that had the crowd in splits.",
        '"Vespera wasn’t just an event — it was a movement of makers."',
      ],
    },
    {
      title: "BHASHA BANDHU",
      images: [Bashabandhu1, Bashabandhu2],
      descriptions: [
        "Bhasha Bandhu was a platform where students passionately pitched their ideas, blending innovation with impactful communication. The event encouraged participants to express their thoughts clearly and confidently, regardless of language — celebrating the power of ideas across cultures and dialects. It was all about breaking barriers through expression and amplifying student voices.",
        '"Language may differ, but passion always sounds the same."',
      ],
    },
    {
      title: "GIT-TOGETHER",
      images: [GITTOGETHER, GITTOGETHER2],
      descriptions: [
        "Git Together is our open-source project initiative in collaboration with LLMWare, aimed at bringing students into the world of real-world development. Through this program, students will contribute to impactful open-source projects, explore the power of LLMs (Large Language Models), and learn collaborative development using Git and GitHub.",
        '"We don’t just commit code — we commit to growth."',
      ],
    },
  ];

  const activeEvent = events.find((e) => e.title === event);

  return (
    <section className="bg-black w-full min-h-screen pt-10 overflow-hidden pb-18 md:pb-0">
      {/* Title */}
      <div className="w-full flex items-center justify-center">
        <div className="w-[90%] max-w-[400px] relative flex items-center justify-center">
          <div
            className="absolute left-[-50px] top-[-50px] w-40 h-40 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <div
            className="absolute right-[-70px] top-[-90px] w-40 h-40 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150 delay-1000"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <h2 className="text-center font-extrabold text-4xl md:text-6xl text-sky-400 mb-10 relative z-10">
            EVENTS
          </h2>
        </div>
      </div>

      {/* Card Display */}
      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] md:w-[80%] min-h-[450px] lg:h-[400px] rounded-2xl bg-gray-400 grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-4 py-6">
          <div className="text-center text-2xl md:text-4xl lg:text-5xl font-extrabold text-white flex justify-center items-center">
            {activeEvent.title}
          </div>

          {activeEvent?.images?.map((imgSrc, idx) => (
            <div
              key={idx}
              className="flip-card w-full h-[250px] md:h-[300px] lg:h-[90%] bg-transparent rounded-xl overflow-hidden shadow-lg"
            >
              <div className="flip-card-inner w-full h-full bg-white">
                <div className="flip-card-front w-full h-full">
                  <Image
                    src={imgSrc}
                    width="100%"
                    height="100%"
                    alt={`${activeEvent.title} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flip-card-back w-full h-full flex items-center justify-center bg-black text-white text-center p-3 text-sm md:text-base">
                  <p>
                    {activeEvent.descriptions?.[idx] || `${activeEvent.title}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full ml-5 mr-5 flex items-center justify-center flex-col overflow-x-auto scrollbar-hide">
          {/* Event Selector Bar */}
          <div className="w-[90%] mt-10 md:mt-16 h-1 bg-gray-400 flex items-center justify-around">
            {events?.map((e, idx) => (
              <div
                key={idx}
                onClick={() => setEvent(e.title)}
                className={`h-5 md:h-10 transition-all duration-300 ${
                  event === e.title ? "w-5 md:w-10" : "w-2 md:w-5"
                } bg-sky-400 rounded-xl cursor-pointer`}
              />
            ))}
          </div>

          {/* Event Titles */}
          <div className="w-[90%] mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-5 justify-around">
            {events?.map((e, idx) => (
              <div
                key={idx}
                className="text-white text-[4px] md:text-[14px] text-center max-w-[100px] break-words"
              >
                {e.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
