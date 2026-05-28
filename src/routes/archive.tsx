import { Link } from "react-router-dom";
import { TAPES } from "../data/archive";
import { GlitchText } from "../components/horror/GlitchText";

// export const Route = createFileRoute("/archive")({
//   head: () => ({ meta: [{ title: "ARCHIVE-7 // RECOVERED TAPES" }] }),
//   component: Archive,
// });

export default function Archive() {
  return (
    <main className="relative mx-auto min-h-screen max-w-6xl px-6 pt-24 pb-16">
      <header className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blood-bright">// CATALOG 01</p>
        <h1 className="mt-2 font-major text-4xl text-static md:text-6xl">
          <GlitchText intensity={0.04}>RECOVERED TAPES</GlitchText>
        </h1>
        <p className="mt-4 max-w-2xl font-elite italic text-static/50">
          {TAPES.length} entries. metadata partially recovered. preview at your own risk.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TAPES.map((t) => (
          <Link
            key={t.id}
            to={`/archive/${t.id}`}
            className="vhs-card group block border border-ash-light bg-black/60 transition-colors hover:border-blood"
          >
            <TapeThumb hue={t.hue} />
            <div className="border-t border-ash-light p-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-blood-bright">{t.code}</span>
                <span className="text-static/40">{t.duration}</span>
              </div>
              <div className="mt-2 text-static group-hover:text-crt">
                <GlitchText intensity={0.02}>{t.title}</GlitchText>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-y-1 text-[10px] text-static/40">
                <dt>DATE</dt><dd className="text-right">{t.date}</dd>
                <dt>LOC</dt><dd className="text-right truncate">{t.location}</dd>
                <dt>SIGNAL</dt><dd className="text-right text-crt-dim">{t.signal}%</dd>
                <dt>VIEWER</dt><dd className="text-right">{t.lastViewer}</dd>
              </dl>
              <div className="mt-2 h-1 w-full bg-ash">
                <div className="h-full bg-crt-dim" style={{ width: `${t.signal}%` }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function TapeThumb({ hue }: { hue: number }) {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, hsl(${hue} 30% 6%) 0%, #000 100%)`,
        filter: `hue-rotate(${hue}deg)`,
      }}
    >
      {/* Static SVG bars */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
          backgroundSize: "cover",
          mixBlendMode: "screen",
        }}
      />
      {/* Horizontal tracking bars */}
      <div className="absolute left-0 right-0 top-1/3 h-[2px] bg-static/40" />
      <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-static/30" />
      {/* Corner data */}
      <div className="absolute left-2 top-2 font-mono text-[10px] text-blood-bright flicker">● REC</div>
      <div className="absolute right-2 top-2 font-mono text-[10px] text-static/70">SP</div>
      <div className="absolute bottom-2 left-2 font-mono text-[10px] text-static/70">CAM_██</div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-static/70">██:██:██</div>
      {/* Big distorted glyph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-major text-5xl text-static/10">▶</span>
      </div>
    </div>
  );
}