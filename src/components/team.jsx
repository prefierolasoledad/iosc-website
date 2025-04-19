import React from 'react';
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import STARS from "@/assets/stars.png";
import { FaArrowRightLong } from "react-icons/fa6";
import './sprinkleAnimation.css';


import I3 from '@/assets/teamBg/i3.png';
import I5 from '@/assets/teamBg/i5.png';
import I7 from '@/assets/teamBg/i7.png';
import I9 from '@/assets/teamBg/i9.png';
import ULTRA from '@/assets/teamBg/Ultra.png';
import ARC from '@/assets/teamBg/Arc.png';

import PARTHAWASTHI from "@/assets/team/leads/Parth Awasthi.jpg";
import DIPTISINGH from "@/assets/team/leads/Dipti singh.jpg";
import AKSHATSARASWAT from "@/assets/team/leads/AKSHAT SARASWAT.jpg";
import JAYTOMAR from "@/assets/team/leads/Jay Tomar.jpg";
import ISHANGUPTA from "@/assets/team/leads/Ishan Gupta.jpg";

import ARYANSACHAN from "@/assets/team/i3/Aryan Sachan.jpg";
import KARANBHATT from "@/assets/team/i3/KARAN BHATT.jpg";
import RAHULBHATIA from "@/assets/team/i3/Rahul Bhatia.jpeg";
import MAYANKBISHT from '@/assets/team/i3/Mayank Bisht.jpg';

import AMOGHGUPTA from "@/assets/team/i5/Amogh Gupta.jpg";
import MAYANKSHARMA from "@/assets/team/i5/Mayank_sharma.jpg";
import OCEANBHATNAGAR from "@/assets/team/i5/Ocean Bhatnagar.jpg";
import SAMARTHYADAV from "@/assets/team/i5/Samarth Yadav.jpg";
import PRATHAMKUMAR from "@/assets/team/i5/Pratham Kumar.jpg";
import UTSAVKUMAR from "@/assets/team/i5/Utsav Kumar.jpg";
import WAQARAKHTAR from "@/assets/team/i5/Waqar Akhtar.jpeg";

import AKSHITSHARMA from '@/assets/team/i7/AKSHIT SHARMA.jpg';

import KHUSHITHAKUR from '@/assets/team/arc/Khushi_Thakur.jpg';
import PARIDUDEJA from '@/assets/team/arc/Pari Dudeja.jpg';
import KRITIRASTOGI from '@/assets/team/arc/KritiRastogi.jpg';
import ALISHAGODARA from '@/assets/team/arc/AlishaGodara.png';
import SANCHITNARANG from '@/assets/team/arc/SanchitNarang.jpeg';

import UTKARSHCHAUHAN from '@/assets/team/i9/utkarsh chauhan.jpg';
import AKSHATTALWAR from '@/assets/team/i9/Akshat talwar.jpg';
import DISHITASINHA from '@/assets/team/i9/Dishita Sinha.jpeg';
import HARSHITNEGI from '@/assets/team/i9/Harshit Negi.jpg';
import PARTHMAWAI from '@/assets/team/i9/Parth Mawai.jpg';
import PIYUSHGUPTA from '@/assets/team/i9/PIYUSH GUPTA.jpg';
import PRIYACHAURASIA from '@/assets/team/i9/Priya Chaurasia.jpg';
import RICHIKDAS from '@/assets/team/i9/Richik Das.png';

import YASHGUPTA from "@/assets/team/ultra/Yash Gupta.jpg";
import VASUTOHANGAR from "@/assets/team/ultra/Vasu_Tohangar.jpg";
import ARMAAN from "@/assets/team/ultra/Armaan.jpg";
import DIPANSHUSAROVAR from "@/assets/team/ultra/Dipanshu Sarovar.jpg";

const Connector = ({ direction }) => {
    return (
        <div className="flex">
            {direction === "left" && (
                <>
                    <div className="w-1 h-[50%] ml-[50%] self-end bg-gray-300" />
                    <div className="w-[50%] h-1 self-center bg-gray-300" />
                </>
            )}
            {direction === "right" && (
                <>
                    <div className="w-[50%] h-1 self-center bg-gray-300" />
                    <div className="w-1 h-[50%] self-end bg-gray-300" />
                </>
            )}
        </div>
    );
};

const CenterNode = ({ align = "center" }) => {
    const justify = align === "center" ? "justify-center" : "justify-start pl-[20%]";
    return (
        <div className={`w-full h-1 bg-gray-300 flex ${justify} items-center`}>
            <div className="w-14 h-14 bg-sky-400 rounded-2xl" />
        </div>
    );
};




const TeamSection = ({ layout,data }) => (

    <div className="w-full h-[70vh] border-2 grid grid-cols-3">
        {layout.map((item, index) => {
            if (item === "connector-left") return <Connector direction="left" key={index} />;
            if (item === "connector-right") return <Connector direction="right" key={index} />;
            if (item === "center-node-left") return <div className="flex justify-center items-center" key={index}><CenterNode align="start" /></div>;
            if (item === "center-node") return <div className="flex ml-[-10%] justify-center items-center" key={index}><CenterNode /></div>;
            if (item === "white-box") return <WhiteBox key={index}  data={data} isFillable={true}/>;
            return <div key={index}/>;
        })}
    </div>
);

const WhiteBox = ({ data,isFillable }) => {
    return (
      <div className={`${isFillable?'flip-card':''} w-[330px] sm:w-[370px] h-[460px]`}>
        <div className="flip-card-inner">
          <div className="flip-card-front bg-white rounded-2xl w-full h-full flex flex-col items-center justify-center">
            <div className='w-[80%] h-[70%] bg-gray-300 border-2 border-gray-500 rounded-xl overflow-hidden flex items-center justify-center'>
              {data.image ? (
                <Image
                  src={data.image}
                  alt={data.Name}
                  width="100%"
                  height="100%"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-sm">No Image</div>
              )}
            </div>
            <div className='grid grid-cols-3 w-[80%] h-3 mt-2'>
              <div className='w-full h-20 col-span-2 flex flex-col justify-center pt-2 font-bold'>
                <h3 className="text-lg text-gray-800">{data.Name}</h3>
                <p className="text-sm text-gray-600">{data.Position}</p>
              </div>
              <div className='w-full h-20 flex flex-row justify-end items-end pb-5 pr-2'>
                {data.github && (
                  <a href={data.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className='text-2xl text-gray-700 hover:text-black mr-3 cursor-pointer' />
                  </a>
                )}
                {data.linkedin && (
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn className='text-2xl text-gray-700 hover:text-black cursor-pointer' />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flip-card-back bg-gray-100 rounded-2xl p-4 text-gray-800 flex items-center justify-center text-center">
            {data.quote ? (
              <p className="text-xl font-bold">"{data.quote}"</p>
            ) : (
              <p className="text-md font-bold text-gray-500">No additional info available.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

const Teams = () => {
    const sections = [
        ["connector-left", "center-node-left", "white-box"],
        ["white-box", "center-node", "connector-right"],
        ["connector-left", "center-node-left", "white-box"],
        ["white-box", "center-node", "connector-right"],
        ["", "", "white-box"],
    ];

    const leadsName = [
      {
        Name: "PARTH AWASTHI",
        Position: "Lead",
        image: PARTHAWASTHI,
        quote: "Leadership is not about a title or a designation. It’s about impact, influence, and inspiration.",
      },
      {
        Name: "DIPTI SINGH",
        Position: "Co-Lead",
        image: DIPTISINGH,
        quote: "The future belongs to those who believe in the beauty of their dreams.",
      },
      {
        Name: "JAY TOMAR",
        Position: "Technical Lead",
        image: JAYTOMAR,
        quote: "Don't watch the clock; do what it does. Keep going.",
      },
      {
        Name: "AKSHAT SARASWAT",
        Position: "Technical Co-Lead",
        image: AKSHATSARASWAT,
        quote: "Success is the sum of small efforts, repeated day in and day out.",
      },
      {
        Name: "ISHAN GUPTA",
        Position: "Technical Co-Lead",
        image: ISHANGUPTA,
        quote: "You were born to stand out, not blend in",
      },
    ];
    

    const events = [
        {
          title: "TEAM i3",
          image: I3.src,
          Members: [
            {
                "Name":"ARYAN SACHAN",
                "Position":"Core Member",
                image:ARYANSACHAN,
                github:'https://github.com/AryanSachan12'
            },
            {
                "Name":"KARAN BHATT",
                "Position":"Core Member",
                image:KARANBHATT,
                github:'https://github.com/prefierolasoledad'
            },
            {
              "Name":"RAHUL BHATIA",
              "Position":"Core Member",
              image:RAHULBHATIA
            },
            {
              "Name":"MAYANK BISHT",
              "Position":"Core Member",
              image:MAYANKBISHT,
              github:'https://github.com/mayankbisht-tech'
            }
          ]
        },
        {
          title: "TEAM i5",
          image: I5.src,
          Members: [
            {
                "Name":"AMOGH GUPTA",
                "Position":"Core Member",
                image:AMOGHGUPTA
            },
            {
                "Name":"MAYANK SHARMA",
                "Position":"Core Member",
                image:MAYANKSHARMA
            },
            {
                "Name":"OCEAN BHATNAGAR",
                "Position":"Core Member",
                image:OCEANBHATNAGAR
            },
            {
                "Name":"SAMARTH YADAV",
                "Position":"Core Member",
                image:SAMARTHYADAV
            },
            {
              "Name":"PRATHAM KUMAR",
              "Position":"Core Member",
              image:PRATHAMKUMAR,
              github:'https://github.com/Pratham0511'
          },
          {
              "Name":"UTSAV KUMAR",
              "Position":"Core Member",
              image:UTSAVKUMAR,
              github:'https://github.com/Utsav-Kumar19'
          },
          {
              "Name":"WAQAR AKHTAR",
              "Position":"Core Member",
              image:WAQARAKHTAR,
              github:'https://github.com/Waqar080206'
          },
          ]
        },
        {
            title: "TEAM i7",
            image: I7.src,
            Members: [
              {
                  "Name":"AKSHIT SHARMA",
                  "Position":"Core Member",
                  image:AKSHITSHARMA
              }
            ]
          },
          {
            title: "TEAM ARC",
            image: ARC.src,
            Members: [
              {
                "Name":"KHUSHI THAKUR",
                "Position":"Core Member",
                image:KHUSHITHAKUR
              },
              {
                "Name":"PARI DUDEJA",
                "Position":"Core Member",
                image:PARIDUDEJA,
                github:'https://github.com/pari-dudeja2005'
              },
              {
                  "Name":"KRITI RASTOGI",
                  "Position":"Core Member",
                  image:KRITIRASTOGI,
                  github:'https://github.com/kritirastogi1501'
              },
              {
                "Name":"ALISHA GODARA",
                "Position":"Core Member",
                image:ALISHAGODARA
              },
              {
              "Name":"SANCHIT NARANG",
              "Position":"Core Member",
              image:SANCHITNARANG
              },
            ]
          },
        {
            title: "TEAM i9",
            image: I9.src,
            Members: [
              {
                "Name":"UTKARSH CHAUHAN",
                "Position":"Core Member",
                image:UTKARSHCHAUHAN,
                github:'https://github.com/utkarsh-chauhannn'
              },
              {
                  "Name":"AKSHAT TALWAR",
                  "Position":"Core Member",
                  image:AKSHATTALWAR,
                  github:'https://github.com/akshattalwar001'
              },
              {
                  "Name":"DISHITA SINHA",
                  "Position":"Core Member",
                  image:DISHITASINHA,
                  github:'https://github.com/Dsinha04'
              },
              {
                "Name":"HARSHIT NEGI",
                "Position":"Core Member",
                image:HARSHITNEGI,
                github:'https://github.com/Harshit-Negi27'
              },
              {
                  "Name":"PARTH MAWAI",
                  "Position":"Core Member",
                  image:PARTHMAWAI,
                  github:'https://github.com/parthmawai'
              },
              {
                "Name":"PIYUSH GUPTA",
                "Position":"Core Member",
                image:PIYUSHGUPTA,
                github:'https://github.com/Piyush-xo-19',
            },
            {
                "Name":"PRIYA CHAURASIA",
                "Position":"Core Member",
                image:PRIYACHAURASIA,
                github:'https://github.com/NoticeableStar/sashakti_app'
            },
            {
              "Name":"RICHIK DAS",
              "Position":"Core Member",
              image:RICHIKDAS,
              github:'https://github.com/Richik06'
            },
            ]
          },
          {
            title: "TEAM ULTRA",
            image: ULTRA.src,
            Members: [
                {
                    "Name":"YASH GUPTA",
                    "Position":"Core Member",
                    image:YASHGUPTA
                },
                {
                    "Name":"VASU TOHANGAR",
                    "Position":"Core Member",
                    image:VASUTOHANGAR
                },
                {
                  "Name":"ARMAAN",
                  "Position":"Core Member",
                  image:ARMAAN
              },
              {
                  "Name":"DIPANSHU SAROVAR",
                  "Position":"Core Member",
                  image:DIPANSHUSAROVAR
              },
            ]
          },
      ];

    return (
        <section className="w-full pb-20 bg-black pt-10 flex flex-col items-center overflow-hidden">
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
                        TEAM
                    </h2>
                </div>
            </div>
            
            <div className="w-[80%] hidden lg:block h-[350vh] mt-10 mb-10">
                {sections?.map((layout, idx) => (
                    <TeamSection layout={layout} key={idx} data={leadsName[idx]}/>
                ))}
            </div>
            <div className="w-full block lg:hidden mt-10 mb-10">
                {leadsName?.map((data, idx) => (
                  <div key={idx} className='mb-10 w-full flex items-center justify-center'>
                    <WhiteBox key={idx} data={data} isFillable={true}/>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-10 items-center mt-10 w-full">
                {events?.map((event, index) => (
                    <div
                    key={index}
                    className="w-[85%] md:w-[80%] h-[500px] rounded-2xl bg-gray-400 flex overflow-x-auto items-center scrollbar-hide gap-7 px-4 py-6"
                    >
                    <div className="text-center rounded-2xl h-full min-w-[300px] sm:min-w-[380px] flex-grow text-4xl md:text-6xl font-extrabold text-white flex flex-col gap-20 justify-center items-center"
                      style={{
                        backgroundImage:`url(${event.image})`,
                        backgroundSize:'contain',
                        backgroundPosition:'center',
                        backgroundRepeat:'no-repeat'
                      }}
                    
                    >
                        <h1 className='mt-10'>
                          
                        </h1>
                          <div className='text-xl sm:hidden flex items-center'>
                            Swipe <FaArrowRightLong className='ml-2'/>
                          </div>
                        
                    </div>

                    {event?.Members?.map((member, idx) => (
                        <div key={idx} className='h-full w-[370px]'>
                            <WhiteBox key={idx} data={member} isFillable={false}/>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Teams;
