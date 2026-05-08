import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { teams, teamMap, groups, groupStageMatches, knockoutMatches, allMatches, matchMap, initStandings } from '@/data/worldcup2026'
import type { GroupName, GroupStanding, Match, Team } from '@/types'

export const useMatchStore = defineStore('matches', () => {
  // ── State ──────────────────────────────────────────
  const matchResults = ref<Map<string, { homeScore: number; awayScore: number }>>(new Map())
  const standings = ref<Record<GroupName, GroupStanding[]>>(initStandings())

  // ── Getters ─────────────────────────────────────────
  const matches = computed(() =>
    allMatches.map(m => {
      const r = matchResults.value.get(m.id)
      return { ...m, homeScore: r?.homeScore ?? null, awayScore: r?.awayScore ?? null }
    })
  )

  const groupStage = computed(() =>
    matches.value.filter(m => m.group !== undefined)
  )

  const knockoutStage = computed(() =>
    matches.value.filter(m => m.group === undefined)
  )

  function getTeam(id: string | null): Team | undefined {
    if (!id) return undefined
    return teamMap.get(id)
  }

  // ── Actions ─────────────────────────────────────────
  function setResult(matchId: string, homeScore: number, awayScore: number) {
    matchResults.value.set(matchId, { homeScore, awayScore })
    recalcStandings()
  }

  function recalcStandings() {
    const s = initStandings()
    for (const m of groupStageMatches) {
      const r = matchResults.value.get(m.id)
      if (!r || m.homeTeamId === null || m.awayTeamId === null) continue
      const homeS = s[m.group!].find(x => x.teamId === m.homeTeamId)!
      const awayS = s[m.group!].find(x => x.teamId === m.awayTeamId)!
      homeS.played++; awayS.played++
      homeS.goalsFor += r.homeScore; homeS.goalsAgainst += r.awayScore
      awayS.goalsFor += r.awayScore; awayS.goalsAgainst += r.homeScore
      if (r.homeScore > r.awayScore) { homeS.won++; awayS.lost++; homeS.points += 3 }
      else if (r.homeScore < r.awayScore) { awayS.won++; homeS.lost++; awayS.points += 3 }
      else { homeS.drawn++; awayS.drawn++; homeS.points += 1; awayS.points += 1 }
    }
    // Sort by points, then goal difference
    for (const g of Object.keys(s) as GroupName[]) {
      s[g].sort((a, b) =>
        b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || b.goalsFor - a.goalsFor
      )
    }
    standings.value = s
  }

  return { matchResults, standings, matches, groupStage, knockoutStage, getTeam, setResult, recalcStandings }
})
