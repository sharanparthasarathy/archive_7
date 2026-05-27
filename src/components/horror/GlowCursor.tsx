import { useEffect, useRef } from "react";

export function GlowCursor() {
  const glow = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = 0, y = 0, gx = 0, gy = 0;
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      gx += (x - gx) * 0.18;
      gy += (y - gy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (glow.current) glow.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}