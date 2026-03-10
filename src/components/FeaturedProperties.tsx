"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROPERTIES = [
  {
    id: "01",
    title: "Appartement Haussmannien",
    location: "Paris 8ème",
    surface: "285 m²",
    price: "3 200 000 €",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&fit=crop",
    tag: "Coup de cœur",
    tagDark: false,
  },
  {
    id: "02",
    title: "Villa Contemporaine",
    location: "Côte d'Azur",
    surface: "420 m²",
    price: "5 800 000 €",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&fit=crop",
    tag: "Exclusivité",
    tagDark: true,
  },
  {
    id: "03",
    title: "Penthouse Panoramique",
    location: "Lyon 6ème",
    surface: "198 m²",
    price: "1 950 000 €",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85&fit=crop",
    tag: "Nouveau",
    tagDark: false,
  },
];

export default function FeaturedProperties() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
        }
      );

      const cards = gridRef.current?.querySelectorAll(".prop-card-wrap");
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 55 },
          {
            opacity: 1, y: 0, stagger: 0.14, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="properties"
      className="section-pad"
      style={{ padding: "8rem 3rem", background: "var(--ivory)" }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "3.5rem",
          opacity: 0,
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <div className="section-label" style={{ marginBottom: "1rem" }}>
            Sélection exclusive
          </div>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(32px, 4.5vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--dark)",
            lineHeight: 1.0,
          }}>
            Propriétés<br />d'Exception
          </h2>
        </div>
        <a
          href="#"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingBottom: "2px",
            borderBottom: "1px solid var(--accent)",
            whiteSpace: "nowrap",
          }}
        >
          Toutes les propriétés
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5H9.5M6.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Asymmetric Grid */}
      <div ref={gridRef} className="grid-props">
        {/* Large card – spans 2 rows */}
        <div
          className="prop-card prop-card-wrap prop-big"
          style={{ height: "680px", gridRow: "1 / 3", opacity: 0 }}
        >
          <img className="prop-card-img" src={PROPERTIES[0].image} alt={PROPERTIES[0].title} />
          <div className="prop-card-overlay" />
          <div style={{
            position: "absolute", top: "1.5rem", left: "1.5rem",
            background: "var(--accent)", padding: "0.4rem 0.9rem",
          }}>
            <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ivory)" }}>
              {PROPERTIES[0].tag}
            </span>
          </div>
          <div className="prop-card-info">
            <div style={{ fontFamily: "var(--font-syne)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(247,243,236,0.55)", marginBottom: "0.4rem" }}>
              {PROPERTIES[0].location}
            </div>
            <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(17px, 1.8vw, 24px)", color: "var(--ivory)", letterSpacing: "-0.01em", marginBottom: "1rem" }}>
              {PROPERTIES[0].title}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(247,243,236,0.65)" }}>{PROPERTIES[0].surface}</span>
              <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "17px", color: "var(--ivory)" }}>{PROPERTIES[0].price}</span>
            </div>
          </div>
        </div>

        {/* Smaller cards */}
        {PROPERTIES.slice(1).map((p) => (
          <div
            key={p.id}
            className="prop-card prop-card-wrap"
            style={{ height: "328px", opacity: 0 }}
          >
            <img className="prop-card-img" src={p.image} alt={p.title} />
            <div className="prop-card-overlay" />
            <div style={{
              position: "absolute", top: "1.25rem", left: "1.25rem",
              background: p.tagDark ? "var(--dark)" : "var(--ivory)",
              padding: "0.35rem 0.85rem",
            }}>
              <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: p.tagDark ? "var(--ivory)" : "var(--dark)" }}>
                {p.tag}
              </span>
            </div>
            <div className="prop-card-info">
              <div style={{ fontFamily: "var(--font-syne)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(247,243,236,0.55)", marginBottom: "0.35rem" }}>
                {p.location}
              </div>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(14px, 1.5vw, 19px)", color: "var(--ivory)", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
                {p.title}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(247,243,236,0.65)" }}>{p.surface}</span>
                <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "15px", color: "var(--ivory)" }}>{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
