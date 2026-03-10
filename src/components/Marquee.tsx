"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  inverted?: boolean;
}

const MARKETS = [
  { city: "Paris",       zone: "7e · 8e · 16e",       from: "450 000 €",  count: "124" },
  { city: "Lyon",        zone: "6e · Presqu'île",       from: "220 000 €",  count: "67"  },
  { city: "Côte d'Azur", zone: "Cannes · Antibes · Nice", from: "380 000 €", count: "89"  },
  { city: "Bordeaux",    zone: "Chartrons · Pey-Berland", from: "195 000 €", count: "43"  },
  { city: "Monaco",      zone: "Principauté",           from: "1 200 000 €", count: "18" },
];

// Inverted version: a simple branded separator
function Separator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "var(--dark)",
        padding: "2rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        opacity: 0,
      }}
    >
      <div style={{ flex: 1, height: "1px", background: "rgba(247,243,236,0.08)" }} />
      <div style={{
        fontFamily: "var(--font-fraunces)",
        fontStyle: "italic",
        fontSize: "clamp(13px, 1.3vw, 16px)",
        color: "rgba(247,243,236,0.25)",
        whiteSpace: "nowrap",
        letterSpacing: "0.04em",
      }}>
        Nos services
      </div>
      <div style={{ flex: 1, height: "1px", background: "rgba(247,243,236,0.08)" }} />
    </div>
  );
}

// Default: markets band
function Markets() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".market-col",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: wrapRef.current, start: "top 88%" },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        background: "var(--ivory-alt)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        overflowX: "auto",
      }}
    >
      {MARKETS.map((m, i) => (
        <div
          key={i}
          className="market-col"
          style={{
            flex: "1 0 160px",
            padding: "1.5rem 2rem",
            borderRight: i < MARKETS.length - 1 ? "1px solid var(--border)" : "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            opacity: 0,
            transition: "background 0.3s",
            cursor: "default",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--ivory)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          {/* City + count */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem" }}>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--dark)",
              letterSpacing: "0.05em",
            }}>
              {m.city}
            </span>
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "9px",
              color: "var(--accent)",
              letterSpacing: "0.15em",
              whiteSpace: "nowrap",
            }}>
              {m.count} biens
            </span>
          </div>

          {/* Zone */}
          <div style={{
            fontFamily: "var(--font-dm)",
            fontSize: "11px",
            color: "var(--muted)",
            lineHeight: 1.4,
          }}>
            {m.zone}
          </div>

          {/* Price */}
          <div style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontSize: "12px",
            color: "var(--muted)",
            marginTop: "0.2rem",
          }}>
            dès {m.from}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Marquee({ inverted = false }: Props) {
  return inverted ? <Separator /> : <Markets />;
}
