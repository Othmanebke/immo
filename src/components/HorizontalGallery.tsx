"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    title: "The Architecture of Silence",
    loc: "Paris",
    w: "360px", h: "72vh",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
    title: "Where Light Defines Space",
    loc: "Geneva",
    w: "520px", h: "58vh",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=80",
    title: "Brutalist Elevation",
    loc: "Zürich",
    w: "420px", h: "78vh",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=80",
    title: "Glass & Concrete",
    loc: "Dubai",
    w: "480px", h: "62vh",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80",
    title: "Minimal Living",
    loc: "Monaco",
    w: "380px", h: "70vh",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
    title: "Raw & Refined",
    loc: "Berlin",
    w: "440px", h: "65vh",
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.from(headerRef.current?.querySelectorAll(".h-el") ?? [], {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 80%" },
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getAmt = () => -(track.scrollWidth - window.innerWidth + 160);

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.abs(getAmt()) + window.innerHeight * 0.5}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.1,
        onUpdate(self) {
          gsap.set(track, { x: getAmt() * self.progress });
        },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ background: "var(--warm-black)", height: "100vh", overflow: "hidden", position: "relative" }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "clamp(80px, 10vh, 120px) clamp(24px, 5vw, 80px) 32px",
          background: "linear-gradient(to bottom, rgba(8,8,10,1) 0%, rgba(8,8,10,0) 100%)",
          pointerEvents: "none",
        }}
      >
        <div>
          <span className="h-el" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)", display: "block", marginBottom: "14px" }}>
            03 / Gallery
          </span>
          <h2 className="h-el" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(48px, 7.5vw, 110px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.9, color: "var(--off-white)" }}>
            Spatial<br />
            <em style={{ background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Studies</em>
          </h2>
        </div>
        <div className="h-el hidden md:flex" style={{ flexDirection: "column", alignItems: "flex-end", gap: "6px", pointerEvents: "auto" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>
            Scroll to explore
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "1px", background: "rgba(242,237,230,0.2)" }} />
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ color: "rgba(242,237,230,0.3)" }}>
              <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scrolling track */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: 0, display: "flex", alignItems: "flex-end", paddingBottom: "clamp(40px, 6vh, 72px)", paddingLeft: "clamp(24px, 5vw, 80px)" }}>
        <div ref={trackRef} style={{ display: "flex", alignItems: "flex-end", gap: "clamp(16px, 2vw, 28px)", willChange: "transform" }}>
          {items.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ item, index }: { item: typeof items[0]; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.8, ease: "power2.out" });
    gsap.to(captionRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  };
  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power2.out" });
    gsap.to(captionRef.current, { opacity: 0, y: 8, duration: 0.35, ease: "power2.in" });
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor="view"
      style={{ flexShrink: 0, width: item.w, height: item.h, position: "relative", overflow: "hidden", cursor: "none" }}
    >
      <img
        ref={imgRef}
        src={item.src}
        alt={item.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", willChange: "transform" }}
      />

      {/* Bottom gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,10,0.75) 0%, transparent 45%)", pointerEvents: "none" }} />

      {/* Index */}
      <div style={{ position: "absolute", top: "16px", right: "16px", fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.25em", color: "rgba(242,237,230,0.4)" }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Caption */}
      <div
        ref={captionRef}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 24px", opacity: 0, transform: "translateY(8px)" }}
      >
        <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(16px, 2vw, 22px)", fontStyle: "italic", fontWeight: 300, letterSpacing: "-0.01em", color: "var(--off-white)", marginBottom: "4px" }}>
          {item.title}
        </p>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.45)" }}>
          {item.loc}
        </p>
      </div>
    </div>
  );
}
