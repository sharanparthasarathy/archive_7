
# Found Footage Horror Archive — Build Plan

A cinematic, psychologically unsettling "leaked surveillance archive" site. Deep black, blood red, CRT green, with constant grain, scanlines, glitches, and unstable UI.

## Stack note (important)

The brief specifies Next.js, but this Lovable project scaffolds as a **Vite + React + TypeScript + Tailwind** web app (TanStack Start template). I'll build with that stack and add:
- Tailwind CSS (already included)
- Framer Motion (for cinematic + glitch animations)
- GSAP + ScrollTrigger (for slow scroll choreography)
- Canvas/WebGL overlays for grain, scanlines, static
- Howler.js for ambient audio layers

If you actually need Next.js specifically, tell me and I'll flag it — but Vite gives the same end result here.

## Global atmosphere layer (always-on)

A persistent `<HauntedShell>` wrapping every route:
- Canvas grain (animated noise, ~24fps)
- SVG scanlines + CRT vignette
- Chromatic aberration via layered blend-mode divs
- Random static burst every 6–14s (full-screen flash)
- Drifting dust particles
- Custom glowing cursor (faint CRT-green halo, trailing afterimage)
- Fake system log ticker in bottom-left corner ("[03:47:12] FEED_07 LOST", "[03:47:18] MOTION DETECTED — SECTOR 4")
- Ambient audio toggle (top-right, minimal): low drone + tape hiss + occasional whisper, off by default

## Pages / Routes

```text
/                  Hero + entry
/archive           Recovered Tapes grid
/archive/:id       Cinematic tape player
/reports           Incident Reports (classified docs)
/reports/:id       Single redacted case file
/surveillance      Live CCTV wall
/signal            ARG mystery section
/boot              Corrupted boot sequence (shown on first load, then cached)
/404               "SIGNAL LOST" creepy 404
+ 2 hidden routes  /vault/███  and  /transmission (easter eggs)
```

### `/boot` — Loading sequence
Shown once per session before routing into `/`. Fake BIOS / kernel boot text typed line by line, intentional errors, then "ACCESS GRANTED" flicker.

### `/` Homepage
- Fullscreen looping found-footage video bg (placeholder mp4 — generate a generic VHS-static loop; user can swap)
- Layered: video → scanlines → grain → red vignette
- Center: typing terminal intro ("…connecting to ARCHIVE-7… 47% packet loss… welcome.")
- Floating warnings appear/disappear at random positions: "ARCHIVE ACCESS DETECTED", "UNAUTHORIZED VIEWING LOGGED", "DO NOT WATCH ALONE"
- Flickering timestamp + fake camera metadata (CAM_03 // 38.8977° N, 77.0365° W // REC ●)
- Hidden secretive nav: 4 small monospace links along left edge, only visible on hover (delayed reveal)

### `/archive` — Recovered Tapes
- Grid of VHS thumbnail cards (placeholder corrupted stills via generated images)
- Each card: torn label, missing date "██/██/19██", unknown location, signal % bar, "Last viewer: [REDACTED]"
- Hover: thumbnail glitches, plays distorted 2s preview snippet, screen shakes slightly
- Click → `/archive/:id` cinematic player (large CRT frame, playback controls styled as tape deck, transcript scrolling beneath)

### `/reports` — Incident Reports
- Cards styled as paper-clipped manila folders
- Detail page: redacted typewriter text (black bars over words), polaroid photos pinned at angles, handwritten margin notes (handwritten horror font), audio transcript blocks, expandable "EVIDENCE" panels that unlock with delay + static burst

### `/surveillance` — Live CCTV
- 6-camera grid, each its own simulated feed (looping low-fps clips + heavy overlay)
- Random feeds drop to "SIGNAL LOST" snow
- "MOTION DETECTED" red overlay flashes on a random feed every 10–20s
- Click a feed to fullscreen it; one feed occasionally shows a humanoid silhouette frame for 100ms (easter egg)

### `/signal` — ARG mystery
- Animated audio spectrum (Web Audio API analyser on a hidden ambient track)
- Ciphertext block (Caesar/base64 layered) — decoding reveals coordinate that links to `/vault/███`
- Hidden clickable pixels (tiny hotspots in grain layer) that reveal cryptic fragments
- Morse-code blinking dot in corner

### Hidden / easter eggs
- `/vault/███` — single polaroid + a phone number styled as found note
- `/transmission` — autoplaying intercepted radio audio with subtitle stream
- Konami code on any page → grain intensifies + new whisper layer unlocks
- Right-click disabled with creepy "WE SEE YOU" toast

## Typography

- Primary: `VT323` or `Share Tech Mono` (distorted monospace, terminal)
- Secondary: `Special Elite` or `Caveat` for handwritten notes
- Display headers: `Major Mono Display` for big section labels
- Per-letter random jitter via a `<GlitchText>` component (random char swap every 200–800ms)

## Color tokens (Tailwind theme)

```text
--void:      #000000
--blood:     #5a0000
--crt:       #00ff66
--ash:       #1a1a1a
--static:    #d9d9d9
```

All semantic tokens in `index.css`, used via Tailwind classes — no hardcoded hex in components.

## Component inventory

```text
shell/
  HauntedShell.tsx        global overlays + cursor + audio toggle + system log
  GrainCanvas.tsx         animated noise
  Scanlines.tsx           SVG repeating
  ChromaticLayer.tsx      RGB-split blend
  StaticBurst.tsx         timed full-screen flash
  DustParticles.tsx       drifting motes
  GlowCursor.tsx          CRT cursor + trail
  SystemLog.tsx           fake log ticker
  AmbientAudio.tsx        Howler layers + toggle
fx/
  GlitchText.tsx          per-letter corruption
  TypingTerminal.tsx      typed intro
  RedactedText.tsx        animated black bars
  VHSFrame.tsx            tape-deck chrome
  CRTScreen.tsx           bezel + barrel distortion
pages/
  Boot.tsx
  Home.tsx
  Archive.tsx / TapeView.tsx
  Reports.tsx / ReportView.tsx
  Surveillance.tsx
  Signal.tsx
  Vault.tsx (hidden)
  Transmission.tsx (hidden)
  NotFound.tsx
data/
  tapes.ts, reports.ts, cameras.ts  fictional metadata
```

## Animation choreography

- Page transitions: 250ms blackout + static burst + scanline roll
- Route enter: GSAP timeline — grain ramps, content fades through chromatic split, settles
- Scroll: GSAP ScrollTrigger pinning hero, parallax on grain vs content
- Hover on links: 120ms delay, glitch shudder, then state change
- UI "breathing": subtle 4s scale/opacity oscillation on key panels

## Performance / responsiveness

- All overlays GPU-accelerated (transform/opacity only)
- Grain canvas downsampled + scaled (256px noise tile)
- `prefers-reduced-motion` → disables shakes, slows glitches, keeps mood
- Mobile: same effects, tighter padding, intentionally claustrophobic single-column

## Assets

- Generate ~6 corrupted VHS thumbnails (`imagegen`)
- Generate 3 polaroid-style "evidence" stills
- Use a single short looping mp4/webm for hero + cameras (placeholder, swappable). Brief mentions video — I'll use a low-bitrate static-heavy loop; you can drop in your own footage later.
- Ambient audio: placeholder royalty-free drone + tape hiss layers (will note source)

## What I will NOT do without confirmation

- Add real third-party video footage (placeholder generated stills + brief mp4 loop only)
- Wire any backend / persistence (Lovable Cloud not needed for this build)
- Add analytics or tracking

## Open questions before building

1. **Audio**: OK to ship placeholder ambient drones (CC0), default OFF with a toggle? Or do you want it silent until you provide audio?
2. **Real video**: ship with a generic VHS-static loop placeholder, or no video and pure canvas effects until you provide footage?
3. **Stack**: confirm Vite+React is fine (vs forcing Next.js)?
