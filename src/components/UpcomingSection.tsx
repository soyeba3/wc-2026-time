"use client";

import { useEffect, useMemo, useState } from "react";
import { allMatches, formatBDTimeShort, parseMatchTime, toBDTime } from "@/lib/data";
import { getFlag } from "./HeroSection";
import { ChevronRight, Sparkles } from "lucide-react";

function getUpcomingMatches(now: Date) {
  const bdNow = toBDTime(now);

  // "Today" boundaries in BD time, then convert back to UTC for comparison
  const todayStartBD = new Date(bdNow);
  todayStartBD.setHours(0, 0, 0, 0);
  const todayEndBD = new Date(todayStartBD);
  todayEndBD.setHours(23, 59, 59, 999);

  const todayStartUTC = new Date(todayStartBD.getTime() - 6 * 60 * 60 * 1000);
  const todayEndUTC = new Date(todayEndBD.getTime() - 6 * 60 * 60 * 1000);

  const upcomingToday = allMatches
    .filter((m) => {
      const t = parseMatchTime(m);
      return t > now && t >= todayStartUTC && t <= todayEndUTC;
    })
    .sort((a, b) => parseMatchTime(a).getTime() - parseMatchTime(b).getTime());

  if (upcomingToday.length > 0) {
    return { label: "Today's Upcoming Matches", matches: upcomingToday.slice(0, 3) };
  }

  const nextMatches = allMatches
    .filter((m) => parseMatchTime(m) > now)
    .sort((a, b) => parseMatchTime(a).getTime() - parseMatchTime(b).getTime())
    .slice(0, 3);

  return { label: "Next Matches", matches: nextMatches };
}

export default function UpcomingSection() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const { label, matches } = useMemo(() => {
    if (!now) return { label: "", matches: [] };
    return getUpcomingMatches(now);
  }, [now]);

  if (!now || matches.length === 0) return null;

  return (
    <section className="py-10 md:py-14 px-4 bg-slate-950/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-lg md:text-xl font-bold text-white text-center">{label}</h2>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {matches.map((match) => (
            <UpcomingCard key={match.id} match={match} />
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href="#schedule"
            className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            See full schedule <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function UpcomingCard({ match }: { match: import("@/lib/data").Match }) {
  const bdTime = parseMatchTime(match);

  return (
    <div className="glass-card rounded-2xl p-4 hover:border-emerald-500/30 transition-colors">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
        <span>{formatBDTimeShort(bdTime)}</span>
        {match.group && <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Group {match.group}</span>}
        {match.round && <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">{match.round}</span>}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-3xl md:text-4xl">{getFlag(match.home)}</span>
          <span className="text-xs md:text-sm font-semibold text-white text-center truncate w-full">{match.home}</span>
        </div>

        <div className="text-lg font-black text-slate-500 px-2">VS</div>

        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-3xl md:text-4xl">{getFlag(match.away)}</span>
          <span className="text-xs md:text-sm font-semibold text-white text-center truncate w-full">{match.away}</span>
        </div>
      </div>

      <div className="mt-3 text-[10px] md:text-xs text-slate-500 text-center truncate">
        {match.venue}, {match.city}
      </div>
    </div>
  );
}
