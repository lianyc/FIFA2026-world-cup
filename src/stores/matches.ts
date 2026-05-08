import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { teams, teamMap, groups, groupNames, fetchMatchesFromApi, initStandings } from '@/data/worldcup2026'
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
  const apiMatches = ref<Match[]>([])
  const apiLoaded = ref(false)

  // ── Load API data ──────────────────────────────────
  async function loadApiData(force = false) {
    if (apiLoaded.value && !force) return
    apiLoaded.value = false
    const matches = await fetchMatchesFromApi(force)
    apiMatches.value = matches

    // Merge API scores into matchResults (only for matches without local override)
    for (const m of matches) {
      if (m.homeScore !== null && m.awayScore !== null && !matchResults.value.has(m.id)) {
        matchResults.value.set(m.id, { homeScore: m.homeScore, awayScore: m.awayScore })
      }
    }
    // Merge API team assignments into knockoutTeams
    for (const m of matches) {
      if (m.homeTeamId && m.awayTeamId && !knockoutTeams.value.has(m.id)) {
        knockoutTeams.value.set(m.id, { homeTeamId: m.homeTeamId, awayTeamId: m.awayTeamId })
      }
    }

    saveMap(LS_RESULTS, matchResults.value)
    saveMap(LS_KO_TEAMS, knockoutTeams.value)
    recalcStandings()
    fillKnockoutSlots()
    apiLoaded.value = true
  }

  // Init standings from persisted results
  ;(function initStandingsFromResults() {
    if (matchResults.value.size === 0) return
    const s = initStandings()
    for (const m of apiMatches.value.length > 0 ? apiMatches.value.filter(m => m.group) : []) {
      const r = matchResults.value.get(m.id)
      if (!r || !m.homeTeamId || !m.awayTeamId || !m.group) continue
      const g = m.group as GroupName
      const homeS = s[g]?.find(x => x.teamId === m.homeTeamId)
      const awayS = s[g]?.find(x => x.teamId === m.awayTeamId)
      if (!homeS || !awayS) continue
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
  const matches = computed(() => {
    const base = apiMatches.value.length > 0 ? apiMatches.value : []
    return base.map(m => {
      const r = matchResults.value.get(m.id)
      const kt = knockoutTeams.value.get(m.id)
      return {
        ...m,
        homeTeamId: kt?.homeTeamId ?? m.homeTeamId,
        awayTeamId: kt?.awayTeamId ?? m.awayTeamId,
        homeScore: r?.homeScore ?? m.homeScore,
        awayScore: r?.awayScore ?? m.awayScore,
      }
    })
  })

  const groupStage = computed(() => matches.value.filter(m => m.group !== undefined))

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
    for (const m of apiMatches.value.filter(m => m.group)) {
      const r = matchResults.value.get(m.id)
      if (!r || !m.homeTeamId || !m.awayTeamId || !m.group) continue
      const g = m.group as GroupName
      const homeS = s[g]?.find(x => x.teamId === m.homeTeamId)
      const awayS = s[g]?.find(x => x.teamId === m.awayTeamId)
      if (!homeS || !awayS) continue
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
    if (apiMatches.value.length === 0) return
    let changed = false
    const koMatches = apiMatches.value.filter(m => !m.group)

    for (const m of koMatches) {
      if (knockoutTeams.value.has(m.id)) continue

      const homeId = resolveSource(m.sourceHome)
      const awayId = resolveSource(m.sourceAway)
      if (homeId && awayId) {
        knockoutTeams.value.set(m.id, { homeTeamId: homeId, awayTeamId: awayId })
        changed = true
      } else if (homeId || awayId) {
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

    // Group qualifier: "1A" (winner of A), "2B" (runner-up of B)
    const gm = source.match(/^([12])([A-L])$/)
    if (gm) {
      const pos = parseInt(gm[1]) - 1 // 0-indexed
      const group = gm[2] as GroupName
      const gms = apiMatches.value.filter(m => m.group === group)
      const allPlayed = gms.every(m => matchResults.value.has(m.id))
      if (!allPlayed || gms.length === 0) return null
      if (standings.value[group] && standings.value[group][pos]) {
        return standings.value[group][pos].teamId
      }
      return null
    }

    // 3rd place qualifier: "3ABCDF" — skip too complex
    if (source.startsWith('3')) return null

    // KO qualifier: "W73", "L103"
    const km = source.match(/^([WL])(\d+)$/)
    if (km) {
      const isWinner = km[1] === 'W'
      const koId = `KO-${km[2]}`
      const r = matchResults.value.get(koId)
      if (!r) return null
      const m = apiMatches.value.find(x => x.id === koId)
      const kt = knockoutTeams.value.get(koId)
      const homeId = kt?.homeTeamId ?? m?.homeTeamId ?? null
      const awayId = kt?.awayTeamId ?? m?.awayTeamId ?? null
      if (!homeId || !awayId) return null
      if (isWinner) {
        return r.homeScore > r.awayScore ? homeId : (r.homeScore < r.awayScore ? awayId : null)
      } else {
        return r.homeScore < r.awayScore ? homeId : (r.homeScore > r.awayScore ? awayId : null)
      }
    }

    return null
  }

  return {
    matchResults, knockoutTeams, standings, apiMatches, apiLoaded,
    matches, groupStage, getTeam, setResult, recalcStandings, loadApiData, fillKnockoutSlots,
  }
})
