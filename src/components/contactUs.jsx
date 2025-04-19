import React from 'react';
import BACKGROUNDIMAGEBACK from '@/assets/contact-us-back.png';
import BACKGROUNDIMAGEFRONT from '@/assets/contact-us-front.png';
import LOGO from '@/assets/logo.png';
import STARS from "@/assets/stars.png";
import Image from "next/image";

import './sprinkleAnimation.css';

import { CiMail } from "react-icons/ci";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

function ContactUs() {
  return (
    <section className="w-full min-h-[100vh] bg-black pt-10 relative overflow-hidden">
      {/* Title with Stars */}
      <div className="w-full flex items-center justify-center mb-10 relative">
        <div className="w-[300px] sm:w-[400px] relative flex items-center justify-center">
          <div
            className="absolute md:left-[-130px] top-[-50px] left-[-40px] w-40 h-40 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <div
            className="absolute md:right-[-150px] top-[-90px] right-[-60px] w-40 h-40 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150 delay-1000"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <h2 className="text-center font-extrabold text-3xl sm:text-5xl lg:text-6xl text-sky-400 relative z-10">
            CONTACT US
          </h2>
        </div>
      </div>

      {/* Background Image Layers */}
      <div
        className="w-full absolute bottom-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${BACKGROUNDIMAGEBACK.src})` }}
      >
        <div
          className="w-full flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover py-20 px-4"
          style={{ backgroundImage: `url(${BACKGROUNDIMAGEFRONT.src})` }}
        >
          {/* Sparkles */}
          <div className="relative w-full justify-between mb-10 px-4 hidden md:flex">
            <div
              className="w-32 h-32 bg-no-repeat bg-contain animate-sprinkle filter brightness-150 delay-500"
              style={{ backgroundImage: `url(${STARS.src})` }}
            />
            <div
              className="w-32 h-32 bg-no-repeat bg-contain animate-sprinkle filter brightness-150 delay-750"
              style={{ backgroundImage: `url(${STARS.src})` }}
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-[1100px] px-4">
            {/* Logo */}
            <Image src={LOGO} alt="Logo" className="w-28 sm:w-36 md:w-40" />

            {/* Slogan */}
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold">Where Ideas Spark,</h3>
              <h3 className="text-2xl sm:text-3xl font-bold">and Tech Ignites!⚡</h3>
            </div>

            {/* Contact Info */}
            <div className="text-white text-lg sm:text-xl font-bold space-y-2">
              <h4 className="flex items-center gap-2">
                <CiMail /> iosc.edc@gmail.com
              </h4>
              <h4 className="flex items-center gap-2">
                <FaInstagram /> @iosc_edc
              </h4>
              <h4 className="flex items-center gap-2">
                <FaLinkedinIn /> @iosc-usar
              </h4>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-white text-center text-sm sm:text-base font-semibold">
            <h4>Made with 💙 by IoSC-EDC</h4>
            <h4>One Club, One Family</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
