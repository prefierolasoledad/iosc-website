import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import STARS from "@/assets/stars.png";
import "./sprinkleAnimation.css";

import PROJECTI5 from "@/assets/projects/ProjectI5.png";
import QUIZPLAY from "@/assets/projects/quizplay.jpg";
import AICodeReview from "@/assets/projects/AICodeReview.png";
import DriveEasy from "@/assets/projects/DriveEasy.png";

const projects = [
  {
    title: "HYDRO HEROES",
    description:"it does realtime flow tracking to predict leaks and Quality monitoring",
    github: "https://github.com/Waqar080206/Hydro-Heroes",
    image: PROJECTI5.src,
  },
  {
    title: "QUIZ PLAY",
    description:"It allows users to take quizzes, view results, and manage quiz data through an interactive UI.",
    github: "https://github.com/prefierolasoledad/QuizApp",
    image: QUIZPLAY.src,
  },
  {
    title: "AI CODE REVIEW",
    description:"A full-stack AI-powered code review tool built with Node.js, React, and Google's Gemini API.",
    github: "https://github.com/utkarsh-chauhannn/Ai-Code-Review",
    image: AICodeReview.src,
  },
  {
    title: "DriveEasy",
    description:"DriveEasy is a MERN stack-based car rental platform that enables users to easily browse, book, and manage vehicle rentals online.",
    github: "https://github.com/AryanSachan12/vehicle-rental",
    image: DriveEasy.src,
  },
];

function Projects() {
  return (
    <section className="w-full min-h-[100vh] flex flex-col bg-black pt-10 items-center overflow-hidden">
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
            PROJECTS
          </h2>
        </div>
      </div>

      <div className="w-[83.5%] overflow-x-auto scrollbar-hide">
        <div className="w-max h-[500px] flex gap-4 bg-gray-300 pt-5 pb-5 pl-5 pr-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-[300px] h-full bg-black pt-10 pb-6 relative rounded-xl"
            >
              <div className="w-full h-50 bg-gray-100">
                {project.image != "" && (
                  <Image
                    src={project.image}
                    width="100%"
                    height="100%"
                    alt="Project"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h2 className="text-white text-center pt-5 text-2xl font-bold">
                {project.title}
              </h2>
              <p className="text-white text-center text-md pl-5 pr-5 mt-5">
                {project.description}
              </p>

              {/* GitHub icon at bottom-right */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-4xl text-white absolute bottom-4 right-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
