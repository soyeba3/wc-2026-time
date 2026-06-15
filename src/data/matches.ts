export interface Team {
  name: string;
  code: string;
  flag: string;
}

export interface Group {
  name: string;
  teams: Team[];
}

export interface Match {
  id: string;
  stage: string;
  team1: Team;
  team2: Team;
  date: string;
  venue: string;
  city: string;
  score1?: number;
  score2?: number;
  status: 'scheduled' | 'live' | 'completed';
}

export const TEAMS: Record<string, Team[]> = {
  'Group A': [
    { name: 'Mexico', code: 'MEX', flag: '🇲🇽' },
    { name: 'South Africa', code: 'RSA', flag: '🇿🇦' },
    { name: 'South Korea', code: 'KOR', flag: '🇰🇷' },
    { name: 'Czechia', code: 'CZE', flag: '🇨🇿' }
  ],
  'Group B': [
    { name: 'Canada', code: 'CAN', flag: '🇨🇦' },
    { name: 'Bosnia', code: 'BIH', flag: '🇧🇦' },
    { name: 'Qatar', code: 'QAT', flag: '🇶🇦' },
    { name: 'Switzerland', code: 'SUI', flag: '🇨🇭' }
  ],
  'Group C': [
    { name: 'Brazil', code: 'BRA', flag: '🇧🇷' },
    { name: 'Morocco', code: 'MAR', flag: '🇲🇦' },
    { name: 'Haiti', code: 'HAI', flag: '🇭🇹' },
    { name: 'Scotland', code: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' }
  ],
  'Group D': [
    { name: 'United States', code: 'USA', flag: '🇺🇸' },
    { name: 'Paraguay', code: 'PAR', flag: '🇵🇾' },
    { name: 'Australia', code: 'AUS', flag: '🇦🇺' },
    { name: 'Türkiye', code: 'TUR', flag: '🇹🇷' }
  ],
  'Group E': [
    { name: 'Germany', code: 'GER', flag: '🇩🇪' },
    { name: 'Curaçao', code: 'CUW', flag: '🇨🇼' },
    { name: 'Ivory Coast', code: 'CIV', flag: '🇨🇮' },
    { name: 'Ecuador', code: 'ECU', flag: '🇪🇨' }
  ],
  'Group F': [
    { name: 'Netherlands', code: 'NED', flag: '🇳🇱' },
    { name: 'Japan', code: 'JPN', flag: '🇯🇵' },
    { name: 'Sweden', code: 'SWE', flag: '🇸🇪' },
    { name: 'Tunisia', code: 'TUN', flag: '🇹🇳' }
  ],
  'Group G': [
    { name: 'Belgium', code: 'BEL', flag: '🇧🇪' },
    { name: 'Egypt', code: 'EGY', flag: '🇪🇬' },
    { name: 'Iran', code: 'IRN', flag: '🇮🇷' },
    { name: 'New Zealand', code: 'NZL', flag: '🇳🇿' }
  ],
  'Group H': [
    { name: 'Spain', code: 'ESP', flag: '🇪🇸' },
    { name: 'Cape Verde', code: 'CPV', flag: '🇨🇻' },
    { name: 'Saudi Arabia', code: 'KSA', flag: '🇸🇦' },
    { name: 'Uruguay', code: 'URU', flag: '🇺🇾' }
  ],
  'Group I': [
    { name: 'France', code: 'FRA', flag: '🇫🇷' },
    { name: 'Senegal', code: 'SEN', flag: '🇸🇳' },
    { name: 'Iraq', code: 'IRQ', flag: '🇮🇶' },
    { name: 'Norway', code: 'NOR', flag: '🇳🇴' }
  ],
  'Group J': [
    { name: 'Argentina', code: 'ARG', flag: '🇦🇷' },
    { name: 'Algeria', code: 'ALG', flag: '🇩🇿' },
    { name: 'Chile', code: 'CHI', flag: '🇨🇱' },
    { name: 'Ukraine', code: 'UKR', flag: '🇺🇦' }
  ],
  'Group K': [
    { name: 'Italy', code: 'ITA', flag: '🇮🇹' },
    { name: 'Cameroon', code: 'CMR', flag: '🇨🇲' },
    { name: 'Colombia', code: 'COL', flag: '🇨🇴' },
    { name: 'Poland', code: 'POL', flag: '🇵🇱' }
  ],
  'Group L': [
    { name: 'England', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'Croatia', code: 'CRO', flag: '🇭🇷' },
    { name: 'Ghana', code: 'GHA', flag: '🇬🇭' },
    { name: 'Panama', code: 'PAN', flag: '🇵🇦' }
  ]
};

const VENUES = [
  { stadium: 'Estadio Azteca', city: 'Mexico City' },
  { stadium: 'MetLife Stadium', city: 'New York/New Jersey' },
  { stadium: 'SoFi Stadium', city: 'Los Angeles' },
  { stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { stadium: 'Gillette Stadium', city: 'Boston' },
  { stadium: 'AT&T Stadium', city: 'Dallas' },
  { stadium: 'Hard Rock Stadium', city: 'Miami' },
  { stadium: 'BC Place', city: 'Vancouver' },
  { stadium: 'BMO Field', city: 'Toronto' },
  { stadium: 'Estadio BBVA', city: 'Monterrey' },
  { stadium: 'Estadio Akron', city: 'Guadalajara' },
  { stadium: 'Lumen Field', city: 'Seattle' },
  { stadium: 'Levi’s Stadium', city: 'San Francisco' },
  { stadium: 'Arrowhead Stadium', city: 'Kansas City' },
  { stadium: 'NRG Stadium', city: 'Houston' },
  { stadium: 'Lincoln Financial Field', city: 'Philadelphia' }
];

function getDeterministicScore(team1: string, team2: string, matchIndex: number): [number, number] {
  const hash = team1.charCodeAt(0) + team2.charCodeAt(0) + matchIndex;
  const score1 = hash % 4;
  let score2 = (hash >> 1) % 3;
  if (score1 === score2 && (hash % 5) === 0) {
    score2 = (score2 + 1) % 4;
  }
  return [score1, score2];
}

export function generateGroupMatches(currentTimeStr: string): Match[] {
  const matches: Match[] = [];
  const groups = Object.keys(TEAMS);
  const startDate = new Date('2026-06-11T12:00:00Z');
  const now = new Date(currentTimeStr);

  let matchIndex = 1;

  for (let g = 0; g < groups.length; g++) {
    const groupName = groups[g];
    const teams = TEAMS[groupName];
    const pairings = [
      [0, 1], [2, 3],
      [0, 2], [1, 3],
      [3, 0], [1, 2]
    ];

    for (let p = 0; p < pairings.length; p++) {
      const idx1 = pairings[p][0];
      const idx2 = pairings[p][1];
      const t1 = teams[idx1];
      const t2 = teams[idx2];

      const daysOffset = Math.floor((g * 6 + p) / 4);
      const hourOffset = ((g * 6 + p) % 4) * 3;
      const matchDate = new Date(startDate.getTime());
      matchDate.setUTCDate(startDate.getUTCDate() + daysOffset);
      matchDate.setUTCHours(startDate.getUTCHours() + hourOffset);

      const matchDateIso = matchDate.toISOString();
      const matchTime = matchDate.getTime();
      const nowTime = now.getTime();

      let status: 'scheduled' | 'live' | 'completed' = 'scheduled';
      let score1: number | undefined;
      let score2: number | undefined;

      if (nowTime >= matchTime + 7200000) {
        status = 'completed';
        const scores = getDeterministicScore(t1.name, t2.name, matchIndex);
        score1 = scores[0];
        score2 = scores[1];
      } else if (nowTime >= matchTime && nowTime < matchTime + 7200000) {
        status = 'live';
        const scores = getDeterministicScore(t1.name, t2.name, matchIndex);
        score1 = Math.floor((nowTime - matchTime) / 3600000) >= 1 ? scores[0] : Math.max(0, scores[0] - 1);
        score2 = Math.floor((nowTime - matchTime) / 3600000) >= 1 ? scores[1] : Math.max(0, scores[1] - 1);
      }

      const venueIdx = (g * 6 + p) % VENUES.length;
      const venue = VENUES[venueIdx];

      matches.push({
        id: `G-${groupName.replace('Group ', '')}-${p + 1}`,
        stage: groupName,
        team1: t1,
        team2: t2,
        date: matchDateIso,
        venue: venue.stadium,
        city: venue.city,
        score1,
        score2,
        status
      });

      matchIndex++;
    }
  }

  return matches;
}

export interface StandingsEntry {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export function calculateStandings(matches: Match[]): Record<string, StandingsEntry[]> {
  const standings: Record<string, StandingsEntry[]> = {};

  const groups = Object.keys(TEAMS);
  for (const groupName of groups) {
    standings[groupName] = TEAMS[groupName].map((t) => ({
      team: t,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    }));
  }

  for (const match of matches) {
    if (match.status !== 'completed' && match.status !== 'live') {
      continue;
    }

    const grp = match.stage;
    const list = standings[grp];
    if (list === undefined) {
      continue;
    }

    const t1Entry = list.find((e) => e.team.code === match.team1.code);
    const t2Entry = list.find((e) => e.team.code === match.team2.code);

    if (t1Entry === undefined || t2Entry === undefined) {
      continue;
    }

    const s1 = match.score1 ?? 0;
    const s2 = match.score2 ?? 0;

    t1Entry.played += 1;
    t2Entry.played += 1;
    t1Entry.goalsFor += s1;
    t1Entry.goalsAgainst += s2;
    t2Entry.goalsFor += s2;
    t2Entry.goalsAgainst += s1;

    if (s1 > s2) {
      t1Entry.won += 1;
      t1Entry.points += 3;
      t2Entry.lost += 1;
    } else if (s1 < s2) {
      t2Entry.won += 1;
      t2Entry.points += 3;
      t1Entry.lost += 1;
    } else {
      t1Entry.drawn += 1;
      t1Entry.points += 1;
      t2Entry.drawn += 1;
      t2Entry.points += 1;
    }
  }

  for (const groupName of groups) {
    const list = standings[groupName];
    for (const entry of list) {
      entry.goalDifference = entry.goalsFor - entry.goalsAgainst;
    }

    list.sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      if (a.goalDifference !== b.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }
      return b.goalsFor - a.goalsFor;
    });
  }

  return standings;
}

export function getRankedThirdPlaces(standings: Record<string, StandingsEntry[]>): StandingsEntry[] {
  const thirds: StandingsEntry[] = [];
  const groups = Object.keys(standings);
  for (const grp of groups) {
    const list = standings[grp];
    if (list.length >= 3) {
      thirds.push(list[2]);
    }
  }

  thirds.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    if (a.goalDifference !== b.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    return b.goalsFor - a.goalsFor;
  });

  return thirds;
}

export function generateKnockoutMatches(groupMatches: Match[], currentTimeStr: string): Match[] {
  const standings = calculateStandings(groupMatches);
  const thirds = getRankedThirdPlaces(standings);
  const top8Thirds = thirds.slice(0, 8);
  const now = new Date(currentTimeStr);

  const getTeam = (source: string): Team => {
    const parts = source.split('-');
    if (parts.length === 2) {
      const rank = parts[0];
      const grpLetter = parts[1];
      const grpName = `Group ${grpLetter}`;
      const list = standings[grpName];
      if (list !== undefined) {
        const idx = rank === '1st' ? 0 : 1;
        const entry = list[idx];
        if (entry !== undefined) {
          return entry.team;
        }
      }
    } else if (source.startsWith('3rd')) {
      const idxStr = source.replace('3rd-', '');
      const idx = parseInt(idxStr, 10) - 1;
      const entry = top8Thirds[idx];
      if (entry !== undefined) {
        return entry.team;
      }
    }
    return { name: source, code: source.replace(' ', '').substring(0, 3).toUpperCase(), flag: '🏳️' };
  };

  const r32Pairings = [
    { id: 'K32-1', t1: '1st-A', t2: '3rd-1', date: '2026-06-28T18:00:00Z', venue: 'SoFi Stadium', city: 'Los Angeles' },
    { id: 'K32-2', t1: '2nd-A', t2: '2nd-B', date: '2026-06-28T21:00:00Z', venue: 'MetLife Stadium', city: 'New York' },
    { id: 'K32-3', t1: '1st-B', t2: '3rd-2', date: '2026-06-29T18:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
    { id: 'K32-4', t1: '1st-C', t2: '3rd-3', date: '2026-06-29T21:00:00Z', venue: 'Hard Rock Stadium', city: 'Miami' },
    { id: 'K32-5', t1: '2nd-C', t2: '2nd-D', date: '2026-06-30T18:00:00Z', venue: 'Gillette Stadium', city: 'Boston' },
    { id: 'K32-6', t1: '1st-D', t2: '3rd-4', date: '2026-06-30T21:00:00Z', venue: 'AT&T Stadium', city: 'Dallas' },
    { id: 'K32-7', t1: '1st-E', t2: '3rd-5', date: '2026-07-01T18:00:00Z', venue: 'Lumen Field', city: 'Seattle' },
    { id: 'K32-8', t1: '2nd-E', t2: '2nd-F', date: '2026-07-01T21:00:00Z', venue: 'Levi’s Stadium', city: 'San Francisco' },
    { id: 'K32-9', t1: '1st-F', t2: '3rd-6', date: '2026-07-02T18:00:00Z', venue: 'Arrowhead Stadium', city: 'Kansas City' },
    { id: 'K32-10', t1: '1st-G', t2: '3rd-7', date: '2026-07-02T21:00:00Z', venue: 'NRG Stadium', city: 'Houston' },
    { id: 'K32-11', t1: '2nd-G', t2: '2nd-H', date: '2026-07-03T18:00:00Z', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
    { id: 'K32-12', t1: '1st-H', t2: '3rd-8', date: '2026-07-03T21:00:00Z', venue: 'Estadio Azteca', city: 'Mexico City' },
    { id: 'K32-13', t1: '1st-I', t2: '2nd-J', date: '2026-07-04T18:00:00Z', venue: 'BC Place', city: 'Vancouver' },
    { id: 'K32-14', t1: '1st-J', t2: '2nd-I', date: '2026-07-04T21:00:00Z', venue: 'BMO Field', city: 'Toronto' },
    { id: 'K32-15', t1: '1st-K', t2: '2nd-L', date: '2026-07-05T18:00:00Z', venue: 'Estadio BBVA', city: 'Monterrey' },
    { id: 'K32-16', t1: '1st-L', t2: '2nd-K', date: '2026-07-05T21:00:00Z', venue: 'Estadio Akron', city: 'Guadalajara' }
  ];

  const r32Matches: Match[] = [];
  for (let i = 0; i < r32Pairings.length; i++) {
    const p = r32Pairings[i];
    const team1 = getTeam(p.t1);
    const team2 = getTeam(p.t2);
    const matchTime = new Date(p.date).getTime();
    const nowTime = now.getTime();

    let status: 'scheduled' | 'live' | 'completed' = 'scheduled';
    let score1: number | undefined;
    let score2: number | undefined;

    if (nowTime >= matchTime + 7200000) {
      status = 'completed';
      const scores = getDeterministicScore(team1.name, team2.name, i + 100);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    } else if (nowTime >= matchTime && nowTime < matchTime + 7200000) {
      status = 'live';
      const scores = getDeterministicScore(team1.name, team2.name, i + 100);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    }

    r32Matches.push({
      id: p.id,
      stage: 'Round of 32',
      team1,
      team2,
      date: p.date,
      venue: p.venue,
      city: p.city,
      score1,
      score2,
      status
    });
  }

  const getKnockoutWinner = (matchList: Match[], id: string, defaultName: string): Team => {
    const m = matchList.find((match) => match.id === id);
    if (m !== undefined && m.status === 'completed' && m.score1 !== undefined && m.score2 !== undefined) {
      return m.score1 > m.score2 ? m.team1 : m.team2;
    }
    return { name: defaultName, code: defaultName.replace(' ', '').substring(0, 3).toUpperCase(), flag: '🏳️' };
  };

  const r16Pairings = [
    { id: 'K16-1', m1: 'K32-1', m2: 'K32-2', date: '2026-07-06T18:00:00Z', venue: 'SoFi Stadium', city: 'Los Angeles' },
    { id: 'K16-2', m1: 'K32-3', m2: 'K32-4', date: '2026-07-06T21:00:00Z', venue: 'MetLife Stadium', city: 'New York' },
    { id: 'K16-3', m1: 'K32-5', m2: 'K32-6', date: '2026-07-07T18:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
    { id: 'K16-4', m1: 'K32-7', m2: 'K32-8', date: '2026-07-07T21:00:00Z', venue: 'Hard Rock Stadium', city: 'Miami' },
    { id: 'K16-5', m1: 'K32-9', m2: 'K32-10', date: '2026-07-08T18:00:00Z', venue: 'Gillette Stadium', city: 'Boston' },
    { id: 'K16-6', m1: 'K32-11', m2: 'K32-12', date: '2026-07-08T21:00:00Z', venue: 'AT&T Stadium', city: 'Dallas' },
    { id: 'K16-7', m1: 'K32-13', m2: 'K32-14', date: '2026-07-09T18:00:00Z', venue: 'Lumen Field', city: 'Seattle' },
    { id: 'K16-8', m1: 'K32-15', m2: 'K32-16', date: '2026-07-09T21:00:00Z', venue: 'Levi’s Stadium', city: 'San Francisco' }
  ];

  const r16Matches: Match[] = [];
  for (let i = 0; i < r16Pairings.length; i++) {
    const p = r16Pairings[i];
    const team1 = getKnockoutWinner(r32Matches, p.m1, `Winner ${p.m1}`);
    const team2 = getKnockoutWinner(r32Matches, p.m2, `Winner ${p.m2}`);
    const matchTime = new Date(p.date).getTime();
    const nowTime = now.getTime();

    let status: 'scheduled' | 'live' | 'completed' = 'scheduled';
    let score1: number | undefined;
    let score2: number | undefined;

    if (nowTime >= matchTime + 7200000) {
      status = 'completed';
      const scores = getDeterministicScore(team1.name, team2.name, i + 200);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    } else if (nowTime >= matchTime && nowTime < matchTime + 7200000) {
      status = 'live';
      const scores = getDeterministicScore(team1.name, team2.name, i + 200);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    }

    r16Matches.push({
      id: p.id,
      stage: 'Round of 16',
      team1,
      team2,
      date: p.date,
      venue: p.venue,
      city: p.city,
      score1,
      score2,
      status
    });
  }

  const qfPairings = [
    { id: 'QF-1', m1: 'K16-1', m2: 'K16-2', date: '2026-07-11T18:00:00Z', venue: 'Arrowhead Stadium', city: 'Kansas City' },
    { id: 'QF-2', m1: 'K16-3', m2: 'K16-4', date: '2026-07-11T21:00:00Z', venue: 'NRG Stadium', city: 'Houston' },
    { id: 'QF-3', m1: 'K16-5', m2: 'K16-6', date: '2026-07-12T18:00:00Z', venue: 'Lincoln Financial Field', city: 'Philadelphia' },
    { id: 'QF-4', m1: 'K16-7', m2: 'K16-8', date: '2026-07-12T21:00:00Z', venue: 'Estadio Azteca', city: 'Mexico City' }
  ];

  const qfMatches: Match[] = [];
  for (let i = 0; i < qfPairings.length; i++) {
    const p = qfPairings[i];
    const team1 = getKnockoutWinner(r16Matches, p.m1, `Winner ${p.m1}`);
    const team2 = getKnockoutWinner(r16Matches, p.m2, `Winner ${p.m2}`);
    const matchTime = new Date(p.date).getTime();
    const nowTime = now.getTime();

    let status: 'scheduled' | 'live' | 'completed' = 'scheduled';
    let score1: number | undefined;
    let score2: number | undefined;

    if (nowTime >= matchTime + 7200000) {
      status = 'completed';
      const scores = getDeterministicScore(team1.name, team2.name, i + 300);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    } else if (nowTime >= matchTime && nowTime < matchTime + 7200000) {
      status = 'live';
      const scores = getDeterministicScore(team1.name, team2.name, i + 300);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    }

    qfMatches.push({
      id: p.id,
      stage: 'Quarter-finals',
      team1,
      team2,
      date: p.date,
      venue: p.venue,
      city: p.city,
      score1,
      score2,
      status
    });
  }

  const sfPairings = [
    { id: 'SF-1', m1: 'QF-1', m2: 'QF-2', date: '2026-07-15T18:00:00Z', venue: 'SoFi Stadium', city: 'Los Angeles' },
    { id: 'SF-2', m1: 'QF-3', m2: 'QF-4', date: '2026-07-16T18:00:00Z', venue: 'MetLife Stadium', city: 'New York' }
  ];

  const sfMatches: Match[] = [];
  for (let i = 0; i < sfPairings.length; i++) {
    const p = sfPairings[i];
    const team1 = getKnockoutWinner(qfMatches, p.m1, `Winner ${p.m1}`);
    const team2 = getKnockoutWinner(qfMatches, p.m2, `Winner ${p.m2}`);
    const matchTime = new Date(p.date).getTime();
    const nowTime = now.getTime();

    let status: 'scheduled' | 'live' | 'completed' = 'scheduled';
    let score1: number | undefined;
    let score2: number | undefined;

    if (nowTime >= matchTime + 7200000) {
      status = 'completed';
      const scores = getDeterministicScore(team1.name, team2.name, i + 400);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    } else if (nowTime >= matchTime && nowTime < matchTime + 7200000) {
      status = 'live';
      const scores = getDeterministicScore(team1.name, team2.name, i + 400);
      score1 = scores[0];
      score2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
    }

    sfMatches.push({
      id: p.id,
      stage: 'Semi-finals',
      team1,
      team2,
      date: p.date,
      venue: p.venue,
      city: p.city,
      score1,
      score2,
      status
    });
  }

  const getKnockoutLoser = (matchList: Match[], id: string, defaultName: string): Team => {
    const m = matchList.find((match) => match.id === id);
    if (m !== undefined && m.status === 'completed' && m.score1 !== undefined && m.score2 !== undefined) {
      return m.score1 < m.score2 ? m.team1 : m.team2;
    }
    return { name: defaultName, code: defaultName.replace(' ', '').substring(0, 3).toUpperCase(), flag: '🏳️' };
  };

  const finalMatchTeam1 = getKnockoutWinner(sfMatches, 'SF-1', 'Winner SF-1');
  const finalMatchTeam2 = getKnockoutWinner(sfMatches, 'SF-2', 'Winner SF-2');
  const finalTime = new Date('2026-07-19T20:00:00Z').getTime();
  const nowTime = now.getTime();

  let finalStatus: 'scheduled' | 'live' | 'completed' = 'scheduled';
  let finalScore1: number | undefined;
  let finalScore2: number | undefined;

  if (nowTime >= finalTime + 7200000) {
    finalStatus = 'completed';
    const scores = getDeterministicScore(finalMatchTeam1.name, finalMatchTeam2.name, 500);
    finalScore1 = scores[0];
    finalScore2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
  } else if (nowTime >= finalTime && nowTime < finalTime + 7200000) {
    finalStatus = 'live';
    const scores = getDeterministicScore(finalMatchTeam1.name, finalMatchTeam2.name, 500);
    finalScore1 = scores[0];
    finalScore2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
  }

  const finalMatch: Match = {
    id: 'F-1',
    stage: 'Final',
    team1: finalMatchTeam1,
    team2: finalMatchTeam2,
    date: '2026-07-19T20:00:00Z',
    venue: 'MetLife Stadium',
    city: 'New York/New Jersey',
    score1: finalScore1,
    score2: finalScore2,
    status: finalStatus
  };

  const thirdMatchTeam1 = getKnockoutLoser(sfMatches, 'SF-1', 'Loser SF-1');
  const thirdMatchTeam2 = getKnockoutLoser(sfMatches, 'SF-2', 'Loser SF-2');
  const thirdTime = new Date('2026-07-18T20:00:00Z').getTime();

  let thirdStatus: 'scheduled' | 'live' | 'completed' = 'scheduled';
  let thirdScore1: number | undefined;
  let thirdScore2: number | undefined;

  if (nowTime >= thirdTime + 7200000) {
    thirdStatus = 'completed';
    const scores = getDeterministicScore(thirdMatchTeam1.name, thirdMatchTeam2.name, 600);
    thirdScore1 = scores[0];
    thirdScore2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
  } else if (nowTime >= thirdTime && nowTime < thirdTime + 7200000) {
    thirdStatus = 'live';
    const scores = getDeterministicScore(thirdMatchTeam1.name, thirdMatchTeam2.name, 600);
    thirdScore1 = scores[0];
    thirdScore2 = scores[1] === scores[0] ? scores[1] + 1 : scores[1];
  }

  const thirdPlaceMatch: Match = {
    id: 'TP-1',
    stage: 'Third place',
    team1: thirdMatchTeam1,
    team2: thirdMatchTeam2,
    date: '2026-07-18T20:00:00Z',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    score1: thirdScore1,
    score2: thirdScore2,
    status: thirdStatus
  };

  return [
    ...r32Matches,
    ...r16Matches,
    ...qfMatches,
    ...sfMatches,
    thirdPlaceMatch,
    finalMatch
  ];
}
