"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const tagRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(logoRef.current, {
      opacity: 1, y: 0,
      duration: 0.7, ease: "expo.out",
    }, 0);

    tl.to(tagRef.current, {
      opacity: 1,
      duration: 0.5, ease: "power2.out",
    }, 0.35);

    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = `${Math.round(obj.val)}%`;
      },
    }, 0.3);

    tl.to(lineRef.current, {
      width: "100%",
      duration: 1.8,
      ease: "power2.inOut",
    }, 0.3);

    tl.to(rootRef.current, {
      opacity: 0, y: -16,
      duration: 0.55, ease: "power2.in",
      delay: 0.2,
    });

    tl.call(() => onComplete(), undefined, ">");
  }, [onComplete]);

  return (
    <div className="preloader" ref={rootRef}>
      <div ref={logoRef} className="preloader-logo" style={{ opacity: 0 }}>
        FORMA
      </div>
      <div
        ref={tagRef}
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: "13px",
          color: "rgba(247,243,236,0.35)",
          opacity: 0,
          marginTop: "-0.5rem",
        }}
      >
        Immobilier de Prestige
      </div>
      <div className="preloader-line-wrap" style={{ marginTop: "1rem" }}>
        <div className="preloader-line-fill" ref={lineRef} />
      </div>
      <div className="preloader-num" ref={numRef}>0%</div>
    </div>
  );
}
