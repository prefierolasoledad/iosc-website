import HEROSECTIONIMAGE from "@/assets/photo_6177117399736764353_y.png"
import STARS from "@/assets/stars.png";
import LOGO from "@/assets/logo.png";
import Image from "next/image";
import './sprinkleAnimation.css';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
    weight: '900',
    subsets: ['latin'],
})

const StarElement = ({ className = "", delay = 0 }) => (
    <div
        className={`w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 animate-sprinkle filter brightness-200 drop-shadow-lg ${className}`}
        style={{
            backgroundImage: `url(${STARS.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            opacity: 0.9,
            animationDelay: `${delay}ms`,
            filter: 'brightness(2) drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
        }}
    />
);

const HeroSection = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 500);

        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
        }, 200);

        // Mouse parallax effect
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearTimeout(timer);
            clearTimeout(loadTimer);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="relative bg-gradient-to-br from-slate-950 via-black to-indigo-950 min-h-screen w-full overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-cyan-600/10 via-transparent to-emerald-600/10"></div>
            </div>

            {/* Floating orbs background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
                <div className="absolute bottom-32 left-32 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            {/* Dynamic star field with parallax */}
            <div
                className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
                style={{
                    transform: `translate(${(mousePos.x - 50) * 0.02}px, ${(mousePos.y - 50) * 0.02}px)`,
                }}
            >
                {/* Strategic star placement */}
                <StarElement className="absolute top-16 left-1/4" delay={0} />
                <StarElement className="absolute top-20 right-1/3" delay={200} />
                <StarElement className="absolute top-1/3 left-1/6" delay={400} />
                <StarElement className="absolute top-1/3 right-1/4" delay={600} />
                <StarElement className="absolute bottom-1/3 right-1/6" delay={800} />
                <StarElement className="absolute bottom-1/4 left-1/3" delay={1000} />
            </div>

            {/* Main content container */}
            <div className={`relative z-20 w-full h-full transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
                <div className="container mx-auto px-6 md:px-10 lg:px-16 pt-6">
                    {/* Logo with glow effect */}
                    <div className="mb-8 md:mb-12">
                        <div className="relative inline-block">
                            <Image
                                src={LOGO}
                                height={100}
                                width={80}
                                alt="IoSC-EDC Logo"
                                className="h-16 md:h-24 lg:h-28 w-auto object-contain hover:scale-110 transition-all duration-500 filter drop-shadow-2xl"
                                style={{
                                    filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))',
                                }}
                            />
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl -z-10"></div>
                        </div>
                    </div>

                    {/* Hero heading with premium styling */}
                    <div className="mb-8 md:mb-12">
                        <h1 className={`${orbitron.className} text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-tight`}>
                            <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent hover:from-blue-200 hover:to-purple-200 transition-all duration-700 animate-fade-in-up">
                                WE'RE IoSC-EDC
                            </span>
                            <span className="block mt-2 md:mt-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-300">
                                A FUTURE-FOCUSED,
                            </span>
                            <span className="block mt-2 md:mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-500">
                                TECH-DRIVEN COMMUNITY
                            </span>
                        </h1>
                    </div>

                    {/* Hero image with glassmorphism container */}
<div className="relative mb-8 md:mb-12 flex justify-center">
  <div className="relative p-6 md:p-10 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500 group">

    <div
      className="w-80 md:w-[40rem] aspect-[4/3] bg-center bg-no-repeat transition-all duration-700 group-hover:scale-105 group-hover:rotate-2 group-hover:-translate-y-1 rounded-2xl"
      style={{
        backgroundImage: `url(${HEROSECTIONIMAGE.src})`,
        backgroundSize: "cover", // fills the box, slight crop if needed
        filter: "drop-shadow(0 20px 40px rgba(59, 130, 246, 0.3))",
      }}
    />

    {/* Floating elements around image */}
    <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/30 rounded-full blur-sm animate-[float_3s_ease-in-out_infinite]"></div>
    <div className="absolute -top-6 -right-2 w-6 h-6 bg-purple-500/30 rounded-full blur-sm animate-[float_4s_ease-in-out_infinite]"></div>
    <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-pink-500/30 rounded-full blur-sm animate-[float_5s_ease-in-out_infinite]"></div>
  </div>
</div>


                    {/* Content text with premium styling */}
                    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
                        <div className="relative p-6 md:p-8 rounded-2xl backdrop-blur-md bg-gradient-to-r from-white/5 to-white/10 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-700">
                            <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed md:leading-loose text-gray-100">
                                The <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">IoSC</span> is a community full of people who love technology oriented towards innovative
                                development in various fields from design, system integration, game development, robotics, web, management, etc—and
                                build a platform through which <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-semibold">they will learn, try their hands-on experience, and excel.</span>
                            </p>
                        </div>

                        <div className="relative p-6 md:p-8 rounded-2xl backdrop-blur-md bg-gradient-to-r from-white/5 to-white/10 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-900">
                            <p className="text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed md:leading-loose text-gray-100">
                                Our mission is to bring <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold">hands-on education</span> based on collaboration and real-life problem-solving through workshops,
                                hackathons, coding competitions, and networking sessions. With those, we equip our members with contemporary skills and
                                industry insights.
                            </p>
                        </div>
                    </div>


                </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3000}ms`,
                            animationDuration: `${2000 + Math.random() * 2000}ms`,
                        }}
                    />
                ))}
            </div>

            {/* Optional: Enhanced popup notification */}
            {/*
            {showPopup && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 ease-out ${
                    showPopup ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95'
                }`}>
                    <Link href="/eventPage">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-sm md:text-base shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20 backdrop-blur-sm">
                                <span className="flex items-center gap-2">
                                    <span className="animate-bounce">🎉</span>
                                    <span>Register for Our Upcoming Tech Event!</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
            */}

            {/* Ambient light effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>

            {/* Interactive gradient mesh */}
            <div
                className="absolute inset-0 opacity-20 transition-all duration-300"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                }}
            />
        </section>
    )
}

export default HeroSection;