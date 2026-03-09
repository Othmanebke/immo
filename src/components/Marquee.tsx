"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const words = [
  "Real Estate Reimagined",
  "Architecture Meets Life",
  "Space Defines Identity",
  "More Than Property",
  "Curated Spaces",
  "Luxury Redefined",
];

export default function Marquee({ inverted = false }: { inverted?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });
    return () => { tl.kill(); };
  }, []);

  const bg = inverted ? "var(--cream)" : "transparent";
  const border = inverted ? "rgba(8,8,10,0.1)" : "rgba(242,237,230,0.08)";
  const col = inverted ? "rgba(8,8,10,0.4)" : "rgba(242,237,230,0.35)";
  const dot = inverted ? "rgba(8,8,10,0.15)" : "rgba(242,237,230,0.15)";
  const fade = inverted ? "var(--cream)" : "var(--warm-black)";

  const doubled = [...words, ...words, ...words, ...words];

  return (
    <div style={{ background: bg, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "14px 0", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to right, ${fade}, transparent)`, zIndex: 2 }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to left, ${fade}, transparent)`, zIndex: 2 }} />
      <div ref={trackRef} style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}>
        {doubled.map((w, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "20px", padding: "0 20px" }}>
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(12px, 1.1vw, 14px)", letterSpacing: "0.08em", fontStyle: i % 2 === 0 ? "italic" : "normal", fontWeight: 300, color: col }}>
              {w}
            </span>
            <span style={{ display: "inline-block", width: "3px", height: "3px", borderRadius: "50%", background: dot }} />
          </span>
        ))}
      </div>
    </div>
  );
}
