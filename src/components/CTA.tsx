"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clip-path reveal on image
    gsap.fromTo(imgRef.current, { clipPath: "inset(0 0 100% 0)" }, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });

    gsap.from(imgInnerRef.current, {
      scale: 1.1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });

    // Text chars
    const chars = textColRef.current?.querySelectorAll(".sci");
    if (chars) {
      gsap.from(chars, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.022,
        ease: "power4.out",
        scrollTrigger: { trigger: textColRef.current, start: "top 72%" },
      });
    }

    gsap.from(textColRef.current?.querySelectorAll(".fade-el") ?? [], {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: textColRef.current, start: "top 70%" },
    });
  }, []);

  const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };
  const inter: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ background: "var(--warm-black)", overflow: "hidden", minHeight: "90vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}
      className="flex flex-col md:grid"
    >
      {/* ── Left: text ── */}
      <div
        ref={textColRef}
        style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(72px, 10vw, 140px) clamp(32px, 6vw, 80px)", position: "relative" }}
      >
        {/* Watermark */}
        <div aria-hidden style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", ...serif, fontSize: "clamp(160px, 22vw, 300px)", fontWeight: 300, letterSpacing: "-0.06em", color: "rgba(242,237,230,0.03)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>
          06
        </div>

        <span className="fade-el" style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)", display: "block", marginBottom: "clamp(24px, 4vw, 48px)" }}>
          06 / Begin
        </span>

        {/* Large headline — char by char */}
        <div style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
          <div style={{ overflow: "hidden", lineHeight: 0.9, marginBottom: "0.05em" }}>
            {"Find the".split("").map((ch, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                <span className="sci" style={{ display: "inline-block", ...serif, fontSize: "clamp(52px, 8.5vw, 128px)", fontWeight: 300, letterSpacing: "-0.035em", color: "var(--off-white)" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </span>
            ))}
          </div>
          <div style={{ overflow: "hidden", lineHeight: 0.9, marginBottom: "0.05em", marginLeft: "clamp(20px, 4vw, 60px)" }}>
            {"space that".split("").map((ch, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                <span className="sci" style={{ display: "inline-block", ...serif, fontSize: "clamp(52px, 8.5vw, 128px)", fontWeight: 300, letterSpacing: "-0.035em", color: "var(--off-white)" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </span>
            ))}
          </div>
          <div style={{ overflow: "hidden", lineHeight: 0.9 }}>
            {"defines you.".split("").map((ch, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                <span className="sci" style={{
                  display: "inline-block", ...serif, fontSize: "clamp(52px, 8.5vw, 128px)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.035em",
                  background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </span>
            ))}
          </div>
        </div>

        <p className="fade-el" style={{ ...inter, fontSize: "13px", letterSpacing: "0.03em", lineHeight: 1.9, color: "rgba(242,237,230,0.4)", maxWidth: "340px", fontWeight: 300, marginBottom: "clamp(32px, 5vw, 56px)" }}>
          Begin with a conversation. We match exceptional people with exceptional spaces — across Paris, Geneva, and Dubai.
        </p>

        <div className="fade-el">
          <MagneticButton>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                background: "var(--off-white)",
                border: "none",
                padding: "18px 40px",
                ...inter,
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--warm-black)",
                cursor: "none",
                transition: "background 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(242,237,230,0.85)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--off-white)")}
            >
              Book Consultation
              <svg width="16" height="9" viewBox="0 0 16 9" fill="none">
                <path d="M0 4.5h14M10 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* ── Right: image ── */}
      <div
        ref={imgRef}
        style={{ overflow: "hidden", minHeight: "400px" }}
        data-cursor="view"
      >
        <img
          ref={imgInnerRef}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
          alt="Architecture"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: "400px" }}
        />
      </div>
    </section>
  );
}
