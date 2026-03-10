"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const inter: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

const publications = [
  { name: "Architectural Digest", region: "France · 2024" },
  { name: "Wallpaper*", region: "Best Agency · UK" },
  { name: "Côté Maison", region: "Top 10 Paris" },
  { name: "The Wall Street Journal", region: "Luxury Report" },
  { name: "Monocle", region: "Issue 172" },
];

const awards = [
  { num: "12", label: "Industry awards" },
  { num: "6×", label: "Agency of the year" },
  { num: "40+", label: "Press features" },
  { num: "2024", label: "Architectural Digest Best" },
];

export default function Press() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(".pub-item", {
      y: 28,
      opacity: 0,
      duration: 0.85,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pub-row", start: "top 80%" },
    });

    // Pull quote lines reveal
    const lines = quoteRef.current?.querySelectorAll(".q-line");
    if (lines) {
      gsap.from(lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: quoteRef.current, start: "top 72%" },
      });
    }

    gsap.from(awardsRef.current?.querySelectorAll(".award-item") ?? [], {
      y: 32,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: awardsRef.current, start: "top 80%" },
    });

    // Image reveal
    gsap.fromTo(".press-img-wrap",
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".press-img-wrap", start: "top 78%" },
      }
    );

    gsap.to(".press-img-inner", {
      yPercent: -6,
      ease: "none",
      scrollTrigger: { trigger: ".press-img-wrap", start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="press"
      style={{ background: "var(--cream)", overflow: "hidden", padding: "clamp(80px, 12vw, 160px) 0" }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Label row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(52px, 8vw, 100px)" }}>
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(8,8,10,0.3)" }}>As seen in</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(8,8,10,0.1)" }} />
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(8,8,10,0.3)" }}>Press</span>
        </div>

        {/* Publications row */}
        <div
          className="pub-row"
          style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid rgba(8,8,10,0.09)", marginBottom: "clamp(72px, 11vw, 140px)" }}
        >
          {publications.map((pub, idx) => (
            <div
              key={pub.name}
              className="pub-item"
              style={{
                flex: "1 1 180px",
                padding: "clamp(20px, 3.5vw, 40px) clamp(16px, 2.5vw, 32px)",
                borderRight: idx < publications.length - 1 ? "1px solid rgba(8,8,10,0.07)" : undefined,
                borderBottom: "1px solid rgba(8,8,10,0.07)",
              }}
            >
              <p style={{ ...serif, fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 300, letterSpacing: "-0.02em", color: "rgba(8,8,10,0.72)", marginBottom: "6px", lineHeight: 1.1 }}>
                {pub.name}
              </p>
              <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(8,8,10,0.32)" }}>
                {pub.region}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote + image split */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(48px, 7vw, 80px)", alignItems: "center", marginBottom: "clamp(72px, 11vw, 130px)" }}
          className="md:grid-cols-[1fr_40%]"
        >
          {/* Quote */}
          <div ref={quoteRef}>
            <div style={{ ...inter, fontSize: "40px", lineHeight: 1, color: "rgba(8,8,10,0.15)", marginBottom: "clamp(20px, 3vw, 32px)", ...serif }}>
              &ldquo;
            </div>
            {[
              "Noir Estate operates at the",
              "intersection of architecture",
              "and desire.",
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden", lineHeight: 1.1 }}>
                <span
                  className="q-line"
                  style={{
                    display: "block",
                    ...serif,
                    fontSize: "clamp(28px, 4.5vw, 64px)",
                    fontWeight: 300,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.12,
                    color: i === 2 ? "transparent" : "rgba(8,8,10,0.8)",
                    fontStyle: i === 2 ? "italic" : "normal",
                    ...(i === 2 ? {
                      background: "linear-gradient(120deg, #2a2a2a 0%, #5a5a5a 40%, #3a3a3a 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    } : {}),
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
            <div style={{ marginTop: "clamp(24px, 4vw, 40px)", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "28px", height: "1px", background: "rgba(8,8,10,0.2)" }} />
              <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(8,8,10,0.4)" }}>
                Architectural Digest France · 2024
              </span>
            </div>
          </div>

          {/* Image */}
          <div
            className="press-img-wrap"
            style={{ overflow: "hidden", aspectRatio: "3/4" }}
            data-cursor="view"
          >
            <img
              className="press-img-inner"
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
              alt="Award-winning property"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.06)" }}
            />
          </div>
        </div>

        {/* Awards row */}
        <div
          ref={awardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(8,8,10,0.08)",
            borderTop: "1px solid rgba(8,8,10,0.08)",
          }}
          className="md:grid-cols-4"
        >
          {awards.map((a) => (
            <div
              key={a.label}
              className="award-item"
              style={{ background: "var(--cream)", padding: "clamp(24px, 4vw, 48px) clamp(16px, 2.5vw, 32px)" }}
            >
              <p style={{ ...serif, fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 300, letterSpacing: "-0.04em", color: "rgba(8,8,10,0.8)", lineHeight: 1, marginBottom: "8px" }}>
                {a.num}
              </p>
              <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(8,8,10,0.38)" }}>
                {a.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
