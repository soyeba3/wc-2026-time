"use client";

import { useEffect, useMemo, useState } from "react";
import { allMatches, formatBDDate, formatBDClock, formatBDTime, parseMatchTime, toBDTime, type Match } from "@/lib/data";
import { Trophy, MapPin, Clock, Flame, Calendar } from "lucide-react";

function getMatchStatus(match: Match, now: Date): "live" | "upcoming" | "past" {
  const start = parseMatchTime(match);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // assume ~2h match
  if (now >= start && now <= end) return "live";
  if (now > end) return "past";
  return "upcoming";
}

function findFeaturedMatch(now: Date): { match: Match; status: "live" | "upcoming" | "past" } | null {
  const live = allMatches.find((m) => getMatchStatus(m, now) === "live");
  if (live) return { match: live, status: "live" };

  const upcoming = allMatches
    .filter((m) => getMatchStatus(m, now) === "upcoming")
    .sort((a, b) => parseMatchTime(a).getTime() - parseMatchTime(b).getTime())[0];
  if (upcoming) return { match: upcoming, status: "upcoming" };

  const last = allMatches
    .filter((m) => getMatchStatus(m, now) === "past")
    .sort((a, b) => parseMatchTime(b).getTime() - parseMatchTime(a).getTime())[0];
  if (last) return { match: last, status: "past" };

  return null;
}

function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(target.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const isPast = remaining <= 0;
  const abs = Math.max(remaining, 0);
  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((abs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((abs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((abs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast };
}

export default function HeroSection() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const featured = useMemo(() => (now ? findFeaturedMatch(now) : null), [now]);

  const match = featured?.match;
  const matchTime = match ? parseMatchTime(match) : new Date();
  const bdTime = toBDTime(matchTime);
  const { days, hours, minutes, seconds, isPast } = useCountdown(matchTime);

  if (!now || !match) {
    return (
      <section className="relative min-h-[70vh] flex items-center justify-center hero-pattern px-4">
        <div className="text-center animate-pulse">
          <Trophy className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">World Cup 2026</h1>
          <p className="text-slate-300 mt-4 text-lg">Loading schedule in Bangladesh Time...</p>
        </div>
      </section>
    );
  }

  const { status } = featured;
  const statusLabel =
    status === "live" ? "🔴 LIVE NOW" : status === "upcoming" ? "⏳ NEXT MATCH" : "✅ LAST MATCH";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center hero-pattern px-4 pt-20 pb-12 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl w-full text-center px-2 sm:px-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-card text-emerald-300 text-xs md:text-sm font-semibold mb-4 md:mb-6">
          <Trophy className="w-3 h-3 md:w-4 md:h-4" />
          <span>FIFA World Cup 2026 — Bangladesh Time (BST)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-3 md:mb-4">
          <span className="gradient-text">World Cup 2026</span>
        </h1>
        <p className="text-slate-300 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-10 px-2">
          সব ম্যাচের সময় দেখুন বাংলাদেশ সময় অনুযায়ী। Hero-তে বড় করে দেখাচ্ছে কোন ম্যাচটি এখন বা পরবর্তীতে হবে।
        </p>

        {/* Featured match card */}
        <div className="glass-card rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl shadow-emerald-900/20 border border-emerald-500/20 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            {status === "live" && <span className="w-3 h-3 rounded-full bg-red-500 live-dot" />}
            <span className={`text-xs md:text-sm lg:text-base font-bold tracking-wider ${status === "live" ? "text-red-400" : "text-emerald-400"}`}>
              {statusLabel}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 mb-6 md:mb-8">
            {/* Home team */}
            <div className="text-center flex-1 min-w-0 order-1">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 md:mb-2">{getFlag(match.home)}</div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white truncate px-2">{match.home}</h2>
            </div>

            {/* Score / VS */}
            <div className="flex flex-col items-center order-2 md:order-2">
              {match.played ? (
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-emerald-400">
                  {match.homeScore} - {match.awayScore}
                </div>
              ) : (
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-400">VS</div>
              )}
            </div>

            {/* Away team */}
            <div className="text-center flex-1 min-w-0 order-3">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 md:mb-2">{getFlag(match.away)}</div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white truncate px-2">{match.away}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-slate-300">
            <div className="flex items-center justify-center gap-2 glass-card rounded-xl px-3 py-2 md:px-4 md:py-3">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs md:text-sm lg:text-base truncate">{formatBDDate(matchTime)}</span>
            </div>
            <div className="flex items-center justify-center gap-2 glass-card rounded-xl px-3 py-2 md:px-4 md:py-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs md:text-sm lg:text-base font-semibold text-white">{formatBDClock(matchTime)}</span>
            </div>
            <div className="flex items-center justify-center gap-2 glass-card rounded-xl px-3 py-2 md:px-4 md:py-3">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs md:text-sm lg:text-base truncate">{match.venue}, {match.city}</span>
            </div>
          </div>

          {status === "upcoming" && !isPast && (
            <div className="mt-6 md:mt-8">
              <p className="text-slate-400 text-xs md:text-sm mb-2 md:mb-3 flex items-center justify-center gap-2">
                <Flame className="w-3 h-3 md:w-4 md:h-4 text-amber-400" /> Kick-off countdown
              </p>
              <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-xs md:max-w-md mx-auto">
                <CountBox value={days} label="Days" />
                <CountBox value={hours} label="Hours" />
                <CountBox value={minutes} label="Mins" />
                <CountBox value={seconds} label="Secs" />
              </div>
            </div>
          )}
        </div>

        <p className="text-slate-500 text-xs md:text-sm mt-4 md:mt-6">All times shown in Bangladesh Standard Time (BST, UTC+6)</p>
      </div>
    </section>
  );
}

function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-card rounded-lg md:rounded-xl p-2 md:p-3 text-center">
      <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">{String(value).padStart(2, "0")}</div>
      <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function getFlag(team: string): string {
  const flags: Record<string, string> = {
    Mexico: "🇲🇽", "South Africa": "🇿🇦", "South Korea": "🇰🇷", "Czech Republic": "🇨🇿",
    Canada: "🇨🇦", "Bosnia and Herzegovina": "🇧🇦", Qatar: "🇶🇦", Switzerland: "🇨🇭",
    Brazil: "🇧🇷", Morocco: "🇲🇦", Haiti: "🇭🇹", Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "United States": "🇺🇸", Paraguay: "🇵🇾", Australia: "🇦🇺", Turkey: "🇹🇷",
    Germany: "🇩🇪", "Curaçao": "🇨🇼", "Ivory Coast": "🇨🇮", Ecuador: "🇪🇨",
    Netherlands: "🇳🇱", Japan: "🇯🇵", Sweden: "🇸🇪", Tunisia: "🇹🇳",
    Belgium: "🇧🇪", Egypt: "🇪🇬", Iran: "🇮🇷", "New Zealand": "🇳🇿",
    Spain: "🇪🇸", "Cape Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", Uruguay: "🇺🇾",
    France: "🇫🇷", Senegal: "🇸🇳", Iraq: "🇮🇶", Norway: "🇳🇴",
    Argentina: "🇦🇷", Algeria: "🇩🇿", Austria: "🇦🇹", Jordan: "🇯🇴",
    Portugal: "🇵🇹", "DR Congo": "🇨🇩", Uzbekistan: "🇺🇿", Colombia: "🇨🇴",
    England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Croatia: "🇭🇷", Ghana: "🇬🇭", Panama: "🇵🇦",
  };
  return flags[team] || "🏳️";
}

export { getFlag };
