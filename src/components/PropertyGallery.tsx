"use client";

import { useState } from "react";

interface Props {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      {/* Main image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(340px, 55vh, 620px)",
          overflow: "hidden",
          cursor: "none",
        }}
        onClick={() => setZoomed(true)}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} — photo ${i + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === active ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />
        ))}

        {/* Photo count */}
        <div style={{
          position: "absolute",
          bottom: "1.25rem",
          right: "1.25rem",
          background: "rgba(26,23,20,0.65)",
          padding: "0.4rem 0.8rem",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backdropFilter: "blur(4px)",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 9V4.5L3.5 2.5 5.5 4l3-2 2.5 1.5V9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
            <circle cx="4" cy="5.5" r="1" stroke="white" strokeWidth="1"/>
          </svg>
          <span style={{
            fontFamily: "var(--font-syne)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "rgba(247,243,236,0.9)",
          }}>
            {active + 1} / {images.length}
          </span>
        </div>

        {/* Expand hint */}
        <div style={{
          position: "absolute",
          bottom: "1.25rem",
          left: "1.25rem",
          background: "rgba(26,23,20,0.55)",
          padding: "0.4rem 0.8rem",
          backdropFilter: "blur(4px)",
        }}>
          <span style={{
            fontFamily: "var(--font-syne)",
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(247,243,236,0.8)",
          }}>
            Voir en grand
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${images.length}, 1fr)`,
        gap: "4px",
        marginTop: "4px",
      }}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: 0,
              border: "none",
              background: "none",
              cursor: "none",
              position: "relative",
              paddingTop: "62%",
              overflow: "hidden",
              outline: i === active ? "2px solid var(--accent)" : "2px solid transparent",
              outlineOffset: "-2px",
              transition: "outline-color 0.25s",
            }}
          >
            <img
              src={src}
              alt={`${title} ${i + 1}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === active ? 1 : 0.55,
                transition: "opacity 0.3s",
              }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,23,20,0.96)",
            zIndex: 9990,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setZoomed(false)}
        >
          <img
            src={images[active]}
            alt={title}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "1px solid rgba(247,243,236,0.2)",
              color: "var(--ivory)",
              cursor: "none",
              padding: "0.6rem 1.1rem",
              fontFamily: "var(--font-syne)",
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Fermer
          </button>
          {/* Prev / Next */}
          {active > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setActive(a => a - 1); }}
              style={{
                position: "absolute",
                left: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(247,243,236,0.1)",
                border: "none",
                cursor: "none",
                padding: "1rem",
                color: "var(--ivory)",
              }}
            >
              ←
            </button>
          )}
          {active < images.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setActive(a => a + 1); }}
              style={{
                position: "absolute",
                right: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(247,243,236,0.1)",
                border: "none",
                cursor: "none",
                padding: "1rem",
                color: "var(--ivory)",
              }}
            >
              →
            </button>
          )}
        </div>
      )}
    </>
  );
}
