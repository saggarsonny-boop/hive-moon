export type PhaseInfo = {
  phase: number;          // 0–1, 0=new, 0.5=full
  illumination: number;   // 0–1
  phaseName: string;
  emoji: string;
  age: number;            // days since new moon
  nextFullMoon: Date;
  nextNewMoon: Date;
  isSupermoon: boolean;
  isMicroMoon: boolean;
  distance: number;       // km
  eclipticLongitude: number;
};

export type UpcomingEvent = {
  date: Date;
  type: "full" | "new" | "supermoon" | "eclipse" | "quarter";
  label: string;
  daysAway: number;
};

function jd(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24;
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function rad(deg: number) { return deg * Math.PI / 180; }
function deg(r: number) { return r * 180 / Math.PI; }
function norm(x: number) { return x - Math.floor(x / 360) * 360; }

export function getMoonPhase(date: Date = new Date()): PhaseInfo {
  const J = jd(date);
  const T = (J - 2451545.0) / 36525;

  // Moon mean longitude
  const L0 = norm(218.3165 + 481267.8813 * T);
  // Moon mean anomaly
  const M = norm(134.9634 + 477198.8676 * T);
  // Sun mean anomaly
  const M1 = norm(357.5291 + 35999.0503 * T);
  // Moon argument of latitude
  const F = norm(93.2721 + 483202.0175 * T);
  // Moon ascending node
  const Om = norm(125.0445 - 1934.1363 * T);

  const mr = rad(M), m1r = rad(M1), fr = rad(F), omr = rad(Om), l0r = rad(L0);

  // Longitude correction (simplified)
  const dL =
    6.289 * Math.sin(mr) -
    1.274 * Math.sin(2 * l0r - mr) +
    0.658 * Math.sin(2 * l0r) -
    0.186 * Math.sin(m1r) -
    0.059 * Math.sin(2 * mr - 2 * l0r) -
    0.057 * Math.sin(mr - 2 * l0r + m1r) +
    0.053 * Math.sin(mr + 2 * l0r) +
    0.046 * Math.sin(2 * l0r - m1r) +
    0.041 * Math.sin(mr - m1r) -
    0.035 * Math.sin(l0r) -
    0.031 * Math.sin(mr + m1r) -
    0.015 * Math.sin(2 * fr - 2 * l0r) +
    0.011 * Math.sin(mr - 4 * l0r);

  const moonLon = norm(L0 + dL);

  // Sun longitude (approximate)
  const sunL = norm(280.46646 + 36000.76983 * T);
  const sunM = rad(norm(357.52911 + 35999.05029 * T));
  const sunC = 1.9146 * Math.sin(sunM) + 0.019993 * Math.sin(2 * sunM) + 0.00029 * Math.sin(3 * sunM);
  const sunTrueLon = sunL + sunC;

  // Phase angle (elongation)
  let elongation = norm(moonLon - sunTrueLon);
  const phase = elongation / 360;

  // Illumination
  const illumination = (1 - Math.cos(rad(elongation))) / 2;

  // Age in days (approx synodic month 29.53059)
  const age = phase * 29.53059;

  // Distance (simplified, km)
  const distance = 385000 - 20905 * Math.cos(mr) - 3699 * Math.cos(2 * l0r - mr) - 2956 * Math.cos(2 * l0r);

  const isSupermoon = distance < 362000;
  const isMicroMoon = distance > 405000;

  // Phase name
  let phaseName: string;
  let emoji: string;
  if (phase < 0.0339 || phase >= 0.9661) { phaseName = "New Moon"; emoji = "🌑"; }
  else if (phase < 0.1339) { phaseName = "Waxing Crescent"; emoji = "🌒"; }
  else if (phase < 0.2161) { phaseName = "First Quarter"; emoji = "🌓"; }
  else if (phase < 0.4661) { phaseName = "Waxing Gibbous"; emoji = "🌔"; }
  else if (phase < 0.5339) { phaseName = "Full Moon"; emoji = "🌕"; }
  else if (phase < 0.6339) { phaseName = "Waning Gibbous"; emoji = "🌖"; }
  else if (phase < 0.7161) { phaseName = "Last Quarter"; emoji = "🌗"; }
  else { phaseName = "Waning Crescent"; emoji = "🌘"; }

  return {
    phase,
    illumination,
    phaseName,
    emoji,
    age,
    nextFullMoon: nextPhase(date, 0.5),
    nextNewMoon: nextPhase(date, 0),
    isSupermoon,
    isMicroMoon,
    distance: Math.round(distance),
    eclipticLongitude: moonLon,
  };
}

function nextPhase(from: Date, targetPhase: number): Date {
  const current = getMoonPhase(from).phase;
  let days: number;
  if (targetPhase >= current) {
    days = (targetPhase - current) * 29.53059;
  } else {
    days = (1 - current + targetPhase) * 29.53059;
  }
  if (days < 0.5) days += 29.53059;
  return new Date(from.getTime() + days * 86400000);
}

export function getUpcomingEvents(from: Date, count = 8): UpcomingEvent[] {
  const events: UpcomingEvent[] = [];
  const synodic = 29.53059;

  // Walk forward looking for new/full moons
  let d = new Date(from);
  const checked = new Set<string>();
  let iterations = 0;

  while (events.length < count && iterations < 200) {
    iterations++;
    d = new Date(d.getTime() + 12 * 3600000); // step 12h
    const info = getMoonPhase(d);
    const dateKey = d.toDateString();

    if ((info.phase < 0.025 || info.phase > 0.975) && !checked.has("new-" + dateKey)) {
      checked.add("new-" + dateKey);
      const daysAway = Math.round((d.getTime() - from.getTime()) / 86400000);
      if (daysAway > 0) {
        events.push({ date: new Date(d), type: "new", label: "New Moon", daysAway });
      }
    }
    if (info.phase > 0.475 && info.phase < 0.525 && !checked.has("full-" + dateKey)) {
      checked.add("full-" + dateKey);
      const daysAway = Math.round((d.getTime() - from.getTime()) / 86400000);
      if (daysAway > 0) {
        const isSuper = info.isSupermoon;
        events.push({
          date: new Date(d),
          type: isSuper ? "supermoon" : "full",
          label: isSuper ? "Supermoon" : "Full Moon",
          daysAway,
        });
      }
    }
  }

  return events.sort((a, b) => a.daysAway - b.daysAway).slice(0, count);
}

export type DayLog = {
  date: string; // YYYY-MM-DD
  mood: number; // 1–5
  energy: number; // 1–5
  phase: number; // 0–1 moon phase at log time
  phaseName: string;
};

export function getLogs(): DayLog[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("hivemoon_logs") || "[]");
  } catch { return []; }
}

export function saveLog(log: DayLog): void {
  const logs = getLogs().filter((l) => l.date !== log.date);
  logs.push(log);
  localStorage.setItem("hivemoon_logs", JSON.stringify(logs));
}

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export type LunarPortrait = {
  type: string;
  description: string;
  peakPhase: string;
  avgMood: number;
  avgEnergy: number;
  cyclesLogged: number;
  phaseDistribution: { phase: string; avgMood: number; avgEnergy: number; count: number }[];
};

const PHASE_BUCKETS = [
  { name: "New Moon", min: 0, max: 0.0625 },
  { name: "Waxing Crescent", min: 0.0625, max: 0.1875 },
  { name: "First Quarter", min: 0.1875, max: 0.3125 },
  { name: "Waxing Gibbous", min: 0.3125, max: 0.4375 },
  { name: "Full Moon", min: 0.4375, max: 0.5625 },
  { name: "Waning Gibbous", min: 0.5625, max: 0.6875 },
  { name: "Last Quarter", min: 0.6875, max: 0.8125 },
  { name: "Waning Crescent", min: 0.8125, max: 1 },
];

const PHASE_EMOJIS: Record<string, string> = {
  "New Moon": "🌑",
  "Waxing Crescent": "🌒",
  "First Quarter": "🌓",
  "Waxing Gibbous": "🌔",
  "Full Moon": "🌕",
  "Waning Gibbous": "🌖",
  "Last Quarter": "🌗",
  "Waning Crescent": "🌘",
};

export function computePortrait(logs: DayLog[]): LunarPortrait | null {
  if (logs.length < 14) return null;

  const dist = PHASE_BUCKETS.map((bucket) => {
    const matching = logs.filter((l) => l.phase >= bucket.min && l.phase < bucket.max);
    const avgMood = matching.length ? matching.reduce((s, l) => s + l.mood, 0) / matching.length : 0;
    const avgEnergy = matching.length ? matching.reduce((s, l) => s + l.energy, 0) / matching.length : 0;
    return { phase: bucket.name, avgMood, avgEnergy, count: matching.length };
  });

  const withData = dist.filter((d) => d.count >= 2);
  if (!withData.length) return null;

  const peakByMood = withData.reduce((best, d) => d.avgMood > best.avgMood ? d : best, withData[0]);
  const cyclesLogged = Math.floor(logs.length / 29.53);

  const typeDescriptions: Record<string, { type: string; description: string }> = {
    "New Moon": { type: "The Quiet Initiator", description: "You peak in the dark — introspective, restful, energised by beginnings. New moons recharge you." },
    "Waxing Crescent": { type: "The Dreamer", description: "You build slowly and beautifully. The crescent phase suits your rising energy and quiet momentum." },
    "First Quarter": { type: "The Builder", description: "You thrive on tension and decision. First quarter is when you act best." },
    "Waxing Gibbous": { type: "The Refiner", description: "You peak just before the apex — detail-oriented, high energy, almost-there focus." },
    "Full Moon": { type: "The Illuminated", description: "You are fully a full moon person. Peak mood, peak energy, peak everything. Lit up." },
    "Waning Gibbous": { type: "The Teacher", description: "After the peak, you find your groove. Waning gibbous suits your reflective, expressive energy." },
    "Last Quarter": { type: "The Releaser", description: "You do your best work letting go. The last quarter suits your clearing, honest energy." },
    "Waning Crescent": { type: "The Restorer", description: "You are at your best in the quietest phase — surrendering, resting, preparing. Rare and deep." },
  };

  const td = typeDescriptions[peakByMood.phase] || { type: "The Balanced", description: "Your energy moves with the full cycle — no single phase dominates. You are the whole moon." };

  const avgMood = logs.reduce((s, l) => s + l.mood, 0) / logs.length;
  const avgEnergy = logs.reduce((s, l) => s + l.energy, 0) / logs.length;

  return {
    type: td.type,
    description: td.description,
    peakPhase: peakByMood.phase,
    avgMood: Math.round(avgMood * 10) / 10,
    avgEnergy: Math.round(avgEnergy * 10) / 10,
    cyclesLogged,
    phaseDistribution: dist,
  };
}

export { PHASE_EMOJIS };
