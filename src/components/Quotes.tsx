"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They didn't show us a house. They introduced us to a way of living we didn't know existed.",
    author: "Sophie Marchand",
    role: "Creative Director — Paris",
  },
  {
    quote: "The attention to architectural detail was extraordinary. Every space they presented had a soul.",
    author: "James Whitfield",
    role: "Founder, Whitfield Capital",
  },
  {
    quote: "We weren't buying walls and floors. We were investing in an identity. They understood that.",
    author: "Nadia Al-Hassan",
    role: "Architect & Collector — Dubai",
  },
];

export default function Quotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });

    const bigQuote = sectionRef.current?.querySelector(".big-quote-mark") ?? null;
    if (bigQuote) gsap.from(bigQuote, {
      opacity: 0,
      scale: 0.85,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
    });
  }, []);

  const changeTo = (i: number) => {
    if (i === active) return;
    const tl = gsap.timeline();
    tl.to([quoteRef.current, authorRef.current], { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" })
      .add(() => setActive(i))
      .fromTo([quoteRef.current, authorRef.current], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power3.out" });
  };

  const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };
  const inter: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--cream)", overflow: "hidden", position: "relative", padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)" }}
    >
      {/* Large decorative quotemark */}
      <div
        className="big-quote-mark"
        aria-hidden
        style={{
          position: "absolute",
          top: "-2%",
          left: "2%",
          ...serif,
          fontSize: "clamp(240px, 40vw, 580px)",
          fontWeight: 300,
          lineHeight: 1,
          color: "rgba(8,8,10,0.04)",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        &ldquo;
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(52px, 8vw, 110px)" }}>
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(8,8,10,0.35)" }}>05</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(8,8,10,0.1)" }} />
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(8,8,10,0.35)" }}>Voices</span>
        </div>

        {/* Quote */}
        <div ref={quoteRef} style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <blockquote
            style={{
              ...serif,
              fontSize: "clamp(28px, 4.5vw, 66px)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--warm-black)",
              maxWidth: "900px",
            }}
          >
            &ldquo;{testimonials[active].quote}&rdquo;
          </blockquote>
        </div>

        {/* Author + nav */}
        <div ref={authorRef} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "24px", height: "1px", background: "rgba(8,8,10,0.25)" }} />
            <div>
              <p style={{ ...inter, fontSize: "12px", fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--warm-black)", marginBottom: "2px" }}>
                {testimonials[active].author}
              </p>
              <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(8,8,10,0.4)" }}>
                {testimonials[active].role}
              </p>
            </div>
          </div>

          {/* Dot nav */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => changeTo(i)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "1px",
                    width: i === active ? "36px" : "12px",
                    background: i === active ? "var(--warm-black)" : "rgba(8,8,10,0.25)",
                    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
