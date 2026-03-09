"use client";

/**
 * SplitText — renders text wrapped in per-char or per-word spans
 * for GSAP stagger animations.
 *
 * Usage:
 *   <SplitText text="NOIR ESTATE" type="chars" ref={ref} />
 *   Then: gsap.from(ref.current.querySelectorAll('.sci'), { yPercent: 110, stagger: 0.03 })
 */

import { forwardRef } from "react";

interface SplitTextProps {
  text: string;
  type?: "chars" | "words";
  className?: string;
  style?: React.CSSProperties;
  tag?: keyof React.JSX.IntrinsicElements;
}

const SplitText = forwardRef<HTMLElement, SplitTextProps>(
  ({ text, type = "chars", className = "", style, tag: Tag = "span" }, ref) => {
    if (type === "words") {
      const words = text.split(" ");
      return (
        // @ts-expect-error dynamic tag
        <Tag ref={ref} className={className} style={style} aria-label={text}>
          {words.map((word, wi) => (
            <span key={wi} className="split-char-outer" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
              <span className="sci" style={{ display: "inline-block" }}>{word}</span>
              {wi < words.length - 1 && (
                <span style={{ display: "inline-block" }}>&nbsp;</span>
              )}
            </span>
          ))}
        </Tag>
      );
    }

    // chars mode
    return (
      // @ts-expect-error dynamic tag
      <Tag ref={ref} className={className} style={style} aria-label={text}>
        {text.split("").map((char, ci) => (
          <span key={ci} className="split-char-outer" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span className="sci" style={{ display: "inline-block" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </Tag>
    );
  }
);

SplitText.displayName = "SplitText";

export default SplitText;
