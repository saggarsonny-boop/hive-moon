"use client";

import { LunarPortrait as Portrait, PHASE_EMOJIS } from "@/lib/moon";
import { useTranslation } from "@/hooks/useTranslation";

const PHASE_ORDER = [
  "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
  "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent",
];

export default function LunarPortrait({ portrait, totalDays }: { portrait: Portrait | null; totalDays: number }) {
  const { t, phase: translatePhase } = useTranslation();
  if (!portrait) {
    const needed = Math.max(0, 14 - totalDays);
    const pct    = Math.min(100, Math.round((totalDays / 14) * 100));
    return (
      <div className="space-y-4 fade-up">
        <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(74,127,165,0.55)", fontFamily: "monospace" }}>
          {t.yourLunarPortrait}
        </p>
        <div style={{ background: "rgba(4,8,20,0.7)", border: "1px solid rgba(74,127,165,0.14)", borderRadius: 18, padding: "24px 22px", space: "12px" }} className="space-y-4">
          <p style={{ fontSize: 14, color: "rgba(180,200,225,0.55)", lineHeight: 1.7 }}>
            {t.portraitUnlocksAfter}
          </p>
          <p style={{ fontSize: 12, color: "rgba(74,100,140,0.5)" }}>
            {totalDays === 0
              ? "Log today to begin."
              : `${totalDays} ${t.daysLogged} — ${needed} more to go.`}
          </p>
          <div style={{ width: "100%", background: "rgba(10,16,32,0.8)", borderRadius: 100, height: 3, overflow: "hidden" }}>
            <div
              style={{
                background: "linear-gradient(90deg, rgba(74,127,165,0.7), rgba(180,200,240,0.9))",
                height: 3, borderRadius: 100,
                width: `${pct}%`,
                transition: "width 0.6s ease",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  const max = Math.max(...portrait.phaseDistribution.map((d) => d.avgMood), 0.1);

  return (
    <div className="space-y-4 fade-up">
      <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(74,127,165,0.55)", fontFamily: "monospace" }}>
        {t.yourLunarPortrait}
      </p>

      <div style={{ background: "rgba(4,8,20,0.8)", border: "1px solid rgba(74,127,165,0.18)", borderRadius: 20, padding: "24px 22px" }} className="space-y-5">
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#e8f4ff", letterSpacing: "-0.02em" }}>
            {portrait.type}
          </div>
          <div style={{ fontSize: 13, color: "rgba(120,150,190,0.65)", marginTop: 6, lineHeight: 1.7 }}>
            {portrait.description}
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: t.peakPhase, value: `${PHASE_EMOJIS[portrait.peakPhase]} ${translatePhase(portrait.peakPhase)}` },
            { label: t.avgMood,   value: `${portrait.avgMood}/5` },
            { label: t.cycles,     value: String(portrait.cyclesLogged || "<1") },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(74,100,140,0.5)", fontFamily: "monospace" }}>
                {label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e8f4ff", marginTop: 3 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {PHASE_ORDER.map((phase) => {
            const d = portrait.phaseDistribution.find((x) => x.phase === phase);
            if (!d) return null;
            const barW   = (d.avgMood / max) * 100;
            const isPeak = phase === portrait.peakPhase;
            return (
              <div key={phase} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
                <span style={{ width: 16, textAlign: "center" }}>{PHASE_EMOJIS[phase]}</span>
                <span style={{
                  width: 100, textAlign: "right", flexShrink: 0,
                  color: isPeak ? "#e8f4ff" : "rgba(74,100,140,0.5)",
                  fontWeight: isPeak ? 600 : 400,
                }}>
                  {translatePhase(phase)}
                </span>
                <div style={{ flex: 1, background: "rgba(10,16,32,0.8)", borderRadius: 100, height: 3, overflow: "hidden" }}>
                  <div style={{
                    height: 3, borderRadius: 100,
                    width: `${barW}%`,
                    background: isPeak
                      ? "linear-gradient(90deg, rgba(74,127,165,0.6), rgba(180,200,240,0.9))"
                      : "rgba(74,100,140,0.25)",
                    transition: "width 0.7s ease",
                  }} />
                </div>
                <span style={{ width: 24, textAlign: "right", color: isPeak ? "#e8f4ff" : "rgba(74,100,140,0.4)" }}>
                  {d.count > 0 ? d.avgMood.toFixed(1) : "—"}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            const text = `My lunar portrait: ${portrait.type}\n"${portrait.description}"\nPeak phase: ${portrait.peakPhase}\nhivemoon.hive.baby`;
            navigator.share?.({ text }) ?? navigator.clipboard?.writeText(text);
          }}
          style={{
            width: "100%",
            padding: "12px",
            background: "rgba(4,8,20,0.6)",
            border: "1px solid rgba(74,127,165,0.2)",
            borderRadius: 12,
            color: "rgba(120,160,200,0.7)",
            fontSize: 13,
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          {t.sharePortrait}
        </button>
      </div>
    </div>
  );
}
