"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "FORMA a su comprendre exactement ce que nous recherchions. En moins de trois mois, nous avons trouvé notre appartement de rêve à Paris. Un service d'une précision remarquable.",
    author: "Marie & François D.",
    role: "Acquéreurs — Paris 16ème",
    year: "2024",
  },
  {
    quote: "Une équipe d'une discrétion et d'une compétence exceptionnelles. La vente de notre villa s'est conclue au-delà de nos espérances, dans les meilleures conditions.",
    author: "Henri L.",
    role: "Vendeur — Côte d'Azur",
    year: "2024",
  },
  {
    quote: "Leur connaissance du marché est sans égale. FORMA m'a accompagné dans la constitution de mon portefeuille immobilier avec une expertise et une rigueur absolues.",
    author: "Sophie M.",
    role: "Investisseure — Paris & Lyon",
    year: "2023",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testi-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: ".testi-header", start: "top 82%" },
        }
      );
      gsap.fromTo(".testi-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.14, duration: 0.95, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad"
      style={{ padding: "8rem 3rem", background: "var(--dark)" }}
    >
      {/* Header */}
      <div
        className="testi-header"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "4rem",
          flexWrap: "wrap",
          gap: "1rem",
          opacity: 0,
        }}
      >
        <div>
          <div
            className="section-label"
            style={{ color: "rgba(247,243,236,0.35)", marginBottom: "1rem" }}
          >
            Témoignages
          </div>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--ivory)",
            lineHeight: 1.05,
          }}>
            Ils nous font confiance
          </h2>
        </div>
        <div style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: "clamp(14px, 1.5vw, 18px)",
          fontWeight: 300,
          color: "rgba(247,243,236,0.2)",
          maxWidth: "280px",
          textAlign: "right",
          lineHeight: 1.5,
        }}>
          La satisfaction de nos clients est notre plus grande fierté
        </div>
      </div>

      {/* Cards */}
      <div className="grid-3col">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="testi-card"
            style={{
              padding: "2.5rem",
              border: "1px solid rgba(247,243,236,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
              opacity: 0,
              transition: "border-color 0.35s, background 0.35s",
              position: "relative",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,112,74,0.3)";
              (e.currentTarget as HTMLElement).style.background = "rgba(247,243,236,0.02)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,243,236,0.08)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Year */}
            <div style={{
              position: "absolute",
              top: "2.5rem",
              right: "2.5rem",
              fontFamily: "var(--font-syne)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(247,243,236,0.2)",
            }}>
              {t.year}
            </div>

            {/* Quote mark */}
            <div style={{
              fontFamily: "Georgia, serif",
              fontSize: "52px",
              color: "var(--accent)",
              lineHeight: 0.75,
              opacity: 0.7,
            }}>
              "
            </div>

            <p style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(247,243,236,0.7)",
              fontWeight: 300,
              flex: 1,
            }}>
              {t.quote}
            </p>

            <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(247,243,236,0.07)" }}>
              <div style={{
                fontFamily: "var(--font-syne)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--ivory)",
                marginBottom: "0.25rem",
              }}>
                {t.author}
              </div>
              <div style={{
                fontFamily: "var(--font-dm)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(247,243,236,0.35)",
              }}>
                {t.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom rating bar */}
      <div style={{
        marginTop: "4rem",
        paddingTop: "2.5rem",
        borderTop: "1px solid rgba(247,243,236,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}>
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { num: "4.9/5", label: "Note moyenne" },
            { num: "98%", label: "Clients satisfaits" },
            { num: "500+", label: "Avis clients" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700, color: "var(--ivory)", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>
                {s.num}
              </div>
              <div style={{ fontFamily: "var(--font-dm)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(247,243,236,0.35)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: "13px",
          color: "rgba(247,243,236,0.25)",
        }}>
          Noté sur Google & Trustpilot
        </div>
      </div>
    </section>
  );
}
