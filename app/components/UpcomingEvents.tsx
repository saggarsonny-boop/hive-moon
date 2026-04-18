"use client";

import { UpcomingEvent } from "@/lib/moon";

const TYPE_STYLE: Record<string, { dot: string; label: string }> = {
  full: { dot: "bg-white", label: "text-gray-300" },
  new: { dot: "bg-gray-700", label: "text-gray-500" },
  supermoon: { dot: "bg-amber-400", label: "text-amber-300" },
  eclipse: { dot: "bg-red-500", label: "text-red-300" },
  quarter: { dot: "bg-gray-600", label: "text-gray-400" },
};

export default function UpcomingEvents({ events }: { events: UpcomingEvent[] }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-600 uppercase tracking-widest">Coming up</p>
      <div className="space-y-2">
        {events.map((e, i) => {
          const style = TYPE_STYLE[e.type] || TYPE_STYLE.full;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
              <div className="flex-1 flex justify-between items-center">
                <span className={`text-sm ${style.label}`}>{e.label}</span>
                <span className="text-xs text-gray-600">
                  {e.date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  {e.daysAway === 1 ? " · tomorrow" : e.daysAway <= 7 ? ` · ${e.daysAway}d` : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
