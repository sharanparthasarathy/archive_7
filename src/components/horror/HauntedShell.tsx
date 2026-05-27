import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GrainCanvas } from "./GrainCanvas";
import { StaticBurst } from "./StaticBurst";
import { GlowCursor } from "./GlowCursor";
import { SystemLog } from "./SystemLog";
import { AmbientAudio } from "./AmbientAudio";
import { GlitchText } from "./GlitchText";

const NAV = [
  { to: "/", label: "ROOT" },
  { to: "/archive", label: "TAPES" },
  { to: "/reports", label: "REPORTS" },
  { to: "/surveillance", label: "CCTV" },
  { to: "/signal", label: "SIGNAL" },
];

export function HauntedShell({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const u = () => {
      const d = new Date();
      setTime(
        `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")} // ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`
      );
    };
    u();
    const i = setInterval(u, 1000);
    return () => clearInterval(i);
  }, []);

  // disable context menu with creepy toast
  const [toast, setToast] = useState(false);
  useEffect(() => {
    const onCtx = (e: MouseEvent) => {
      e.preventDefault();
      setToast(true);
      setTimeout(() => setToast(false), 1800);
    };
    window.addEventListener("contextmenu", onCtx);
    return () => window.removeEventListener("contextmenu", onCtx);
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-static">
      {/* Hidden secretive nav along left edge */}
      <nav className="fixed left-2 top-1/2 z-[9997] -translate-y-1/2 transform">
        <ul className="flex flex-col gap-3 opacity-15 transition-opacity duration-700 hover:opacity-90">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                className="block font-mono text-[10px] tracking-[0.3em] text-static/80 hover:text-crt"
                activeProps={{ className: "block font-mono text-[10px] tracking-[0.3em] text-blood-bright" }}
              >
                <GlitchText intensity={0.02}>{n.label}</GlitchText>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Timestamp/metadata top-left */}
      <div className="pointer-events-none fixed left-3 top-3 z-[9996] font-mono text-[10px] text-crt-dim">
        <div className="flicker">ARCHIVE-7 // {time}</div>
        <div className="opacity-70">CAM_03 // 38.8977° N 77.0365° W</div>
        <div className="opacity-70">● REC</div>
      </div>

      {/* Main content */}
      <div className="relative z-[1]">{children}</div>

      {/* Footer */}
      <footer className="relative z-[1] mt-24 border-t border-ash-light/40 px-6 py-10 font-mono text-[10px] text-static/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:justify-between">
          <span>FACILITY ██████ // COORD 47.████ N — 19.████ E</span>
          <span>LAST INDEX UPDATE: ██/██/19██</span>
          <span className="flicker">SIGNAL: UNSTABLE</span>
        </div>
        <div className="mx-auto mt-6 max-w-6xl text-static/20">
          THIS ARCHIVE WAS NEVER PUBLISHED. IF YOU CAN READ THIS, THEY ALREADY KNOW.
        </div>
      </footer>

      {/* Overlays */}
      <GrainCanvas />
      <div className="scanlines" aria-hidden />
      <div className="vignette" aria-hidden />
      <div className="vignette-red" aria-hidden />
      <StaticBurst />
      <GlowCursor />
      <SystemLog />
      <AmbientAudio />

      {toast && (
        <div className="fixed left-1/2 top-12 z-[10001] -translate-x-1/2 border border-blood bg-black/95 px-4 py-2 font-mono text-xs uppercase tracking-widest text-blood-bright">
          <GlitchText intensity={0.1}>WE SEE YOU</GlitchText>
        </div>
      )}
    </div>
  );
}