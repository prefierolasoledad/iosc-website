import LOGO from "@/assets/bg-design.png";

//src\assets\hersosection-image.png
import HEROSECTIONIMAGE from "@/assets/hersosection-image.png"

const HeroSection=()=>{
    return(
        <section className="w-full h-[100vh] bg-black flex flex-row justify-center">
            {/* <div className="w-[50%] h-full bg-no-repeat bg-contain bg-left">

            </div>
            <div className="w-[50%] h-full flex flex-row">
                <div
                    className="w-40 h-40 bg-no-repeat bg-contain bg-left"
                    style={{
                        backgroundImage: `url(${LOGO.src})`,
                    }}
                />
                <div
                    className="w-40 h-40 bg-no-repeat bg-contain bg-left"
                    style={{
                        backgroundImage: `url(${LOGO.src})`,
                    }}
                />
            </div> */}
            <div className="w-[50%] h-full bg-no-repeat bg-contain flex justify-center"
                style={{
                    backgroundImage: `url(${HEROSECTIONIMAGE.src})`,
                    backgroundSize:'50% 70%',
                    backgroundPosition:'50% 80%'
                }}
            />

            <div className="w-[50%] h-full bg-no-repeat pt-14 text-white" >
                <h1 className="text-sky-400 text-9xl font-extrabold">
                    WE ARE IOSC-EDC
                </h1>
                <p className="pt-10 pr-10 text-lg">
                    The Intel OneAPI Student Club (IoSC)  is a community full of people who love technology oriented towards innovative 
                    development in various fields-from design, system integration, game development, robotics, web, management, etc-and 
                    build a platform through which they will learn, try their hands-on experience, and excel.
                </p>
                <p className="pt-5 pr-10 text-lg">
                    Our mission is to bring hands-on education based on collaboration and real-life problem-solving through workshops, 
                    hackathons, coding competitions, and networking sessions. With those, we equip our own with contemporary skills and 
                    industry insight.
                </p>
                <p className="pt-5 pr-10 text-lg">
                    Whether you're a developer, designer, or tech strategist just starting out or wanting to learn from other peers in the 
                    field, our club welcomes anyone interested in learning and  innovating.
                </p>
            </div>
        </section>
    );
}

export default HeroSection;