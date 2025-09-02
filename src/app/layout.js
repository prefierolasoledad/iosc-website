'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import EVENTPHOTO from "@/assets/events/azientek.jpg";

// Dynamically import EventNotification to avoid hydration issues
const EventNotification = dynamic(() => import("@/components/EventNotification"), {
  ssr: false,
  loading: () => null
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <html lang="en">
      <head>
        <title>IoSC-EDC</title>
        <meta name="description" content="The IoSC-EDC is the official Student Club at GGSIPU. We host tech events, hackathons, and workshops to foster innovation and help students become job creators. Our mission is to provide a platform for students to gain hands-on experience, learn from industry experts, and develop the entrepreneurial mindset needed to succeed." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}