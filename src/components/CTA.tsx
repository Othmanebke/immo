"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CITIES = ["Paris", "Lyon", "Côte d'Azur", "Monaco"];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content",
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad"
      style={{
        padding: "8rem 3rem",
        background: "var(--ivory-alt)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Giant watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-3rem",
          right: "-1rem",
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(100px, 18vw, 240px)",
          fontWeight: 800,
          color: "rgba(196,112,74,0.055)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        FORMA
      </div>

      <div className="cta-content" style={{ opacity: 0, maxWidth: "680px", position: "relative" }}>
        <div className="section-label" style={{ marginBottom: "2rem" }}>
          Contact
        </div>

        <h2 style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(34px, 5vw, 68px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--dark)",
          lineHeight: 1.0,
          marginBottom: "1.5rem",
        }}>
          Parlons de Votre{" "}
          <span style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--accent)",
          }}>
            Projet
          </span>
        </h2>

        <p style={{
          fontFamily: "var(--font-dm)",
          fontSize: "15px",
          lineHeight: 1.8,
          color: "var(--muted)",
          maxWidth: "460px",
          marginBottom: "3rem",
        }}>
          Que vous souhaitiez acheter, vendre ou investir, notre équipe est
          à votre écoute pour vous proposer les meilleures opportunités du marché.
        </p>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <a
            href="tel:+33100000000"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.7rem",
              padding: "1.1rem 2.2rem",
              background: "var(--dark)",
              color: "var(--ivory)",
              textDecoration: "none",
              fontFamily: "var(--font-syne)",
              fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
              transition: "background 0.35s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--accent)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "var(--dark)")}
          >
            +33 1 00 00 00 00
          </a>
          <a
            href="mailto:contact@forma-immobilier.fr"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.7rem",
              padding: "1.1rem 2.2rem",
              border: "1px solid var(--border)",
              color: "var(--dark)",
              textDecoration: "none",
              fontFamily: "var(--font-syne)",
              fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
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
            contact@forma-immobilier.fr
          </a>
        </div>

        {/* Offices strip */}
        <div
          className="cta-cities"
          style={{
            display: "flex",
            gap: "2.5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {CITIES.map((city, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "var(--font-syne)",
                fontSize: "12px", fontWeight: 600,
                color: "var(--dark)", marginBottom: "0.2rem",
              }}>
                {city}
              </div>
              <div style={{
                fontFamily: "var(--font-dm)",
                fontSize: "10px",
                color: "var(--muted)",
                letterSpacing: "0.05em",
              }}>
                Bureau local
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
