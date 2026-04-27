"use client";

import { PhaseInfo } from "@/lib/moon";
import { useTranslation } from "@/hooks/useTranslation";

export default function MoonDial({ info }: { info: PhaseInfo }) {
  const { illumination, phase, phaseName, emoji, isSupermoon, isMicroMoon, age, distance } = info;
  const { t, phase: translatePhase } = useTranslation();

  const size = 220;
  const r = 94;
  const cx = size / 2;
  const cy = size / 2;

  const isWaxing = phase <= 0.5;
  const limb = isWaxing ? 1 : -1;
  const ellipseX = isWaxing
    ? r - 2 * r * (phase / 0.5)
    : -r + 2 * r * ((phase - 0.5) / 0.5);

  const sweep     = limb === 1 ? 1 : 0;
  const termSweep = ellipseX > 0 ? 0 : 1;

  const moonPath = `
    M ${cx} ${cy - r}
    A ${r} ${r} 0 0 ${sweep} ${cx} ${cy + r}
    A ${Math.abs(ellipseX)} ${r} 0 0 ${termSweep} ${cx} ${cy - r}
    Z
  `;

  const glowA  = 0.08 + illumination * 0.16;
  const glowA2 = 0.03 + illumination * 0.07;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative moon-breathe">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: "visible" }}
        >
          {/* Wide outer halo */}
          <circle cx={cx} cy={cy} r={r + 36} fill={`rgba(160,185,230,${glowA2})`} />
          {/* Inner glow ring */}
          <circle cx={cx} cy={cy} r={r + 18} fill={`rgba(180,200,240,${glowA})`} />
          {/* Moon body — dark side */}
          <circle cx={cx} cy={cy} r={r} fill="#0e1020" />
          {/* Subtle limb darkening on dark side */}
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke="rgba(100,120,160,0.08)" strokeWidth={r * 0.6}
            style={{ filter: "blur(8px)" }} />
          {/* Lit portion */}
          {illumination > 0.01 && (
            <path d={moonPath} fill="#cec8be" />
          )}
          {/* Surface craters — only on lit side */}
          {illumination > 0.15 && (
            <>
              <circle cx={cx - 14} cy={cy - 22} r={9}  fill="rgba(0,0,0,0.09)" />
              <circle cx={cx + 24} cy={cy + 12} r={13} fill="rgba(0,0,0,0.07)" />
              <circle cx={cx - 6}  cy={cy + 28} r={7}  fill="rgba(0,0,0,0.08)" />
              <circle cx={cx + 10} cy={cy - 38} r={5}  fill="rgba(0,0,0,0.06)" />
              <circle cx={cx - 30} cy={cy + 8}  r={6}  fill="rgba(0,0,0,0.05)" />
            </>
          )}
          {/* Limb edge */}
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke="rgba(200,210,240,0.06)" strokeWidth="1.5" />
          {/* Terminator soft highlight */}
          {illumination > 0.01 && illumination < 0.99 && (
            <ellipse
              cx={cx + ellipseX * 0.05}
              cy={cy}
              rx={Math.max(1, Math.abs(ellipseX) * 0.08)}
              ry={r}
              fill="rgba(220,230,255,0.06)"
            />
          )}
        </svg>
      </div>

      <div className="text-center space-y-2">
        <div className="text-3xl leading-none">{emoji}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#e8f4ff", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {translatePhase(phaseName)}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(212,175,55,0.95)", letterSpacing: "-0.01em" }}>
          {Math.round(illumination * 100)}{t.percent} {t.illuminated}
        </div>
        {isSupermoon && (
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.85)" }}>
            {t.supermoon}
          </div>
        )}
        {isMicroMoon && (
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(100,150,220,0.8)" }}>
            {t.micromoon}
          </div>
        )}
        <div style={{ fontSize: 11, color: "rgba(74,100,140,0.45)" }}>
          {age.toFixed(1)} {t.daysOld} &middot; {distance.toLocaleString()} {t.km}
        </div>
      </div>
    </div>
  );
}
