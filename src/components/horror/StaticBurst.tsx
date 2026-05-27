import { useEffect, useState } from "react";

export function StaticBurst() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      const wait = 5000 + Math.random() * 12000;
      timer = setTimeout(() => {
        setOn(true);
        setTimeout(() => setOn(false), 80 + Math.random() * 200);
        loop();
      }, wait);
    };
    loop();
    return () => clearTimeout(timer);
  }, []);
  if (!on) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9994]"
      style={{
        background:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
        mixBlendMode: "screen",
        opacity: 0.85,
      }}
    />
  );
}