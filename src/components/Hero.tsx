"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "15+",  label: "Ans d'expérience"  },
  { num: "400+", label: "Propriétés vendues" },
  { num: "€2Md", label: "Volume géré"        },
  { num: "100%", label: "Satisfaction client" },
];

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const word1Ref    = useRef<HTMLDivElement>(null);
  const word2Ref    = useRef<HTMLDivElement>(null);
  const word3Ref    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const imgColRef   = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Image clip reveal
      tl.fromTo(
        imgColRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.out" },
        0
      );

      // Label
      tl.fromTo(labelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        0.2
      );

      // Words — clip reveal from bottom
      [word1Ref, word2Ref, word3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { y: "105%", opacity: 0 },
          { y: "0%",   opacity: 1, duration: 0.85, ease: "expo.out" },
          0.35 + i * 0.1
        );
      });

      // Subtitle + CTA
      tl.fromTo(
        [subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "expo.out" },
        0.72
      );

      // Stats
      tl.fromTo(statsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0.95
      );

      // Parallax scroll on image
      gsap.to(imgRef.current, {
        y: 70,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home">
      <div className="grid-hero" style={{ background: "var(--ivory)" }}>
        {/* ── Left: Text ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "4rem",
          paddingTop: "2rem",
        }}>
          {/* Label */}
          <div
            ref={labelRef}
            className="section-label"
            style={{ marginBottom: "2.5rem", opacity: 0 }}
          >
            Immobilier de Prestige
          </div>

          {/* Headline */}
          <div style={{ marginBottom: "2rem" }}>
            {[
              { ref: word1Ref, text: "TROUVER." },
              { ref: word2Ref, text: "VOTRE." },
              { ref: word3Ref, text: "LIEU." },
            ].map(({ ref, text }, i) => (
              <div key={i} style={{ overflow: "hidden", lineHeight: "0.95" }}>
                <div
                  ref={ref}
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(54px, 8vw, 116px)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: i === 1 ? "var(--accent)" : "var(--dark)",
                    lineHeight: "0.95",
                    opacity: 0,
                    willChange: "transform",
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontSize: "clamp(15px, 1.4vw, 19px)",
              fontWeight: 300,
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: "380px",
              marginBottom: "2.5rem",
              opacity: 0,
            }}
          >
            Nous sélectionnons des propriétés d'exception pour des clients d'exception.
            Chaque espace a une âme — nous la trouvons pour vous.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0 }}
          >
            <a
              href="#properties"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                padding: "1rem 1.9rem",
                background: "var(--dark)",
                color: "var(--ivory)",
                textDecoration: "none",
                fontFamily: "var(--font-syne)",
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                transition: "background 0.35s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "var(--dark)")}
            >
              Voir les propriétés
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5H11M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "1rem 1.9rem",
                border: "1px solid var(--border)",
                color: "var(--dark)",
                textDecoration: "none",
                fontFamily: "var(--font-syne)",
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                transition: "border-color 0.3s, color 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--dark)";
              }}
            >
              Nous contacter
            </a>
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div
          ref={imgColRef}
          className="hero-img-col"
          style={{
            position: "relative",
            height: "calc(100svh - 5.5rem)",
            marginTop: "5.5rem",
            clipPath: "inset(100% 0 0 0)",
            overflow: "hidden",
          }}
        >
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=960&q=85&fit=crop"
            alt="Propriété d'exception"
            style={{ width: "100%", height: "115%", objectFit: "cover", display: "block", marginTop: "-8%" }}
          />

          {/* Price badge */}
          <div style={{
            position: "absolute", bottom: "2rem", left: "2rem",
            background: "var(--ivory)",
            padding: "1.2rem 1.6rem",
            boxShadow: "0 4px 32px rgba(26,23,20,0.12)",
          }}>
            <div style={{
              fontFamily: "var(--font-syne)",
              fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--muted)", marginBottom: "0.3rem",
            }}>
              À partir de
            </div>
            <div style={{
              fontFamily: "var(--font-syne)",
              fontSize: "22px", fontWeight: 700, color: "var(--dark)", letterSpacing: "-0.02em",
            }}>
              850 000 €
            </div>
          </div>

          {/* Location tag */}
          <div style={{
            position: "absolute", top: "2rem", right: "2rem",
            background: "var(--accent)",
            padding: "0.55rem 1rem",
          }}>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--ivory)",
            }}>
              Paris 7ème
            </span>
          </div>

          {/* Vertical label */}
          <div style={{
            position: "absolute", right: "-2.5rem", top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontFamily: "var(--font-syne)",
            fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase",
            color: "rgba(26,23,20,0.25)",
            whiteSpace: "nowrap",
          }}>
            Sélection FORMA 2024
          </div>
        </div>

        {/* ── Stats bar (full width) ── */}
        <div
          ref={statsRef}
          className="stats-bar"
          style={{
            gridColumn: "1 / -1",
            borderTop: "1px solid var(--border)",
            opacity: 0,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "1.4rem 2rem",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(20px, 2.2vw, 30px)",
                fontWeight: 700,
                color: "var(--dark)",
                letterSpacing: "-0.02em",
              }}>
                {s.num}
              </span>
              <span style={{
                fontFamily: "var(--font-dm)",
                fontSize: "10px", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--muted)",
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
