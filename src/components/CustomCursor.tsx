"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!cursor || !dot || !ring || !label) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(cursor, { x: mx, y: my, duration: 0.08, ease: "none" });
      gsap.to(label, { x: mx + 10, y: my, duration: 0.08, ease: "none" });
    };

    const animate = () => {
      rx += (mx - rx) * 0.09;
      ry += (my - ry) * 0.09;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);

    const setHover = (labelText: string) => {
      cursor.classList.add("is-hover");
      ring.classList.add("is-hover");
      label.classList.add("is-hover");
      label.textContent = labelText;
    };

    const clearHover = () => {
      cursor.classList.remove("is-hover");
      ring.classList.remove("is-hover");
      label.classList.remove("is-hover");
      label.textContent = "";
    };

    const attachHover = (el: Element) => {
      const type = (el as HTMLElement).dataset.cursor || "view";
      const labelMap: Record<string, string> = {
        view: "View",
        drag: "Drag",
        book: "Book",
        link: "",
      };
      el.addEventListener("mouseenter", () => setHover(labelMap[type] ?? type));
      el.addEventListener("mouseleave", clearHover);
    };

    document.addEventListener("mousemove", onMove);

    // Initial attach
    document.querySelectorAll("[data-cursor]").forEach(attachHover);

    // Watch for new elements
    const obs = new MutationObserver(() => {
      document.querySelectorAll("[data-cursor]:not([data-cursor-attached])").forEach((el) => {
        (el as HTMLElement).dataset.cursorAttached = "1";
        attachHover(el);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor">
        <div ref={dotRef} className="cursor-dot" />
      </div>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
