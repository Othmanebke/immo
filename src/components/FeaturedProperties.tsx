"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { properties, formatPrice } from "@/data/properties";

gsap.registerPlugin(ScrollTrigger);

// Pick one from each of 3 key cities for the home page feature
const FEATURED = [
  properties.find(p => p.id === "p01")!,
  properties.find(p => p.id === "c01")!,
  properties.find(p => p.id === "m03")!,
];

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

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

  const [big, ...smalls] = FEATURED;

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
        <Link
          href="/proprietes"
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
        </Link>
      </div>

      {/* Asymmetric Grid */}
      <div ref={gridRef} className="grid-props">
        {/* Large card */}
        <Link href={`/proprietes/${big.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className="prop-card prop-card-wrap prop-big"
            style={{ height: "680px", gridRow: "1 / 3", opacity: 0 }}
          >
            <img className="prop-card-img" src={big.images[0]} alt={big.title} />
            <div className="prop-card-overlay" />
            <div style={{
              position: "absolute", top: "1.5rem", left: "1.5rem",
              background: "var(--accent)", padding: "0.4rem 0.9rem",
            }}>
              <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ivory)" }}>
                {big.tag}
              </span>
            </div>
            <div className="prop-card-info">
              <div style={{ fontFamily: "var(--font-syne)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(247,243,236,0.55)", marginBottom: "0.4rem" }}>
                {big.zone}
              </div>
              <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(17px, 1.8vw, 24px)", color: "var(--ivory)", letterSpacing: "-0.01em", marginBottom: "1rem" }}>
                {big.title}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(247,243,236,0.65)" }}>{big.surface} m²</span>
                <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "17px", color: "var(--ivory)" }}>{formatPrice(big.price)}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Smaller cards */}
        {smalls.map((p, i) => (
          <Link key={p.id} href={`/proprietes/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              className="prop-card prop-card-wrap"
              style={{ height: "328px", opacity: 0 }}
            >
              <img className="prop-card-img" src={p.images[0]} alt={p.title} />
              <div className="prop-card-overlay" />
              <div style={{
                position: "absolute", top: "1.25rem", left: "1.25rem",
                background: i === 0 ? "var(--dark)" : "var(--accent)",
                padding: "0.35rem 0.85rem",
              }}>
                <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ivory)" }}>
                  {p.tag}
                </span>
              </div>
              <div className="prop-card-info">
                <div style={{ fontFamily: "var(--font-syne)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(247,243,236,0.55)", marginBottom: "0.35rem" }}>
                  {p.zone}
                </div>
                <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(14px, 1.5vw, 19px)", color: "var(--ivory)", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
                  {p.title}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(247,243,236,0.65)" }}>{p.surface} m²</span>
                  <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "15px", color: "var(--ivory)" }}>{formatPrice(p.price)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
