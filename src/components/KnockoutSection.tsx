"use client";

import { useState } from "react";
import { knockoutMatches, formatBDTimeShort, parseMatchTime } from "@/lib/data";
import { getFlag } from "./HeroSection";
import { Swords } from "lucide-react";

const ROUNDS = [
  "Round of 32",
  "Round of 16",
  "Quarter-final",
  "Semi-final",
  "Third place",
  "Final",
] as const;

export default function KnockoutSection() {
  const [activeRound, setActiveRound] = useState<string>("Round of 32");

  const roundMatches = knockoutMatches
    .filter((m) => m.round === activeRound)
    .sort((a, b) => parseMatchTime(a).getTime() - parseMatchTime(b).getTime());

  return (
    <section id="knockout" className="py-16 md:py-24 px-4 bg-slate-950/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-emerald-300 text-sm font-semibold mb-4">
            <Swords className="w-4 h-4" />
            <span>Knockout Stage</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Knockout Rounds</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            গ্রুপ পর্ব শেষে Round of 32 থেকে ফাইনাল পর্যন্ত সব নকআউট ম্যাচ। প্রতিটি রাউন্ডের ম্যাচগুলো সময় অনুযায়ী সাজানো।
          </p>
        </div>

        {/* Round selector */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-8 md:mb-10">
          {ROUNDS.map((round) => (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg md:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeRound === round
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30"
                  : "glass-card text-slate-300 hover:bg-white/10"
              }`}
            >
              {round}
            </button>
          ))}
        </div>

        {/* Matches grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {roundMatches.map((match) => {
            const bdTime = parseMatchTime(match);
            const isPlaceholder = match.home.startsWith("Winner") || match.home.startsWith("Runner-up") || match.home.startsWith("3rd") || match.home.startsWith("Loser");
            const isFinal = activeRound === "Final";

            return (
              <div
                key={match.id}
                className={`glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 border transition-colors ${
                  isFinal ? "md:col-span-2 border-amber-500/30" : "border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {match.round}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400">{formatBDTimeShort(bdTime)}</span>
                </div>

                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <TeamDisplay name={match.home} large={isFinal} />
                  <div className="text-center px-1 sm:px-2 flex-shrink-0">
                    {match.played ? (
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    ) : (
                      <div className={`font-black text-slate-500 ${isFinal ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
                        VS
                      </div>
                    )}
                    {isPlaceholder && (
                      <span className="text-[10px] text-amber-400 block mt-1">TBD</span>
                    )}
                  </div>
                  <TeamDisplay name={match.away} large={isFinal} />
                </div>

                <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-slate-500 text-center truncate">
                  {match.venue}, {match.city}
                </div>
              </div>
            );
          })}
        </div>

        {roundMatches.length === 0 && (
          <p className="text-center text-slate-500">No matches for this round yet.</p>
        )}
      </div>
    </section>
  );
}

function TeamDisplay({ name, large }: { name: string; large?: boolean }) {
  const flag = getFlag(name);
  const isPlaceholder = name.startsWith("Winner") || name.startsWith("Runner-up") || name.startsWith("3rd") || name.startsWith("Loser");

  return (
    <div className="flex-1 text-center min-w-0">
      <div className={`${large ? "text-4xl sm:text-6xl md:text-7xl" : "text-3xl sm:text-4xl md:text-5xl"} mb-1 sm:mb-2`}>
        {isPlaceholder ? "❓" : flag}
      </div>
      <div className={`font-semibold text-white ${large ? "text-sm sm:text-xl md:text-2xl" : "text-xs sm:text-sm md:text-base"} ${isPlaceholder ? "text-slate-400" : ""}`}>
        {name}
      </div>
    </div>
  );
}
