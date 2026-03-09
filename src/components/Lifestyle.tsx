"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Lifestyle() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Three image clip-path reveals, staggered
    [img1Ref, img2Ref, img3Ref].forEach((ref, i) => {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "power3.inOut",
          delay: i * 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    });

    // Text
    const chars = headRef.current?.querySelectorAll(".sci");
    if (chars) {
      gsap.from(chars, {
        yPercent: 110,
        duration: 1,
        stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: { trigger: headRef.current, start: "top 75%" },
      });
    }

    gsap.from(bodyRef.current, {
      opacity: 0,
      y: 28,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: { trigger: bodyRef.current, start: "top 80%" },
    });
  }, []);

  const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--dark-gray)", overflow: "hidden", padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)" }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "clamp(48px, 7vw, 90px)" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>04</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(242,237,230,0.08)" }} />
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>Lifestyle</span>
        </div>

        {/* Headline — large, offset */}
        <div ref={headRef} style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}>
          <div style={{ overflow: "hidden", lineHeight: 0.88, marginBottom: "0.06em" }}>
            {"Architecture".split("").map((ch, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                <span className="sci" style={{ display: "inline-block", ...serif, fontSize: "clamp(60px, 10vw, 150px)", fontWeight: 300, letterSpacing: "-0.04em", color: "var(--off-white)" }}>
                  {ch}
                </span>
              </span>
            ))}
          </div>
          <div style={{ overflow: "hidden", lineHeight: 0.88, marginLeft: "clamp(30px, 6vw, 120px)" }}>
            {"meets life.".split("").map((ch, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                <span className="sci" style={{
                  display: "inline-block", ...serif, fontSize: "clamp(60px, 10vw, 150px)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.04em",
                  background: "linear-gradient(120deg,#7a7a7a,#d0d0d0,#9a9a9a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Image trio — asymmetric */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 0.8fr", gap: "clamp(10px, 1.5vw, 20px)", alignItems: "end" }}>
          {/* Large left */}
          <div ref={img1Ref} style={{ overflow: "hidden", aspectRatio: "4/5" }} data-cursor="view">
            <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          {/* Tall center, pushed up */}
          <div ref={img2Ref} style={{ overflow: "hidden", aspectRatio: "3/4", marginTop: "-clamp(40px, 8vw, 100px)", transform: "translateY(clamp(-100px,-8vw,-40px))" }} data-cursor="view">
            <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          {/* Small right + copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vw, 32px)" }}>
            <div ref={img3Ref} style={{ overflow: "hidden", aspectRatio: "3/4" }} data-cursor="view">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div ref={bodyRef}>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "12px", letterSpacing: "0.03em", lineHeight: 1.95, color: "rgba(242,237,230,0.4)", fontWeight: 300 }}>
                Space is not just where you live. It is who you are. Every room, a statement. Every view, a privilege.
              </p>
              <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "24px", height: "1px", background: "rgba(242,237,230,0.25)" }} />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)" }}>
                  More than property
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
