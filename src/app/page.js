'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/heroSecton";
import NavBar from "@/components/navBar";
import LoadingScreen from "@/components/loadingScreen";
import EVENTPHOTO from "@/assets/events/dock-up.jpg";
// Dynamically import Chatbot to prevent hydration issues
const Chatbot = dynamic(() => import("../components/Chatbot"), {
  ssr: false,
  loading: () => null
});

const EventNotification = dynamic(() => import("@/components/EventNotification"), {
  ssr: false,
  loading: () => null
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if user has visited before (but only on client side)
    const alreadyShown = typeof window !== 'undefined' ? sessionStorage.getItem("hasVisited") : null;

    if (!alreadyShown) {
      setLoading(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("hasVisited", "true");
      }
      const timer = setTimeout(() => setLoading(false), 8000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);
  

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }
   const event = {
    id: "===",
    title: "DOCK-UP",
    description:
      "Speaker session as well as club orientation",
    date: "Aug 29, 2025 • Offline",
    ctaUrl: "/eventRegistration",
    image: EVENTPHOTO,
    neverShowAgainDays: 30,
  };

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          {isClient && <EventNotification 
            event={event} 
            position="bottom-center" />
          }
          <NavBar />
          <HeroSection />
          <Chatbot />
        </>
      )}
    </>
  );
}
