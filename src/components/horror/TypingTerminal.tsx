import { useEffect, useState } from "react";

export function TypingTerminal({ lines, speed = 35, onDone }: { lines: string[]; speed?: number; onDone?: () => void }) {
  const [out, setOut] = useState<string[]>([""]);
  useEffect(() => {
    let li = 0, ci = 0;
    setOut([""]);
    const id = setInterval(() => {
      if (li >= lines.length) {
        clearInterval(id);
        onDone?.();
        return;
      }
      const line = lines[li];
      if (ci <= line.length) {
        setOut((p) => {
          const next = [...p];
          next[li] = line.slice(0, ci);
          return next;
        });
        ci++;
      } else {
        li++;
        ci = 0;
        setOut((p) => [...p, ""]);
      }
    }, speed);
    return () => clearInterval(id);
  }, [lines, speed, onDone]);
  return (
    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-crt">
      {out.map((l, i) => (
        <div key={i}>
          <span className="text-crt-dim">{`>`} </span>
          {l}
          {i === out.length - 1 && <span className="ml-1 inline-block h-3 w-2 bg-crt align-middle" style={{ animation: "blink-caret 1s infinite" }} />}
        </div>
      ))}
    </pre>
  );
}