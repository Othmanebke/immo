"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };
const inter: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };

/* ─────────────────────────────────────────────
   Space 01 — Image left 55%, Info right
   Number watermark floats behind info
─────────────────────────────────────────────── */
function SpaceObsidian() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clip reveal
    gsap.fromTo(imgRef.current, { clipPath: "inset(0 100% 0 0)" }, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      ease: "power3.inOut",
      scrollTrigger: { trigger: imgRef.current, start: "top 75%" },
    });

    gsap.from(imgInnerRef.current, {
      scale: 1.12,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: imgRef.current, start: "top 75%" },
    });

    gsap.from(infoRef.current?.querySelectorAll(".info-el") ?? [], {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: infoRef.current, start: "top 72%" },
    });

    gsap.from(numRef.current, {
      opacity: 0,
      x: 40,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: numRef.current, start: "top 80%" },
    });

    // Image parallax on scroll
    gsap.to(imgInnerRef.current, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }, []);

  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "55% 45%", minHeight: "85vh", borderTop: "1px solid rgba(242,237,230,0.08)" }}>
      {/* Image */}
      <div ref={imgRef} style={{ overflow: "hidden", position: "relative" }} data-cursor="view">
        <img
          ref={imgInnerRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
          alt="Maison Obsidian"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.04)" }}
        />
        <div style={{ position: "absolute", top: "24px", left: "24px" }}>
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", background: "rgba(8,8,10,0.65)", color: "rgba(242,237,230,0.7)", padding: "6px 10px", backdropFilter: "blur(8px)" }}>
            Exclusive
          </span>
        </div>
      </div>

      {/* Info */}
      <div ref={infoRef} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(40px, 6vw, 80px) clamp(32px, 5vw, 70px)", position: "relative", overflow: "hidden" }}>
        {/* Number watermark */}
        <div ref={numRef} style={{ position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)", ...serif, fontSize: "clamp(180px, 24vw, 320px)", fontWeight: 300, letterSpacing: "-0.06em", color: "rgba(242,237,230,0.04)", pointerEvents: "none", lineHeight: 1, userSelect: "none" }} aria-hidden>
          01
        </div>

        <div className="info-el" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
          <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.35)" }}>
            01 / Private Residence
          </span>
        </div>

        <h3 className="info-el" style={{ ...serif, fontSize: "clamp(40px, 6vw, 82px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95, color: "var(--off-white)", marginBottom: "clamp(16px, 2vw, 28px)" }}>
          Maison<br /><em>Obsidian</em>
        </h3>

        <p className="info-el" style={{ ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.35)", marginBottom: "clamp(28px, 4vw, 48px)" }}>
          Paris, 16ème
        </p>

        <div className="info-el" style={{ display: "flex", gap: "40px", marginBottom: "clamp(32px, 5vw, 60px)", borderTop: "1px solid rgba(242,237,230,0.08)", paddingTop: "24px" }}>
          {[["Area", "480 m²"], ["Bedrooms", "5"], ["Price", "€ 4.2M"]].map(([k, v]) => (
            <div key={k}>
              <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)", marginBottom: "6px" }}>{k}</p>
              <p style={{ ...serif, fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 300, letterSpacing: "-0.02em", color: k === "Price" ? "transparent" : "var(--off-white)", ...(k === "Price" ? { background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } : {}) }}>
                {v}
              </p>
            </div>
          ))}
        </div>

        <div className="info-el">
          <MagneticButton>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              border: "1px solid rgba(242,237,230,0.25)",
              padding: "14px 28px",
              ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "var(--off-white)",
              transition: "background 0.45s cubic-bezier(0.16,1,0.3,1), color 0.3s",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--off-white)";
                el.style.color = "var(--warm-black)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "var(--off-white)";
              }}
            >
              View Property
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{ transition: "transform 0.3s" }}>
                <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </span>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Space 02 — Full-bleed image, text top-left overlay
   Price floats top-right
─────────────────────────────────────────────── */
function SpaceBorealis() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(imgRef.current, { clipPath: "inset(100% 0 0 0)" }, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: { trigger: imgRef.current, start: "top 78%" },
    });

    gsap.from(imgInnerRef.current, {
      scale: 1.1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: imgRef.current, start: "top 78%" },
    });

    gsap.to(imgInnerRef.current, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
    });

    gsap.from(textRef.current?.querySelectorAll(".line-el") ?? [], {
      y: 32,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: imgRef.current, start: "top 70%" },
    });
  }, []);

  return (
    <div ref={imgRef} style={{ position: "relative", overflow: "hidden", minHeight: "80vh", borderTop: "1px solid rgba(242,237,230,0.08)" }} data-cursor="view">
      <img
        ref={imgInnerRef}
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80"
        alt="Villa Borealis"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: "80vh" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(8,8,10,0.65) 0%, rgba(8,8,10,0.25) 50%, rgba(8,8,10,0.55) 100%)" }} />

      <div ref={textRef} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(32px, 5vw, 72px)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <div className="line-el" style={{ marginBottom: "12px" }}>
              <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.45)" }}>02 / Lakefront Estate · Geneva</span>
            </div>
            <h3 className="line-el" style={{ ...serif, fontSize: "clamp(48px, 7.5vw, 110px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.92, color: "var(--off-white)" }}>
              Villa<br /><em>Borealis</em>
            </h3>
          </div>
          <div className="line-el" style={{ textAlign: "right" }}>
            <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.4)", marginBottom: "6px" }}>Price</p>
            <p style={{
              ...serif, fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, letterSpacing: "-0.03em",
              background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>€ 8.9M</p>
          </div>
        </div>

        <div className="line-el" style={{ display: "flex", gap: "40px", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(242,237,230,0.12)", flexWrap: "wrap" }}>
          {[["820 m²", "Surface"], ["7 rooms", "Program"], ["Lakefront", "Setting"]].map(([v, k]) => (
            <div key={k}>
              <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.4)", marginBottom: "4px" }}>{k}</p>
              <p style={{ ...serif, fontSize: "18px", fontWeight: 300, color: "rgba(242,237,230,0.8)" }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Space 03 — Info right 40%, Image left 60%
   Asymmetric, number huge behind
─────────────────────────────────────────────── */
function SpaceEclipse() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(imgRef.current, { clipPath: "inset(0 100% 0 0)" }, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      ease: "power3.inOut",
      scrollTrigger: { trigger: imgRef.current, start: "top 76%" },
    });

    gsap.from(imgInnerRef.current, { scale: 1.1, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: imgRef.current, start: "top 76%" } });
    gsap.to(imgInnerRef.current, { yPercent: -6, ease: "none", scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });

    gsap.from(infoRef.current?.querySelectorAll(".e-el") ?? [], {
      y: 36, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: infoRef.current, start: "top 74%" },
    });
  }, []);

  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "60% 40%", minHeight: "85vh", borderTop: "1px solid rgba(242,237,230,0.08)" }}>
      {/* Image */}
      <div ref={imgRef} style={{ overflow: "hidden" }} data-cursor="view">
        <img
          ref={imgInnerRef}
          src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=900&q=80"
          alt="Penthouse Eclipse"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.04)" }}
        />
      </div>

      {/* Info */}
      <div ref={infoRef} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(40px, 6vw, 80px) clamp(32px, 5vw, 70px)", position: "relative", overflow: "hidden" }}>
        <div>
          <div className="e-el" style={{ ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.35)", marginBottom: "28px" }}>
            03 / Sky Residence · Dubai DIFC
          </div>
          <h3 className="e-el" style={{ ...serif, fontSize: "clamp(40px, 5.5vw, 76px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95, color: "var(--off-white)", marginBottom: "clamp(20px, 3vw, 40px)" }}>
            Penthouse<br /><em>Eclipse</em>
          </h3>
          <p className="e-el" style={{ ...inter, fontSize: "12px", letterSpacing: "0.03em", lineHeight: 1.85, color: "rgba(242,237,230,0.4)", maxWidth: "280px", fontWeight: 300, marginBottom: "clamp(28px, 4vw, 48px)" }}>
            360° horizon views from the 72nd floor. A single-residence crown above the Dubai skyline.
          </p>
        </div>

        <div>
          <div className="e-el" style={{ borderTop: "1px solid rgba(242,237,230,0.08)", paddingTop: "24px", marginBottom: "32px" }}>
            {[["Surface", "360 m²"], ["Floor", "72nd"], ["Price", "€ 6.1M"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>{k}</span>
                <span style={{
                  ...serif, fontSize: "16px", fontWeight: 300, color: k === "Price" ? "transparent" : "rgba(242,237,230,0.75)",
                  ...(k === "Price" ? { background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } : {}),
                }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="e-el">
            <MagneticButton>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", border: "1px solid rgba(242,237,230,0.25)", padding: "14px 28px", ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--off-white)", transition: "background 0.45s cubic-bezier(0.16,1,0.3,1), color 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--off-white)"; (e.currentTarget as HTMLElement).style.color = "var(--warm-black)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--off-white)"; }}
              >
                View Property
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" /></svg>
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Watermark */}
        <div aria-hidden style={{ position: "absolute", right: "-5%", bottom: "5%", ...serif, fontSize: "clamp(140px, 20vw, 260px)", fontWeight: 300, letterSpacing: "-0.06em", color: "rgba(242,237,230,0.035)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
          03
        </div>
      </div>
    </div>
  );
}

export default function FeaturedSpaces() {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = headRef.current?.querySelectorAll(".sci");
    if (chars) {
      gsap.from(chars, {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.025,
        ease: "power4.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section id="spaces" style={{ background: "var(--deep-black)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "clamp(72px, 10vw, 140px) clamp(24px, 5vw, 80px) clamp(48px, 6vw, 80px)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)", display: "block", marginBottom: "20px" }}>
            02 / Featured Spaces
          </span>
          <div ref={headRef} style={{ overflow: "hidden" }}>
            <span aria-label="Selected Spaces" style={{ display: "block" }}>
              {"SELECTED".split("").map((ch, i) => (
                <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                  <span className="sci" style={{ display: "inline-block", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(60px, 10vw, 150px)", fontWeight: 300, letterSpacing: "-0.04em", color: "var(--off-white)" }}>
                    {ch}
                  </span>
                </span>
              ))}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}><span className="sci" style={{ display: "inline-block", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(60px, 10vw, 150px)", fontWeight: 300, letterSpacing: "-0.04em" }}>&nbsp;</span></span>
              {"SPACES".split("").map((ch, i) => (
                <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                  <span className="sci" style={{ display: "inline-block", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(60px, 10vw, 150px)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.04em", background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {ch}
                  </span>
                </span>
              ))}
            </span>
          </div>
        </div>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "12px", letterSpacing: "0.03em", lineHeight: 1.85, color: "rgba(242,237,230,0.38)", maxWidth: "280px", fontWeight: 300, marginBottom: "8px" }}>
          Each property is selected for its architectural significance, not just its commercial value.
        </p>
      </div>

      {/* Properties */}
      <SpaceObsidian />
      <SpaceBorealis />
      <SpaceEclipse />
    </section>
  );
}
