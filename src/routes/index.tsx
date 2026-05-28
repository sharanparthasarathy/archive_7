import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TypingTerminal } from "../components/horror/TypingTerminal";
import { GlitchText } from "../components/horror/GlitchText";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "ARCHIVE-7 // ACCESS GRANTED" },
//       { name: "description", content: "Recovered footage. Incident reports. Live surveillance feeds. Do not watch alone." },
//     ],
//   }),
//   component: Index,
// });

const WARNINGS = [
  "ARCHIVE ACCESS DETECTED",
  "UNAUTHORIZED VIEWING LOGGED",
  "DO NOT WATCH ALONE",
  "TURN AROUND",
  "THEY KNOW",
];

export default function Index() {
  const [warning, setWarning] = useState<{ text: string; x: number; y: number; key: number } | null>(null);
  useEffect(() => {
    let k = 0;
    const id = setInterval(() => {
      k++;
      setWarning({
        text: WARNINGS[Math.floor(Math.random() * WARNINGS.length)],
        x: 10 + Math.random() * 70,
        y: 15 + Math.random() * 65,
        key: k,
      });
      setTimeout(() => setWarning(null), 1600);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background "found-footage" canvas */}
      <NoiseBackdrop />

      {/* Hero content */}
      <section className="relative z-[2] flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-blood-bright flicker">
            // CLASSIFIED ARCHIVE // ACCESS GRANTED //
          </p>
          <h1 className="mt-4 font-major text-5xl leading-none text-static sm:text-7xl md:text-8xl">
            <GlitchText intensity={0.06}>ARCHIVE-7</GlitchText>
          </h1>
          <p className="mt-4 max-w-xl font-elite text-base text-static/60 italic">
            recovered tapes. incident reports. live feeds. <br />
            do not watch alone.
          </p>
        </div>

        <div className="w-full max-w-2xl border border-crt-dim/40 bg-black/60 p-5 backdrop-blur-sm">
          <TypingTerminal
            lines={[
              "connecting to archive-7 ...",
              "negotiating handshake ... packet loss 47%",
              "decrypting channel ...",
              "WARNING: this archive contains unverified material.",
              "WARNING: contents have been associated with adverse psychological effects.",
              "press any key to continue. (or don't.)",
            ]}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/archive" className="group border border-crt/40 px-5 py-2 font-mono text-xs uppercase tracking-widest text-crt transition-all hover:border-crt hover:bg-crt/10 hover:shadow-[0_0_24px_#00ff66]">
            <GlitchText intensity={0.05}>ENTER ARCHIVE →</GlitchText>
          </Link>
          <Link to="/surveillance" className="border border-blood/60 px-5 py-2 font-mono text-xs uppercase tracking-widest text-blood-bright transition-all hover:bg-blood/20">
            VIEW LIVE FEEDS
          </Link>
          <Link to="/signal" className="border border-static/20 px-5 py-2 font-mono text-xs uppercase tracking-widest text-static/60 transition-all hover:text-static">
            THE SIGNAL
          </Link>
        </div>

        {warning && (
          <div
            key={warning.key}
            className="pointer-events-none absolute font-mono text-xs uppercase tracking-widest text-blood-bright"
            style={{ left: `${warning.x}%`, top: `${warning.y}%`, animation: "flicker 0.4s infinite" }}
          >
            ▲ {warning.text} ▲
          </div>
        )}
      </section>

      <section className="relative z-[2] mx-auto max-w-5xl px-6 py-24">
        <h2 className="font-major text-2xl text-crt md:text-3xl">// ARCHIVE INDEX</h2>
        <p className="mt-2 max-w-2xl font-mono text-sm text-static/50">
          four sealed catalogs. each contains material that has been ████████ for at least ██ years. continue at your own discretion.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { to: "/archive", code: "01", title: "RECOVERED TAPES", desc: "vhs evidence library. corrupted playback." },
            { to: "/reports", code: "02", title: "INCIDENT REPORTS", desc: "classified case files. redacted." },
            { to: "/surveillance", code: "03", title: "LIVE SURVEILLANCE", desc: "real-time cctv. occasional signal loss." },
            { to: "/signal", code: "04", title: "THE SIGNAL", desc: "broadcast of unknown origin. listen closely." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative block border border-ash-light bg-black/60 p-6 transition-all hover:border-blood hover:bg-blood/10 hover:shadow-[0_0_40px_#5a0000]"
            >
              <div className="font-major text-xs text-blood-bright">FILE {c.code}</div>
              <div className="mt-3 font-mono text-xl tracking-widest text-static group-hover:text-crt">
                <GlitchText intensity={0.03}>{c.title}</GlitchText>
              </div>
              <div className="mt-2 font-elite text-sm italic text-static/40">{c.desc}</div>
              <div className="mt-6 font-mono text-[10px] text-static/30">SIGNAL: {Math.floor(Math.random()*70+10)}%  //  LAST ACCESS: ██/██/██</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/** SVG-based animated static backdrop. Lightweight, no video file. */
function NoiseBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const size = 160;
    c.width = size; c.height = size;
    let raf = 0;
    let frame = 0;
    const draw = () => {
      frame++;
      const img = ctx.createImageData(size, size);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 200) | 0;
        const isBlood = Math.random() < 0.003;
        d[i] = isBlood ? 90 : v * 0.4;
        d[i + 1] = v * 0.4;
        d[i + 2] = v * 0.4;
        d[i + 3] = 40 + Math.random() * 40;
      }
      ctx.putImageData(img, 0, 0);
      // occasional horizontal band
      if (frame % 60 === 0) {
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        const by = Math.random() * size;
        ctx.fillRect(0, by, size, 2);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      style={{ width: "100%", height: "100%", imageRendering: "pixelated", filter: "contrast(1.4) brightness(0.7)" }}
    />
  );
}
