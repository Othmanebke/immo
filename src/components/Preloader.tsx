"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    const obj = { val: 0 };

    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate() {
        const v = Math.round(obj.val);
        setCount(v);
        if (barRef.current) barRef.current.style.width = `${v}%`;
      },
    });

    tl.to({}, { duration: 0.18 });

    tl.to([countRef.current, logoRef.current], {
      opacity: 0,
      y: -16,
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.04,
    });

    tl.to(topRef.current, { yPercent: -100, duration: 0.95, ease: "power3.inOut" }, "wipe");
    tl.to(botRef.current, { yPercent: 100, duration: 0.95, ease: "power3.inOut", onComplete }, "wipe");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div className="preloader">
      <div ref={topRef} className="preloader-top">
        <span ref={countRef} className="preloader-num">{count}</span>
      </div>
      <div ref={botRef} className="preloader-bot">
        <span className="preloader-num select-none" style={{ opacity: 0.05 }} aria-hidden>{count}</span>
      </div>
      <div ref={barRef} className="preloader-bar" />
      <div ref={logoRef} style={{ position: "absolute", top: "40px", left: "40px", zIndex: 10002, fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(242,237,230,0.35)" }}>
        NOIR ESTATE
      </div>
      <div style={{ position: "absolute", bottom: "36px", right: "40px", zIndex: 10002, fontFamily: "var(--font-inter), sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,230,0.2)" }}>
        Loading experience
      </div>
    </div>
  );
}
