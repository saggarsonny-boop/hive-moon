"use client";

import { useState } from "react";
import { DayLog, saveLog, getTodayKey, PhaseInfo } from "@/lib/moon";

const MOOD_LABELS = ["", "Low", "Below avg", "Average", "Good", "Great"];
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
  const [mood, setMood] = useState(existingLog?.mood ?? 0);
  const [energy, setEnergy] = useState(existingLog?.energy ?? 0);
  const [saved, setSaved] = useState(!!existingLog);

  function handleSave() {
    if (!mood || !energy) return;
    const log: DayLog = {
      date: getTodayKey(),
      mood,
      energy,
      phase: moonInfo.phase,
      phaseName: moonInfo.phaseName,
    };
    saveLog(log);
    setSaved(true);
    onSaved(log);
  }

  if (saved && existingLog) {
    return (
      <div className="text-center py-4 space-y-1">
        <div className="text-green-400 text-sm font-medium">Logged today</div>
        <div className="text-gray-500 text-xs">
          Mood {existingLog.mood}/5 · Energy {existingLog.energy}/5 · {existingLog.phaseName}
        </div>
        <button
          onClick={() => setSaved(false)}
          className="text-gray-600 text-xs underline mt-2"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-xs text-gray-600 uppercase tracking-widest">Today&apos;s log</p>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Mood</span>
          <span className="text-sm text-gray-300">{mood ? MOOD_LABELS[mood] : "—"}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => setMood(v)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mood === v
                  ? "bg-indigo-800 text-white border border-indigo-600"
                  : "bg-gray-900 text-gray-500 border border-gray-800 hover:border-gray-600"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Energy</span>
          <span className="text-sm text-gray-300">{energy ? ENERGY_LABELS[energy] : "—"}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => setEnergy(v)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                energy === v
                  ? "bg-indigo-800 text-white border border-indigo-600"
                  : "bg-gray-900 text-gray-500 border border-gray-800 hover:border-gray-600"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!mood || !energy}
        className="w-full bg-white text-gray-950 font-semibold py-3 rounded-lg disabled:opacity-25 hover:bg-gray-100 transition-colors cursor-pointer text-sm"
      >
        Log today
      </button>
      <p className="text-center text-gray-700 text-xs">2 seconds · no account needed · private to this device</p>
    </div>
  );
}
