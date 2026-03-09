"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const links = [
  { num: "01", label: "Philosophy", href: "#manifesto" },
  { num: "02", label: "Spaces", href: "#spaces" },
  { num: "03", label: "Gallery", href: "#gallery" },
  { num: "04", label: "Begin", href: "#contact" },
];

const label9: React.CSSProperties = {
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "9px",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "rgba(8,8,10,0.4)",
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const items = itemsRef.current;
    gsap.set(items, { x: 60, opacity: 0 });
    gsap.set(metaRef.current, { opacity: 0, y: 20 });
    tlRef.current = gsap
      .timeline({ paused: true })
      .to(items, { x: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" })
      .to(metaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
  }, []);

  useEffect(() => {
    if (open) {
      tlRef.current?.play();
      gsap.to(bgImgRef.current, { scale: 1, opacity: 0.1, duration: 1.2, ease: "power3.out" });
    } else {
      tlRef.current?.reverse();
      gsap.to(bgImgRef.current, { scale: 1.08, opacity: 0, duration: 0.4, ease: "power2.in" });
    }
  }, [open]);

  const addRef = (el: HTMLLIElement | null) => {
    if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el);
  };

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 40px",
          mixBlendMode: "difference",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "13px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--off-white)",
            fontWeight: 400,
            textDecoration: "none",
          }}
        >
          NOIR ESTATE
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ display: "flex", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "none", padding: "4px" }}
        >
          {[
            { w: "32px", t: open ? "rotate(45deg) translate(4px, 4px)" : "none" },
            { w: open ? "32px" : "20px", op: open ? 0 : 1 },
            { w: "32px", t: open ? "rotate(-45deg) translate(4px, -4px)" : "none" },
          ].map((b, i) => (
            <span
              key={i}
              style={{
                display: "block",
                height: "1px",
                width: b.w,
                background: "var(--off-white)",
                transformOrigin: "center",
                transition: "transform 0.5s cubic-bezier(0.87,0,0.13,1), opacity 0.3s, width 0.4s",
                transform: b.t ?? "none",
                opacity: b.op ?? 1,
              }}
            />
          ))}
        </button>
      </header>

      {/* Fullscreen nav */}
      <nav ref={navRef} className={`fullscreen-nav ${open ? "open" : ""}`}>
        {/* Architectural bg */}
        <div ref={bgImgRef} style={{ position: "absolute", inset: 0, opacity: 0, transform: "scale(1.08)", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=60" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <button
          onClick={() => setOpen(false)}
          style={{ position: "absolute", top: "28px", right: "40px", background: "none", border: "none", cursor: "none", zIndex: 10, ...label9 }}
        >
          Close
        </button>

        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          {/* Links */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "80px 60px" }}>
            <ul style={{ listStyle: "none", width: "100%" }}>
              {links.map((link) => (
                <li key={link.href} ref={addRef} style={{ borderTop: "1px solid rgba(8,8,10,0.1)", padding: "5px 0" }}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ display: "flex", alignItems: "baseline", gap: "20px", textDecoration: "none", color: "var(--warm-black)", cursor: "none", transition: "opacity 0.3s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.28")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    <span style={{ ...label9, minWidth: "28px" }}>{link.num}</span>
                    <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(48px, 7.5vw, 100px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta column */}
          <div
            ref={metaRef}
            className="hidden md:flex"
            style={{ width: "240px", borderLeft: "1px solid rgba(8,8,10,0.1)", flexDirection: "column", justifyContent: "flex-end", padding: "60px", gap: "28px" }}
          >
            {[
              { title: "Contact", lines: ["contact@noirestate.com"] },
              { title: "Locations", lines: ["Paris, FR", "Geneva, CH", "Dubai, UAE"] },
            ].map((b) => (
              <div key={b.title}>
                <p style={{ ...label9, marginBottom: "10px" }}>{b.title}</p>
                {b.lines.map((l) => (
                  <p key={l} style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "14px", color: "rgba(8,8,10,0.5)", lineHeight: 1.75 }}>{l}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
