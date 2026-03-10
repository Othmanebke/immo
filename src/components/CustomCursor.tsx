"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { left: mx, top: my, duration: 0.08, ease: "none" });
    };

    const tickerId = gsap.ticker.add(() => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { left: rx, top: ry });
    });

    const addHover = () => { dot.classList.add("is-hover"); ring.classList.add("is-hover"); };
    const rmHover  = () => { dot.classList.remove("is-hover"); ring.classList.remove("is-hover"); };
    const addText  = () => { dot.classList.add("is-text"); ring.classList.add("is-text"); };
    const rmText   = () => { dot.classList.remove("is-text"); ring.classList.remove("is-text"); };

    window.addEventListener("mousemove", onMove);

    const refresh = () => {
      document.querySelectorAll("a, button, .prop-card").forEach(el => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", rmHover);
      });
      document.querySelectorAll("p, h1, h2, h3, h4").forEach(el => {
        el.addEventListener("mouseenter", addText);
        el.addEventListener("mouseleave", rmText);
      });
    };
    refresh();

    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tickerId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
