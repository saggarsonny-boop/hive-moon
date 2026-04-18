"use client";

import { PhaseInfo } from "@/lib/moon";

export default function MoonDial({ info }: { info: PhaseInfo }) {
  const illumination = info.illumination;
  const phase = info.phase;

  // SVG moon drawing: circle with illuminated portion
  const size = 160;
  const r = 68;
  const cx = size / 2;
  const cy = size / 2;

  // Determine which side is illuminated and dark
  // phase 0=new, 0.5=full
  // 0–0.5: waxing (right side lit), 0.5–1: waning (left side lit)
  const isWaxing = phase <= 0.5;
  const limb = isWaxing ? 1 : -1; // 1 = right bright, -1 = left bright

  // Ellipse x-radius for terminator (varies from r to -r)
  // at new moon (phase=0): ellipseX = r (full dark face terminator on right)
  // at full moon (phase=0.5): ellipseX = -r (full light face)
  const ellipseX = isWaxing
    ? r - 2 * r * (phase / 0.5)          // r→-r as phase 0→0.5
    : -r + 2 * r * ((phase - 0.5) / 0.5); // -r→r as phase 0.5→1

  // Build SVG path for the lit crescent/gibbous
  // Outer arc: the bright limb (always a semicircle)
  // Inner arc: the terminator (ellipse, possibly reversed)
  const sweep = limb === 1 ? 1 : 0;
  const termSweep = ellipseX > 0 ? 0 : 1;

  const moonPath = `
    M ${cx} ${cy - r}
    A ${r} ${r} 0 0 ${sweep} ${cx} ${cy + r}
    A ${Math.abs(ellipseX)} ${r} 0 0 ${termSweep} ${cx} ${cy - r}
    Z
  `;

  const glowOpacity = 0.06 + illumination * 0.10;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Outer glow */}
          <circle cx={cx} cy={cy} r={r + 18} fill="rgba(200,210,240,0.03)" />
          <circle cx={cx} cy={cy} r={r + 10} fill={`rgba(200,210,240,${glowOpacity})`} />
          {/* Dark side */}
          <circle cx={cx} cy={cy} r={r} fill="#1a1a2e" />
          {/* Lit side */}
          {illumination > 0.01 && (
            <path d={moonPath} fill="#d4cdb8" />
          )}
          {/* Subtle surface texture rings */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <circle cx={cx - 12} cy={cy - 18} r={8} fill="rgba(0,0,0,0.08)" />
          <circle cx={cx + 20} cy={cy + 10} r={12} fill="rgba(0,0,0,0.06)" />
          <circle cx={cx - 5} cy={cy + 24} r={6} fill="rgba(0,0,0,0.07)" />
        </svg>
      </div>

      <div className="text-center space-y-1">
        <div className="text-2xl">{info.emoji}</div>
        <div className="text-white font-semibold tracking-tight">{info.phaseName}</div>
        {info.isSupermoon && (
          <div className="text-xs text-amber-400 font-medium tracking-widest uppercase">Supermoon</div>
        )}
        {info.isMicroMoon && (
          <div className="text-xs text-blue-400 font-medium tracking-widest uppercase">Micromoon</div>
        )}
        <div className="text-gray-500 text-xs">{Math.round(illumination * 100)}% illuminated · {info.age.toFixed(1)} days old</div>
        <div className="text-gray-600 text-xs">{info.distance.toLocaleString()} km away</div>
      </div>
    </div>
  );
}
