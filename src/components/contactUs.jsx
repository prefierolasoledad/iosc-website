import React from 'react';
import BACKGROUNDIMAGEBACK from '@/assets/contact-us-back.png';
import BACKGROUNDIMAGEFRONT from '@/assets/contact-us-front.png';
import LOGO from '@/assets/logo.png';

import STARS from "@/assets/stars.png";
import './sprinkleAnimation.css';

import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

function ContactUs() {
  return (
    <section className='w-full h-[100vh] bg-black pt-10'>
      <div className="w-full flex items-center justify-center">
          <div className="w-[400px] relative flex items-center justify-center">
            <div
              className="absolute left-[-130px] top-[-50px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150"
              style={{
                backgroundImage: `url(${STARS.src})`,
              }}
            />    
          <div
            className="absolute right-[-150px] top-[-90px] w-50 h-50 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150 delay-1000"
            style={{
              backgroundImage: `url(${STARS.src})`,
            }}
          />
                  
          <h2 className="text-center font-extrabold text-6xl text-sky-400 mb-10 relative z-10">
            CONTACT US
          </h2>
        </div>
      </div>
      <div className='w-full h-142'

        style={{
            backgroundImage:`url(${BACKGROUNDIMAGEBACK.src})`,
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 130%'
        }}
      
      >

        <div className='w-full h-142 flex flex-col items-center justify-center'

        style={{
            backgroundImage:`url(${BACKGROUNDIMAGEFRONT.src})`,
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 130%'
        }}

        >
            <div className='absolute w-full h-50 mt-[-110px] overflow-hidden'>
              <div className="w-full flex items-center justify-between">
                {/* <div className="w-[400px] relative flex items-center justify-center"> */}
                  <div
                    className=" w-60 h-60 bg-no-repeat ml-40 bg-contain z-0 animate-sprinkle filter brightness-150 delay-500"
                    style={{
                      backgroundImage: `url(${STARS.src})`,
                    }}
                  />    
                  <div
                    className="w-60 h-60 bg-no-repeat mr-36 bg-contain z-0 animate-sprinkle filter brightness-150 delay-750"
                    style={{
                      backgroundImage: `url(${STARS.src})`,
                    }}
                  />
                </div>
              {/* </div> */}
            </div>
            <div className='w-150 h-70 ml-[-100px] flex flex-row items-center justify-around mt-40 mb-[-10px]'>
                <img src={LOGO.src} className='w-40 h-30 mr-20'></img>
                <div className='text-white text-4xl font-bold'>
                    <h3>
                        Where Ideas Spark,
                    </h3>
                    <h3>
                        and Tech Ignites!⚡
                    </h3>
                </div>
                <div className='text-white text-xl font-bold absolute mt-40 pl-[65%]'>
                    <h4 className='flex items-center gap-2'>
                        <CiMail /> iosc.edc@gmail.com
                    </h4>
                    <h4 className='flex items-center gap-2'>
                        <FaInstagram /> @iosc_edc
                    </h4>
                    <h4 className='flex items-center gap-2'>
                        <FaLinkedinIn /> @iosc-usar
                    </h4>
                </div>
            </div>
            <div className="absolute bottom-1 text-white font-bold flex items-center justify-center flex-col w-full h-10 mt-auto">
                <h4>Made with 💙  by IoSC-EDC</h4>
                <h4>One Club, One Family</h4>                
            </div>
        </div>

      </div>
    </section>
  )
}

export default ContactUs;
