"use client";

import { useEffect, useState, useRef } from "react";

const DEMO_KEY = "hivemoon_demo_seen";

const DEMO_MOOD = [3, 4, 3, 5, 4, 5, 4, 3, 2, 3, 4, 4, 5, 4];
const DEMO_ENERGY = [3, 3, 4, 5, 5, 4, 3, 2, 2, 3, 4, 5, 5, 4];

export default function AutoDemo({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [bars, setBars] = useState<number[]>([]);
  const hasRun = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || hasRun.current) return;
    hasRun.current = true;
    if (localStorage.getItem(DEMO_KEY)) { onDone(); return; }
    setVisible(true);

    // Animate bars one by one
    let i = 0;
    const interval = setInterval(() => {
      if (i >= DEMO_MOOD.length) {
        clearInterval(interval);
        setStep(1);
        setTimeout(() => {
          setVisible(false);
          localStorage.setItem(DEMO_KEY, "1");
          onDone();
        }, 3500);
        return;
      }
      setBars((prev) => [...prev, i]);
      i++;
    }, 280);

    return () => clearInterval(interval);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
      <div className="w-full max-w-sm bg-gray-950 border border-gray-800 rounded-2xl p-6 space-y-5">
        <div className="text-center space-y-1">
          <div className="text-2xl">🌕</div>
          <div className="text-white font-semibold text-sm">HiveMoon learns your rhythm</div>
          <div className="text-gray-500 text-xs">14 days of 2-second logs, then...</div>
        </div>

        {step === 0 && (
          <div className="space-y-1.5">
            {bars.map((idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs animate-fade-in">
                <span className="text-gray-600 w-5 text-right">{idx + 1}</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full">
                  <div
                    className="h-1.5 rounded-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${(DEMO_MOOD[idx] / 5) * 100}%` }}
                  />
                </div>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full">
                  <div
                    className="h-1.5 rounded-full bg-blue-800 transition-all duration-300"
                    style={{ width: `${(DEMO_ENERGY[idx] / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2 animate-fade-in">
            <div className="text-white font-bold tracking-tight">The Illuminated</div>
            <div className="text-gray-400 text-xs leading-relaxed">
              You are fully a full moon person. Peak mood, peak energy, peak everything. Lit up.
            </div>
            <div className="text-indigo-400 text-xs">Peak phase: 🌕 Full Moon</div>
          </div>
        )}

        <p className="text-center text-gray-700 text-xs">Starting in a moment...</p>
      </div>
    </div>
  );
}
