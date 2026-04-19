"use client";

import { UpcomingEvent } from "@/lib/moon";

const TYPE_STYLE: Record<string, { dot: string; color: string }> = {
  full:      { dot: "rgba(220,225,240,0.8)", color: "rgba(200,215,240,0.75)" },
  new:       { dot: "rgba(40,60,100,0.7)",   color: "rgba(74,100,140,0.5)" },
  supermoon: { dot: "rgba(212,175,55,0.85)", color: "rgba(200,160,40,0.8)" },
  eclipse:   { dot: "rgba(200,60,40,0.8)",   color: "rgba(200,80,60,0.75)" },
  quarter:   { dot: "rgba(100,130,170,0.6)", color: "rgba(100,130,170,0.55)" },
};

export default function UpcomingEvents({ events }: { events: UpcomingEvent[] }) {
  return (
    <div className="space-y-3 fade-up">
      <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(74,127,165,0.55)", fontFamily: "monospace" }}>
        Coming up
      </p>
      <div className="space-y-1.5">
        {events.map((e, i) => {
          const s = TYPE_STYLE[e.type] || TYPE_STYLE.full;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: "1px solid rgba(10,20,40,0.6)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: s.dot, boxShadow: `0 0 6px 1px ${s.dot}` }} />
              <span style={{ flex: 1, fontSize: 13, color: s.color }}>{e.label}</span>
              <span style={{ fontSize: 11, color: "rgba(74,100,140,0.45)" }}>
                {e.date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                {e.daysAway === 1 ? " · tomorrow" : e.daysAway <= 7 ? ` · ${e.daysAway}d` : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
