"use client";

import { useState, useEffect, useCallback } from "react";
import { getMoonPhase, getUpcomingEvents, getLogs, getTodayKey, computePortrait, DayLog, PhaseInfo, UpcomingEvent, LunarPortrait } from "@/lib/moon";
import MoonDial from "@/app/components/MoonDial";
import DailyLogger from "@/app/components/DailyLogger";
import LunarPortraitCard from "@/app/components/LunarPortrait";
import UpcomingEventsCard from "@/app/components/UpcomingEvents";
import AutoDemo from "@/app/components/AutoDemo";

const WELCOME_KEY = "hivemoon_welcomed";
const DEMO_KEY = "hivemoon_demo_seen";

export default function HiveMoon() {
  const [ready, setReady] = useState(true);
  const [demoVisible, setDemoVisible] = useState(false);
  const [moonInfo, setMoonInfo] = useState<PhaseInfo | null>(null);
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [todayLog, setTodayLog] = useState<DayLog | null>(null);
  const [portrait, setPortrait] = useState<LunarPortrait | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  const loadData = useCallback(() => {
    const info = getMoonPhase();
    const ev = getUpcomingEvents(new Date(), 6);
    const allLogs = getLogs();
    const today = allLogs.find((l) => l.date === getTodayKey()) || null;
    const p = computePortrait(allLogs);
    setMoonInfo(info);
    setEvents(ev);
    setLogs(allLogs);
    setTodayLog(today);
    setPortrait(p);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDemoVisible(!localStorage.getItem(DEMO_KEY));
  }, []);

  const handleDemoFinished = useCallback(() => {
    localStorage.setItem(DEMO_KEY, "1");
    setDemoVisible(false);
    if (!localStorage.getItem(WELCOME_KEY)) {
      setShowWelcome(true);
    }
    setReady(true);
  }, []);

  function dismissWelcome() {
    localStorage.setItem(WELCOME_KEY, "1");
    setShowWelcome(false);
  }

  function handleLogSaved(log: DayLog) {
    setTodayLog(log);
    const allLogs = getLogs();
    setLogs(allLogs);
    setPortrait(computePortrait(allLogs));
  }

  // Live clock update for moon phase
  useEffect(() => {
    const t = setInterval(() => setMoonInfo(getMoonPhase()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-[#05060e] text-white">
      {demoVisible && <AutoDemo onDone={handleDemoFinished} />}

      {showWelcome && (
        <div className="fixed inset-0 z-40 flex items-end justify-center pb-10 px-6 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-gray-950 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="text-center space-y-1">
              <div className="text-3xl">🌙</div>
              <div className="text-white font-semibold">Does the moon affect you?</div>
              <div className="text-gray-400 text-sm">Log mood and energy each day. Find out.</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-center">
              <div className="text-gray-500 text-xs">Try: tap 1–5 for mood, 1–5 for energy. Done.</div>
            </div>
            <button
              onClick={dismissWelcome}
              className="w-full bg-white text-gray-950 font-semibold py-3 rounded-xl text-sm cursor-pointer hover:bg-gray-100 transition-colors"
            >
              Start logging
            </button>
          </div>
        </div>
      )}

      {ready && moonInfo && (
        <div className="max-w-md mx-auto px-4 py-10 space-y-10">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">HiveMoon</h1>
            <p className="text-gray-600 text-xs">Does the moon affect you? Find out.</p>
          </div>

          {/* Moon visual */}
          <div className="flex justify-center">
            <MoonDial info={moonInfo} />
          </div>

          {/* Today's date & phase context */}
          <div className="text-center text-gray-500 text-xs">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>

          {/* Daily logger */}
          <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5">
            <DailyLogger
              moonInfo={moonInfo}
              existingLog={todayLog}
              onSaved={handleLogSaved}
            />
          </div>

          {/* Streak / stats */}
          {logs.length > 0 && (
            <div className="flex justify-around text-center">
              <div>
                <div className="text-white font-bold text-xl">{logs.length}</div>
                <div className="text-gray-600 text-xs mt-0.5">days logged</div>
              </div>
              <div>
                <div className="text-white font-bold text-xl">
                  {Math.round((logs.length / 90) * 100)}%
                </div>
                <div className="text-gray-600 text-xs mt-0.5">to 90 days</div>
              </div>
              <div>
                <div className="text-white font-bold text-xl">
                  {logs.length >= 14 ? "✓" : Math.max(0, 14 - logs.length)}
                </div>
                <div className="text-gray-600 text-xs mt-0.5">
                  {logs.length >= 14 ? "portrait ready" : "days to portrait"}
                </div>
              </div>
            </div>
          )}

          {/* Lunar portrait */}
          <LunarPortraitCard portrait={portrait} totalDays={logs.length} />

          {/* Upcoming events */}
          {events.length > 0 && <UpcomingEventsCard events={events} />}

          {/* Log history strip */}
          {logs.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 uppercase tracking-widest">Recent logs</p>
              <div className="space-y-1.5">
                {[...logs].reverse().slice(0, 14).map((l) => (
                  <div key={l.date} className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="w-24 text-gray-700">
                      {new Date(l.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                    <span>{l.phaseName}</span>
                    <span className="ml-auto">M:{l.mood} E:{l.energy}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy note */}
          <div className="text-center text-gray-700 text-xs leading-relaxed pb-4">
            All data stays on your device. No account. No server. No tracking.
            <br />
            Your lunar portrait is yours alone.
          </div>
        </div>
      )}

      {/* Loading state before demo finishes */}
      {!ready && !demoVisible && (
        <div className="flex items-center justify-center min-h-screen text-gray-700 text-sm">
          Loading...
        </div>
      )}
    </main>
  );
}
