import HEROSECTIONIMAGE from "@/assets/background-herosection.gif"
import STARS from "@/assets/stars.png";
import './sprinkleAnimation.css';

const HeroSection=()=>{
    return(
        <section className="w-full h-[200vh] md:h-[100vh] overflow-hidden bg-black flex flex-col-reverse md:flex-row justify-center">
            <div className="w-full md:w-[50%] h-full bg-no-repeat bg-contain flex justify-center"
                style={{
                    backgroundImage: `url(${HEROSECTIONIMAGE.src})`,
                    backgroundSize:'130% 130%',
                    backgroundPosition:'60% 30%'
                }}
            />

            <div className="md:w-[50%] text-center md:text-left w-full h-full bg-no-repeat pt-30 md:pt-20 xl:pt-14 text-white" >
                <div className="relative flex items-center justify-center w-full md:ml-[-12%]">
                    {/* Left Star Background */}
                    <div
                    className="absolute md:left-[-120px] left-[-20px] mt-5 md:mt-10 w-50 h-50 md:w-70 md:h-70 z-0 animate-sprinkle filter brightness-150"
                    style={{
                        backgroundImage: `url(${STARS.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        opacity: 0.8,
                    }}
                    />

                    {/* Right Star Background */}
                    <div
                    className="absolute right-[-140px] mt-4 w-70 h-70 z-0 animate-sprinkle filter brightness-150 delay-1000"
                    style={{
                        backgroundImage: `url(${STARS.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        opacity: 0.8,
                    }}
                    />
                    {/* Main Heading */}
                    <h1 className="text-sky-400 text-5xl md:text-7xl  xl:text-9xl font-extrabold text-center relative z-10">
                        WE ARE<br/> IOSC-EDC
                    </h1>
                </div>
                <p className="pt-10 md:pr-10 pr-5 pl-5 md:pl-0 lg:text-lg">
                    The Intel OneAPI Student Club (IoSC)  is a community full of people who love technology oriented towards innovative 
                    development in various fields-from design, system integration, game development, robotics, web, management, etc-and 
                    build a platform through which they will learn, try their hands-on experience, and excel.
                </p>
                <p className="pt-5 md:pr-10 pr-5 pl-5 md:pl-0 lg:text-lg">
                    Our mission is to bring hands-on education based on collaboration and real-life problem-solving through workshops, 
                    hackathons, coding competitions, and networking sessions. With those, we equip our own with contemporary skills and 
                    industry insight.
                </p>
                <p className="pt-5 md:pr-10 pr-5 pl-5 md:pl-0 lg:text-lg">
                    Whether you're a developer, designer, or tech strategist just starting out or wanting to learn from other peers in the 
                    field, our club welcomes anyone interested in learning and  innovating.
                </p>
            </div>
        </section>
    );
}

export default HeroSection;