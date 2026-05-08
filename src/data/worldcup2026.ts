import type { Team, Match, GroupName, GroupStanding } from '@/types'

// ── Teams (48 real teams) ─────────────────────────────────────

export const teams: Team[] = [
  // UEFA (16)
  { id: 'FRA', name: 'France', nameZh: '法国', flag: 'fr', confederation: 'UEFA' },
  { id: 'ESP', name: 'Spain', nameZh: '西班牙', flag: 'es', confederation: 'UEFA' },
  { id: 'ENG', name: 'England', nameZh: '英格兰', flag: 'gb-eng', confederation: 'UEFA' },
  { id: 'GER', name: 'Germany', nameZh: '德国', flag: 'de', confederation: 'UEFA' },
  { id: 'POR', name: 'Portugal', nameZh: '葡萄牙', flag: 'pt', confederation: 'UEFA' },
  { id: 'NED', name: 'Netherlands', nameZh: '荷兰', flag: 'nl', confederation: 'UEFA' },
  { id: 'BEL', name: 'Belgium', nameZh: '比利时', flag: 'be', confederation: 'UEFA' },
  { id: 'CRO', name: 'Croatia', nameZh: '克罗地亚', flag: 'hr', confederation: 'UEFA' },
  { id: 'SUI', name: 'Switzerland', nameZh: '瑞士', flag: 'ch', confederation: 'UEFA' },
  { id: 'AUT', name: 'Austria', nameZh: '奥地利', flag: 'at', confederation: 'UEFA' },
  { id: 'SWE', name: 'Sweden', nameZh: '瑞典', flag: 'se', confederation: 'UEFA' },
  { id: 'SCO', name: 'Scotland', nameZh: '苏格兰', flag: 'gb-sct', confederation: 'UEFA' },
  { id: 'NOR', name: 'Norway', nameZh: '挪威', flag: 'no', confederation: 'UEFA' },
  { id: 'CZE', name: 'Czechia', nameZh: '捷克', flag: 'cz', confederation: 'UEFA' },
  { id: 'TUR', name: 'Türkiye', nameZh: '土耳其', flag: 'tr', confederation: 'UEFA' },
  { id: 'BIH', name: 'Bosnia and Herzegovina', nameZh: '波黑', flag: 'ba', confederation: 'UEFA' },
  // AFC (8)
  { id: 'JPN', name: 'Japan', nameZh: '日本', flag: 'jp', confederation: 'AFC' },
  { id: 'KOR', name: 'Korea Republic', nameZh: '韩国', flag: 'kr', confederation: 'AFC' },
  { id: 'IRN', name: 'IR Iran', nameZh: '伊朗', flag: 'ir', confederation: 'AFC' },
  { id: 'KSA', name: 'Saudi Arabia', nameZh: '沙特', flag: 'sa', confederation: 'AFC' },
  { id: 'AUS', name: 'Australia', nameZh: '澳大利亚', flag: 'au', confederation: 'AFC' },
  { id: 'QAT', name: 'Qatar', nameZh: '卡塔尔', flag: 'qa', confederation: 'AFC' },
  { id: 'IRQ', name: 'Iraq', nameZh: '伊拉克', flag: 'iq', confederation: 'AFC' },
  { id: 'UZB', name: 'Uzbekistan', nameZh: '乌兹别克斯坦', flag: 'uz', confederation: 'AFC' },
  { id: 'JOR', name: 'Jordan', nameZh: '约旦', flag: 'jo', confederation: 'AFC' },
  // CAF (9)
  { id: 'MAR', name: 'Morocco', nameZh: '摩洛哥', flag: 'ma', confederation: 'CAF' },
  { id: 'SEN', name: 'Senegal', nameZh: '塞内加尔', flag: 'sn', confederation: 'CAF' },
  { id: 'EGY', name: 'Egypt', nameZh: '埃及', flag: 'eg', confederation: 'CAF' },
  { id: 'GHA', name: 'Ghana', nameZh: '加纳', flag: 'gh', confederation: 'CAF' },
  { id: 'CIV', name: "Côte d'Ivoire", nameZh: '科特迪瓦', flag: 'ci', confederation: 'CAF' },
  { id: 'TUN', name: 'Tunisia', nameZh: '突尼斯', flag: 'tn', confederation: 'CAF' },
  { id: 'ALG', name: 'Algeria', nameZh: '阿尔及利亚', flag: 'dz', confederation: 'CAF' },
  { id: 'RSA', name: 'South Africa', nameZh: '南非', flag: 'za', confederation: 'CAF' },
  { id: 'CPV', name: 'Cabo Verde', nameZh: '佛得角', flag: 'cv', confederation: 'CAF' },
  { id: 'COD', name: 'Congo DR', nameZh: '刚果民主', flag: 'cd', confederation: 'CAF' },
  // CONCACAF (6)
  { id: 'USA', name: 'United States', nameZh: '美国', flag: 'us', confederation: 'CONCACAF' },
  { id: 'MEX', name: 'Mexico', nameZh: '墨西哥', flag: 'mx', confederation: 'CONCACAF' },
  { id: 'CAN', name: 'Canada', nameZh: '加拿大', flag: 'ca', confederation: 'CONCACAF' },
  { id: 'PAN', name: 'Panama', nameZh: '巴拿马', flag: 'pa', confederation: 'CONCACAF' },
  { id: 'HAI', name: 'Haiti', nameZh: '海地', flag: 'ht', confederation: 'CONCACAF' },
  { id: 'CUW', name: 'Curaçao', nameZh: '库拉索', flag: 'cw', confederation: 'CONCACAF' },
  // CONMEBOL (6)
  { id: 'ARG', name: 'Argentina', nameZh: '阿根廷', flag: 'ar', confederation: 'CONMEBOL' },
  { id: 'BRA', name: 'Brazil', nameZh: '巴西', flag: 'br', confederation: 'CONMEBOL' },
  { id: 'URU', name: 'Uruguay', nameZh: '乌拉圭', flag: 'uy', confederation: 'CONMEBOL' },
  { id: 'COL', name: 'Colombia', nameZh: '哥伦比亚', flag: 'co', confederation: 'CONMEBOL' },
  { id: 'ECU', name: 'Ecuador', nameZh: '厄瓜多尔', flag: 'ec', confederation: 'CONMEBOL' },
  { id: 'PAR', name: 'Paraguay', nameZh: '巴拉圭', flag: 'py', confederation: 'CONMEBOL' },
  // OFC (1)
  { id: 'NZL', name: 'New Zealand', nameZh: '新西兰', flag: 'nz', confederation: 'OFC' },
]

export const teamMap = new Map(teams.map(t => [t.id, t]))

// Name → ID lookup for API data mapping
const nameToId: Record<string, string> = {}
const aliases: Record<string, string> = {
  'Czechia': 'CZE',
  'Korea Republic': 'KOR',
  'United States': 'USA',
  'IR Iran': 'IRN',
  "Côte d'Ivoire": 'CIV',
  'Türkiye': 'TUR',
  'Cabo Verde': 'CPV',
  'Congo DR': 'COD',
  'Bosnia and Herzegovina': 'BIH',
  'South Africa': 'RSA',
  'Saudi Arabia': 'KSA',
  'New Zealand': 'NZL',
}
for (const t of teams) {
  nameToId[t.name] = t.id
}
for (const [name, id] of Object.entries(aliases)) {
  nameToId[name] = id
}

// ── Groups (12 groups A-L, 4 teams each) ────────────────────

export const groups: Record<string, string[]> = {
  A: ['MEX', 'RSA', 'KOR', 'CZE'],
  B: ['CAN', 'BIH', 'QAT', 'SUI'],
  C: ['BRA', 'MAR', 'HAI', 'SCO'],
  D: ['USA', 'PAR', 'AUS', 'TUR'],
  E: ['GER', 'CUW', 'CIV', 'ECU'],
  F: ['NED', 'JPN', 'SWE', 'TUN'],
  G: ['BEL', 'EGY', 'IRN', 'NZL'],
  H: ['ESP', 'CPV', 'KSA', 'URU'],
  I: ['FRA', 'SEN', 'IRQ', 'NOR'],
  J: ['ARG', 'ALG', 'AUT', 'JOR'],
  K: ['POR', 'COD', 'UZB', 'COL'],
  L: ['ENG', 'CRO', 'GHA', 'PAN'],
}

export const groupNames: GroupName[] = ['A','B','C','D','E','F','G','H','I','J','K','L']

// ── Real venues ──────────────────────────────────────────────

const venueNames: Record<string, string> = {
  'Mexico City Stadium': 'Estadio Azteca',
  'Guadalajara Stadium': 'Estadio Akron',
  'Toronto Stadium': 'BMO Field',
  'Los Angeles Stadium': 'SoFi Stadium',
  'San Francisco Bay Area Stadium': "Levi's Stadium",
  'New York/New Jersey Stadium': 'MetLife Stadium',
  'Boston Stadium': 'Gillette Stadium',
  'BC Place Vancouver': 'BC Place',
  'Houston Stadium': 'NRG Stadium',
  'Dallas Stadium': 'AT&T Stadium',
  'Philadelphia Stadium': 'Lincoln Financial Field',
  'Monterrey Stadium': 'Estadio BBVA',
  'Atlanta Stadium': 'Mercedes-Benz Stadium',
  'Seattle Stadium': 'Lumen Field',
  'Miami Stadium': 'Hard Rock Stadium',
  'Kansas City Stadium': 'Arrowhead Stadium',
}

// ── API data fetcher & transform ─────────────────────────────

const API_URL = import.meta.env.DEV
  ? '/api/fixtures'
  : 'https://fixturedownload.com/feed/json/fifa-world-cup-2026'

interface ApiMatch {
  MatchNumber: number
  RoundNumber: number
  DateUtc: string
  Location: string
  HomeTeam: string
  AwayTeam: string
  Group: string | null
  HomeTeamScore: number | null
  AwayTeamScore: number | null
}

let cachedApiMatches: Match[] | null = null

function utcToBeijing(utcStr: string): string {
  const d = new Date(utcStr.replace(' ', 'T'))
  return d.toISOString()
}

function apiRoundLabel(round: number, group: string | null): string {
  if (group) return `${group.replace('Group ', '')} 组`
  const labels: Record<number, string> = {
    4: '32 强', 5: '16 强', 6: '8 强', 7: '半决赛', 8: '决赛',
  }
  return labels[round] || `第${round}轮`
}

export async function fetchMatchesFromApi(force = false): Promise<Match[]> {
  if (cachedApiMatches && !force) return cachedApiMatches

  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: ApiMatch[] = await res.json()

    const matches: Match[] = []
    for (const m of data) {
      const homeId = nameToId[m.HomeTeam] || null
      const awayId = nameToId[m.AwayTeam] || null
      const group = m.Group ? (m.Group.replace('Group ', '') as GroupName) : undefined

      let id: string
      if (group) {
        id = `G${m.MatchNumber.toString().padStart(2, '0')}`
      } else {
        id = `KO-${m.MatchNumber}`
      }

      const sourceHome = !homeId ? m.HomeTeam : undefined
      const sourceAway = !awayId ? m.AwayTeam : undefined

      matches.push({
        id,
        homeTeamId: homeId,
        awayTeamId: awayId,
        homeScore: m.HomeTeamScore,
        awayScore: m.AwayTeamScore,
        date: utcToBeijing(m.DateUtc),
        city: m.Location,
        venue: venueNames[m.Location] || m.Location,
        group,
        round: group ? undefined : (m.RoundNumber <= 4 ? 'roundOf32' : m.RoundNumber <= 5 ? 'roundOf16' : m.RoundNumber <= 6 ? 'quarterFinal' : m.RoundNumber <= 7 ? 'semiFinal' : m.RoundNumber === 8 && m.MatchNumber === 103 ? 'thirdPlace' : 'final'),
        sourceHome,
        sourceAway,
      })
    }

    cachedApiMatches = matches
    return matches
  } catch {
    console.warn('Failed to fetch from API, using fallback data')
    return buildFallbackMatches()
  }
}

// ── Fallback matches (generated, same structure as API) ──────

function buildFallbackMatches(): Match[] {
  const matches: Match[] = []
  let id = 0

  // Group stage: each group has 6 matches (round-robin among 4 teams)
  const groupDays = [11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
  let dayIdx = 0

  for (const g of groupNames) {
    const teams = groups[g]
    const pairs: [string, string][] = [
      [teams[0], teams[1]], [teams[2], teams[3]],
      [teams[0], teams[2]], [teams[1], teams[3]],
      [teams[0], teams[3]], [teams[1], teams[2]],
    ]
    for (const [h, a] of pairs) {
      id++
      const start = new Date(`2026-06-${groupDays[dayIdx % groupDays.length]}T00:00:00+08:00`)
      start.setHours([8, 10, 13, 16, 20, 22][id % 6], 0, 0, 0)
      matches.push({
        id: `G${id.toString().padStart(2, '0')}`,
        homeTeamId: h, awayTeamId: a, homeScore: null, awayScore: null,
        date: start.toISOString(), city: 'TBD', venue: 'TBD', group: g,
      })
      dayIdx++
    }
  }

  // Knockout matches (32 matches: KO-73 through KO-104)
  // Round of 32 sources
  const r32Sources: [string, string][] = [
    ['2A', '2B'], ['1C', '2F'], ['1E', '3ABCDF'], ['1F', '2C'],
    ['2E', '2I'], ['1I', '3CDFGH'], ['1A', '3CEFHI'], ['1L', '3EHIJK'],
    ['1G', '3AEHIJ'], ['1D', '3BEFIJ'], ['1H', '2J'], ['2K', '2L'],
    ['1B', '3EFGIJ'], ['2D', '2G'], ['1J', '2H'], ['1K', '3DEIJL'],
  ]

  let koDay = 28
  for (let i = 0; i < r32Sources.length; i++) {
    id++
    const m = koDay > 30 ? 7 : 6
    const d = koDay > 30 ? koDay - 30 : koDay
    const start = new Date(`2026-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}T10:00:00+08:00`)
    matches.push({
      id: `KO-${id.toString().padStart(2, '0')}`,
      homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null,
      date: start.toISOString(), city: 'TBD', venue: 'TBD',
      round: 'roundOf32',
      sourceHome: r32Sources[i][0], sourceAway: r32Sources[i][1],
    })
    if (i % 2 === 1) koDay++
  }

  // R16 through Final
  const koStages: { round: Match['round']; count: number; dates: number[] }[] = [
    { round: 'roundOf16', count: 8, dates: [4, 5, 6, 7] },
    { round: 'quarterFinal', count: 4, dates: [9, 10, 11] },
    { round: 'semiFinal', count: 2, dates: [14, 15] },
    { round: 'thirdPlace', count: 1, dates: [18] },
    { round: 'final', count: 1, dates: [19] },
  ]

  for (const stage of koStages) {
    for (let i = 0; i < stage.count; i++) {
      id++
      const month = 7 // All knockout from R16 onwards is in July
      const day = stage.dates[i % stage.dates.length]
      const start = new Date(`2026-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T10:00:00+08:00`)
      const prevBase = 72 + (stage.round === 'roundOf16' ? 0 : stage.round === 'quarterFinal' ? 16 : stage.round === 'semiFinal' ? 24 : stage.round === 'thirdPlace' ? 28 : 30)
      matches.push({
        id: `KO-${id.toString().padStart(2, '0')}`,
        homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null,
        date: start.toISOString(), city: 'TBD', venue: 'TBD',
        round: stage.round,
        sourceHome: `W${prevBase + i * 2 + 1}`, sourceAway: `W${prevBase + i * 2 + 2}`,
      })
    }
  }

  return matches
}

// ── Static exports (fallback) ─────────────────────────────────

const fallbackMatches = buildFallbackMatches()
export const groupStageMatches: Match[] = fallbackMatches.filter(m => m.group)
export const knockoutMatches: Match[] = fallbackMatches.filter(m => !m.group)
export const allMatches: Match[] = [...groupStageMatches, ...knockoutMatches]
export const matchMap = new Map(allMatches.map(m => [m.id, m]))

export function initStandings(): Record<GroupName, GroupStanding[]> {
  const result = {} as Record<GroupName, GroupStanding[]>
  for (const g of groupNames) {
    result[g] = groups[g].map(teamId => ({
      teamId, played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, points: 0,
    }))
  }
  return result
}
