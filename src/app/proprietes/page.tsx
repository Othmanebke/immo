import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyList from "@/components/PropertyList";

export const metadata: Metadata = {
  title: "Nos Propriétés — FORMA Immobilier de Prestige",
  description:
    "Découvrez notre sélection exclusive de 15 propriétés d'exception à Paris, Lyon, Côte d'Azur, Bordeaux et Monaco.",
};

export default function PropertiesPage() {
  return (
    <>
      <Navigation />
      <main style={{ background: "var(--ivory)", minHeight: "100vh" }}>
        <PropertyList />
      </main>
      <Footer />
    </>
  );
}
