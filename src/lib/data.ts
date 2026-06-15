export interface Match {
  id: number;
  group?: string;
  round?: string;
  date: string; // e.g. "June 11, 2026"
  time: string; // e.g. "1:00 p.m."
  timezone: string; // e.g. "UTC-6"
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  city: string;
  played: boolean;
}

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

export function parseMatchTime(match: Pick<Match, "date" | "time" | "timezone">): Date {
  const [monthName, dayStr, yearStr] = match.date.replace(",", "").split(" ");
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  const month = MONTHS[monthName];

  const [timePart, meridiem] = match.time.split(" ");
  let [hours, minutes] = timePart.split(":").map((v) => parseInt(v, 10));
  if (meridiem === "p.m." && hours !== 12) hours += 12;
  if (meridiem === "a.m." && hours === 12) hours = 0;

  const offsetHours = parseInt(match.timezone.replace("UTC", ""), 10);
  // Local time + offset = UTC (UTC-6 means local is 6h behind UTC)
  const utcHours = hours - offsetHours;

  return new Date(Date.UTC(year, month, day, utcHours, minutes));
}

export function toBDTime(date: Date): Date {
  // Bangladesh Standard Time is UTC+6, no DST
  return new Date(date.getTime() + 6 * 60 * 60 * 1000);
}

export function formatBDTime(date: Date): string {
  return toBDTime(date).toLocaleString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).replace(/,/g, "") + " BST";
}

export function formatBDTimeShort(date: Date): string {
  return toBDTime(date).toLocaleString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) + " BST";
}

export function formatBDDate(date: Date): string {
  return toBDTime(date).toLocaleString("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatBDClock(date: Date): string {
  return toBDTime(date).toLocaleString("en-GB", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function parseScore(score: string | null): [number | null, number | null] {
  if (!score) return [null, null];
  const [h, a] = score.split("-").map((s) => parseInt(s.trim(), 10));
  return [isNaN(h) ? null : h, isNaN(a) ? null : a];
}

function makeMatch(
  id: number,
  group: string | undefined,
  round: string | undefined,
  date: string,
  time: string,
  timezone: string,
  home: string,
  away: string,
  score: string | null,
  venue: string,
  city: string
): Match {
  const [homeScore, awayScore] = parseScore(score);
  return {
    id,
    group,
    round,
    date,
    time,
    timezone,
    home,
    away,
    homeScore,
    awayScore,
    venue,
    city,
    played: homeScore !== null && awayScore !== null,
  };
}

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;

export const groupMatches: Match[] = [
  // Group A
  makeMatch(1, "A", undefined, "June 11, 2026", "1:00 p.m.", "UTC-6", "Mexico", "South Africa", "2-0", "Estadio Azteca", "Mexico City"),
  makeMatch(2, "A", undefined, "June 11, 2026", "8:00 p.m.", "UTC-6", "South Korea", "Czech Republic", "2-1", "Estadio Akron", "Zapopan"),
  makeMatch(25, "A", undefined, "June 18, 2026", "12:00 p.m.", "UTC-4", "Czech Republic", "South Africa", null, "Mercedes-Benz Stadium", "Atlanta"),
  makeMatch(28, "A", undefined, "June 18, 2026", "7:00 p.m.", "UTC-6", "Mexico", "South Korea", null, "Estadio Akron", "Zapopan"),
  makeMatch(53, "A", undefined, "June 24, 2026", "7:00 p.m.", "UTC-6", "Czech Republic", "Mexico", null, "Estadio Azteca", "Mexico City"),
  makeMatch(54, "A", undefined, "June 24, 2026", "7:00 p.m.", "UTC-6", "South Africa", "South Korea", null, "Estadio BBVA", "Guadalupe"),

  // Group B
  makeMatch(3, "B", undefined, "June 12, 2026", "3:00 p.m.", "UTC-4", "Canada", "Bosnia and Herzegovina", "1-1", "BMO Field", "Toronto"),
  makeMatch(4, "B", undefined, "June 13, 2026", "12:00 p.m.", "UTC-7", "Qatar", "Switzerland", "1-1", "Levi's Stadium", "Santa Clara"),
  makeMatch(26, "B", undefined, "June 18, 2026", "12:00 p.m.", "UTC-7", "Switzerland", "Bosnia and Herzegovina", null, "SoFi Stadium", "Inglewood"),
  makeMatch(27, "B", undefined, "June 18, 2026", "3:00 p.m.", "UTC-7", "Canada", "Qatar", null, "BC Place", "Vancouver"),
  makeMatch(51, "B", undefined, "June 24, 2026", "12:00 p.m.", "UTC-7", "Switzerland", "Canada", null, "BC Place", "Vancouver"),
  makeMatch(52, "B", undefined, "June 24, 2026", "12:00 p.m.", "UTC-7", "Bosnia and Herzegovina", "Qatar", null, "Lumen Field", "Seattle"),

  // Group C
  makeMatch(5, "C", undefined, "June 13, 2026", "6:00 p.m.", "UTC-4", "Brazil", "Morocco", "1-1", "MetLife Stadium", "East Rutherford"),
  makeMatch(6, "C", undefined, "June 13, 2026", "9:00 p.m.", "UTC-4", "Haiti", "Scotland", "0-1", "Gillette Stadium", "Foxborough"),
  makeMatch(30, "C", undefined, "June 19, 2026", "6:00 p.m.", "UTC-4", "Scotland", "Morocco", null, "Gillette Stadium", "Foxborough"),
  makeMatch(29, "C", undefined, "June 19, 2026", "8:30 p.m.", "UTC-4", "Brazil", "Haiti", null, "Lincoln Financial Field", "Philadelphia"),
  makeMatch(49, "C", undefined, "June 24, 2026", "6:00 p.m.", "UTC-4", "Scotland", "Brazil", null, "Hard Rock Stadium", "Miami Gardens"),
  makeMatch(50, "C", undefined, "June 24, 2026", "6:00 p.m.", "UTC-4", "Morocco", "Haiti", null, "Mercedes-Benz Stadium", "Atlanta"),

  // Group D
  makeMatch(7, "D", undefined, "June 12, 2026", "6:00 p.m.", "UTC-7", "United States", "Paraguay", "4-1", "SoFi Stadium", "Inglewood"),
  makeMatch(8, "D", undefined, "June 13, 2026", "9:00 p.m.", "UTC-7", "Australia", "Turkey", "2-0", "BC Place", "Vancouver"),
  makeMatch(32, "D", undefined, "June 19, 2026", "12:00 p.m.", "UTC-7", "United States", "Australia", null, "Lumen Field", "Seattle"),
  makeMatch(31, "D", undefined, "June 19, 2026", "8:00 p.m.", "UTC-7", "Turkey", "Paraguay", null, "Levi's Stadium", "Santa Clara"),
  makeMatch(59, "D", undefined, "June 25, 2026", "7:00 p.m.", "UTC-7", "Turkey", "United States", null, "SoFi Stadium", "Inglewood"),
  makeMatch(60, "D", undefined, "June 25, 2026", "7:00 p.m.", "UTC-7", "Paraguay", "Australia", null, "Levi's Stadium", "Santa Clara"),

  // Group E
  makeMatch(9, "E", undefined, "June 14, 2026", "12:00 p.m.", "UTC-5", "Germany", "Curaçao", "7-1", "NRG Stadium", "Houston"),
  makeMatch(10, "E", undefined, "June 14, 2026", "7:00 p.m.", "UTC-4", "Ivory Coast", "Ecuador", "1-0", "Lincoln Financial Field", "Philadelphia"),
  makeMatch(33, "E", undefined, "June 20, 2026", "4:00 p.m.", "UTC-4", "Germany", "Ivory Coast", null, "BMO Field", "Toronto"),
  makeMatch(34, "E", undefined, "June 20, 2026", "7:00 p.m.", "UTC-5", "Ecuador", "Curaçao", null, "Arrowhead Stadium", "Kansas City"),
  makeMatch(55, "E", undefined, "June 25, 2026", "4:00 p.m.", "UTC-4", "Curaçao", "Ivory Coast", null, "Lincoln Financial Field", "Philadelphia"),
  makeMatch(56, "E", undefined, "June 25, 2026", "4:00 p.m.", "UTC-4", "Ecuador", "Germany", null, "MetLife Stadium", "East Rutherford"),

  // Group F
  makeMatch(11, "F", undefined, "June 14, 2026", "3:00 p.m.", "UTC-5", "Netherlands", "Japan", "2-2", "AT&T Stadium", "Arlington"),
  makeMatch(12, "F", undefined, "June 14, 2026", "8:00 p.m.", "UTC-6", "Sweden", "Tunisia", null, "Estadio BBVA", "Guadalupe"),
  makeMatch(35, "F", undefined, "June 20, 2026", "12:00 p.m.", "UTC-5", "Netherlands", "Sweden", null, "NRG Stadium", "Houston"),
  makeMatch(36, "F", undefined, "June 20, 2026", "10:00 p.m.", "UTC-6", "Tunisia", "Japan", null, "Estadio BBVA", "Guadalupe"),
  makeMatch(57, "F", undefined, "June 25, 2026", "6:00 p.m.", "UTC-5", "Japan", "Sweden", null, "AT&T Stadium", "Arlington"),
  makeMatch(58, "F", undefined, "June 25, 2026", "6:00 p.m.", "UTC-5", "Tunisia", "Netherlands", null, "Arrowhead Stadium", "Kansas City"),

  // Group G
  makeMatch(16, "G", undefined, "June 15, 2026", "12:00 p.m.", "UTC-7", "Belgium", "Egypt", null, "Lumen Field", "Seattle"),
  makeMatch(15, "G", undefined, "June 15, 2026", "6:00 p.m.", "UTC-7", "Iran", "New Zealand", null, "SoFi Stadium", "Inglewood"),
  makeMatch(39, "G", undefined, "June 21, 2026", "12:00 p.m.", "UTC-7", "Belgium", "Iran", null, "SoFi Stadium", "Inglewood"),
  makeMatch(40, "G", undefined, "June 21, 2026", "6:00 p.m.", "UTC-7", "New Zealand", "Egypt", null, "BC Place", "Vancouver"),
  makeMatch(63, "G", undefined, "June 26, 2026", "8:00 p.m.", "UTC-7", "Egypt", "Iran", null, "Lumen Field", "Seattle"),
  makeMatch(64, "G", undefined, "June 26, 2026", "8:00 p.m.", "UTC-7", "New Zealand", "Belgium", null, "BC Place", "Vancouver"),

  // Group H
  makeMatch(14, "H", undefined, "June 15, 2026", "12:00 p.m.", "UTC-4", "Spain", "Cape Verde", null, "Mercedes-Benz Stadium", "Atlanta"),
  makeMatch(13, "H", undefined, "June 15, 2026", "6:00 p.m.", "UTC-4", "Saudi Arabia", "Uruguay", null, "Hard Rock Stadium", "Miami Gardens"),
  makeMatch(38, "H", undefined, "June 21, 2026", "12:00 p.m.", "UTC-4", "Spain", "Saudi Arabia", null, "Mercedes-Benz Stadium", "Atlanta"),
  makeMatch(37, "H", undefined, "June 21, 2026", "6:00 p.m.", "UTC-4", "Uruguay", "Cape Verde", null, "Hard Rock Stadium", "Miami Gardens"),
  makeMatch(65, "H", undefined, "June 26, 2026", "7:00 p.m.", "UTC-5", "Cape Verde", "Saudi Arabia", null, "NRG Stadium", "Houston"),
  makeMatch(66, "H", undefined, "June 26, 2026", "6:00 p.m.", "UTC-6", "Uruguay", "Spain", null, "Estadio Akron", "Zapopan"),

  // Group I
  makeMatch(17, "I", undefined, "June 16, 2026", "3:00 p.m.", "UTC-4", "France", "Senegal", null, "MetLife Stadium", "East Rutherford"),
  makeMatch(18, "I", undefined, "June 16, 2026", "6:00 p.m.", "UTC-4", "Iraq", "Norway", null, "Gillette Stadium", "Foxborough"),
  makeMatch(42, "I", undefined, "June 22, 2026", "5:00 p.m.", "UTC-4", "France", "Iraq", null, "Lincoln Financial Field", "Philadelphia"),
  makeMatch(41, "I", undefined, "June 22, 2026", "8:00 p.m.", "UTC-4", "Norway", "Senegal", null, "MetLife Stadium", "East Rutherford"),
  makeMatch(61, "I", undefined, "June 26, 2026", "3:00 p.m.", "UTC-4", "Norway", "France", null, "Gillette Stadium", "Foxborough"),
  makeMatch(62, "I", undefined, "June 26, 2026", "3:00 p.m.", "UTC-4", "Senegal", "Iraq", null, "BMO Field", "Toronto"),

  // Group J
  makeMatch(19, "J", undefined, "June 16, 2026", "8:00 p.m.", "UTC-5", "Argentina", "Algeria", null, "Arrowhead Stadium", "Kansas City"),
  makeMatch(20, "J", undefined, "June 16, 2026", "9:00 p.m.", "UTC-7", "Austria", "Jordan", null, "Levi's Stadium", "Santa Clara"),
  makeMatch(43, "J", undefined, "June 22, 2026", "12:00 p.m.", "UTC-5", "Argentina", "Austria", null, "AT&T Stadium", "Arlington"),
  makeMatch(44, "J", undefined, "June 22, 2026", "8:00 p.m.", "UTC-7", "Jordan", "Algeria", null, "Levi's Stadium", "Santa Clara"),
  makeMatch(69, "J", undefined, "June 27, 2026", "9:00 p.m.", "UTC-5", "Algeria", "Austria", null, "Arrowhead Stadium", "Kansas City"),
  makeMatch(70, "J", undefined, "June 27, 2026", "9:00 p.m.", "UTC-5", "Jordan", "Argentina", null, "AT&T Stadium", "Arlington"),

  // Group K
  makeMatch(23, "K", undefined, "June 17, 2026", "12:00 p.m.", "UTC-5", "Portugal", "DR Congo", null, "NRG Stadium", "Houston"),
  makeMatch(24, "K", undefined, "June 17, 2026", "8:00 p.m.", "UTC-6", "Uzbekistan", "Colombia", null, "Estadio Azteca", "Mexico City"),
  makeMatch(47, "K", undefined, "June 23, 2026", "12:00 p.m.", "UTC-5", "Portugal", "Uzbekistan", null, "NRG Stadium", "Houston"),
  makeMatch(48, "K", undefined, "June 23, 2026", "8:00 p.m.", "UTC-6", "Colombia", "DR Congo", null, "Estadio Akron", "Zapopan"),
  makeMatch(71, "K", undefined, "June 27, 2026", "7:30 p.m.", "UTC-4", "Colombia", "Portugal", null, "Hard Rock Stadium", "Miami Gardens"),
  makeMatch(72, "K", undefined, "June 27, 2026", "7:30 p.m.", "UTC-4", "DR Congo", "Uzbekistan", null, "Mercedes-Benz Stadium", "Atlanta"),

  // Group L
  makeMatch(22, "L", undefined, "June 17, 2026", "3:00 p.m.", "UTC-5", "England", "Croatia", null, "AT&T Stadium", "Arlington"),
  makeMatch(21, "L", undefined, "June 17, 2026", "7:00 p.m.", "UTC-4", "Ghana", "Panama", null, "BMO Field", "Toronto"),
  makeMatch(45, "L", undefined, "June 23, 2026", "4:00 p.m.", "UTC-4", "England", "Ghana", null, "Gillette Stadium", "Foxborough"),
  makeMatch(46, "L", undefined, "June 23, 2026", "7:00 p.m.", "UTC-4", "Panama", "Croatia", null, "BMO Field", "Toronto"),
  makeMatch(67, "L", undefined, "June 27, 2026", "5:00 p.m.", "UTC-4", "Panama", "England", null, "MetLife Stadium", "East Rutherford"),
  makeMatch(68, "L", undefined, "June 27, 2026", "5:00 p.m.", "UTC-4", "Croatia", "Ghana", null, "Lincoln Financial Field", "Philadelphia"),
];

export const knockoutMatches: Match[] = [
  // Round of 32
  makeMatch(73, undefined, "Round of 32", "June 28, 2026", "12:00 p.m.", "UTC-7", "Runner-up Group A", "Runner-up Group B", null, "SoFi Stadium", "Inglewood"),
  makeMatch(76, undefined, "Round of 32", "June 29, 2026", "12:00 p.m.", "UTC-5", "Winner Group C", "Runner-up Group F", null, "NRG Stadium", "Houston"),
  makeMatch(74, undefined, "Round of 32", "June 29, 2026", "4:30 p.m.", "UTC-4", "Winner Group E", "3rd Group A/B/C/D/F", null, "Gillette Stadium", "Foxborough"),
  makeMatch(75, undefined, "Round of 32", "June 29, 2026", "7:00 p.m.", "UTC-6", "Winner Group F", "Runner-up Group C", null, "Estadio BBVA", "Guadalupe"),
  makeMatch(78, undefined, "Round of 32", "June 30, 2026", "12:00 p.m.", "UTC-5", "Runner-up Group E", "Runner-up Group I", null, "AT&T Stadium", "Arlington"),
  makeMatch(77, undefined, "Round of 32", "June 30, 2026", "5:00 p.m.", "UTC-4", "Winner Group I", "3rd Group C/D/F/G/H", null, "MetLife Stadium", "East Rutherford"),
  makeMatch(79, undefined, "Round of 32", "June 30, 2026", "7:00 p.m.", "UTC-6", "Winner Group A", "3rd Group C/E/F/H/I", null, "Estadio Azteca", "Mexico City"),
  makeMatch(80, undefined, "Round of 32", "July 1, 2026", "12:00 p.m.", "UTC-4", "Winner Group L", "3rd Group E/H/I/J/K", null, "Mercedes-Benz Stadium", "Atlanta"),
  makeMatch(82, undefined, "Round of 32", "July 1, 2026", "1:00 p.m.", "UTC-7", "Winner Group G", "3rd Group A/E/H/I/J", null, "Lumen Field", "Seattle"),
  makeMatch(81, undefined, "Round of 32", "July 1, 2026", "5:00 p.m.", "UTC-7", "Winner Group D", "3rd Group B/E/F/I/J", null, "Levi's Stadium", "Santa Clara"),
  makeMatch(84, undefined, "Round of 32", "July 2, 2026", "12:00 p.m.", "UTC-7", "Winner Group H", "Runner-up Group J", null, "SoFi Stadium", "Inglewood"),
  makeMatch(83, undefined, "Round of 32", "July 2, 2026", "7:00 p.m.", "UTC-4", "Runner-up Group K", "Runner-up Group L", null, "BMO Field", "Toronto"),
  makeMatch(85, undefined, "Round of 32", "July 2, 2026", "8:00 p.m.", "UTC-7", "Winner Group B", "3rd Group E/F/G/I/J", null, "BC Place", "Vancouver"),
  makeMatch(88, undefined, "Round of 32", "July 3, 2026", "1:00 p.m.", "UTC-5", "Runner-up Group D", "Runner-up Group G", null, "AT&T Stadium", "Arlington"),
  makeMatch(86, undefined, "Round of 32", "July 3, 2026", "6:00 p.m.", "UTC-4", "Winner Group J", "Runner-up Group H", null, "Hard Rock Stadium", "Miami Gardens"),
  makeMatch(87, undefined, "Round of 32", "July 3, 2026", "8:30 p.m.", "UTC-5", "Winner Group K", "3rd Group D/E/I/J/L", null, "Arrowhead Stadium", "Kansas City"),

  // Round of 16
  makeMatch(90, undefined, "Round of 16", "July 4, 2026", "12:00 p.m.", "UTC-5", "Winner Match 73", "Winner Match 75", null, "NRG Stadium", "Houston"),
  makeMatch(89, undefined, "Round of 16", "July 4, 2026", "5:00 p.m.", "UTC-4", "Winner Match 74", "Winner Match 77", null, "Lincoln Financial Field", "Philadelphia"),
  makeMatch(91, undefined, "Round of 16", "July 5, 2026", "4:00 p.m.", "UTC-4", "Winner Match 76", "Winner Match 78", null, "MetLife Stadium", "East Rutherford"),
  makeMatch(92, undefined, "Round of 16", "July 5, 2026", "6:00 p.m.", "UTC-6", "Winner Match 79", "Winner Match 80", null, "Estadio Azteca", "Mexico City"),
  makeMatch(93, undefined, "Round of 16", "July 6, 2026", "2:00 p.m.", "UTC-5", "Winner Match 83", "Winner Match 84", null, "AT&T Stadium", "Arlington"),
  makeMatch(94, undefined, "Round of 16", "July 6, 2026", "5:00 p.m.", "UTC-7", "Winner Match 81", "Winner Match 82", null, "Lumen Field", "Seattle"),
  makeMatch(95, undefined, "Round of 16", "July 7, 2026", "12:00 p.m.", "UTC-4", "Winner Match 86", "Winner Match 88", null, "Mercedes-Benz Stadium", "Atlanta"),
  makeMatch(96, undefined, "Round of 16", "July 7, 2026", "1:00 p.m.", "UTC-7", "Winner Match 85", "Winner Match 87", null, "BC Place", "Vancouver"),

  // Quarter-finals
  makeMatch(97, undefined, "Quarter-final", "July 9, 2026", "4:00 p.m.", "UTC-4", "Winner Match 89", "Winner Match 90", null, "Gillette Stadium", "Foxborough"),
  makeMatch(98, undefined, "Quarter-final", "July 10, 2026", "12:00 p.m.", "UTC-7", "Winner Match 93", "Winner Match 94", null, "SoFi Stadium", "Inglewood"),
  makeMatch(99, undefined, "Quarter-final", "July 11, 2026", "5:00 p.m.", "UTC-4", "Winner Match 91", "Winner Match 92", null, "Hard Rock Stadium", "Miami Gardens"),
  makeMatch(100, undefined, "Quarter-final", "July 11, 2026", "8:00 p.m.", "UTC-5", "Winner Match 95", "Winner Match 96", null, "Arrowhead Stadium", "Kansas City"),

  // Semi-finals
  makeMatch(101, undefined, "Semi-final", "July 14, 2026", "2:00 p.m.", "UTC-5", "Winner Match 97", "Winner Match 98", null, "AT&T Stadium", "Arlington"),
  makeMatch(102, undefined, "Semi-final", "July 15, 2026", "3:00 p.m.", "UTC-4", "Winner Match 99", "Winner Match 100", null, "Mercedes-Benz Stadium", "Atlanta"),

  // Third place
  makeMatch(103, undefined, "Third place", "July 18, 2026", "5:00 p.m.", "UTC-4", "Loser Match 101", "Loser Match 102", null, "Hard Rock Stadium", "Miami Gardens"),

  // Final
  makeMatch(104, undefined, "Final", "July 19, 2026", "3:00 p.m.", "UTC-4", "Winner Match 101", "Winner Match 102", null, "MetLife Stadium", "East Rutherford"),
];

export interface Standing {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export function getStandings(group: string, matches: Match[]): Standing[] {
  const teams = new Map<string, Standing>();

  matches
    .filter((m) => m.group === group && m.played)
    .forEach((m) => {
      if (!teams.has(m.home)) {
        teams.set(m.home, { team: m.home, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 });
      }
      if (!teams.has(m.away)) {
        teams.set(m.away, { team: m.away, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 });
      }

      const home = teams.get(m.home)!;
      const away = teams.get(m.away)!;
      const hs = m.homeScore ?? 0;
      const as = m.awayScore ?? 0;

      home.played++;
      away.played++;
      home.gf += hs;
      home.ga += as;
      away.gf += as;
      away.ga += hs;

      if (hs > as) {
        home.won++;
        home.points += 3;
        away.lost++;
      } else if (as > hs) {
        away.won++;
        away.points += 3;
        home.lost++;
      } else {
        home.drawn++;
        away.drawn++;
        home.points += 1;
        away.points += 1;
      }
    });

  const result = Array.from(teams.values());
  result.forEach((t) => {
    t.gd = t.gf - t.ga;
  });

  return result.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
}

export function getGroupTeams(group: string, matches: Match[]): string[] {
  const teams = new Set<string>();
  matches.filter((m) => m.group === group).forEach((m) => {
    teams.add(m.home);
    teams.add(m.away);
  });
  return Array.from(teams);
}

export const allMatches: Match[] = [...groupMatches, ...knockoutMatches];
