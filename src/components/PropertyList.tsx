"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { properties, formatPrice, CITIES, type Property } from "@/data/properties";

const DPE_COLOR: Record<string, string> = {
  A: "#22c55e", B: "#84cc16", C: "#a3e635",
  D: "#eab308", E: "#f97316", F: "#ef4444", G: "#dc2626",
};

function PropertyCard({ prop }: { prop: Property }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/proprietes/${prop.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--white)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          transition: "box-shadow 0.4s, transform 0.4s var(--ease-expo)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 16px 48px rgba(26,23,20,0.1)" : "0 1px 4px rgba(26,23,20,0.04)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", paddingTop: "65%", overflow: "hidden" }}>
          <img
            src={prop.images[0]}
            alt={prop.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.9s var(--ease-expo)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />

          {/* Hover overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(26,23,20,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s",
          }}>
            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-syne)",
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--ivory)",
            }}>
              Voir le bien
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4M10.5 1.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

          {/* Tag */}
          {prop.tag && (
            <div style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              background: prop.tag === "Exclusivité" ? "var(--dark)" : "var(--accent)",
              padding: "0.35rem 0.85rem",
            }}>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "8.5px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--ivory)",
              }}>
                {prop.tag}
              </span>
            </div>
          )}

          {/* DPE badge */}
          <div style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: DPE_COLOR[prop.dpe],
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
            }}>
              {prop.dpe}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1.4rem 1.5rem 1.5rem" }}>
          {/* Type + zone */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.6rem",
          }}>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}>
              {prop.type}
            </span>
            <span style={{
              fontFamily: "var(--font-dm)",
              fontSize: "11px",
              color: "var(--muted)",
            }}>
              {prop.zone}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--dark)",
            marginBottom: "0.85rem",
            lineHeight: 1.2,
          }}>
            {prop.title}
          </h3>

          {/* Specs row */}
          <div style={{
            display: "flex",
            gap: "1rem",
            paddingBottom: "1rem",
            marginBottom: "1rem",
            borderBottom: "1px solid var(--border)",
          }}>
            {[
              { val: `${prop.surface} m²`, icon: "⬜" },
              { val: `${prop.rooms} pièces`, icon: "🏠" },
              { val: `${prop.bedrooms} ch.`, icon: "🛏" },
            ].map((s, i) => (
              <span key={i} style={{
                fontFamily: "var(--font-dm)",
                fontSize: "12px",
                color: "var(--muted)",
              }}>
                {s.val}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--dark)",
            }}>
              {formatPrice(prop.price)}
            </span>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              opacity: hovered ? 1 : 0.6,
              transition: "opacity 0.3s",
            }}>
              Voir
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3.5M9 1V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function PropertyList() {
  const [activeCity, setActiveCity] = useState<string>("Toutes");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => activeCity === "Toutes" ? properties : properties.filter(p => p.city === activeCity),
    [activeCity]
  );

  const countByCity = useMemo(() => {
    const counts: Record<string, number> = { Toutes: properties.length };
    properties.forEach(p => {
      counts[p.city] = (counts[p.city] ?? 0) + 1;
    });
    return counts;
  }, []);

  // Animate grid on filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll("article");
    if (!cards) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "expo.out" }
    );
  }, [filtered]);

  return (
    <>
      {/* Page header */}
      <div style={{
        padding: "9rem 3rem 3rem",
        background: "var(--ivory)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            {/* Breadcrumb */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}>
              <Link href="/" style={{
                fontFamily: "var(--font-syne)",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textDecoration: "none",
              }}>
                FORMA
              </Link>
              <span style={{ color: "var(--border)", fontSize: "12px" }}>/</span>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}>
                Propriétés
              </span>
            </div>
            <h1 style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--dark)",
              lineHeight: 1.0,
            }}>
              Nos{" "}
              <span style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--accent)",
              }}>
                Propriétés
              </span>
            </h1>
          </div>
          <p style={{
            fontFamily: "var(--font-dm)",
            fontSize: "14px",
            color: "var(--muted)",
            maxWidth: "300px",
            lineHeight: 1.7,
          }}>
            {filtered.length} bien{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
            {activeCity !== "Toutes" ? ` à ${activeCity}` : ""}
          </p>
        </div>
      </div>

      {/* City filter tabs */}
      <div style={{
        position: "sticky",
        top: "60px",
        zIndex: 100,
        background: "var(--ivory-alt)",
        borderBottom: "1px solid var(--border)",
        padding: "0 3rem",
        display: "flex",
        gap: "0",
        overflowX: "auto",
      }}>
        {CITIES.map(city => {
          const active = city === activeCity;
          return (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                padding: "1.1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
                transition: "border-color 0.25s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: active ? "var(--accent)" : "var(--muted)",
                transition: "color 0.25s",
                fontWeight: active ? 700 : 400,
              }}>
                {city}
              </span>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "9px",
                color: active ? "var(--accent)" : "var(--border)",
                transition: "color 0.25s",
              }}>
                {countByCity[city] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ padding: "3rem", background: "var(--ivory)" }}>
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="prop-grid"
        >
          {filtered.map(prop => (
            <PropertyCard key={prop.id} prop={prop} />
          ))}
        </div>
      </div>
    </>
  );
}
