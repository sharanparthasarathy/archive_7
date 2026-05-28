import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GlitchText } from "../components/horror/GlitchText";

// export const Route = createFileRoute("/signal")({
//   head: () => ({ meta: [{ title: "ARCHIVE-7 // THE SIGNAL" }] }),
//   component: Signal,
// });

export default function Signal() {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 64 }, () => Math.random()));
  const [clue, setClue] = useState(false);
  useEffect(() => {
    const i = setInterval(() => {
      setBars(Array.from({ length: 64 }, () => Math.random()));
    }, 120);
    return () => clearInterval(i);
  }, []);
  const cipher = "Vs lbh ner ernqvat guvf, gur fvtany unf nyernql ernpurq lbh.";
  return (
    <main className="relative mx-auto min-h-screen max-w-4xl px-6 pt-24 pb-16">
      <header className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood-bright">// CATALOG 04</p>
        <h1 className="mt-2 font-major text-4xl text-static md:text-6xl">
          <GlitchText intensity={0.08}>THE SIGNAL</GlitchText>
        </h1>
        <p className="mt-4 max-w-2xl font-elite italic text-static/50">
          broadcast of unknown origin. source has not been located.
        </p>
      </header>

      <section className="border border-ash-light bg-black/70 p-5">
        <div className="flex items-end justify-between gap-1" style={{ height: 120 }}>
          {bars.map((v, i) => (
            <div key={i} className="flex-1 bg-crt" style={{ height: `${v * 100}%`, opacity: 0.5 + v * 0.5, boxShadow: "0 0 6px #00ff66" }} />
          ))}
        </div>
        <div className="mt-3 font-mono text-xs text-crt-dim">FREQ 87.███ MHz // amplitude unstable</div>
      </section>

      <section className="mt-8 border border-blood/40 bg-black/70 p-5">
        <h2 className="font-major text-sm text-blood-bright">// ENCODED FRAGMENT</h2>
        <p className="mt-3 font-mono text-sm text-static/80 break-words">{cipher}</p>
        <button
          onClick={() => setClue(true)}
          className="mt-4 border border-crt/40 px-3 py-1 font-mono text-[11px] text-crt hover:bg-crt/10"
        >
          [ ATTEMPT DECRYPTION ]
        </button>
        {clue && (
          <p className="mt-4 font-elite text-sm italic text-crt">
            → "If you are reading this, the signal has already reached you."
          </p>
        )}
      </section>

      <section className="mt-8 font-mono text-[11px] text-static/40">
        <p>// hidden coordinates: 47.████ N — 19.████ E</p>
        <p>// listen at 03:33 local time</p>
        <p className="flicker">// • — — •   — • — •   — — —</p>
      </section>
    </main>
  );
}