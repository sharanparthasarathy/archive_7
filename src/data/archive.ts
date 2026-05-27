export type Tape = {
  id: string;
  code: string;
  title: string;
  date: string;
  location: string;
  signal: number;
  lastViewer: string;
  duration: string;
  transcript: string[];
  hue: number;
};

export const TAPES: Tape[] = [
  {
    id: "t-001",
    code: "VHS-00219",
    title: "BASEMENT // CAM 04",
    date: "██/██/19██",
    location: "FACILITY ██████, SECTOR 4",
    signal: 42,
    lastViewer: "[REDACTED]",
    duration: "01:23:44",
    hue: 0,
    transcript: [
      "00:00 [tape hiss begins]",
      "00:14 [door opens, footsteps]",
      "00:42 SUBJECT: \"is somebody down here?\"",
      "01:09 [low knocking, three times]",
      "01:30 [signal lost for 12 seconds]",
      "01:42 [subject no longer visible in frame]",
    ],
  },
  {
    id: "t-002",
    code: "VHS-00477",
    title: "HALLWAY 3B",
    date: "██/██/19██",
    location: "UNKNOWN",
    signal: 17,
    lastViewer: "OPERATOR_47",
    duration: "00:07:11",
    hue: 30,
    transcript: [
      "00:00 [static]",
      "00:11 [figure visible at end of hallway]",
      "00:19 [figure now closer, no movement detected]",
      "00:24 [figure now closer]",
      "00:31 [feed terminated]",
    ],
  },
  {
    id: "t-003",
    code: "VHS-00903",
    title: "ROOM 11 // INTERVIEW",
    date: "██/██/19██",
    location: "[CLASSIFIED]",
    signal: 88,
    lastViewer: "[REDACTED]",
    duration: "00:42:00",
    hue: 100,
    transcript: [
      "00:00 INTERVIEWER: \"please state your name.\"",
      "00:03 SUBJECT: [unintelligible]",
      "00:09 INTERVIEWER: \"and how long have you been here?\"",
      "00:14 SUBJECT: \"i'm not the one being interviewed.\"",
      "00:18 [interviewer audio cuts out]",
    ],
  },
  {
    id: "t-004",
    code: "VHS-01188",
    title: "EXTERIOR // GATE NORTH",
    date: "██/██/19██",
    location: "PERIMETER FENCE",
    signal: 64,
    lastViewer: "[NULL]",
    duration: "02:01:55",
    hue: 200,
    transcript: [
      "00:00 [wind, light rain]",
      "00:45 [headlights approach]",
      "00:51 [vehicle stops, lights remain on]",
      "01:30 [vehicle has not moved for 39 minutes]",
      "02:01 [vehicle gone, no engine recorded]",
    ],
  },
  {
    id: "t-005",
    code: "VHS-01402",
    title: "STAIRWELL C",
    date: "██/██/19██",
    location: "SUBLEVEL 2",
    signal: 9,
    lastViewer: "[REDACTED]",
    duration: "00:12:30",
    hue: 280,
    transcript: [
      "00:00 [breathing, not from operator]",
      "00:07 [whisper: \"don't look up\"]",
      "00:08 [operator looks up]",
    ],
  },
  {
    id: "t-006",
    code: "VHS-01999",
    title: "PARKING LOT // CAM 02",
    date: "██/██/19██",
    location: "FACILITY ██████",
    signal: 71,
    lastViewer: "OPERATOR_12",
    duration: "06:00:00",
    hue: 340,
    transcript: [
      "00:00 [empty lot]",
      "02:14 [same figure appears in 47 different positions across single frame]",
      "02:15 [normal]",
    ],
  },
];

export const REPORTS = [
  {
    id: "r-001",
    code: "INC-0042",
    classification: "EYES ONLY",
    title: "Incident at Sublevel 4",
    date: "██/██/19██",
    summary:
      "At approximately ████ hours, audio sensors in sublevel 4 recorded a sustained low-frequency hum. All personnel in adjacent rooms reported ████████████ and acute disorientation. Three operators failed to return from routine inspection.",
    notes: [
      "operator log: 'the door was open when we got there. we did not open it.'",
      "the room had no door.",
    ],
  },
  {
    id: "r-002",
    code: "INC-0119",
    classification: "OMEGA-RED",
    title: "Subject 14 Disappearance",
    date: "██/██/19██",
    summary:
      "Subject 14 was last seen entering observation chamber █. ███████████████████████ no body was recovered. Subject's clothing was found folded inside a sealed locker that had not been opened in ██ years.",
    notes: [
      "audio anomaly: voice resembling subject 14 logged on cam 03 the following night.",
      "subject 14 was deceased prior to recording.",
    ],
  },
  {
    id: "r-003",
    code: "INC-0247",
    classification: "CONTAINED",
    title: "Signal Bleed Event",
    date: "██/██/19██",
    summary:
      "All cameras in west wing began broadcasting █████████████ identical static patterns simultaneously for 11 minutes. The static was later identified as a ███████ rendering of a face. Identity unconfirmed.",
    notes: [
      "the face is not in any personnel database.",
      "operators who viewed the static report seeing it again, in mirrors.",
    ],
  },
];

export const CAMERAS = [
  { id: "cam-01", label: "CAM_01 // LOBBY", coord: "0.41° N 12.92° E" },
  { id: "cam-02", label: "CAM_02 // CORRIDOR W", coord: "0.41° N 12.93° E" },
  { id: "cam-03", label: "CAM_03 // ROOM 11", coord: "[REDACTED]" },
  { id: "cam-04", label: "CAM_04 // BASEMENT", coord: "0.40° N 12.92° E" },
  { id: "cam-05", label: "CAM_05 // GATE N", coord: "0.42° N 12.91° E" },
  { id: "cam-06", label: "CAM_06 // STAIRWELL C", coord: "[REDACTED]" },
];