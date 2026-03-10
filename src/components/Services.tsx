"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const inter: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

const services = [
  {
    num: "01",
    title: ["Acquisition", "Advisory"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
    desc: "We guide discerning clients through every step of acquiring exceptional properties — from initial identification to keys in hand. Off-market access, legal coordination, full due diligence.",
    tags: ["Market intelligence", "Off-market access", "Legal coordination", "Due diligence"],
  },
  {
    num: "02",
    title: ["Portfolio", "Curation"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80",
    desc: "For those who hold multiple properties as an art form. We manage, maintain, and evolve your real estate portfolio with the same precision as a private collection.",
    tags: ["Asset management", "Rental optimization", "Renovation oversight", "Strategic exit"],
  },
  {
    num: "03",
    title: ["Interior", "Architecture"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80",
    desc: "Space doesn't end at purchase. We connect clients with the finest architects and designers to complete the vision — turning a property into a statement.",
    tags: ["Architect selection", "Concept development", "Contractor management", "Styling & art"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(headRef.current?.querySelectorAll(".sci") ?? [], {
      yPercent: 110,
      duration: 1.05,
      stagger: 0.025,
      ease: "power4.out",
      scrollTrigger: { trigger: headRef.current, start: "top 78%" },
    });

    gsap.from(".svc-card", {
      y: 60,
      opacity: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".svc-grid", start: "top 74%" },
    });

    document.querySelectorAll<HTMLElement>(".svc-img-wrap").forEach((el, i) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.3,
          ease: "power3.inOut",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    });

    // Parallax on each service image
    document.querySelectorAll<HTMLElement>(".svc-img-inner").forEach((el) => {
      gsap.to(el, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: "var(--warm-black)", overflow: "hidden", padding: "clamp(80px, 12vw, 160px) 0" }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

        {/* Label row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(40px, 6vw, 72px)" }}>
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>02</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(242,237,230,0.08)" }} />
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>Expertise</span>
        </div>

        {/* Headline */}
        <div
          ref={headRef}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "clamp(60px, 9vw, 120px)" }}
        >
          <div>
            <div style={{ overflow: "hidden", lineHeight: 0.88, marginBottom: "0.04em" }}>
              {"What".split("").map((ch, i) => (
                <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                  <span className="sci" style={{ display: "inline-block", ...serif, fontSize: "clamp(56px, 9.5vw, 140px)", fontWeight: 300, letterSpacing: "-0.04em", color: "var(--off-white)" }}>
                    {ch}
                  </span>
                </span>
              ))}
            </div>
            <div style={{ overflow: "hidden", lineHeight: 0.88, marginLeft: "clamp(28px, 6vw, 110px)" }}>
              {"we offer.".split("").map((ch, i) => (
                <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                  <span className="sci" style={{
                    display: "inline-block", ...serif, fontSize: "clamp(56px, 9.5vw, 140px)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.04em",
                    background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <p style={{ ...inter, fontSize: "12px", letterSpacing: "0.03em", lineHeight: 1.9, color: "rgba(242,237,230,0.38)", maxWidth: "300px", fontWeight: 300, paddingBottom: "8px" }}>
            Three disciplines. One singular approach to luxury real estate — where every service is as considered as the properties we represent.
          </p>
        </div>

        {/* Services grid */}
        <div
          className="svc-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0", borderTop: "1px solid rgba(242,237,230,0.08)" }}
        >
          {services.map((svc, idx) => (
            <div
              key={svc.num}
              className="svc-card"
              style={{
                display: "grid",
                gridTemplateColumns: idx % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                minHeight: "480px",
                borderBottom: "1px solid rgba(242,237,230,0.08)",
                direction: idx % 2 !== 0 ? "rtl" : "ltr",
              }}
            >
              {/* Image */}
              <div
                className="svc-img-wrap"
                style={{ overflow: "hidden", position: "relative" }}
                data-cursor="view"
              >
                <img
                  className="svc-img-inner"
                  src={svc.image}
                  alt={svc.title.join(" ")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.06)" }}
                />
              </div>

              {/* Info */}
              <div
                style={{
                  direction: "ltr",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "clamp(40px, 6vw, 80px) clamp(32px, 5vw, 70px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Watermark number */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: "-6%",
                    bottom: "0%",
                    ...serif,
                    fontSize: "clamp(140px, 22vw, 320px)",
                    fontWeight: 300,
                    letterSpacing: "-0.06em",
                    color: "rgba(242,237,230,0.03)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {svc.num}
                </div>

                <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.28)", display: "block", marginBottom: "clamp(16px, 2.5vw, 28px)" }}>
                  {svc.num} / Service
                </span>

                <h3 style={{ ...serif, fontSize: "clamp(36px, 5.5vw, 80px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95, color: "var(--off-white)", marginBottom: "clamp(20px, 3vw, 36px)" }}>
                  {svc.title[0]}<br />
                  <em style={{ background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {svc.title[1]}
                  </em>
                </h3>

                <p style={{ ...inter, fontSize: "13px", letterSpacing: "0.03em", lineHeight: 1.9, color: "rgba(242,237,230,0.42)", fontWeight: 300, maxWidth: "360px", marginBottom: "clamp(28px, 4vw, 44px)" }}>
                  {svc.desc}
                </p>

                <div style={{ borderTop: "1px solid rgba(242,237,230,0.07)", paddingTop: "clamp(16px, 2.5vw, 28px)" }}>
                  {svc.tags.map((tag) => (
                    <div key={tag} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                      <div style={{ width: "4px", height: "1px", background: "rgba(242,237,230,0.25)", flexShrink: 0 }} />
                      <span style={{ ...inter, fontSize: "10px", letterSpacing: "0.2em", color: "rgba(242,237,230,0.35)", textTransform: "uppercase" }}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
