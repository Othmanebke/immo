"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = wordmarkRef.current?.querySelectorAll(".sci");
    if (chars) {
      gsap.from(chars, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.025,
        ease: "power4.out",
        scrollTrigger: { trigger: wordmarkRef.current, start: "top 88%" },
      });
    }

    gsap.from(footerRef.current?.querySelectorAll(".f-fade") ?? [], {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
    });
  }, []);

  const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" };
  const inter: React.CSSProperties = { fontFamily: "var(--font-inter), sans-serif" };
  const labelStyle: React.CSSProperties = { ...inter, fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)", marginBottom: "14px", display: "block" };
  const linkStyle: React.CSSProperties = { ...inter, fontSize: "12px", letterSpacing: "0.03em", lineHeight: 2, color: "rgba(242,237,230,0.45)", textDecoration: "none", display: "block", cursor: "none", transition: "color 0.3s" };

  return (
    <footer ref={footerRef} style={{ background: "var(--deep-black)", borderTop: "1px solid rgba(242,237,230,0.06)", overflow: "hidden" }}>

      {/* Large wordmark */}
      <div style={{ borderBottom: "1px solid rgba(242,237,230,0.06)", padding: "clamp(40px, 7vw, 80px) clamp(24px, 5vw, 80px)", overflow: "hidden" }}>
        <div ref={wordmarkRef}>
          {"NOIR ESTATE".split("").map((ch, i) => (
            <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
              <span
                className="sci"
                style={{
                  display: "inline-block",
                  ...serif,
                  fontSize: "clamp(56px, 11vw, 160px)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  color: ch === " " ? undefined : "rgba(242,237,230,0.12)",
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Info grid */}
      <div style={{ padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(32px, 5vw, 60px)" }} className="md:grid-cols-4">

        {/* Brand */}
        <div className="f-fade">
          <p style={{ ...serif, fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, letterSpacing: "-0.02em", color: "rgba(242,237,230,0.55)", lineHeight: 1.1, marginBottom: "16px" }}>
            Real estate<br />reimagined.
          </p>
          <p style={{ ...inter, fontSize: "11px", letterSpacing: "0.03em", lineHeight: 1.8, color: "rgba(242,237,230,0.25)", fontWeight: 300 }}>
            Est. 2024 · Paris
          </p>
        </div>

        {/* Navigate */}
        <div className="f-fade">
          <span style={labelStyle}>Navigate</span>
          {[["Philosophy", "#manifesto"], ["Spaces", "#spaces"], ["Gallery", "#gallery"], ["Begin", "#contact"]].map(([l, h]) => (
            <a key={l} href={h} style={linkStyle}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(242,237,230,0.8)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(242,237,230,0.45)")}
            >{l}</a>
          ))}
        </div>

        {/* Locations */}
        <div className="f-fade">
          <span style={labelStyle}>Locations</span>
          {["Paris, France", "Geneva, Switzerland", "Dubai, UAE", "Monaco, MC"].map((c) => (
            <p key={c} style={{ ...inter, fontSize: "12px", letterSpacing: "0.03em", lineHeight: 2, color: "rgba(242,237,230,0.35)", fontWeight: 300 }}>{c}</p>
          ))}
        </div>

        {/* Contact */}
        <div className="f-fade">
          <span style={labelStyle}>Contact</span>
          <p style={{ ...inter, fontSize: "12px", letterSpacing: "0.03em", lineHeight: 2, color: "rgba(242,237,230,0.45)", fontWeight: 300, marginBottom: "20px" }}>
            contact@noirestate.com<br />+33 1 00 00 00 00
          </p>
          <span style={labelStyle}>Follow</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Instagram", "LinkedIn", "X"].map((s) => (
              <a key={s} href="#" style={{ ...inter, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.3)", textDecoration: "none", cursor: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(242,237,230,0.7)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(242,237,230,0.3)")}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding: "20px clamp(24px, 5vw, 80px)", borderTop: "1px solid rgba(242,237,230,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }} className="f-fade">
        <p style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(242,237,230,0.2)" }}>
          © 2024 NOIR ESTATE. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Legal", "Terms"].map((t) => (
            <a key={t} href="#" style={{ ...inter, fontSize: "9px", letterSpacing: "0.2em", color: "rgba(242,237,230,0.2)", textDecoration: "none", cursor: "none" }}>{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
