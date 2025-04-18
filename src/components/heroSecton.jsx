import HEROSECTIONIMAGE from "@/assets/background-herosection.gif"
import STARS from "@/assets/stars.png";
import LOGO from "@/assets/logo.png";
import './sprinkleAnimation.css';

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
    weight: '900',
    subsets: ['latin'],
  })

const HeroSection=()=>{
    return(
        <section className="bg-black w-full h-[100vh] overflow-hidden">
            <div className="w-full h-full">
                <div className="flex justify-around w-full mt-[-50px] h-[33%]">
                    <div
                        className="w-70 h-70 z-0 animate-sprinkle filter brightness-150"
                        style={{
                            backgroundImage: `url(${STARS.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            opacity: 0.8,
                        }}
                    /> 
                    <div
                        className="w-70 h-70 z-0 animate-sprinkle filter brightness-150"
                        style={{
                            backgroundImage: `url(${STARS.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            opacity: 0.8,
                        }}
                    /> 
                </div>
                <div className="flex justify-between w-full h-[33%]">
                    <div
                        className="w-70 h-70 z-0 animate-sprinkle filter brightness-150"
                        style={{
                            backgroundImage: `url(${STARS.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            opacity: 0.8,
                        }}
                    /> 
                    <div
                        className="w-70 h-70 z-0 animate-sprinkle filter brightness-150"
                        style={{
                            backgroundImage: `url(${STARS.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            opacity: 0.8,
                        }}
                    /> 
                </div>
                <div className="flex justify-end w-full h-[33%]">
                    <div
                        className="w-70 h-70 z-0 mr-[30%] animate-sprinkle filter brightness-150"
                        style={{
                            backgroundImage: `url(${STARS.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            opacity: 0.8,
                        }}
                    /> 
                    <div
                        className="w-70 h-70 z-0 mr-[10%] animate-sprinkle filter brightness-150"
                        style={{
                            backgroundImage: `url(${STARS.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            opacity: 0.8,
                        }}
                    /> 
                </div>
                <div className={`absolute top-0 w-full h-full pt-5 pl-10 font-extrabold text-5xl`}>
                    <div className="w-full h-24">
                        <img src={LOGO.src} className="h-20 object-contain"></img>
                    </div>
                    <h1 className={`${orbitron.className} text-outline`}>
                        WE'RE IoSC-EDC<br/>
                        A FUTURE-FOCUSED, TECH-DRIVEN<br/>
                        COMMUNITY
                    </h1>
                    <div className="w-full h-80 mt-[-40px]" 
                        style={{
                            backgroundImage: `url(${HEROSECTIONIMAGE.src})`,
                            backgroundSize:'500px',
                            backgroundPosition:'50% 50%',
                            backgroundRepeat:'no-repeat'
                        }}
                    />
                </div>
                <div className="w-full text-white mt-[-130px] pl-20 pr-10">
                    <p className=" md:pr-10 pr-5 pl-5 md:pl-0 lg:text-lg">
                     The <span className="text-white font-bold">IoSC</span>  is a community full of people who love technology oriented towards innovative 
                     development in various fields-from design, system integration, game development, robotics, web, management, etc-and 
                     build a platform through which <span className="">they will learn, try their hands-on experience, and excel.</span>
                 </p>
                 <p className="pt-5 md:pr-10 pr-5 pl-5 md:pl-0 lg:text-lg">
                     Our mission is to bring <span className="">hands-on education</span> based on collaboration and real-life problem-solving through workshops, 
                     hackathons, coding competitions, and networking sessions. With those, we equip our own with contemporary skills and 
                     industry insight.
                 </p>                   
                </div>
            </div>
            
        </section>
    )
}

export default HeroSection;