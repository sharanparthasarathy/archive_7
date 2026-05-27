import { useEffect, useRef, useState } from "react";

export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  const start = () => {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new Ctx();
    ctxRef.current = ctx;

    // Low drone (two detuned oscillators through lowpass)
    const o1 = ctx.createOscillator();
    o1.type = "sawtooth";
    o1.frequency.value = 55;
    const o2 = ctx.createOscillator();
    o2.type = "sawtooth";
    o2.frequency.value = 55.6;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.06;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 220;
    o1.connect(lp); o2.connect(lp); lp.connect(droneGain); droneGain.connect(ctx.destination);
    o1.start(); o2.start();

    // Tape hiss (filtered white noise)
    const bufSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const hissFilter = ctx.createBiquadFilter();
    hissFilter.type = "highpass";
    hissFilter.frequency.value = 2000;
    const hissGain = ctx.createGain();
    hissGain.gain.value = 0.04;
    noise.connect(hissFilter); hissFilter.connect(hissGain); hissGain.connect(ctx.destination);
    noise.start();

    // Occasional buzz pulses
    const buzzInterval = setInterval(() => {
      const t = ctx.currentTime;
      const b = ctx.createOscillator();
      b.type = "square";
      b.frequency.value = 60 + Math.random() * 30;
      const bg = ctx.createGain();
      bg.gain.setValueAtTime(0, t);
      bg.gain.linearRampToValueAtTime(0.05, t + 0.02);
      bg.gain.linearRampToValueAtTime(0, t + 0.25);
      b.connect(bg); bg.connect(ctx.destination);
      b.start(t); b.stop(t + 0.3);
    }, 7000);

    nodesRef.current = {
      stop: () => {
        clearInterval(buzzInterval);
        try { o1.stop(); o2.stop(); noise.stop(); } catch {}
        ctx.close();
      },
    };
  };

  const toggle = () => {
    if (on) {
      nodesRef.current?.stop();
      nodesRef.current = null;
      setOn(false);
    } else {
      start();
      setOn(true);
    }
  };

  useEffect(() => () => nodesRef.current?.stop(), []);

  return (
    <button
      onClick={toggle}
      className="fixed right-3 top-3 z-[9996] border border-crt-dim/40 bg-black/70 px-2 py-1 font-mono text-[10px] text-crt hover:border-crt hover:bg-blood/30"
      aria-label="Toggle ambient audio"
    >
      [{on ? "■" : "▶"}] AUDIO {on ? "ON" : "OFF"}
    </button>
  );
}