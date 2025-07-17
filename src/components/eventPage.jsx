'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import STARS from '@/assets/stars.png';
import './flipcard.css';

const EventPage = () => {
  const router = useRouter();
  const eventData = useMemo(() => ({
    title: 'IoSC-EDC Demo Tech Event',
    tagline: 'Build. Learn. Ship. Together.',
    about: `Welcome to our demo event page! Use this as a base layout for any club
event—hackathons, workshops, bootcamps, speaker sessions, anything. The content
scales from mobile to large screens and keeps the visual language of your Events
section without cloning it.`,
    longDesc: `Participants collaborate in small teams to solve real problems using
modern tools—web, AI, design, and more. Mentors guide you, we provide infra,
and you demo what you built at the end. Beginner friendly. Industry aligned.`,
    highlights: [
      'Hands-on, mentor-led build sessions.',
      'Team-based rapid prototyping.',
      'Beginner friendly tracks + advanced challenges.',
      'Showcase + feedback from industry guests.',
      'Swag, certificates, and community points.',
    ],
    meta: {
      date: 'September 14–15, 2025',
      mode: 'On-campus (Hybrid support)',
      venue: 'GGSIPU, Delhi',
      teamSize: 'Solo or up to 4',
      regDeadline: 'September 05, 2025',
    },
    images: [null, null],
    imageAlts: ['Demo Image 1', 'Demo Image 2'],
    imageBackText: [
      'Flip to see more event info. Replace these cards with your own photos.',
      'Use high-energy shots: teams coding, speaker sessions, winners.',
    ],
  }), []);

  const handleRegister = () => router.push('/eventRegistration');

  return (
    <section className="bg-black w-full min-h-screen pt-10 pb-24 overflow-hidden text-white">
      <div className="w-full flex items-center justify-center">
        <div className="w-[90%] max-w-[400px] relative flex items-center justify-center">
          <div
            className="absolute left-[-50px] top-[-50px] w-40 h-40 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <div
            className="absolute right-[-70px] top-[-90px] w-40 h-40 bg-no-repeat bg-contain z-0 animate-sprinkle filter brightness-150 delay-1000"
            style={{ backgroundImage: `url(${STARS.src})` }}
          />
          <h2 className="text-center font-extrabold text-4xl md:text-6xl text-sky-400 mb-10 relative z-10">
            EVENT DETAILS
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        {/* <div className="w-[90%] md:w-[80%] min-h-[450px] lg:h-[400px] rounded-2xl bg-gray-400/20 border border-gray-600 grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-4 py-6 backdrop-blur-sm">
          <div className="text-center text-2xl md:text-4xl lg:text-5xl font-extrabold text-sky-400 flex justify-center items-center px-2">
            {eventData.title}
          </div>
          {eventData.images.map((imgSrc, idx) => (
            <div
              key={idx}
              className="flip-card w-full h-[250px] md:h-[300px] lg:h-[90%] rounded-xl overflow-hidden shadow-lg"
            >
              <div className="flip-card-inner w-full h-full">
                <div className="flip-card-front w-full h-full">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={eventData.imageAlts[idx]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 text-xs md:text-base text-gray-300">
                      Image Coming Soon
                    </div>
                  )}
                </div>
                <div className="flip-card-back w-full h-full flex items-center justify-center bg-black text-white text-center p-3 text-xs md:text-base">
                  <p>{eventData.imageBackText[idx]}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="w-[90%] md:w-[80%] grid gap-4 sm:grid-cols-2 lg:grid-cols-5 text-center text-sm md:text-base">
          <MetaBox label="Date" value={eventData.meta.date} />
          <MetaBox label="Mode" value={eventData.meta.mode} />
          <MetaBox label="Venue" value={eventData.meta.venue} />
          <MetaBox label="Team Size" value={eventData.meta.teamSize} />
          <MetaBox label="Registration Ends" value={eventData.meta.regDeadline} />
        </div>
        <div className="w-[90%] md:w-[70%] mt-12 text-gray-300 text-base md:text-lg leading-relaxed space-y-6">
          <p className="text-sky-300 font-semibold text-lg md:text-xl text-center">
            {eventData.tagline}
          </p>
          <p>{eventData.about}</p>
          <p>{eventData.longDesc}</p>
        </div>
        <div className="w-[90%] md:w-[60%] mt-10">
          <h3 className="text-xl md:text-2xl font-bold text-sky-400 mb-4 text-center">
            Why Join?
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-base md:text-lg">
            {eventData.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        <div className="w-full mt-16 text-center">
          <button
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl transition duration-300"
          >
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};

const MetaBox = ({ label, value }) => (
  <div className="border border-gray-700 rounded-xl p-4 bg-gray-800/40">
    <p className="text-sky-400 text-xs md:text-sm uppercase tracking-wide">{label}</p>
    <p className="mt-1 font-semibold text-white">{value}</p>
  </div>
);

export default EventPage;
