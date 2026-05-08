import type { Team, Match, GroupName, GroupStanding } from '@/types'

// ── Teams ──────────────────────────────────────────────────

export const teams: Team[] = [
  // UEFA (16)
  { id: 'FRA', name: 'France', nameZh: '法国', flag: 'fr', confederation: 'UEFA', fifaRank: 1 },
  { id: 'ESP', name: 'Spain', nameZh: '西班牙', flag: 'es', confederation: 'UEFA', fifaRank: 2 },
  { id: 'ENG', name: 'England', nameZh: '英格兰', flag: 'gb-eng', confederation: 'UEFA', fifaRank: 3 },
  { id: 'GER', name: 'Germany', nameZh: '德国', flag: 'de', confederation: 'UEFA', fifaRank: 4 },
  { id: 'POR', name: 'Portugal', nameZh: '葡萄牙', flag: 'pt', confederation: 'UEFA', fifaRank: 5 },
  { id: 'ITA', name: 'Italy', nameZh: '意大利', flag: 'it', confederation: 'UEFA', fifaRank: 6 },
  { id: 'NED', name: 'Netherlands', nameZh: '荷兰', flag: 'nl', confederation: 'UEFA', fifaRank: 7 },
  { id: 'BEL', name: 'Belgium', nameZh: '比利时', flag: 'be', confederation: 'UEFA', fifaRank: 8 },
  { id: 'CRO', name: 'Croatia', nameZh: '克罗地亚', flag: 'hr', confederation: 'UEFA', fifaRank: 9 },
  { id: 'DEN', name: 'Denmark', nameZh: '丹麦', flag: 'dk', confederation: 'UEFA', fifaRank: 10 },
  { id: 'SUI', name: 'Switzerland', nameZh: '瑞士', flag: 'ch', confederation: 'UEFA', fifaRank: 12 },
  { id: 'AUT', name: 'Austria', nameZh: '奥地利', flag: 'at', confederation: 'UEFA', fifaRank: 14 },
  { id: 'UKR', name: 'Ukraine', nameZh: '乌克兰', flag: 'ua', confederation: 'UEFA', fifaRank: 16 },
  { id: 'SRB', name: 'Serbia', nameZh: '塞尔维亚', flag: 'rs', confederation: 'UEFA', fifaRank: 18 },
  { id: 'SCO', name: 'Scotland', nameZh: '苏格兰', flag: 'gb-sct', confederation: 'UEFA', fifaRank: 20 },
  { id: 'NOR', name: 'Norway', nameZh: '挪威', flag: 'no', confederation: 'UEFA', fifaRank: 22 },
  // AFC (8)
  { id: 'JPN', name: 'Japan', nameZh: '日本', flag: 'jp', confederation: 'AFC', fifaRank: 11 },
  { id: 'KOR', name: 'Korea Republic', nameZh: '韩国', flag: 'kr', confederation: 'AFC', fifaRank: 13 },
  { id: 'IRN', name: 'Iran', nameZh: '伊朗', flag: 'ir', confederation: 'AFC', fifaRank: 17 },
  { id: 'KSA', name: 'Saudi Arabia', nameZh: '沙特', flag: 'sa', confederation: 'AFC', fifaRank: 25 },
  { id: 'AUS', name: 'Australia', nameZh: '澳大利亚', flag: 'au', confederation: 'AFC', fifaRank: 19 },
  { id: 'QAT', name: 'Qatar', nameZh: '卡塔尔', flag: 'qa', confederation: 'AFC', fifaRank: 30 },
  { id: 'UAE', name: 'UAE', nameZh: '阿联酋', flag: 'ae', confederation: 'AFC', fifaRank: 33 },
  { id: 'UZB', name: 'Uzbekistan', nameZh: '乌兹别克斯坦', flag: 'uz', confederation: 'AFC', fifaRank: 38 },
  // CAF (9)
  { id: 'MAR', name: 'Morocco', nameZh: '摩洛哥', flag: 'ma', confederation: 'CAF', fifaRank: 15 },
  { id: 'SEN', name: 'Senegal', nameZh: '塞内加尔', flag: 'sn', confederation: 'CAF', fifaRank: 21 },
  { id: 'EGY', name: 'Egypt', nameZh: '埃及', flag: 'eg', confederation: 'CAF', fifaRank: 24 },
  { id: 'NGA', name: 'Nigeria', nameZh: '尼日利亚', flag: 'ng', confederation: 'CAF', fifaRank: 26 },
  { id: 'CMR', name: 'Cameroon', nameZh: '喀麦隆', flag: 'cm', confederation: 'CAF', fifaRank: 28 },
  { id: 'GHA', name: 'Ghana', nameZh: '加纳', flag: 'gh', confederation: 'CAF', fifaRank: 31 },
  { id: 'CIV', name: "Côte d'Ivoire", nameZh: '科特迪瓦', flag: 'ci', confederation: 'CAF', fifaRank: 32 },
  { id: 'TUN', name: 'Tunisia', nameZh: '突尼斯', flag: 'tn', confederation: 'CAF', fifaRank: 35 },
  { id: 'ALG', name: 'Algeria', nameZh: '阿尔及利亚', flag: 'dz', confederation: 'CAF', fifaRank: 29 },
  // CONCACAF (6)
  { id: 'USA', name: 'United States', nameZh: '美国', flag: 'us', confederation: 'CONCACAF', fifaRank: 23 },
  { id: 'MEX', name: 'Mexico', nameZh: '墨西哥', flag: 'mx', confederation: 'CONCACAF', fifaRank: 27 },
  { id: 'CAN', name: 'Canada', nameZh: '加拿大', flag: 'ca', confederation: 'CONCACAF', fifaRank: 36 },
  { id: 'CRC', name: 'Costa Rica', nameZh: '哥斯达黎加', flag: 'cr', confederation: 'CONCACAF', fifaRank: 40 },
  { id: 'PAN', name: 'Panama', nameZh: '巴拿马', flag: 'pa', confederation: 'CONCACAF', fifaRank: 44 },
  { id: 'JAM', name: 'Jamaica', nameZh: '牙买加', flag: 'jm', confederation: 'CONCACAF', fifaRank: 47 },
  // CONMEBOL (6)
  { id: 'ARG', name: 'Argentina', nameZh: '阿根廷', flag: 'ar', confederation: 'CONMEBOL', fifaRank: 7 },
  { id: 'BRA', name: 'Brazil', nameZh: '巴西', flag: 'br', confederation: 'CONMEBOL', fifaRank: 5 },
  { id: 'URU', name: 'Uruguay', nameZh: '乌拉圭', flag: 'uy', confederation: 'CONMEBOL', fifaRank: 9 },
  { id: 'COL', name: 'Colombia', nameZh: '哥伦比亚', flag: 'co', confederation: 'CONMEBOL', fifaRank: 11 },
  { id: 'ECU', name: 'Ecuador', nameZh: '厄瓜多尔', flag: 'ec', confederation: 'CONMEBOL', fifaRank: 18 },
  { id: 'CHI', name: 'Chile', nameZh: '智利', flag: 'cl', confederation: 'CONMEBOL', fifaRank: 20 },
  // OFC (1)
  { id: 'NZL', name: 'New Zealand', nameZh: '新西兰', flag: 'nz', confederation: 'OFC', fifaRank: 48 },
  // Playoff winners (2)
  { id: 'PAR', name: 'Paraguay', nameZh: '巴拉圭', flag: 'py', confederation: 'CONMEBOL', fifaRank: 42 },
  { id: 'IRQ', name: 'Iraq', nameZh: '伊拉克', flag: 'iq', confederation: 'AFC', fifaRank: 45 },
]

export const teamMap = new Map(teams.map(t => [t.id, t]))

// ── Groups (16 groups, A–P, 3 teams each) ──────────────────

export const groups: Record<GroupName, string[]> = {
  A: ['CAN', 'DEN', 'CRC'],
  B: ['MEX', 'NED', 'NGA'],
  C: ['USA', 'URU', 'KSA'],
  D: ['ARG', 'CRO', 'QAT'],
  E: ['FRA', 'AUT', 'UZB'],
  F: ['BRA', 'SUI', 'TUN'],
  G: ['POR', 'UKR', 'PAN'],
  H: ['ENG', 'COL', 'IRQ'],
  I: ['ESP', 'SRB', 'ALG'],
  J: ['GER', 'AUS', 'CHI'],
  K: ['ITA', 'SCO', 'JAM'],
  L: ['BEL', 'KOR', 'ECU'],
  M: ['MAR', 'IRN', 'CMR'],
  N: ['JPN', 'EGY', 'NZL'],
  O: ['SEN', 'NOR', 'UAE'],
  P: ['CRO', 'GHA', 'CIV'],
}

// Fix: CRO appears in both D and P. Replace P's CRO with PAR (Paraguay)
groups.P = ['PAR', 'GHA', 'CIV']

// ── Group Stage Matches ────────────────────────────────────

// BJT = UTC+8. Host cities across US/MX/CA span UTC-7 to UTC-4.
// Typical kickoff: 20:00 local ET (UTC-4) = 08:00 BJT next day
// Early: 13:00 local ET = 01:00 BJT next day
// Late: 16:00 local PT (UTC-7) = 07:00 BJT next day

const groupCities: Record<string, string> = {
  A: 'Toronto', B: 'Mexico City', C: 'Los Angeles', D: 'Miami',
  E: 'Boston', F: 'Vancouver', G: 'Seattle', H: 'Atlanta',
  I: 'Houston', J: 'Kansas City', K: 'Dallas', L: 'San Francisco',
  M: 'Philadelphia', N: 'New York/New Jersey', O: 'Guadalajara', P: 'Monterrey',
}

const groupVenues: Record<string, string> = {
  A: 'BMO Field',
  B: 'Estadio Azteca',
  C: 'SoFi Stadium',
  D: 'Hard Rock Stadium',
  E: 'Gillette Stadium',
  F: 'BC Place',
  G: 'Lumen Field',
  H: 'Mercedes-Benz Stadium',
  I: 'NRG Stadium',
  J: 'Arrowhead Stadium',
  K: 'AT&T Stadium',
  L: "Levi's Stadium",
  M: 'Lincoln Financial Field',
  N: 'MetLife Stadium',
  O: 'Estadio Akron',
  P: 'Estadio BBVA',
}

function groupMatches(g: GroupName, d1: number, d2: number, d3: number): Match[] {
  const [a, b, c] = groups[g]
  const city = groupCities[g]
  const venue = groupVenues[g]
  // Matchdays in June 2026. d1, d2, d3 are days of June.
  // Match 1: A vs B, Match 2: B vs C, Match 3: C vs A
  // In 3-team groups, each team plays 2 matches
  // Actually format: Match 1: team1 vs team2, Match 2: winner vs team3...
  // No: each team plays the other two. So 3 matches per group.
  return [
    { homeTeamId: a, awayTeamId: b, group: g, homeScore: null, awayScore: null, ...matchTimeJune(d1), city, venue },
    { homeTeamId: b, awayTeamId: c, group: g, homeScore: null, awayScore: null, ...matchTimeJune(d2), city, venue },
    { homeTeamId: c, awayTeamId: a, group: g, homeScore: null, awayScore: null, ...matchTimeJune(d3), city, venue },
  ] as Match[]
}

function matchTimeJune(day: number): { date: string } {
  // June 11 = day 1 of tournament
  const start = new Date('2026-06-11T00:00:00+08:00')
  start.setDate(start.getDate() + day - 11)
  // Randomize kickoff times: either 08:00, 10:00, or 20:00 BJT
  const hours = [8, 10, 13, 16, 20, 22]
  start.setHours(hours[day % hours.length], 0, 0, 0)
  return { date: start.toISOString() }
}

const groupNames: GroupName[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P']

// Group matches: each group has 3 matches, spread across the group stage
// 48 matches total for group stage
let matchId = 0
function nextId(): string { matchId++; return matchId.toString().padStart(2, '0') }

export const groupStageMatches: Match[] = groupNames.flatMap((g, gi) => {
  const ms = groupMatches(g, 11 + gi, 16 + gi, 21 + gi)
  return ms.map(m => ({ ...m, id: `G${g}-${nextId()}` }))
})

// ── Knockout Stage Structure ───────────────────────────────

// Round of 32: 16 matches (matches 49-64)
// Round of 16: 8 matches (matches 65-72)
// Quarter-finals: 4 matches (matches 73-76)
// Semi-finals: 2 matches (matches 77-78)
// Third place: 1 match (match 79)
// Final: 1 match (match 80)

function koMatch(label: string, day: number, sourceHome?: string, sourceAway?: string): Match {
  const start = new Date('2026-06-11T00:00:00+08:00')
  start.setDate(start.getDate() + day - 11)
  start.setHours(10, 0, 0, 0)
  return {
    id: `KO-${label}`,
    homeTeamId: null,
    awayTeamId: null,
    homeScore: null,
    awayScore: null,
    date: start.toISOString(),
    city: 'TBD',
    venue: 'TBD',
    sourceHome,
    sourceAway,
  }
}

// Group position helpers: "W1A" = Winner group A rank 1, "R1A" = Runner-up group A rank 1
const W1 = (g: string) => `${g}组第1`
const W2 = (g: string) => `${g}组第2`

// Round of 32 labels: group winners vs runners-up
export const knockoutMatches: Match[] = [
  // Round of 32 — June 28 - July 3 (day 18-23)
  koMatch('49', 18, W1('A'), W2('B')),
  koMatch('50', 18, W1('C'), W2('D')),
  koMatch('51', 19, W1('E'), W2('F')),
  koMatch('52', 19, W1('G'), W2('H')),
  koMatch('53', 20, W1('I'), W2('J')),
  koMatch('54', 20, W1('K'), W2('L')),
  koMatch('55', 21, W1('M'), W2('N')),
  koMatch('56', 21, W1('O'), W2('P')),
  koMatch('57', 18, W2('A'), W1('B')),
  koMatch('58', 18, W2('C'), W1('D')),
  koMatch('59', 19, W2('E'), W1('F')),
  koMatch('60', 19, W2('G'), W1('H')),
  koMatch('61', 20, W2('I'), W1('J')),
  koMatch('62', 20, W2('K'), W1('L')),
  koMatch('63', 21, W2('M'), W1('N')),
  koMatch('64', 21, W2('O'), W1('P')),
  // Round of 16 — July 4-7 (day 24-27)
  koMatch('65', 24, 'W49', 'W50'),
  koMatch('66', 24, 'W51', 'W52'),
  koMatch('67', 25, 'W53', 'W54'),
  koMatch('68', 25, 'W55', 'W56'),
  koMatch('69', 26, 'W57', 'W58'),
  koMatch('70', 26, 'W59', 'W60'),
  koMatch('71', 27, 'W61', 'W62'),
  koMatch('72', 27, 'W63', 'W64'),
  // Quarter-finals — July 9-11 (day 29-31)
  koMatch('73', 29, 'W65', 'W66'),
  koMatch('74', 29, 'W67', 'W68'),
  koMatch('75', 30, 'W69', 'W70'),
  koMatch('76', 30, 'W71', 'W72'),
  // Semi-finals — July 14-15 (day 34-35)
  koMatch('77', 34, 'W73', 'W74'),
  koMatch('78', 35, 'W75', 'W76'),
  // Third place — July 18 (day 38)
  koMatch('79', 38, 'L77', 'L78'),
  // Final — July 19 (day 39)
  koMatch('80', 39, 'W77', 'W78'),
]

export const allMatches: Match[] = [...groupStageMatches, ...knockoutMatches]

export const matchMap = new Map(allMatches.map(m => [m.id, m]))

// ── Initial Standings (empty) ──────────────────────────────

export function initStandings(): Record<GroupName, GroupStanding[]> {
  const result = {} as Record<GroupName, GroupStanding[]>
  for (const g of groupNames) {
    result[g] = groups[g].map(teamId => ({
      teamId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    }))
  }
  return result
}
