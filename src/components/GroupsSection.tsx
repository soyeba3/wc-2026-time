"use client";

import { useState } from "react";
import { groupMatches, GROUPS, getGroupTeams, getStandings, type Standing } from "@/lib/data";
import { getFlag } from "./HeroSection";
import { ChevronDown, Users } from "lucide-react";

export default function GroupsSection() {
  const [activeGroup, setActiveGroup] = useState<string>("A");

  const teams = getGroupTeams(activeGroup, groupMatches);
  const standings = getStandings(activeGroup, groupMatches);

  return (
    <section id="groups" className="py-16 md:py-24 px-4 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-emerald-300 text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            <span>Groups</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Group Stage</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            ১২টি গ্রুপের সব দল এবং তাদের বর্তমান পয়েন্ট টেবিল দেখুন।
          </p>
        </div>

        {/* Group selector */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
          {GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl font-bold text-base sm:text-lg transition-all duration-200 ${
                activeGroup === g
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105"
                  : "glass-card text-slate-300 hover:bg-white/10"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Active group card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-emerald-500/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Group {activeGroup}</h3>
            <span className="text-sm text-slate-400">{teams.length} teams</span>
          </div>

          {standings.length > 0 ? (
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="text-slate-400 text-[10px] sm:text-xs md:text-sm border-b border-white/10">
                    <th className="pb-2 md:pb-3 pl-1 md:pl-2">#</th>
                    <th className="pb-2 md:pb-3">Team</th>
                    <th className="pb-2 md:pb-3 text-center">P</th>
                    <th className="pb-2 md:pb-3 text-center">W</th>
                    <th className="pb-2 md:pb-3 text-center">D</th>
                    <th className="pb-2 md:pb-3 text-center">L</th>
                    <th className="pb-2 md:pb-3 text-center">GD</th>
                    <th className="pb-2 md:pb-3 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, idx) => (
                    <StandingRow key={team.team} team={team} rank={idx + 1} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {teams.map((team) => (
                <div
                  key={team}
                  className="glass-card rounded-xl p-4 text-center flex flex-col items-center gap-2 hover:bg-white/5 transition-colors"
                >
                  <span className="text-4xl">{getFlag(team)}</span>
                  <span className="text-sm font-semibold text-white">{team}</span>
                </div>
              ))}
            </div>
          )}

          {/* Quick teams grid when standings exist too */}
          {standings.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3">
              {teams.map((team) => (
                <div
                  key={team}
                  className="flex items-center gap-2 glass-card rounded-lg px-3 py-2 text-sm"
                >
                  <span>{getFlag(team)}</span>
                  <span className="text-slate-200 font-medium truncate">{team}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
            <ChevronDown className="w-4 h-4" /> Select a group above to view standings
          </p>
        </div>
      </div>
    </section>
  );
}

function StandingRow({ team, rank }: { team: Standing; rank: number }) {
  const isTop2 = rank <= 2;
  return (
    <tr className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
      <td className="py-2 md:py-3 pl-1 md:pl-2">
        <span
          className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full text-xs sm:text-sm font-bold ${
            isTop2 ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700/50 text-slate-400"
          }`}
        >
          {rank}
        </span>
      </td>
      <td className="py-2 md:py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">{getFlag(team.team)}</span>
          <span className="text-sm sm:text-base font-semibold text-white truncate max-w-[100px] sm:max-w-none">{team.team}</span>
        </div>
      </td>
      <td className="py-2 md:py-3 text-center text-slate-300 text-xs sm:text-sm">{team.played}</td>
      <td className="py-2 md:py-3 text-center text-emerald-400 text-xs sm:text-sm">{team.won}</td>
      <td className="py-2 md:py-3 text-center text-amber-400 text-xs sm:text-sm">{team.drawn}</td>
      <td className="py-2 md:py-3 text-center text-red-400 text-xs sm:text-sm">{team.lost}</td>
      <td className="py-2 md:py-3 text-center text-slate-300 text-xs sm:text-sm">
        {team.gf}:{team.ga} ({team.gd > 0 ? `+${team.gd}` : team.gd})
      </td>
      <td className="py-2 md:py-3 text-center">
        <span className="inline-block min-w-[1.75rem] md:min-w-[2rem] px-1.5 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg bg-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-bold">
          {team.points}
        </span>
      </td>
    </tr>
  );
}
