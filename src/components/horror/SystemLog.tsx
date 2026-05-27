import { useEffect, useState } from "react";

const LOG_LINES = [
  "FEED_07 LOST",
  "MOTION DETECTED // SECTOR 4",
  "SIGNAL DEGRADATION 47%",
  "UNAUTHORIZED ACCESS LOGGED",
  "BACKUP TAPE 00219 CORRUPTED",
  "AUDIO ANOMALY @ 03:47:12",
  "CAMERA 03 REQUEST DENIED",
  "ENCRYPTION KEY ROTATED",
  "WHISPER DETECTED // BAND 7",
  "PRESENCE CONFIRMED",
  "VIEWER IDENTIFIED",
  "DO NOT RESPOND",
  "FILE 0xFA21 QUARANTINED",
  "TRANSMISSION INTERCEPTED",
];

function ts() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}:${d.getSeconds().toString().padStart(2,"0")}`;
}

export function SystemLog() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const push = () => {
      const msg = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)];
      setLines((p) => [...p.slice(-4), `[${ts()}] ${msg}`]);
    };
    push();
    const i = setInterval(push, 3500);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-[9995] max-w-[60ch] font-mono text-[10px] leading-relaxed text-crt-dim opacity-70">
      {lines.map((l, i) => (
        <div key={i} className="flicker">{l}</div>
      ))}
    </div>
  );
}