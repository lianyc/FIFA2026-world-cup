import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { teams, teamMap, groups, groupStageMatches, knockoutMatches, allMatches, matchMap, initStandings } from '@/data/worldcup2026'
import type { GroupName, GroupStanding, Match, Team } from '@/types'

const LS_RESULTS = 'fifa2026-results'
const LS_KO_TEAMS = 'fifa2026-koTeams'

function loadMap<K extends string, V>(key: string): Map<K, V> {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return new Map(JSON.parse(raw))
  } catch { /* ignore */ }
  return new Map()
}

function saveMap(key: string, m: Map<unknown, unknown>) {
  localStorage.setItem(key, JSON.stringify([...m]))
}

export const useMatchStore = defineStore('matches', () => {
  // ── State ──────────────────────────────────────────
  const matchResults = ref<Map<string, { homeScore: number; awayScore: number }>>(loadMap(LS_RESULTS))
  const knockoutTeams = ref<Map<string, { homeTeamId: string; awayTeamId: string }>>(loadMap(LS_KO_TEAMS))
  const standings = ref<Record<GroupName, GroupStanding[]>>(initStandings())

  // Recalc standings from persisted results on init
  ;(function initStandingsFromResults() {
    if (matchResults.value.size === 0) return
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
    for (const g of Object.keys(s) as GroupName[]) {
      s[g].sort((a, b) =>
        b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || b.goalsFor - a.goalsFor
      )
    }
    standings.value = s
  })();

  // ── Getters ─────────────────────────────────────────
  const matches = computed(() =>
    allMatches.map(m => {
      const r = matchResults.value.get(m.id)
      const kt = knockoutTeams.value.get(m.id)
      return {
        ...m,
        homeTeamId: kt?.homeTeamId ?? m.homeTeamId,
        awayTeamId: kt?.awayTeamId ?? m.awayTeamId,
        homeScore: r?.homeScore ?? null,
        awayScore: r?.awayScore ?? null,
      }
    })
  )

  const groupStage = computed(() => matches.value.filter(m => m.group !== undefined))
  const knockoutStage = computed(() => matches.value.filter(m => m.group === undefined))

  function getTeam(id: string | null): Team | undefined {
    if (!id) return undefined
    return teamMap.get(id)
  }

  // ── Actions ─────────────────────────────────────────
  function setResult(matchId: string, homeScore: number, awayScore: number) {
    matchResults.value.set(matchId, { homeScore, awayScore })
    saveMap(LS_RESULTS, matchResults.value)
    recalcStandings()
    fillKnockoutSlots()
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
    for (const g of Object.keys(s) as GroupName[]) {
      s[g].sort((a, b) =>
        b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) || b.goalsFor - a.goalsFor
      )
    }
    standings.value = s
  }

  // ── Knockout auto-fill ──────────────────────────────
  function fillKnockoutSlots() {
    let changed = false

    for (const m of knockoutMatches) {
      // Skip if already filled
      if (knockoutTeams.value.has(m.id)) continue

      const homeId = resolveSource(m.sourceHome)
      const awayId = resolveSource(m.sourceAway)
      if (homeId && awayId) {
        knockoutTeams.value.set(m.id, { homeTeamId: homeId, awayTeamId: awayId })
        changed = true
      } else if (homeId || awayId) {
        // Partial fill — one side resolved, keep existing or set null
        const existing = knockoutTeams.value.get(m.id) || { homeTeamId: m.homeTeamId || '', awayTeamId: m.awayTeamId || '' }
        const next = {
          homeTeamId: homeId || existing.homeTeamId,
          awayTeamId: awayId || existing.awayTeamId,
        }
        if (next.homeTeamId && next.awayTeamId) {
          knockoutTeams.value.set(m.id, next)
          changed = true
        }
      }
    }

    if (changed) {
      saveMap(LS_KO_TEAMS, knockoutTeams.value)
    }
  }

  function resolveSource(source: string | undefined): string | null {
    if (!source) return null

    // Group qualifier: "A组第1", "B组第2"
    const gm = source.match(/^([A-P])组第([12])$/)
    if (gm) {
      const group = gm[1] as GroupName
      const pos = parseInt(gm[2]) - 1 // 0-indexed
      // Check if all group matches have results
      const groupMatches = groupStageMatches.filter(m => m.group === group)
      const allPlayed = groupMatches.every(m => matchResults.value.has(m.id))
      if (!allPlayed) return null
      if (standings.value[group] && standings.value[group][pos]) {
        return standings.value[group][pos].teamId
      }
      return null
    }

    // KO qualifier: "W49", "L77"
    const km = source.match(/^([WL])(\d+)$/)
    if (km) {
      const isWinner = km[1] === 'W'
      const koId = `KO-${km[2]}`
      const r = matchResults.value.get(koId)
      if (!r) return null
      const kt = knockoutTeams.value.get(koId)
      const homeId = kt?.homeTeamId ?? knockoutMatches.find(m => m.id === koId)?.homeTeamId ?? null
      const awayId = kt?.awayTeamId ?? knockoutMatches.find(m => m.id === koId)?.awayTeamId ?? null
      if (!homeId || !awayId) return null
      if (isWinner) {
        return r.homeScore > r.awayScore ? homeId : (r.homeScore < r.awayScore ? awayId : null)
      } else {
        return r.homeScore < r.awayScore ? homeId : (r.homeScore > r.awayScore ? awayId : null)
      }
    }

    return null
  }

  // Run knockout fill on init to catch anything already resolved
  fillKnockoutSlots()

  return { matchResults, knockoutTeams, standings, matches, groupStage, knockoutStage, getTeam, setResult, recalcStandings, fillKnockoutSlots }
})
