import { useEffect, useState } from "react";

const CHARS = "▓▒░█▌▐│┤╡╢╖╕╣║╗╝┐└┴┬├─┼╞╟╚╔╩╦╠═";

export function GlitchText({ children, intensity = 0.04, className = "" }: { children: string; intensity?: number; className?: string }) {
  const [t, setT] = useState(children);
  useEffect(() => {
    const id = setInterval(() => {
      const out = children.split("").map((c) =>
        c !== " " && Math.random() < intensity ? CHARS[Math.floor(Math.random() * CHARS.length)] : c
      ).join("");
      setT(out);
      setTimeout(() => setT(children), 80);
    }, 600 + Math.random() * 800);
    return () => clearInterval(id);
  }, [children, intensity]);
  return <span className={`glitch-text ${className}`}>{t}</span>;
}