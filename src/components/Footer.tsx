"use client";

const NAV_LINKS = [
  { label: "Propriétés",  href: "#properties" },
  { label: "Services",    href: "#services"    },
  { label: "L'Agence",   href: "#about"       },
  { label: "Contact",     href: "#contact"     },
];

const LEGAL_LINKS = [
  { label: "Mentions légales",              href: "#" },
  { label: "Politique de confidentialité",  href: "#" },
  { label: "CGV",                           href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--dark)", padding: "5rem 3rem 2.5rem" }}>
      {/* Main grid */}
      <div
        className="grid-footer"
        style={{ marginBottom: "4rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(247,243,236,0.07)" }}
      >
        {/* Brand column */}
        <div>
          <div style={{
            fontFamily: "var(--font-syne)",
            fontSize: "24px", fontWeight: 800,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--ivory)", marginBottom: "1.2rem",
          }}>
            FORMA
          </div>
          <div style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontSize: "14px",
            color: "var(--accent)",
            marginBottom: "1rem",
          }}>
            Immobilier de Prestige
          </div>
          <p style={{
            fontFamily: "var(--font-dm)",
            fontSize: "13px", lineHeight: 1.75,
            color: "rgba(247,243,236,0.4)",
            maxWidth: "260px",
            marginBottom: "1.75rem",
          }}>
            Des propriétés d'exception pour des clients d'exception. Depuis 2009.
          </p>
          <div style={{
            fontFamily: "var(--font-syne)",
            fontSize: "9px", letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(247,243,236,0.25)",
          }}>
            Paris · Lyon · Côte d'Azur · Monaco
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <div style={{
            fontFamily: "var(--font-syne)",
            fontSize: "9px", letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(247,243,236,0.25)",
            marginBottom: "1.5rem",
          }}>
            Navigation
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "14px",
                    color: "rgba(247,243,236,0.55)",
                    textDecoration: "none",
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--ivory)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(247,243,236,0.55)")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <div style={{
            fontFamily: "var(--font-syne)",
            fontSize: "9px", letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(247,243,236,0.25)",
            marginBottom: "1.5rem",
          }}>
            Contact
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Téléphone", val: "+33 1 00 00 00 00" },
              { label: "Email",     val: "contact@forma-immobilier.fr" },
              { label: "Adresse",   val: "8 Avenue George V\n75008 Paris" },
            ].map(item => (
              <div key={item.label}>
                <div style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "9px", letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(247,243,236,0.2)",
                  marginBottom: "0.25rem",
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "13px",
                  color: "rgba(247,243,236,0.55)",
                  whiteSpace: "pre-line",
                  lineHeight: 1.5,
                }}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="footer-bottom"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{
          fontFamily: "var(--font-dm)",
          fontSize: "11px",
          color: "rgba(247,243,236,0.2)",
          lineHeight: 1.5,
        }}>
          © 2024 FORMA Immobilier SAS. Tous droits réservés.{" "}
          <span style={{ opacity: 0.5 }}>·</span>{" "}
          Carte pro n° CPI 7501 2018 000 036 693
        </div>
        <div className="footer-legal" style={{ display: "flex", gap: "1.5rem" }}>
          {LEGAL_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "11px",
                color: "rgba(247,243,236,0.2)",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(247,243,236,0.55)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(247,243,236,0.2)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
