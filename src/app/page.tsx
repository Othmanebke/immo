"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import FeaturedSpaces from "@/components/FeaturedSpaces";
import Process from "@/components/Process";
import Lifestyle from "@/components/Lifestyle";
import Press from "@/components/Press";
import Quotes from "@/components/Quotes";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ScrollProgress from "@/components/ScrollProgress";

const HorizontalGallery = dynamic(() => import("@/components/HorizontalGallery"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      {/* Film grain */}
      <div className="noise" aria-hidden />

      {/* Preloader */}
      {!ready && <Preloader onComplete={onDone} />}

      {/* Custom cursor */}
      <CustomCursor />

      {ready && (
        <SmoothScroll>
          <ScrollProgress />
          <div style={{ background: "var(--warm-black)" }}>
            <Navigation />
            <main>
              <Hero />
              <Marquee />
              <Manifesto />
              <Services />
              <FeaturedSpaces />
              <Marquee />
              <HorizontalGallery />
              <Process />
              <Lifestyle />
              <Press />
              <Quotes />
              <Marquee inverted />
              <CTA />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
