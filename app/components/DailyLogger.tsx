"use client";

import { useState } from "react";
import { DayLog, saveLog, getTodayKey, PhaseInfo } from "@/lib/moon";

const MOOD_LABELS   = ["", "Low", "Below avg", "Average", "Good", "Great"];
const ENERGY_LABELS = ["", "Drained", "Low", "Steady", "High", "Charged"];

export default function DailyLogger({
  moonInfo,
  existingLog,
  onSaved,
}: {
  moonInfo: PhaseInfo;
  existingLog: DayLog | null;
  onSaved: (log: DayLog) => void;
}) {
  const [mood,   setMood]   = useState(existingLog?.mood   ?? 0);
  const [energy, setEnergy] = useState(existingLog?.energy ?? 0);
  const [saved,  setSaved]  = useState(!!existingLog);

  function handleSave() {
    if (!mood || !energy) return;
    const log: DayLog = {
      date: getTodayKey(),
      mood, energy,
      phase: moonInfo.phase,
      phaseName: moonInfo.phaseName,
    };
    saveLog(log);
    setSaved(true);
    onSaved(log);
  }

  if (saved && existingLog) {
    return (
      <div className="text-center py-5 space-y-2">
        <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(74,200,140,0.7)", fontFamily: "monospace" }}>
          Logged today
        </div>
        <div style={{ fontSize: 13, color: "rgba(120,150,190,0.6)" }}>
          Mood {existingLog.mood}/5 &middot; Energy {existingLog.energy}/5 &middot; {existingLog.phaseName}
        </div>
        <button
          onClick={() => setSaved(false)}
          style={{ fontSize: 11, color: "rgba(74,127,165,0.45)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginTop: 4 }}
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(74,127,165,0.55)", fontFamily: "monospace" }}>
        Today&apos;s log
      </p>

      <ScaleInput
        label="Mood"
        value={mood}
        onChange={setMood}
        labels={MOOD_LABELS}
        accentColor="rgba(180,200,240,0.9)"
        activeColor="rgba(74,100,160,0.9)"
      />

      <ScaleInput
        label="Energy"
        value={energy}
        onChange={setEnergy}
        labels={ENERGY_LABELS}
        accentColor="rgba(160,210,200,0.9)"
        activeColor="rgba(40,110,100,0.9)"
      />

      <button
        onClick={handleSave}
        disabled={!mood || !energy}
        style={{
          width: "100%",
          padding: "14px",
          background: (!mood || !energy) ? "rgba(10,16,30,0.4)" : "rgba(12,20,40,0.9)",
          border: `1px solid ${(!mood || !energy) ? "rgba(74,127,165,0.12)" : "rgba(180,200,240,0.3)"}`,
          borderRadius: 14,
          color: (!mood || !energy) ? "rgba(74,127,165,0.3)" : "rgba(200,220,255,0.9)",
          fontSize: 14, fontWeight: 600, fontFamily: "inherit",
          cursor: (!mood || !energy) ? "default" : "pointer",
          transition: "border-color 0.2s, color 0.2s",
          letterSpacing: "0.04em",
        }}
      >
        Log today
      </button>

      <p style={{ textAlign: "center", fontSize: 11, color: "rgba(74,100,140,0.4)" }}>
        2 seconds · no account · private to this device
      </p>
    </div>
  );
}

function ScaleInput({
  label, value, onChange, labels, accentColor, activeColor,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  labels: string[];
  accentColor: string;
  activeColor: string;
}) {
  return (
    <div className="space-y-2">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "rgba(180,200,225,0.55)" }}>{label}</span>
        <span style={{ fontSize: 13, color: value ? accentColor : "rgba(74,100,140,0.35)" }}>
          {value ? labels[value] : "—"}
        </span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 10,
              fontSize: 14, fontWeight: 600, fontFamily: "inherit",
              cursor: "pointer",
              transition: "all 0.15s",
              background: value === v ? activeColor : "rgba(4,8,20,0.7)",
              border: `1px solid ${value === v ? accentColor : "rgba(74,127,165,0.14)"}`,
              color: value === v ? "#fff" : "rgba(120,150,190,0.5)",
              boxShadow: value === v ? `0 0 12px 2px ${activeColor}33` : "none",
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
