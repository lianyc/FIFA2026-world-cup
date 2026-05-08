<script lang='ts' setup>
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useMatchStore } from '@/stores/matches'
import { teamMap } from '@/data/worldcup2026'
import type { KnockoutRound, Match } from '@/types'
import { ROUND_LABELS } from '@/types'

const store = useMatchStore()

// ── Round classification ──────────────────────────────

function matchRound(id: string): KnockoutRound {
  const num = parseInt(id.replace('KO-', ''))
  if (num >= 73 && num <= 88) return 'roundOf32'
  if (num >= 89 && num <= 96) return 'roundOf16'
  if (num >= 97 && num <= 100) return 'quarterFinal'
  if (num >= 101 && num <= 102) return 'semiFinal'
  if (num === 103) return 'thirdPlace'
  return 'final'
}

const rounds = computed(() => {
  const roundOrder: KnockoutRound[] = ['roundOf32', 'roundOf16', 'quarterFinal', 'semiFinal', 'thirdPlace', 'final']
  const grouped = new Map<KnockoutRound, Match[]>()
  for (const r of roundOrder) grouped.set(r, [])

  for (const m of store.matches.value.filter(m => !m.group)) {
    const r = store.matchResults.get(m.id)
    grouped.get(matchRound(m.id))!.push({
      ...m,
      round: matchRound(m.id),
      homeScore: r?.homeScore ?? null,
      awayScore: r?.awayScore ?? null,
    })
  }
  return roundOrder.map(r => ({ key: r, label: ROUND_LABELS[r], matches: grouped.get(r)! }))
})

function getResult(id: string) {
  return store.matchResults.get(id)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

function confederColor(teamId: string | null) {
  if (!teamId) return 'var(--color-text-dim)'
  const t = teamMap.get(teamId)
  if (!t) return 'var(--color-text-dim)'
  const map: Record<string, string> = {
    UEFA: 'var(--uefa)', CONMEBOL: 'var(--conmebol)', CONCACAF: 'var(--concacaf)',
    CAF: 'var(--caf)', AFC: 'var(--afc)', OFC: 'var(--ofc)',
  }
  return map[t.confederation] || 'var(--color-text-dim)'
}

function confederLabel(teamId: string | null) {
  if (!teamId) return ''
  const t = teamMap.get(teamId)
  if (!t) return ''
  const map: Record<string, string> = {
    UEFA: '欧洲', CONMEBOL: '南美', CONCACAF: '中美及加勒比',
    CAF: '非洲', AFC: '亚洲', OFC: '大洋洲',
  }
  return map[t.confederation] || ''
}

// ── Bracket connection lines (SVG) ────────────────────

// Which two matches feed into a given match
const FEEDER_MAP: Record<string, [string, string]> = {
  // R32 → R16 (matches 89-96 fed by pairs of 73-88)
  'KO-89': ['KO-73', 'KO-74'], 'KO-90': ['KO-75', 'KO-76'],
  'KO-91': ['KO-77', 'KO-78'], 'KO-92': ['KO-79', 'KO-80'],
  'KO-93': ['KO-81', 'KO-82'], 'KO-94': ['KO-83', 'KO-84'],
  'KO-95': ['KO-85', 'KO-86'], 'KO-96': ['KO-87', 'KO-88'],
  // R16 → QF
  'KO-97': ['KO-89', 'KO-90'], 'KO-98': ['KO-91', 'KO-92'],
  'KO-99': ['KO-93', 'KO-94'], 'KO-100': ['KO-95', 'KO-96'],
  // QF → SF
  'KO-101': ['KO-97', 'KO-98'], 'KO-102': ['KO-99', 'KO-100'],
  // SF → 3rd place + Final
  'KO-103': ['KO-101', 'KO-102'], 'KO-104': ['KO-101', 'KO-102'],
}

interface LinePath { d: string; played: boolean }

const svgPaths = ref<LinePath[]>([])
const bracketContainer = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

function calcPaths() {
  if (!bracketContainer.value) return
  const container = bracketContainer.value
  const containerRect = container.getBoundingClientRect()
  const paths: LinePath[] = []

  for (const [destId, [topId, botId]] of Object.entries(FEEDER_MAP)) {
    const topEl = container.querySelector(`[data-match="${topId}"]`) as HTMLElement | null
    const botEl = container.querySelector(`[data-match="${botId}"]`) as HTMLElement | null
    const destEl = container.querySelector(`[data-match="${destId}"]`) as HTMLElement | null
    if (!topEl || !botEl || !destEl) continue

    const topR = topEl.getBoundingClientRect()
    const botR = botEl.getBoundingClientRect()
    const destR = destEl.getBoundingClientRect()

    const x1 = topR.right - containerRect.left
    const x2 = destR.left - containerRect.left
    const midX = (x1 + x2) / 2
    const yTop = topR.top + topR.height / 2 - containerRect.top
    const yBot = botR.top + botR.height / 2 - containerRect.top
    const yMid = destR.top + destR.height / 2 - containerRect.top

    const topPlayed = !!store.matchResults.get(topId)
    const botPlayed = !!store.matchResults.get(botId)

    // Horizontal from top feeder to mid-point
    paths.push({ d: `M ${x1} ${yTop} L ${midX} ${yTop}`, played: topPlayed })
    // Horizontal from bottom feeder to mid-point
    paths.push({ d: `M ${x1} ${yBot} L ${midX} ${yBot}`, played: botPlayed })
    // Vertical merge
    paths.push({ d: `M ${midX} ${yTop} L ${midX} ${yBot}`, played: topPlayed && botPlayed })
    // Horizontal from merge to destination
    paths.push({ d: `M ${midX} ${yMid} L ${x2} ${yMid}`, played: !!store.matchResults.get(destId) })
  }

  svgPaths.value = paths
}

const svgStyle = computed(() => {
  if (!bracketContainer.value) return {}
  const r = bracketContainer.value.getBoundingClientRect()
  return { width: `${r.width}px`, height: `${r.height}px` }
})

onMounted(() => {
  nextTick(() => {
    calcPaths()
  })
  resizeObserver = new ResizeObserver(() => calcPaths())
  if (bracketContainer.value) resizeObserver.observe(bracketContainer.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

// Recalculate when match results or API data change
watch([() => store.matchResults, () => store.apiLoaded], () => nextTick(() => calcPaths()), { deep: true })
</script>

<template>
  <div class="bracket-page">
    <section class="page-hero">
      <h2 class="hero-title">晋级拓扑图</h2>
      <p class="hero-desc">32 强 → 16 强 → 8 强 → 半决赛 → 决赛 · 单败淘汰制</p>
    </section>

    <div class="bracket-scroll">
      <div ref="bracketContainer" class="bracket-grid">
        <!-- SVG overlay for bracket lines -->
        <svg class="bracket-lines" :style="svgStyle">
          <path
            v-for="(p, i) in svgPaths"
            :key="i"
            :d="p.d"
            :stroke="p.played ? 'var(--color-accent-green)' : 'var(--color-border-strong)'"
            stroke-width="2"
            fill="none"
            :opacity="p.played ? 0.85 : 0.5"
          />
        </svg>

        <div
          v-for="round in rounds"
          :key="round.key"
          :class="['bracket-round', `round-${round.key}`]"
        >
          <h3 class="round-title">{{ round.label }}</h3>
          <div class="round-matches">
            <div
              v-for="m in round.matches"
              :key="m.id"
              :data-match="m.id"
              :class="['bracket-match', { played: getResult(m.id) }]"
            >
              <div class="match-header">
                <span class="match-id">M{{ m.id.replace('KO-', '') }}</span>
                <span class="match-time">{{ formatDate(m.date) }}</span>
              </div>

              <!-- Home -->
              <div class="match-slot">
                <template v-if="m.homeTeamId">
                  <div class="slot-team">
                    <img
                      :src="`https://flagcdn.com/w40/${teamMap.get(m.homeTeamId)!.flag}.png`"
                      class="slot-flag"
                      loading="lazy"
                    />
                    <div class="slot-info">
                      <span class="slot-name">{{ teamMap.get(m.homeTeamId)!.nameZh }}</span>
                      <span class="slot-conf" :style="{ color: confederColor(m.homeTeamId) }">
                        {{ confederLabel(m.homeTeamId) }}
                      </span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <span class="tbd-label">{{ m.sourceHome }}</span>
                </template>
                <span v-if="getResult(m.id)" class="slot-score">{{ getResult(m.id)!.homeScore }}</span>
              </div>

              <div class="match-divider">
                <span class="divider-line"></span>
                <span class="divider-vs">VS</span>
                <span class="divider-line"></span>
              </div>

              <!-- Away -->
              <div class="match-slot">
                <template v-if="m.awayTeamId">
                  <div class="slot-team">
                    <img
                      :src="`https://flagcdn.com/w40/${teamMap.get(m.awayTeamId)!.flag}.png`"
                      class="slot-flag"
                      loading="lazy"
                    />
                    <div class="slot-info">
                      <span class="slot-name">{{ teamMap.get(m.awayTeamId)!.nameZh }}</span>
                      <span class="slot-conf" :style="{ color: confederColor(m.awayTeamId) }">
                        {{ confederLabel(m.awayTeamId) }}
                      </span>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <span class="tbd-label">{{ m.sourceAway }}</span>
                </template>
                <span v-if="getResult(m.id)" class="slot-score">{{ getResult(m.id)!.awayScore }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="legend">
      <h4 class="legend-title">洲际赛区</h4>
      <div class="legend-items">
        <span v-for="item in [
          { label: '欧洲 UEFA', color: 'var(--uefa)' },
          { label: '南美 CONMEBOL', color: 'var(--conmebol)' },
          { label: '中美及加勒比 CONCACAF', color: 'var(--concacaf)' },
          { label: '非洲 CAF', color: 'var(--caf)' },
          { label: '亚洲 AFC', color: 'var(--afc)' },
          { label: '大洋洲 OFC', color: 'var(--ofc)' },
        ]" :key="item.label" class="legend-item">
          <span class="legend-dot" :style="{ background: item.color }"></span>
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bracket-page { padding-top: 40px; }

/* ── Hero ────────────────────────────────────────────── */
.page-hero { margin-bottom: 32px; }

.hero-title {
  font-family: var(--font-display);
  font-size: 40px;
  color: var(--color-gold);
  letter-spacing: 0.03em;
  margin-bottom: 8px;
}

.hero-desc {
  font-size: 15px;
  color: var(--color-text-dim);
  letter-spacing: 0.05em;
}

/* ── Bracket Layout ──────────────────────────────────── */
.bracket-scroll {
  overflow-x: auto;
  padding-bottom: 24px;
}

.bracket-scroll::-webkit-scrollbar { height: 6px; }
.bracket-scroll::-webkit-scrollbar-track { background: var(--color-surface-elevated); border-radius: 3px; }
.bracket-scroll::-webkit-scrollbar-thumb { background: var(--color-border-strong); border-radius: 3px; }

.bracket-grid {
  display: flex;
  gap: 32px;
  min-width: max-content;
  position: relative;
}

/* SVG overlay */
.bracket-lines {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.bracket-round {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.round-title {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--color-gold);
  letter-spacing: 0.06em;
  margin-bottom: 10px;
  padding: 4px 0;
  flex-shrink: 0;
}

.round-matches {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  gap: 16px;
}

/* Match spacing per round — 16→8→4→2→1 */
.round-roundOf32 .round-matches { gap: 4px; }
.round-roundOf16 .round-matches { gap: 12px; }
.round-quarterFinal .round-matches { gap: 32px; }
.round-semiFinal .round-matches { gap: 80px; }
.round-thirdPlace .round-matches,
.round-final .round-matches { gap: 24px; }

/* ── Match Card ──────────────────────────────────────── */
.bracket-match {
  width: 226px;
  background: var(--color-surface);
  border: 1.5px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  padding: 10px 12px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.bracket-match::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--color-gold);
  opacity: 0.3;
  transition: opacity 0.25s ease, background 0.25s ease;
}

.bracket-match:hover {
  border-color: var(--color-gold);
  box-shadow: 0 4px 18px rgba(184, 134, 11, 0.14);
}

.bracket-match:hover::before { opacity: 1; }
.bracket-match.played::before { background: var(--color-accent-green); opacity: 1; }

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.match-id {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #FFFFFF;
  background: var(--color-gold);
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: 600;
}

.match-time {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-dim);
  font-weight: 500;
}

/* ── Match Slots ─────────────────────────────────────── */
.match-slot {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: var(--radius);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  justify-content: space-between;
  min-height: 40px;
}

.slot-team {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.slot-flag { width: 26px; height: auto; border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.12); }

.slot-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 1px;
}

.slot-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.slot-conf {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  line-height: 1.3;
}

.tbd-label {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-dim);
  background: transparent;
  border: 1px dashed var(--color-border-strong);
  padding: 3px 10px;
  border-radius: 3px;
  font-weight: 500;
  letter-spacing: 0.03em;
}

.slot-score {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-gold);
  flex-shrink: 0;
}

.match-divider {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
}

.divider-line { flex: 1; height: 1px; background: var(--color-border); }

.divider-vs {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-dim);
  letter-spacing: 0.1em;
  font-weight: 500;
}

/* ── Legend ──────────────────────────────────────────── */
.legend {
  margin-top: 36px;
  padding: 18px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.legend-title {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--color-gold);
  margin-bottom: 10px;
}

.legend-items { display: flex; gap: 24px; flex-wrap: wrap; }

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-dim);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0,0,0,0.15);
}
</style>
