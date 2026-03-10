"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

import Preloader          from "@/components/Preloader";
import CustomCursor       from "@/components/CustomCursor";
import Navigation         from "@/components/Navigation";
import Hero               from "@/components/Hero";
import Marquee            from "@/components/Marquee";
import FeaturedProperties from "@/components/FeaturedProperties";
import About              from "@/components/About";
import Services           from "@/components/Services";
import Testimonials       from "@/components/Testimonials";
import CTA                from "@/components/CTA";
import Footer             from "@/components/Footer";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <CustomCursor />
      {!ready && <Preloader onComplete={onDone} />}

      {ready && (
        <SmoothScroll>
          <div style={{ background: "var(--ivory)" }}>
            <Navigation />
            <main>
              <Hero />
              <Marquee />
              <FeaturedProperties />
              <About />
              <Marquee inverted />
              <Services />
              <Testimonials />
              <CTA />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
