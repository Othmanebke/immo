"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const inter: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

const steps = [
  {
    num: "01",
    title: "Discovery",
    sub: "Understanding your vision",
    desc: "We begin with an in-depth conversation — your lifestyle, aspirations, and the intangible qualities that make a space feel like home. No property is shown before we truly understand you.",
    detail: "45-min private consultation",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=80",
  },
  {
    num: "02",
    title: "Selection",
    sub: "The curated shortlist",
    desc: "Drawing from our network of off-market properties and exclusive listings, we present spaces aligned with your precise criteria — architectural integrity, location, and intrinsic value.",
    detail: "3–7 curated proposals",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80",
  },
  {
    num: "03",
    title: "Immersion",
    sub: "Private viewings",
    desc: "Each visit is orchestrated — not a viewing, but an experience. We prepare contextual dossiers and arrange access at the ideal hour, allowing the space to speak on its own terms.",
    detail: "Guided private visits",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=700&q=80",
  },
  {
    num: "04",
    title: "Acquisition",
    sub: "Seamless completion",
    desc: "Our legal and financial partners handle every dimension — from negotiation strategy to notarial acts. The transaction should match the elegance of the property itself.",
    detail: "Full transaction support",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Headline chars
    gsap.from(headRef.current?.querySelectorAll(".sci") ?? [], {
      yPercent: 110,
      duration: 1.05,
      stagger: 0.025,
      ease: "power4.out",
      scrollTrigger: { trigger: headRef.current, start: "top 78%" },
    });

    // Progress line draw
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.8,
        ease: "power3.inOut",
        transformOrigin: "left center",
        scrollTrigger: { trigger: ".proc-steps", start: "top 72%" },
      }
    );

    // Step cards reveal
    gsap.from(".proc-step", {
      y: 48,
      opacity: 0,
      duration: 1.1,
      stagger: 0.13,
      ease: "power3.out",
      scrollTrigger: { trigger: ".proc-steps", start: "top 74%" },
    });

    // Step images clip reveal
    document.querySelectorAll<HTMLElement>(".proc-img-wrap").forEach((el, i) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.inOut",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 82%" },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ background: "var(--deep-black)", overflow: "hidden", padding: "clamp(80px, 12vw, 160px) 0" }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Label row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(40px, 6vw, 72px)" }}>
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>04</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(242,237,230,0.08)" }} />
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>Process</span>
        </div>

        {/* Headline + intro */}
        <div
          ref={headRef}
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", marginBottom: "clamp(52px, 8vw, 110px)", alignItems: "flex-end" }}
          className="md:grid-cols-[1fr_360px]"
        >
          <div>
            <div style={{ overflow: "hidden", lineHeight: 0.88, marginBottom: "0.04em" }}>
              {"How we".split("").map((ch, i) => (
                <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                  <span className="sci" style={{ display: "inline-block", ...serif, fontSize: "clamp(52px, 8.5vw, 130px)", fontWeight: 300, letterSpacing: "-0.04em", color: "var(--off-white)" }}>
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                </span>
              ))}
            </div>
            <div style={{ overflow: "hidden", lineHeight: 0.88, marginLeft: "clamp(28px, 5vw, 80px)" }}>
              {"work.".split("").map((ch, i) => (
                <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                  <span className="sci" style={{
                    display: "inline-block", ...serif, fontSize: "clamp(52px, 8.5vw, 130px)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.04em",
                    background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    {ch}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <p style={{ ...inter, fontSize: "12px", letterSpacing: "0.03em", lineHeight: 1.9, color: "rgba(242,237,230,0.38)", fontWeight: 300 }}>
            From first contact to final signature, every step of our process is crafted for those who accept nothing less than extraordinary.
          </p>
        </div>

        {/* Animated connector line */}
        <div style={{ position: "relative", marginBottom: "clamp(32px, 5vw, 60px)", height: "1px", background: "rgba(242,237,230,0.06)" }}>
          <div
            ref={lineRef}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(242,237,230,0.22)", transformOrigin: "left center" }}
          />
          {/* Step markers */}
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: `${(i / (steps.length - 1)) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "rgba(242,237,230,0.35)",
                border: "1px solid rgba(242,237,230,0.15)",
              }}
            />
          ))}
        </div>

        {/* Steps grid */}
        <div
          className="proc-steps"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(242,237,230,0.07)" }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="proc-step"
              style={{ background: "var(--deep-black)", padding: "clamp(28px, 4.5vw, 60px) clamp(20px, 3.5vw, 48px)" }}
            >
              {/* Step image */}
              <div
                className="proc-img-wrap"
                style={{ overflow: "hidden", aspectRatio: "16/9", marginBottom: "clamp(24px, 3.5vw, 40px)" }}
                data-cursor="view"
              >
                <img
                  src={step.img}
                  alt={step.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Large faded number */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(16px, 2.5vw, 28px)", marginBottom: "clamp(16px, 2.5vw, 28px)" }}>
                <span style={{ ...serif, fontSize: "clamp(48px, 7vw, 100px)", fontWeight: 300, letterSpacing: "-0.05em", lineHeight: 1, color: "rgba(242,237,230,0.07)", flexShrink: 0, userSelect: "none" }}>
                  {step.num}
                </span>
                <div style={{ paddingTop: "clamp(6px, 1vw, 14px)" }}>
                  <h3 style={{ ...serif, fontSize: "clamp(26px, 3.8vw, 52px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--off-white)", marginBottom: "6px" }}>
                    {step.title}
                  </h3>
                  <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>
                    {step.sub}
                  </p>
                </div>
              </div>

              <p style={{ ...inter, fontSize: "12px", letterSpacing: "0.03em", lineHeight: 1.9, color: "rgba(242,237,230,0.38)", fontWeight: 300, marginBottom: "clamp(20px, 3vw, 32px)" }}>
                {step.desc}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "24px", height: "1px", background: "rgba(242,237,230,0.2)" }} />
                <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,237,230,0.28)" }}>
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
