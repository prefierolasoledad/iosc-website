import HEROSECTIONIMAGE from "@/assets/background-herosection.gif"
import STARS from "@/assets/stars.png";
import LOGO from "@/assets/logo.png";
import './sprinkleAnimation.css';

import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
    weight: '900',
    subsets: ['latin'],
  })

// const HeroSection=()=>{
//     return(
//         <section className="w-full h-[200vh] md:h-[100vh] overflow-hidden bg-black flex flex-col-reverse md:flex-row justify-center">
//             <div className="w-full md:w-[50%] h-full bg-no-repeat bg-contain flex justify-center"
//                 style={{
//                     backgroundImage: `url(${HEROSECTIONIMAGE.src})`,
//                     backgroundSize:'130% 130%',
//                     backgroundPosition:'60% 30%'
//                 }}
//             />

//             <div className="md:w-[60%] lg:mr-20 text-center md:text-left w-full h-full bg-no-repeat pt-30 md:pt-20 xl:pt-14 text-white" >
//                 <div className="relative flex items-center justify-center w-full">
//                     {/* Left Star Background */}
//                     <div
//                     className="absolute md:left-[-120px] left-[-20px] mt-5 md:mt-10 w-50 h-50 md:w-70 md:h-70 z-0 animate-sprinkle filter brightness-150"
//                     style={{
//                         backgroundImage: `url(${STARS.src})`,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundSize: 'contain',
//                         opacity: 0.8,
//                     }}
//                     />

//                     {/* Right Star Background */}
//                     <div
//                     className="absolute right-[-140px] mt-4 w-70 h-70 z-0 animate-sprinkle filter brightness-150 delay-1000"
//                     style={{
//                         backgroundImage: `url(${STARS.src})`,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundSize: 'contain',
//                         opacity: 0.8,
//                     }}
//                     />
//                     {/* Main Heading */}
//                     <h1 className={`text-sky-400 text-5xl md:text-7xl  xl:text-9xl font-extrabold text-center relative z-10 ${orbitron.className}`}>
//                         WE ARE<br/> <p className="text-orange-600">IoSC-EDC </p>
//                     </h1>
//                 </div>
//                 <p className="pt-10 md:pr-10 pr-5 pl-5 text-center md:pl-0 lg:text-lg">
//                     The <span className="text-orange-600 font-bold">IoSC</span>  is a community full of people who love technology oriented towards innovative 
//                     development in various fields-from design, system integration, game development, robotics, web, management, etc-and 
//                     build a platform through which <span className="text-orange-600 font-bold">they will learn, try their hands-on experience, and excel.</span>
//                 </p>
//                 <p className="pt-5 md:pr-10 pr-5 pl-5 text-center md:pl-0 lg:text-lg">
//                     Our mission is to bring <span className="text-orange-600 font-bold">hands-on education</span> based on collaboration and real-life problem-solving through workshops, 
//                     hackathons, coding competitions, and networking sessions. With those, we equip our own with contemporary skills and 
//                     industry insight.
//                 </p>
//                 <p className="pt-5 md:pr-10 pr-5 pl-5 text-center md:pl-0 lg:text-lg">
//                     Whether you're a <span className="text-orange-600 font-bold">developer, designer, or tech strategist</span> just starting out or wanting to learn from other peers in the 
//                     field, our club welcomes anyone interested in learning and  innovating.
//                 </p>
//             </div>
//         </section>
//     );
// }

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