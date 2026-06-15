"use client";

import { useMemo, useState } from "react";
import { allMatches, formatBDTimeShort, GROUPS, parseMatchTime } from "@/lib/data";
import { getFlag } from "./HeroSection";
import { CalendarDays, Filter, MapPin } from "lucide-react";

export default function ScheduleSection() {
  const [filterGroup, setFilterGroup] = useState<string>("ALL");

  const filteredMatches = useMemo(() => {
    let list = allMatches;
    if (filterGroup === "KO") {
      list = allMatches.filter((m) => !!m.round);
    } else if (filterGroup !== "ALL") {
      list = allMatches.filter((m) => m.group === filterGroup);
    }
    return list.sort((a, b) => parseMatchTime(a).getTime() - parseMatchTime(b).getTime());
  }, [filterGroup]);

  const groupedByDate = useMemo(() => {
    const map = new Map<string, typeof filteredMatches>();
    filteredMatches.forEach((m) => {
      const bd = parseMatchTime(m);
      const key = bd.toLocaleDateString("en-GB", {
        timeZone: "UTC",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
    return Array.from(map.entries());
  }, [filteredMatches]);

  return (
    <section id="schedule" className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-emerald-300 text-sm font-semibold mb-4">
            <CalendarDays className="w-4 h-4" />
            <span>Full Schedule</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Match Schedule</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            সম্পূর্ণ খেলার সময়সূচি — সব গ্রুপ স্টেজ এবং নকআউট ম্যাচ বাংলাদেশ সময়ে।
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 md:mb-10">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>
          <FilterButton label="All" active={filterGroup === "ALL"} onClick={() => setFilterGroup("ALL")} />
          {GROUPS.map((g) => (
            <FilterButton
              key={g}
              label={`${g}`}
              active={filterGroup === g}
              onClick={() => setFilterGroup(g)}
            />
          ))}
          <FilterButton label="KO" active={filterGroup === "KO"} onClick={() => setFilterGroup("KO")} />
        </div>

        {/* Schedule list */}
        <div className="space-y-8">
          {groupedByDate.length === 0 && (
            <p className="text-center text-slate-500">No matches found for this filter.</p>
          )}

          {groupedByDate.map(([date, matches]) => (
            <div key={date}>
              <h3 className="sticky top-0 z-10 text-lg md:text-xl font-bold text-emerald-400 bg-slate-900/90 backdrop-blur py-2 px-4 rounded-lg mb-4 border-l-4 border-emerald-500">
                {date}
              </h3>
              <div className="space-y-3">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
        active
          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
          : "glass-card text-slate-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function MatchCard({ match }: { match: import("@/lib/data").Match }) {
  const bdTime = parseMatchTime(match);

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:border-emerald-500/30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        {/* Teams */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{getFlag(match.home)}</span>
            <span className="text-sm sm:text-base font-semibold text-white truncate">{match.home}</span>
          </div>

          <div className="flex flex-col items-center px-2 sm:px-4 flex-shrink-0">
            {match.played ? (
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-400">
                {match.homeScore} - {match.awayScore}
              </div>
            ) : (
              <div className="text-base sm:text-lg md:text-xl font-bold text-slate-500">VS</div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0 flex-1">
            <span className="text-sm sm:text-base font-semibold text-white truncate text-right">{match.away}</span>
            <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{getFlag(match.away)}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 md:gap-1 text-xs sm:text-sm text-slate-400 md:min-w-[160px]">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-semibold">{formatBDTimeShort(bdTime)}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="truncate">{match.venue}, {match.city}</span>
          </div>
          {match.group && (
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] sm:text-xs font-semibold">
              Group {match.group}
            </span>
          )}
          {match.round && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-semibold">
              {match.round}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
