'use client';
import { useEffect, useState } from "react";
import HeroSection from "@/components/heroSecton";
import NavBar from "@/components/navBar";
import LoadingScreen from "@/components/loadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("hasVisited");
    if (!alreadyShown) {
      setLoading(true);
      sessionStorage.setItem("hasVisited", "true");
      const timer = setTimeout(() => setLoading(false), 8000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);
  
  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <NavBar />
          <HeroSection />
        </>
      )}
    </>
  );
}