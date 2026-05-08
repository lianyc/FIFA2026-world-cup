export type Confederation = 'AFC' | 'CAF' | 'CONCACAF' | 'CONMEBOL' | 'OFC' | 'UEFA'

export interface Team {
  id: string
  name: string
  nameZh: string
  flag: string
  confederation: Confederation
}

export type GroupName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
  | 'I' | 'J' | 'K' | 'L'

export type KnockoutRound =
  | 'roundOf32'
  | 'roundOf16'
  | 'quarterFinal'
  | 'semiFinal'
  | 'thirdPlace'
  | 'final'

export const ROUND_LABELS: Record<KnockoutRound, string> = {
  roundOf32: '1/16 决赛',
  roundOf16: '1/8 决赛',
  quarterFinal: '1/4 决赛',
  semiFinal: '半决赛',
  thirdPlace: '三四名决赛',
  final: '决赛',
}

export interface Match {
  id: string
  homeTeamId: string | null
  awayTeamId: string | null
  date: string // ISO string
  venue: string
  city: string
  group?: GroupName
  round?: KnockoutRound
  homeScore: number | null
  awayScore: number | null
  sourceHome?: string // e.g. "A组第1" for group qualifier, "W49" for later rounds
  sourceAway?: string
}

export interface GroupStanding {
  teamId: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export interface KnockoutSlot {
  matchId: string
  label: string // e.g. "W49" = winner of match 49
  teamId: string | null
}
