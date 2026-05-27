import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TAPES, type Tape } from "../data/archive";
import { GlitchText } from "../components/horror/GlitchText";

export const Route = createFileRoute("/archive/$id")({
  head: () => ({ meta: [{ title: "ARCHIVE-7 // PLAYBACK" }] }),
  loader: ({ params }): Tape => {
    const tape = TAPES.find((t) => t.id === params.id);
    if (!tape) throw notFound();
    return tape;
  },
  component: TapeView,
});

function TapeView() {
  const tape = Route.useLoaderData();
  return (
    <main className="relative mx-auto min-h-screen max-w-5xl px-6 pt-24 pb-16">
      <Link to="/archive" className="font-mono text-xs text-crt-dim hover:text-crt">{"<<"} back to catalog</Link>
      <header className="mt-6">
        <p className="font-mono text-[10px] tracking-[0.4em] text-blood-bright">{tape.code}</p>
        <h1 className="mt-2 font-major text-3xl text-static md:text-5xl">
          <GlitchText intensity={0.05}>{tape.title}</GlitchText>
        </h1>
      </header>

      {/* CRT player frame */}
      <div className="mt-8 rounded-[2px] border-2 border-ash-light bg-ash p-3 shadow-[inset_0_0_60px_#000]">
        <div
          className="relative aspect-video w-full overflow-hidden bg-black breath"
          style={{
            background: `radial-gradient(ellipse at center, hsl(${tape.hue} 30% 8%) 0%, #000 80%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='340'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute left-3 top-3 font-mono text-xs text-blood-bright flicker">● REC</div>
          <div className="absolute right-3 top-3 font-mono text-xs text-static/70">{tape.code}</div>
          <div className="absolute bottom-3 left-3 font-mono text-xs text-static/70">{tape.location}</div>
          <div className="absolute bottom-3 right-3 font-mono text-xs text-static/70">{tape.date}</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-major text-2xl text-static/30">// PLAYBACK CORRUPTED //</div>
          </div>
        </div>
        {/* Tape deck controls */}
        <div className="mt-3 flex items-center gap-2 font-mono text-xs text-static/70">
          <button className="border border-static/30 px-3 py-1 hover:border-crt hover:text-crt">◀◀</button>
          <button className="border border-static/30 px-3 py-1 hover:border-crt hover:text-crt">▶</button>
          <button className="border border-static/30 px-3 py-1 hover:border-crt hover:text-crt">■</button>
          <button className="border border-static/30 px-3 py-1 hover:border-crt hover:text-crt">▶▶</button>
          <div className="ml-auto text-blood-bright">SIGNAL {tape.signal}%</div>
        </div>
      </div>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 border border-ash-light bg-black/60 p-5">
          <h2 className="font-major text-sm text-crt">// TRANSCRIPT</h2>
          <ol className="mt-4 space-y-2 font-mono text-sm text-static/80">
            {tape.transcript.map((line: string, i: number) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
        <aside className="border border-ash-light bg-black/60 p-5 font-mono text-xs">
          <h2 className="font-major text-sm text-crt">// METADATA</h2>
          <dl className="mt-4 space-y-2 text-static/70">
            <div className="flex justify-between"><dt>DATE</dt><dd>{tape.date}</dd></div>
            <div className="flex justify-between"><dt>LOC</dt><dd className="text-right">{tape.location}</dd></div>
            <div className="flex justify-between"><dt>DURATION</dt><dd>{tape.duration}</dd></div>
            <div className="flex justify-between"><dt>SIGNAL</dt><dd className="text-crt-dim">{tape.signal}%</dd></div>
            <div className="flex justify-between"><dt>VIEWER</dt><dd>{tape.lastViewer}</dd></div>
            <div className="mt-4 border-t border-ash-light pt-3 text-blood-bright">
              ⚠ tape contains unverified audio anomalies. headphone use not advised.
            </div>
          </dl>
        </aside>
      </section>
    </main>
  );
}