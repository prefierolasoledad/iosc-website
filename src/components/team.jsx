import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import STARS from "@/assets/stars.png";
import './sprinkleAnimation.css';

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

const WhiteBox = ({data}) => {
    return(
        <div className="w-[370px] h-full bg-white flex flex-col items-center justify-center" >
            <div className='w-[80%] h-[70%] bg-gray-300 border-2 border-gray-500'>

            </div>
            <div className=' grid grid-cols-2 w-[80%] h-3'>
                <div className='w-full h-20 flex flex-col justify-center  pt-2 font-bold'>
                    <h3>
                        {data.Name}
                    </h3>
                    <p>
                        {data.Position}
                    </p>
                </div>
                <div className='w-full h-20 flex flex-row justify-end items-end pb-2 pr-2 font-bold'>
                    <FaGithub className='text-4xl mr-5'/>
                    <FaLinkedinIn className='text-4xl'/>
                </div>
            </div>

        </div>
    )
};

const TeamSection = ({ layout,data }) => (

    <div className="w-full h-[70vh] border-2 grid grid-cols-3">
        {layout.map((item, index) => {
            if (item === "connector-left") return <Connector direction="left" key={index} />;
            if (item === "connector-right") return <Connector direction="right" key={index} />;
            if (item === "center-node-left") return <div className="flex justify-center items-center" key={index}><CenterNode align="start" /></div>;
            if (item === "center-node") return <div className="flex justify-center items-center" key={index}><CenterNode /></div>;
            if (item === "white-box") return <WhiteBox key={index}  data={data}/>;
            return <div key={index}/>;
        })}
    </div>
);

const Teams = () => {
    const sections = [
        ["connector-left", "center-node-left", "white-box"],
        ["white-box", "center-node", "connector-right"],
        ["connector-left", "center-node-left", "white-box"],
        ["white-box", "", ""],
    ];

    const leadsName=[
        {
            Name:"XYZ",
            Position:"Lead"
        },
        {
            Name:"XYZ",
            Position:"Co-Lead"
        },
        {
            Name:"XYZ",
            Position:"Technical Lead"
        },
        {
            Name:"XYZ",
            Position:"Technical Co-Lead"
        },
    ];

    const events = [
        {
          title: "TEAM i3",
          Members: [
            {
                "Name":"XYZ",
                "Position":"Lead"
            },
            {
                "Name":"XYZ",
                "Position":"Co-Lead"
            },
            {
                "Name":"XYZ",
                "Position":"Lead"
            },
            {
                "Name":"XYZ",
                "Position":"Co-Lead"
            },
            {
                "Name":"XYZ",
                "Position":"Lead"
            },
            {
                "Name":"XYZ",
                "Position":"Co-Lead"
            }
          ]
        },
        {
          title: "TEAM i5",
          Members: [
            {
                "Name":"XYZ",
                "Position":"Lead"
            },
            {
                "Name":"XYZ",
                "Position":"Co-Lead"
            }
          ]
        },
        {
            title: "TEAM i7",
            Members: [
              {
                  "Name":"XYZ",
                  "Position":"Lead"
              },
              {
                  "Name":"XYZ",
                  "Position":"Co-Lead"
              }
            ]
          },
          {
            title: "TEAM ARC",
            Members: [
              {
                  "Name":"XYZ",
                  "Position":"Lead"
              },
              {
                  "Name":"XYZ",
                  "Position":"Co-Lead"
              }
            ]
          },
        {
            title: "TEAM i9",
            Members: [
              {
                  "Name":"XYZ",
                  "Position":"Lead"
              },
              {
                  "Name":"XYZ",
                  "Position":"Co-Lead"
              }
            ]
          },
          {
            title: "TEAM ULTRA",
            Members: [
              {
                  "Name":"XYZ",
                  "Position":"Lead"
              },
              {
                  "Name":"XYZ",
                  "Position":"Co-Lead"
              }
            ]
          },
      ];

    //   const activeEvent = events.find((e) => e.title === event);

    return (
        <section className="w-full h-[490vh] bg-black pt-10 flex flex-col items-center">
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
            
            {/* <div className="w-[80%] h-[300vh] mt-10 mb-10">
                {sections.map((layout, idx) => (
                    <TeamSection layout={layout} key={idx} data={leadsName[idx]}/>
                ))}
            </div> */}
            <div className="flex flex-col gap-10 items-center mt-10 w-full">
                {events.map((event, index) => (
                    <div
                    key={index}
                    className="w-[90%] md:w-[80%] h-[500px] rounded-2xl bg-gray-400 flex overflow-x-auto items-center scrollbar-hide gap-7 px-4 py-6"
                    >
                    <div className="text-center h-full min-w-[380px] flex-grow text-4xl md:text-6xl font-extrabold text-white flex justify-center items-center">
                        {event.title}
                    </div>

                    {event.Members.map((member, idx) => (
                        <div className='h-full w-[370px]'>
                            <WhiteBox key={idx} data={member} />
                        </div>
                    ))}
                    </div>
                ))}
            </div>


        </section>
    );
};

export default Teams;
