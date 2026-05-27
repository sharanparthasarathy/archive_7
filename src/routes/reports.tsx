import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { REPORTS } from "../data/archive";
import { GlitchText } from "../components/horror/GlitchText";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "ARCHIVE-7 // INCIDENT REPORTS" }] }),
  component: Reports,
});

function Reports() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <main className="relative mx-auto min-h-screen max-w-5xl px-6 pt-24 pb-16">
      <header className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood-bright">// CATALOG 02</p>
        <h1 className="mt-2 font-major text-4xl text-static md:text-6xl">
          <GlitchText intensity={0.04}>INCIDENT REPORTS</GlitchText>
        </h1>
        <p className="mt-4 max-w-2xl font-elite italic text-static/50">
          declassified by error. portions remain ████████████.
        </p>
      </header>

      <ul className="space-y-6">
        {REPORTS.map((r) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id} className="border border-ash-light bg-black/70 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ash-light pb-3">
                <div>
                  <div className="font-mono text-[10px] text-blood-bright">{r.code} // {r.classification}</div>
                  <h2 className="mt-1 font-major text-xl text-static">{r.title}</h2>
                </div>
                <div className="font-mono text-[10px] text-static/40">FILED {r.date}</div>
              </div>
              <p className="mt-4 font-elite text-base leading-relaxed text-static/80">
                {r.summary.split(/(█+)/g).map((seg, i) =>
                  seg.startsWith("█") ? <span key={i} className="redacted">{seg}</span> : <span key={i}>{seg}</span>
                )}
              </p>
              <button
                onClick={() => setOpen(isOpen ? null : r.id)}
                className="mt-5 border border-crt/40 px-3 py-1 font-mono text-[11px] text-crt hover:bg-crt/10"
              >
                {isOpen ? "[ SEAL EVIDENCE ]" : "[ EXPAND HIDDEN EVIDENCE ▾ ]"}
              </button>
              {isOpen && (
                <div className="mt-4 border-l-2 border-blood pl-4 font-elite text-sm italic text-static/70">
                  {r.notes.map((n, i) => (
                    <p key={i} className="mt-2">— {n}</p>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}