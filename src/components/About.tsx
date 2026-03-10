"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  "Sélection rigoureuse de chaque bien",
  "Accompagnement juridique complet",
  "Réseau international d'acquéreurs qualifiés",
  "Discrétion et confidentialité absolues",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-label, .about-title, .about-body",
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0,
          stagger: 0.12, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".about-label", start: "top 80%" },
        }
      );

      gsap.fromTo(".about-point",
        { opacity: 0, x: -18 },
        {
          opacity: 1, x: 0,
          stagger: 0.1, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: ".about-points", start: "top 82%" },
        }
      );

      gsap.fromTo(".about-img",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: ".about-img", start: "top 78%" },
        }
      );

      // Subtle parallax
      gsap.to(".about-img img", {
        y: 40, ease: "none",
        scrollTrigger: {
          trigger: ".about-img",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad"
      style={{ padding: "8rem 3rem", background: "var(--ivory-alt)" }}
    >
      <div className="grid-2col">
        {/* Left: Text */}
        <div>
          <div className="section-label about-label" style={{ marginBottom: "1.75rem", opacity: 0 }}>
            Notre philosophie
          </div>
          <h2
            className="about-title"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(26px, 3vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--dark)",
              lineHeight: 1.15,
              marginBottom: "1.75rem",
              opacity: 0,
            }}
          >
            L'excellence,{" "}
            <span style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--accent)",
            }}>
              pas un objectif —
            </span>
            {" "}notre standard.
          </h2>
          <p
            className="about-body"
            style={{
              fontFamily: "var(--font-dm)",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "var(--muted)",
              maxWidth: "400px",
              marginBottom: "2.5rem",
              opacity: 0,
            }}
          >
            Depuis 2009, FORMA sélectionne les propriétés les plus remarquables
            pour une clientèle internationale exigeante. Notre approche allie
            expertise juridique, connaissance architecturale et sens aigu du marché.
          </p>

          <div className="about-points" style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {POINTS.map((pt, i) => (
              <div
                key={i}
                className="about-point"
                style={{ display: "flex", alignItems: "center", gap: "1rem", opacity: 0 }}
              >
                <span style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "14px", color: "var(--dark)" }}>
                  {pt}
                </span>
              </div>
            ))}
          </div>

          {/* Signature-style quote */}
          <div style={{
            marginTop: "2.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}>
            <div style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "52px",
              color: "var(--accent)",
              lineHeight: 0.8,
              flexShrink: 0,
            }}>
              "
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "15px",
                lineHeight: 1.65,
                color: "var(--muted)",
                fontWeight: 300,
                marginBottom: "0.75rem",
              }}>
                Chaque propriété est une histoire. Notre rôle est de vous aider
                à écrire la vôtre.
              </p>
              <div style={{
                fontFamily: "var(--font-syne)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--dark)",
              }}>
                Antoine Marchand, Fondateur
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div
          className="about-img img-mask"
          style={{
            height: "600px",
            clipPath: "inset(0 100% 0 0)",
            position: "relative",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85&fit=crop"
            alt="L'agence FORMA"
            style={{ width: "100%", height: "110%", objectFit: "cover", marginTop: "-5%" }}
          />
          {/* Floating stat card */}
          <div style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "-1.5rem",
            background: "var(--dark)",
            padding: "1.5rem 1.75rem",
            boxShadow: "0 8px 48px rgba(26,23,20,0.2)",
          }}>
            <div style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--ivory)",
              marginBottom: "0.25rem",
            }}>
              #1
            </div>
            <div style={{
              fontFamily: "var(--font-dm)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(247,243,236,0.5)",
            }}>
              Prestige Paris
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
