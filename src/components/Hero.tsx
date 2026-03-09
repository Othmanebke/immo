"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serif: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
};

function CharSplit({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span style={style} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
          <span className="sci" style={{ display: "inline-block" }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    const chars1 = line1Ref.current?.querySelectorAll(".sci");
    const chars2 = line2Ref.current?.querySelectorAll(".sci");

    gsap.set(overlayRef.current, { opacity: 0.75 });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(eyebrowRef.current, { opacity: 0, y: 14, duration: 0.7, ease: "power2.out" });

    if (chars1) {
      tl.from(chars1, { yPercent: 110, duration: 1.05, stagger: 0.022, ease: "power4.out" }, "-=0.3");
    }
    if (chars2) {
      tl.from(chars2, { yPercent: 110, duration: 1.05, stagger: 0.022, ease: "power4.out" }, "-=0.75");
    }

    tl.from(subRef.current, { opacity: 0, y: 22, duration: 0.85, ease: "power2.out" }, "-=0.5");
    tl.from(metaRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.5");
    tl.from(scrollRef.current, { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" }, "-=0.3");

    // Video parallax
    gsap.to(videoWrapRef.current, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
    });

    // Words parallax
    gsap.to(".hero-words", {
      y: 90,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1.2 },
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", width: "100%", height: "100vh", minHeight: "100svh", overflow: "hidden" }}
    >
      {/* Background */}
      <div ref={videoWrapRef} style={{ position: "absolute", top: "-10%", left: 0, right: 0, height: "120%", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, rgba(8,8,10,0.45) 0%, rgba(8,8,10,0.82) 55%, rgba(8,8,10,0.97) 100%)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Eyebrow */}
        <div ref={eyebrowRef} style={{ paddingTop: "clamp(96px, 13vh, 160px)", display: "flex", alignItems: "center", gap: "18px" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.4)" }}>
            Est. 2024
          </span>
          <span style={{ display: "block", width: "36px", height: "1px", background: "rgba(242,237,230,0.2)" }} />
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.4)" }}>
            Luxury Real Estate
          </span>
        </div>

        {/* Headline block */}
        <div className="hero-words" style={{ marginTop: "auto", paddingBottom: "clamp(56px, 10vh, 120px)" }}>

          {/* REAL ESTATE */}
          <div ref={line1Ref} style={{ lineHeight: 0.88, marginBottom: "0.03em" }}>
            <CharSplit
              text="REAL ESTATE"
              style={{
                ...serif,
                fontSize: "clamp(76px, 15.5vw, 230px)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                color: "var(--off-white)",
                display: "block",
              }}
            />
          </div>

          {/* REIMAGINED — italic, offset, bleeds right */}
          <div ref={line2Ref} style={{ lineHeight: 0.88, marginLeft: "clamp(36px, 7vw, 140px)", overflow: "visible" }}>
            <CharSplit
              text="REIMAGINED"
              style={{
                ...serif,
                fontSize: "clamp(76px, 15.5vw, 230px)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
                display: "block",
                background: "linear-gradient(120deg, #7a7a7a 0%, #c8c8c8 25%, #e4e4e4 42%, #9a9a9a 55%, #d4d4d4 70%, #888 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                whiteSpace: "nowrap",
              }}
            />
          </div>

          {/* Subtitle row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "clamp(24px, 3.5vh, 52px)" }}>
            <div ref={subRef} style={{ maxWidth: "340px" }}>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(11px, 1.1vw, 13px)", letterSpacing: "0.04em", lineHeight: 1.95, color: "rgba(242,237,230,0.45)", fontWeight: 300 }}>
                Architecture curated for those who understand<br />
                that space shapes identity.
              </p>
            </div>
            <div ref={metaRef} className="hidden md:flex" style={{ flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
              {["Paris", "Geneva", "Dubai"].map((c) => (
                <span key={c} style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.28)" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
      >
        <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.28)" }}>Scroll</span>
        <div style={{ width: "1px", height: "48px", background: "rgba(242,237,230,0.12)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "40%", background: "rgba(242,237,230,0.6)", animation: "scrollDrop 1.6s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`@keyframes scrollDrop {
        0%   { transform: translateY(-100%); opacity: 0; }
        20%  { opacity: 1; }
        100% { transform: translateY(250%); opacity: 0; }
      }`}</style>
    </section>
  );
}
