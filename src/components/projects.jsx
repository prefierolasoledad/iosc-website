import React from 'react'
import { FaGithub } from "react-icons/fa";
import STARS from "@/assets/stars.png";
import './sprinkleAnimation.css';

const projects = [
  {
    title: "XYZ PROJECT 1",
    description: "Details 1",
    github: "https://github.com/user/project1"
  },
  {
    title: "XYZ PROJECT 2",
    description: "Details 2",
    github: "https://github.com/user/project2"
  },
  {
    title: "XYZ PROJECT 3",
    description: "Details 3",
    github: "https://github.com/user/project3"
  },
  {
    title: "XYZ PROJECT 4",
    description: "Details 4",
    github: "https://github.com/user/project4"
  },
  {
    title: "XYZ PROJECT 5",
    description: "Details 5",
    github: "https://github.com/user/project5"
  }
];

function Projects() {
  return (
    <section className='w-full min-h-[100vh] flex flex-col bg-black pt-10 items-center'>
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

      <div className='w-[83.5%] overflow-x-auto scrollbar-hide'>
        <div className='w-max h-[500px] flex gap-4 bg-gray-300 pt-5 pb-5 pl-5 pr-5'>
          {projects.map((project, index) => (
            <div key={index} className='w-[300px] h-full bg-black pt-10 pb-6 relative rounded-xl'>
              <div className='w-full h-50 bg-gray-100'>
                {/* Optional: Add an image here */}
              </div>
              <h2 className='text-white text-center pt-5 text-2xl font-bold'>
                {project.title}
              </h2>
              <p className='text-white text-center text-lg'>
                {project.description}
              </p>

              {/* GitHub icon at bottom-right */}
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className='text-4xl text-white absolute bottom-4 right-4' />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
