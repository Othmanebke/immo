"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LINKS = [
  { num: "01", label: "Propriétés", href: "#properties" },
  { num: "02", label: "Services",   href: "#services"   },
  { num: "03", label: "L'Agence",  href: "#about"      },
  { num: "04", label: "Contact",    href: "#contact"    },
];

export default function Navigation() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const itemsRef      = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate accent line on mount
    gsap.fromTo(accentLineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.2, ease: "expo.out", delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.7, ease: "expo.out", delay: 0.3 }
      );
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 900,
          transition: "background 0.4s, border-color 0.4s",
          background: scrolled ? "rgba(247,243,236,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        {/* Top accent line */}
        <div
          ref={accentLineRef}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "var(--accent)",
          }}
        />

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "1rem 3rem" : "1.5rem 3rem",
          transition: "padding 0.4s",
        }}>
          {/* Logo */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1px",
              textDecoration: "none",
            }}
          >
            <span style={{
              fontFamily: "var(--font-syne)",
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--dark)",
            }}>
              FORMA
            </span>
            <span style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontSize: "18px",
              color: "var(--accent)",
              lineHeight: 1,
            }}>
              .
            </span>
          </a>

          {/* Desktop numbered links */}
          <ul
            className="nav-desktop"
            style={{ display: "flex", gap: "2.75rem", listStyle: "none", alignItems: "center" }}
          >
            {LINKS.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "5px",
                    textDecoration: "none",
                    color: "var(--dark)",
                    transition: "opacity 0.25s",
                    opacity: 0.55,
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
                >
                  <sup style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    color: "var(--accent)",
                    fontWeight: 600,
                    lineHeight: 1,
                    verticalAlign: "super",
                  }}>
                    {l.num}
                  </sup>
                  <span style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}>
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right: RDV link + menu button */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <a
              href="#contact"
              className="nav-phone"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "14px",
                color: "var(--dark)",
                textDecoration: "none",
                opacity: 0.7,
                transition: "opacity 0.25s, color 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = "0.7";
                (e.currentTarget as HTMLElement).style.color = "var(--dark)";
              }}
            >
              Prendre rendez-vous
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: "rotate(-45deg)", marginTop: "1px" }}>
                <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4M10.5 1.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Divider */}
            <div style={{ width: "1px", height: "14px", background: "var(--border)" }} className="nav-phone" />

            {/* Menu button */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Fermer" : "Menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "4px",
                padding: "4px",
                position: "relative",
                zIndex: 1001,
              }}
            >
              <span style={{
                display: "block", height: "1.5px",
                width: open ? "22px" : "22px",
                background: open ? "var(--ivory)" : "var(--dark)",
                transition: "transform 0.4s, background 0.35s",
                transform: open ? "translateY(2.75px) rotate(45deg)" : "none",
                transformOrigin: "center",
              }} />
              <span style={{
                display: "block", height: "1.5px",
                width: open ? "22px" : "14px",
                background: open ? "var(--ivory)" : "var(--dark)",
                transition: "transform 0.4s, background 0.35s, width 0.3s",
                transform: open ? "translateY(-2.75px) rotate(-45deg)" : "none",
                transformOrigin: "right center",
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Fullscreen overlay ── */}
      <div className={`fullscreen-menu ${open ? "open" : ""}`}>
        {/* Close label top-right */}
        <button
          onClick={close}
          style={{
            position: "absolute",
            top: "1.75rem", right: "3rem",
            background: "none", border: "none", cursor: "none",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          <span style={{
            fontFamily: "var(--font-syne)",
            fontSize: "9px", letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(247,243,236,0.35)",
          }}>
            Fermer
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ display: "block", width: "18px", height: "1.5px", background: "var(--ivory)", transform: "rotate(45deg) translateY(3px)" }} />
            <span style={{ display: "block", width: "18px", height: "1.5px", background: "var(--ivory)", transform: "rotate(-45deg) translateY(-3px)" }} />
          </div>
        </button>

        {/* Menu links */}
        <div
          className="fullscreen-menu-links"
          style={{ paddingLeft: "clamp(1.5rem, 6vw, 5rem)" }}
        >
          {LINKS.map((l, i) => (
            <div
              key={l.label}
              ref={el => { itemsRef.current[i] = el; }}
              style={{ opacity: 0, display: "flex", alignItems: "baseline", gap: "1.5rem" }}
            >
              <span style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(12px, 1.2vw, 16px)",
                color: "var(--accent)",
                opacity: 0.8,
                minWidth: "2rem",
              }}>
                {l.num}
              </span>
              <a
                href={l.href}
                onClick={close}
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(40px, 6.5vw, 82px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "var(--ivory)",
                  textDecoration: "none",
                  display: "block",
                  lineHeight: 1.0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
              >
                {l.label}
              </a>
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div style={{
          position: "absolute",
          bottom: "2rem", left: "clamp(1.5rem, 6vw, 5rem)", right: "3rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(247,243,236,0.08)",
          paddingTop: "1.5rem",
        }}>
          <div style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontSize: "13px",
            color: "rgba(247,243,236,0.35)",
          }}>
            Paris · Lyon · Côte d'Azur · Monaco
          </div>
          <a href="tel:+33100000000" style={{
            fontFamily: "var(--font-syne)",
            fontSize: "9px", letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textDecoration: "none",
          }}>
            +33 1 00 00 00 00
          </a>
        </div>
      </div>
    </>
  );
}
