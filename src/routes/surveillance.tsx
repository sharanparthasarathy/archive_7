import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CAMERAS } from "../data/archive";
import { GlitchText } from "../components/horror/GlitchText";

export const Route = createFileRoute("/surveillance")({
  head: () => ({ meta: [{ title: "ARCHIVE-7 // LIVE FEEDS" }] }),
  component: Surveillance,
});

function Surveillance() {
  const [lostIds, setLostIds] = useState<Record<string, boolean>>({});
  const [motion, setMotion] = useState<string | null>(null);
  useEffect(() => {
    const i = setInterval(() => {
      const id = CAMERAS[Math.floor(Math.random() * CAMERAS.length)].id;
      setLostIds((p) => ({ ...p, [id]: !p[id] }));
      const m = CAMERAS[Math.floor(Math.random() * CAMERAS.length)].id;
      setMotion(m);
      setTimeout(() => setMotion(null), 1500);
    }, 4000);
    return () => clearInterval(i);
  }, []);
  return (
    <main className="relative mx-auto min-h-screen max-w-6xl px-6 pt-24 pb-16">
      <header className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood-bright">// CATALOG 03</p>
        <h1 className="mt-2 font-major text-4xl text-static md:text-6xl">
          <GlitchText intensity={0.04}>LIVE SURVEILLANCE</GlitchText>
        </h1>
        <p className="mt-4 max-w-2xl font-elite italic text-static/50">
          real-time feeds. occasional signal loss. motion alerts unverified.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CAMERAS.map((c) => {
          const lost = lostIds[c.id];
          return (
            <div key={c.id} className="relative aspect-video border border-ash-light bg-black overflow-hidden">
              {lost ? (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='113'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                    backgroundSize: "cover",
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='113'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
                    backgroundSize: "cover",
                    background: "radial-gradient(ellipse at center, #050505 0%, #000 80%)",
                  }}
                />
              )}
              <div className="absolute left-2 top-2 font-mono text-[10px] text-blood-bright flicker">● LIVE</div>
              <div className="absolute right-2 top-2 font-mono text-[10px] text-static/70">{c.label}</div>
              <div className="absolute bottom-2 left-2 font-mono text-[10px] text-static/60">{c.coord}</div>
              {lost && (
                <div className="absolute inset-0 flex items-center justify-center font-major text-sm text-blood-bright">
                  SIGNAL LOST
                </div>
              )}
              {motion === c.id && !lost && (
                <div className="absolute inset-0 flex items-center justify-center bg-blood/30 font-major text-sm text-blood-bright" style={{ animation: "flicker 0.2s infinite" }}>
                  ▲ MOTION DETECTED ▲
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}