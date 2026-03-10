"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Acquisition & Conseil",
    desc: "De la recherche au compromis, nous vous accompagnons à chaque étape. Analyse de marché, visites privées, négociation experte et audit juridique complet.",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80&fit=crop",
    tags: ["Recherche ciblée", "Négociation", "Audit juridique"],
  },
  {
    num: "02",
    title: "Vente & Valorisation",
    desc: "Mise en valeur photographique professionnelle, diffusion internationale exclusive, qualification précise des acquéreurs pour vendre dans les meilleures conditions.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80&fit=crop",
    tags: ["Estimation précise", "Home staging", "Diffusion premium"],
  },
  {
    num: "03",
    title: "Gestion & Location",
    desc: "Gestion locative complète, sélection rigoureuse des locataires, suivi technique et comptable pour un rendement optimisé et un patrimoine préservé.",
    img: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=700&q=80&fit=crop",
    tags: ["Gestion complète", "Sélection locataires", "Optimisation fiscale"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".srv-header",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".srv-header", start: "top 82%" },
        }
      );
      gsap.fromTo(".srv-item",
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, stagger: 0.13, duration: 0.95, ease: "expo.out",
          scrollTrigger: { trigger: ".srv-list", start: "top 78%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-pad"
      style={{ padding: "8rem 3rem", background: "var(--ivory)" }}
    >
      {/* Header */}
      <div className="srv-header grid-2col-srv" style={{ opacity: 0 }}>
        <div>
          <div className="section-label" style={{ marginBottom: "1rem" }}>
            Nos services
          </div>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(30px, 4vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--dark)",
            lineHeight: 1.0,
          }}>
            Un Accompagnement<br />Sur Mesure
          </h2>
        </div>
        <p style={{
          fontFamily: "var(--font-dm)",
          fontSize: "15px",
          lineHeight: 1.8,
          color: "var(--muted)",
        }}>
          FORMA propose une gamme complète de services immobiliers, du conseil
          à la gestion patrimoniale, toujours avec le même niveau d'exigence
          et une attention absolue aux détails.
        </p>
      </div>

      {/* List */}
      <div className="srv-list">
        {SERVICES.map((srv) => (
          <div
            key={srv.num}
            className="srv-item"
            style={{
              display: "grid",
              borderTop: "1px solid var(--border)",
              padding: "2.5rem 0",
              opacity: 0,
              transition: "background 0.35s",
              margin: "0 -3rem",
              paddingLeft: "3rem",
              paddingRight: "3rem",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--ivory-alt)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <div className="srv-grid">
              {/* Number */}
              <span style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "13px",
                color: "var(--accent)",
                letterSpacing: "0.08em",
                fontStyle: "italic",
                width: "3rem",
                paddingTop: "0.25rem",
              }}>
                {srv.num}
              </span>

              {/* Content */}
              <div>
                <h3 style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(18px, 1.8vw, 26px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--dark)",
                  marginBottom: "0.7rem",
                }}>
                  {srv.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  maxWidth: "440px",
                }}>
                  {srv.desc}
                </p>
              </div>

              {/* Tags + thumbnail */}
              <div className="srv-tags" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {srv.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      padding: "0.4rem 0.85rem",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ width: "76px", height: "76px", flexShrink: 0, overflow: "hidden" }}>
                  <img
                    src={srv.img}
                    alt={srv.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s var(--ease-expo)" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.1)")}
                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}
