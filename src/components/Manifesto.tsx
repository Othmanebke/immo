"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Manifesto lines refs
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const addLine = (el: HTMLSpanElement | null) => {
    if (el && !linesRef.current.includes(el)) linesRef.current.push(el);
  };

  useEffect(() => {
    const lines = linesRef.current;

    // Clip-path image reveal (wipe up)
    gsap.fromTo(
      imgRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: imgRef.current, start: "top 78%" },
      }
    );

    // Image inner slight zoom out on reveal
    gsap.from(imgInnerRef.current, {
      scale: 1.14,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: imgRef.current, start: "top 78%" },
    });

    // Image parallax while scrolling
    gsap.to(imgInnerRef.current, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
    });

    // Text lines stagger reveal
    gsap.set(lines, { yPercent: 105 });
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 62%",
      onEnter() {
        gsap.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.09, ease: "power4.out" });
      },
    });

    // Stats
    gsap.from(statsRef.current?.querySelectorAll(".stat-item") ?? [], {
      y: 36,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
    });
  }, []);

  const manifestoLines = [
    { text: "We don't sell", italic: false },
    { text: "properties.", italic: false },
    { text: "We curate", italic: true },
    { text: "spaces where", italic: false },
    { text: "life happens.", italic: true },
  ];

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      style={{ background: "var(--warm-black)", overflow: "hidden", position: "relative", padding: "clamp(100px, 14vw, 200px) 0" }}
    >
      {/* Background watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-5%",
          bottom: "5%",
          ...serif,
          fontSize: "clamp(180px, 30vw, 460px)",
          fontWeight: 300,
          letterSpacing: "-0.05em",
          color: "rgba(242,237,230,0.025)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        01
      </div>

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* ── Label row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(48px, 7vw, 100px)" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>
            01
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(242,237,230,0.08)" }} />
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>
            Philosophy
          </span>
        </div>

        {/* ── Magazine spread ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "60px" }} className="md:grid-cols-[1fr_auto]" >
          {/* Left — manifesto text */}
          <div style={{ gridColumn: "1 / 2" }}>
            <h2 style={{ lineHeight: 0.92, marginBottom: "clamp(40px, 6vw, 80px)" }}>
              {manifestoLines.map((line, i) => (
                <span key={i} style={{ display: "block", overflow: "hidden" }}>
                  <span
                    ref={addLine}
                    style={{
                      display: "block",
                      ...serif,
                      fontSize: "clamp(52px, 9vw, 136px)",
                      fontWeight: 300,
                      letterSpacing: "-0.03em",
                      color: line.italic ? "transparent" : "var(--off-white)",
                      fontStyle: line.italic ? "italic" : "normal",
                      ...(line.italic ? {
                        background: "linear-gradient(120deg, #7a7a7a 0%, #c8c8c8 25%, #e4e4e4 42%, #9a9a9a 55%, #d4d4d4 70%, #888 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      } : {}),
                    }}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h2>

            {/* Sub copy */}
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", letterSpacing: "0.03em", lineHeight: 1.95, color: "rgba(242,237,230,0.4)", maxWidth: "380px", fontWeight: 300 }}>
              Every space we present carries an architectural intention — a relationship between light, material, and the human condition.
            </p>
          </div>

          {/* Right — tall image with clip reveal */}
          <div
            ref={imgRef}
            style={{
              width: "clamp(220px, 28vw, 420px)",
              alignSelf: "flex-start",
              marginTop: "clamp(0px, 4vw, 60px)",
              overflow: "hidden",
              flexShrink: 0,
            }}
            className="hidden md:block"
          >
            <img
              ref={imgInnerRef}
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
              alt="Architecture"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          ref={statsRef}
          style={{
            marginTop: "clamp(60px, 10vw, 140px)",
            paddingTop: "clamp(32px, 4vw, 52px)",
            borderTop: "1px solid rgba(242,237,230,0.08)",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(28px, 4vw, 48px)",
          }}
          className="md:grid-cols-4"
        >
          {[
            { num: "340+", label: "Curated spaces" },
            { num: "12", label: "Cities worldwide" },
            { num: "98%", label: "Client satisfaction" },
            { num: "€2B+", label: "Portfolio value" },
          ].map((s) => (
            <div key={s.label} className="stat-item">
              <p
                style={{
                  ...serif,
                  fontSize: "clamp(36px, 5.5vw, 72px)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  color: "var(--off-white)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {s.num}
              </p>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.35)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
