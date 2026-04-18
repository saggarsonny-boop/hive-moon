"use client";

import { LunarPortrait as Portrait, PHASE_EMOJIS } from "@/lib/moon";

const PHASE_ORDER = [
  "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
  "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent",
];

export default function LunarPortrait({ portrait, totalDays }: { portrait: Portrait | null; totalDays: number }) {
  if (!portrait) {
    const needed = Math.max(0, 14 - totalDays);
    const pct = Math.min(100, Math.round((totalDays / 14) * 100));
    return (
      <div className="space-y-4">
        <p className="text-xs text-gray-600 uppercase tracking-widest">Your lunar portrait</p>
        <div className="bg-gray-900 rounded-xl p-5 space-y-3">
          <p className="text-gray-400 text-sm">
            Your portrait unlocks after <span className="text-white font-medium">14 days</span> of logging.
          </p>
          <p className="text-gray-600 text-xs">
            {totalDays === 0
              ? "Log today to begin."
              : `${totalDays} day${totalDays > 1 ? "s" : ""} logged — ${needed} more to go.`}
          </p>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  const max = Math.max(...portrait.phaseDistribution.map((d) => d.avgMood));

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-600 uppercase tracking-widest">Your lunar portrait</p>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <div>
          <div className="text-xl font-bold text-white tracking-tight">{portrait.type}</div>
          <div className="text-gray-400 text-sm mt-1 leading-relaxed">{portrait.description}</div>
        </div>

        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-gray-600 text-xs uppercase tracking-wider">Peak phase</span>
            <div className="text-white font-medium mt-0.5">
              {PHASE_EMOJIS[portrait.peakPhase]} {portrait.peakPhase}
            </div>
          </div>
          <div>
            <span className="text-gray-600 text-xs uppercase tracking-wider">Avg mood</span>
            <div className="text-white font-medium mt-0.5">{portrait.avgMood}/5</div>
          </div>
          <div>
            <span className="text-gray-600 text-xs uppercase tracking-wider">Cycles</span>
            <div className="text-white font-medium mt-0.5">{portrait.cyclesLogged || "<1"}</div>
          </div>
        </div>

        {/* Radial bars */}
        <div className="space-y-1.5">
          {PHASE_ORDER.map((phase) => {
            const d = portrait.phaseDistribution.find((x) => x.phase === phase);
            if (!d) return null;
            const barW = max > 0 ? (d.avgMood / max) * 100 : 0;
            const isPeak = phase === portrait.peakPhase;
            return (
              <div key={phase} className="flex items-center gap-2 text-xs">
                <span className="w-4 text-center">{PHASE_EMOJIS[phase]}</span>
                <span className={`w-28 text-right shrink-0 ${isPeak ? "text-white font-medium" : "text-gray-500"}`}>
                  {phase.replace(" Moon", "").replace(" Quarter", " Q")}
                </span>
                <div className="flex-1 bg-gray-800 rounded-full h-1.5 relative">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${isPeak ? "bg-indigo-400" : "bg-gray-600"}`}
                    style={{ width: `${barW}%` }}
                  />
                </div>
                <span className={`w-6 text-right ${isPeak ? "text-white" : "text-gray-600"}`}>
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
          className="w-full border border-gray-700 text-gray-300 py-2.5 rounded-lg text-sm hover:border-gray-500 transition-colors cursor-pointer"
        >
          Share portrait
        </button>
      </div>
    </div>
  );
}
