'use client';
import { useState } from "react";

import LOGO from "@/assets/logo.png";
import Link from "next/link";

const NavBar = () => {

    const [showNavigation, setShowNavigation]=useState(false);

  return (
    <section>
        <nav className="fixed w-full flex justify-between pl-10 pr-10 pt-5 z-[1000] h-20">
            <div
                className="w-40 h-full bg-no-repeat bg-contain bg-left"
                style={{
                backgroundImage: `url(${LOGO.src})`,
                }}
            />
            <button onClick={()=>{setShowNavigation(!showNavigation)}} className="bg-sky-400 text-white font-bold text-2xl pl-5 pr-5 h-11 rounded-4xl hover:bg-sky-600 hover:cursor-pointer">
                {showNavigation?"CLOSE":"MENU"}
            </button>
        </nav>
        <div
        className={`
          fixed top-0 left-0 w-full h-full text-white font-extrabold pt-32 pl-10 text-6xl bg-black/95 z-[999]
          transform transition-transform duration-500 ease-in-out
          ${showNavigation ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <p className="mb-5">
            <Link href="/">
                Home
            </Link>
        </p>
        <p className="mb-5">
            <Link href="/events">
                Events
            </Link>
        </p>
        <p className="mb-5"/>
        <p className="mb-5">
            <Link href="/alumini">
                Alumini
            </Link>
        </p>
        <p className="mb-5">
            <Link href="/team">
                Team
            </Link>
        </p>
        <p className="mb-5">
            <Link href="/projects">
                Projects
            </Link>
        </p>
        <p className="mb-5">
            <Link href="/blogs">
                Blogs
            </Link>
        </p>
        <p>
            <Link href="/contactUs">
                Contact US
            </Link>
        </p>
      </div>
    </section>
  );
};

export default NavBar;
