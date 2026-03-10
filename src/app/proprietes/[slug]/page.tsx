import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPropertyBySlug, properties, formatPrice } from "@/data/properties";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";

export async function generateStaticParams() {
  return properties.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const prop = getPropertyBySlug(slug);
  if (!prop) return {};
  return {
    title: `${prop.title} — ${prop.city} — FORMA`,
    description: prop.description.substring(0, 160),
  };
}

const DPE_COLOR: Record<string, string> = {
  A: "#22c55e", B: "#84cc16", C: "#a3e635",
  D: "#eab308", E: "#f97316", F: "#ef4444", G: "#dc2626",
};

export default async function PropertyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const similar = properties
    .filter(p => p.city === property.city && p.id !== property.id)
    .slice(0, 3);

  return (
    <>
      <Navigation />

      <main style={{ background: "var(--ivory)", paddingTop: "72px" }}>

        {/* ── Breadcrumb ── */}
        <div style={{
          padding: "1.25rem 3rem",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--ivory-alt)",
        }}>
          <Link href="/" style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>FORMA</Link>
          <span style={{ color: "var(--border)" }}>/</span>
          <Link href="/proprietes" style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" }}>Propriétés</Link>
          <span style={{ color: "var(--border)" }}>/</span>
          <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}>{property.city}</span>
        </div>

        {/* ── Main layout ── */}
        <div className="detail-grid" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>

          {/* ── Left: Gallery + Content ── */}
          <div style={{ paddingRight: "3rem", paddingTop: "2.5rem", paddingBottom: "5rem" }}>
            <PropertyGallery images={property.images} title={property.title} />

            {/* Title block */}
            <div style={{ marginTop: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ivory)", background: "var(--accent)", padding: "0.3rem 0.8rem" }}>
                  {property.type}
                </span>
                {property.tag && (
                  <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--border)", padding: "0.3rem 0.8rem" }}>
                    {property.tag}
                  </span>
                )}
              </div>
              <h1 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--dark)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
                {property.title}
              </h1>
              <div style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: "15px", color: "var(--muted)" }}>
                {property.zone}
              </div>
            </div>

            {/* Description */}
            <div style={{ paddingTop: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--accent)" }}>— Description</span>
              </div>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: "15px", lineHeight: 1.85, color: "var(--dark)", opacity: 0.75 }}>
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div style={{ paddingTop: "2rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <span style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--accent)" }}>— Prestations & équipements</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                {property.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.85rem 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: "5px" }} />
                    <span style={{ fontFamily: "var(--font-dm)", fontSize: "13px", color: "var(--dark)", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Sticky Panel ── */}
          <div style={{ position: "sticky", top: "80px", paddingTop: "2.5rem", paddingBottom: "2.5rem", paddingLeft: "2.5rem", borderLeft: "1px solid var(--border)" }}>

            {/* Price */}
            <div style={{ marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>Prix de vente</div>
              <div style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--dark)" }}>
                {formatPrice(property.price)}
              </div>
              <div style={{ fontFamily: "var(--font-dm)", fontSize: "11px", color: "var(--muted)", marginTop: "0.25rem" }}>
                {Math.round(property.price / property.surface).toLocaleString("fr-FR")} €/m²
              </div>
            </div>

            {/* Key specs grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid var(--border)" }}>
              {[
                { label: "Surface",  val: `${property.surface} m²`  },
                { label: "Pièces",   val: `${property.rooms}`        },
                { label: "Chambres", val: `${property.bedrooms}`     },
                { label: "Sdb",      val: `${property.bathrooms}`    },
                ...(property.floor   ? [{ label: "Étage",   val: `${property.floor}e` }] : []),
                ...(property.parking ? [{ label: "Parking", val: `${property.parking}` }] : []),
              ].map((s, i) => (
                <div key={i} style={{ padding: "0.85rem 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.2rem" }}>{s.label}</div>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: "15px", fontWeight: 700, color: "var(--dark)" }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* DPE + Exposition */}
            <div style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>DPE</div>
                  <div style={{ background: DPE_COLOR[property.dpe], width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-syne)", fontSize: "16px", fontWeight: 800, color: "#fff" }}>{property.dpe}</span>
                  </div>
                </div>
                {property.exposition && (
                  <div>
                    <div style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>Exposition</div>
                    <div style={{ fontFamily: "var(--font-dm)", fontSize: "13px", color: "var(--dark)" }}>{property.exposition}</div>
                  </div>
                )}
              </div>
              <div style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
                Réf. <span style={{ color: "var(--dark)", fontWeight: 600 }}>{property.ref}</span>
              </div>
            </div>

            {/* CTAs — CSS hover via className */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a href="tel:+33100000000" className="btn-dark">Prendre rendez-vous</a>
              <a href="mailto:contact@forma-immobilier.fr" className="btn-outline">Envoyer un email</a>
            </div>

            <p style={{ fontFamily: "var(--font-dm)", fontSize: "10px", color: "var(--muted)", marginTop: "1.25rem", lineHeight: 1.6, opacity: 0.65 }}>
              Honoraires à la charge de l'acquéreur. Prix HAI. Informations non contractuelles.
            </p>
          </div>
        </div>

        {/* ── Similar properties ── */}
        {similar.length > 0 && (
          <div style={{ padding: "4rem 3rem 5rem", borderTop: "1px solid var(--border)", background: "var(--ivory-alt)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ display: "block", width: "20px", height: "1px", background: "var(--accent)" }} />
                  Biens similaires
                </div>
                <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--dark)" }}>
                  À {property.city}
                </h2>
              </div>
              <Link href="/proprietes" style={{ fontFamily: "var(--font-syne)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>
                Tous les biens →
              </Link>
            </div>

            <div className="prop-grid">
              {similar.map(p => (
                <Link key={p.id} href={`/proprietes/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="similar-card">
                    <div style={{ paddingTop: "65%", position: "relative", overflow: "hidden" }}>
                      <img src={p.images[0]} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      {p.tag && (
                        <div style={{ position: "absolute", top: "1rem", left: "1rem", background: "var(--accent)", padding: "0.3rem 0.75rem" }}>
                          <span style={{ fontFamily: "var(--font-syne)", fontSize: "8.5px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ivory)" }}>{p.tag}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <div style={{ fontFamily: "var(--font-syne)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>{p.zone}</div>
                      <div style={{ fontFamily: "var(--font-syne)", fontSize: "15px", fontWeight: 700, color: "var(--dark)", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{p.title}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "var(--muted)" }}>{p.surface} m² · {p.rooms}p</span>
                        <span style={{ fontFamily: "var(--font-syne)", fontSize: "14px", fontWeight: 700, color: "var(--dark)" }}>{formatPrice(p.price)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
