"use client";

import { useState, useEffect, useCallback } from "react";
import { getMoonPhase, getUpcomingEvents, getLogs, getTodayKey, computePortrait, DayLog, PhaseInfo, UpcomingEvent, LunarPortrait } from "@/lib/moon";
import MoonDial from "@/app/components/MoonDial";
import DailyLogger from "@/app/components/DailyLogger";
import LunarPortraitCard from "@/app/components/LunarPortrait";
import UpcomingEventsCard from "@/app/components/UpcomingEvents";
import AutoDemo from "@/app/components/AutoDemo";
import LanguageSelector from "@/app/components/LanguageSelector";
import TooltipTour from "@/app/components/TooltipTour";
import { useTranslation } from "@/hooks/useTranslation";

const WELCOME_KEY = "hivemoon_welcomed";
const DEMO_KEY = "hivemoon_demo_seen";

export default function HiveMoon() {
  const [ready, setReady] = useState(false);
  const [demoVisible, setDemoVisible] = useState(false);
  const [moonInfo, setMoonInfo] = useState<PhaseInfo | null>(null);
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [logs, setLogs] = useState<DayLog[]>([]);
  const [todayLog, setTodayLog] = useState<DayLog | null>(null);
  const [portrait, setPortrait] = useState<LunarPortrait | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  const loadData = useCallback(async () => {
    try {
      // Local calculation — always available immediately
      const localInfo = getMoonPhase();
      setMoonInfo(localInfo); // show page right away, don't wait for API

      const ev = getUpcomingEvents(new Date(), 6);
      const allLogs = getLogs();
      const today = allLogs.find((l) => l.date === getTodayKey()) || null;
      const p = computePortrait(allLogs);
      setEvents(ev);
      setLogs(allLogs);
      setTodayLog(today);
      setPortrait(p);

      // Farmsense API — 5-second timeout, updates info if successful
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 5000);
        const res = await fetch('/api/moon', { signal: controller.signal });
        clearTimeout(tid);
        if (res.ok) {
          const apiData = await res.json();
          if (!apiData.error) {
            setMoonInfo({
              ...localInfo,
              phase: apiData.phase,
              illumination: apiData.illumination,
              phaseName: apiData.phaseName,
              emoji: apiData.emoji,
              age: apiData.age,
              distance: apiData.distance,
              isSupermoon: apiData.isSupermoon,
              isMicroMoon: apiData.isMicroMoon,
            });
          }
        }
      } catch {
        // API timed out or failed — local data already shown
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setMoonInfo(getMoonPhase());
    }
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


  const { t, fmt, phase, lang } = useTranslation();

  const CARD: React.CSSProperties = {
    background: "rgba(4,8,20,0.78)",
    border: "1px solid rgba(74,127,165,0.16)",
    borderRadius: 20,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    padding: "24px 22px",
  };

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ minHeight: "100vh", color: "#e8f4ff" }}>
      <LanguageSelector />
      <TooltipTour engineId="hivemoon" tips={[
        { label: "Moon dial", text: "Shows tonight's exact phase, illumination percentage, and distance from Earth — calculated astronomically, no API." },
        { label: "Daily logger", text: "Tap 1–5 for mood and energy. Takes two seconds. The pattern emerges after 14 days." },
        { label: "Upcoming events", text: "Next full moon, new moon, and any supermoons — with exact countdowns." },
        { label: "Lunar portrait", text: "After 14 days of logging, your personal pattern appears — which phase correlates with your highest mood and energy." },
      ]} />
      {demoVisible && <AutoDemo onDone={handleDemoFinished} />}

      {showWelcome && (
        <div className="fixed inset-0 z-40 flex items-end justify-center pb-10 px-6"
          style={{ background: "rgba(2,4,10,0.75)", backdropFilter: "blur(10px)" }}>
          <div style={{ ...CARD, width: "100%", maxWidth: 380 }} className="space-y-5">
            <div className="text-center space-y-2">
              <div style={{ fontSize: 36 }}>🌙</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e8f4ff", letterSpacing: "-0.02em" }}>
                {t.welcomeQuestion}
              </div>
              <div style={{ fontSize: 13, color: "rgba(120,150,190,0.65)", lineHeight: 1.6 }}>
                {t.welcomeBody}
              </div>
            </div>
            <div style={{ background: "rgba(4,8,22,0.6)", border: "1px solid rgba(74,127,165,0.1)", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(74,100,140,0.6)" }}>
                {t.welcomeHint}
              </div>
            </div>
            <button
              onClick={dismissWelcome}
              style={{ width: "100%", padding: 14, background: "rgba(8,16,36,0.9)", border: "1px solid rgba(180,200,240,0.25)", borderRadius: 14, color: "rgba(200,220,255,0.9)", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}
            >
              {t.startLogging}
            </button>
          </div>
        </div>
      )}

      {!moonInfo ? (
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }} className="space-y-3">
            <div style={{ fontSize: 48 }} className="moon-breathe">🌙</div>
            <div style={{ fontSize: 13, color: "rgba(74,127,165,0.5)", letterSpacing: "0.1em" }}>
              {t.readingTheSky}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 460, margin: "0 auto", padding: "48px 20px 80px" }} className="space-y-10 fade-up">

          {/* Header */}
          <div style={{ textAlign: "center" }} className="space-y-1">
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "#e8f4ff" }}>
              {t.title}
            </h1>
            <p style={{ fontSize: 12, color: "rgba(74,100,140,0.55)", letterSpacing: "0.06em" }}>
              {t.subtitle}
            </p>
          </div>

          {/* Moon dial */}
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
            <MoonDial info={moonInfo} />
          </div>

          {/* Date */}
          <div style={{ textAlign: "center", fontSize: 12, color: "rgba(74,100,140,0.45)", letterSpacing: "0.04em" }}>
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>

          {/* Logger card */}
          <div style={CARD}>
            <DailyLogger moonInfo={moonInfo} existingLog={todayLog} onSaved={handleLogSaved} />
          </div>

          {/* Streak stats */}
          {logs.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              {[
                { val: logs.length,                                     label: t.daysLogged },
                { val: `${Math.round((logs.length / 90) * 100)}${t.percent}`,  label: t.to90Days },
                { val: logs.length >= 14 ? "✓" : 14 - logs.length,    label: logs.length >= 14 ? t.portraitReady : t.daysToPortrait },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#e8f4ff", letterSpacing: "-0.02em" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "rgba(74,100,140,0.5)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Lunar portrait */}
          <LunarPortraitCard portrait={portrait} totalDays={logs.length} />

          {/* Upcoming events */}
          {events.length > 0 && <UpcomingEventsCard events={events} />}

          {/* Log history */}
          {logs.length > 0 && (
            <div className="space-y-3">
              <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(74,127,165,0.55)", fontFamily: "monospace" }}>
                {t.recentLogs}
              </p>
              <div className="space-y-1">
                {[...logs].reverse().slice(0, 14).map((l) => (
                  <div key={l.date} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, padding: "5px 0", borderBottom: "1px solid rgba(6,12,28,0.8)" }}>
                    <span style={{ width: 80, color: "rgba(74,100,140,0.4)", flexShrink: 0 }}>
                      {new Date(l.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                    <span style={{ flex: 1, color: "rgba(120,150,190,0.55)" }}>{phase(l.phaseName)}</span>
                    <span style={{ color: "rgba(74,100,140,0.5)", fontFamily: "monospace", fontSize: 11 }}>
                      M:{l.mood} E:{l.energy}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </main>
  );
}
