<script lang='ts' setup>
import { computed } from 'vue'
import { useMatchStore } from '@/stores/matches'
import { teamMap } from '@/data/worldcup2026'
import type { Match } from '@/types'

const store = useMatchStore()

interface DayGroup {
  label: string
  matches: Match[]
}

const sorted = computed<Match[]>(() =>
  [...store.matches].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
)

const dayGroups = computed<DayGroup[]>(() => {
  const map = new Map<string, Match[]>()
  for (const m of sorted.value) {
    const d = new Date(m.date)
    const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(m)
  }
  return Array.from(map, ([key, matches]) => {
    const d = new Date(matches[0].date)
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()]
    const mm = (d.getMonth() + 1).toString().padStart(2, '0')
    const dd = d.getDate().toString().padStart(2, '0')
    return { label: `${mm}-${dd} ${weekDay}`, matches }
  })
})

function formatTime(iso: string) {
  const d = new Date(iso)
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const text = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  const dayOfWeek = dayNames[d.getDay()]
  const isWeekend = d.getDay() === 0 || d.getDay() === 6
  return { text, dayOfWeek, isWeekend }
}

function roundLabel(m: Match): string {
  if (m.group) return `${m.group} 组`
  const num = parseInt(m.id.replace('KO-', ''))
  if (num >= 49 && num <= 64) return '32 强'
  if (num >= 65 && num <= 72) return '16 强'
  if (num >= 73 && num <= 76) return '8 强'
  if (num >= 77 && num <= 78) return '半决赛'
  if (num === 79) return '三四名'
  return '决赛'
}

function roundVariant(m: Match): '' | 'success' | 'warning' | 'danger' {
  if (m.group) return ''
  const num = parseInt(m.id.replace('KO-', ''))
  if (num >= 77) return 'danger'
  if (num >= 73) return 'warning'
  if (num >= 65) return 'success'
  return ''
}

function getResult(m: Match) {
  return store.matchResults.get(m.id)
}
</script>

<template>
  <div class="all-matches-page">
    <section class="page-hero">
      <h2 class="hero-title">全部赛程</h2>
      <p class="hero-desc">80 场比赛 &middot; 按时间顺序排列 &middot; 北京时间 (UTC+8)</p>
    </section>

    <div class="timeline">
      <div v-for="day in dayGroups" :key="day.label" class="day-block">
        <div class="day-header">
          <span class="day-date">{{ day.label }}</span>
          <span class="day-count">{{ day.matches.length }} 场</span>
        </div>
        <div class="day-matches">
          <div
            v-for="m in day.matches"
            :key="m.id"
            :class="['match-row', { played: getResult(m) }]"
          >
            <div class="match-meta">
              <span class="match-kickoff">{{ formatTime(m.date) }}</span>
              <el-tag
                size="small"
                :type="roundVariant(m)"
                effect="plain"
              >
                {{ roundLabel(m) }}
              </el-tag>
            </div>

            <div class="match-body">
              <div class="matchup-card">
                <div class="matchup-team home">
                  <img
                    v-if="m.homeTeamId"
                    :src="`https://flagcdn.com/w40/${teamMap.get(m.homeTeamId)!.flag}.png`"
                    class="match-flag"
                    loading="lazy"
                  />
                  <span class="matchup-name">{{ m.homeTeamId ? teamMap.get(m.homeTeamId)!.nameZh : (m.sourceHome || '待定') }}</span>
                </div>

                <div class="matchup-score">
                  <template v-if="getResult(m)">
                    <span class="score-val">{{ getResult(m)!.homeScore }}</span>
                    <span class="score-colon">:</span>
                    <span class="score-val">{{ getResult(m)!.awayScore }}</span>
                  </template>
                  <span v-else class="score-vs">VS</span>
                </div>

                <div class="matchup-team away">
                  <img
                    v-if="m.awayTeamId"
                    :src="`https://flagcdn.com/w40/${teamMap.get(m.awayTeamId)!.flag}.png`"
                    class="match-flag"
                    loading="lazy"
                  />
                  <span class="matchup-name">{{ m.awayTeamId ? teamMap.get(m.awayTeamId)!.nameZh : (m.sourceAway || '待定') }}</span>
                </div>
              </div>
            </div>

            <div class="match-footer">
              <span class="match-venue">{{ m.city }} · {{ m.venue }}</span>
              <span class="match-id-tag">{{ m.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-matches-page { padding-top: 40px; }

/* ── Hero ────────────────────────────────────────────── */
.page-hero { margin-bottom: 36px; }

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

/* ── Timeline ────────────────────────────────────────── */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ── Day Block ───────────────────────────────────────── */
.day-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

.day-date {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--color-text);
  letter-spacing: 0.03em;
}

.day-count {
  font-size: 13px;
  color: var(--color-text-dim);
  font-family: var(--font-mono);
}

/* ── Match Row ───────────────────────────────────────── */
.day-matches {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.match-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.match-row:hover {
  border-color: var(--color-gold);
  box-shadow: 0 2px 12px rgba(184, 134, 11, 0.08);
}

.match-row.played {
  border-left: 3px solid var(--color-accent-green);
}

/* ── Meta ───────────────────────────────────────────── */
.match-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 72px;
}

.match-kickoff {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-gold);
}

/* ── Body / Matchup Card ────────────────────────────── */
.match-body {
  flex: 1;
  display: flex;
  justify-content: center;
}

.matchup-card {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0;
  overflow: hidden;
}

.matchup-team {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  min-width: 0;
}

.matchup-team.home { flex-direction: row; }

.matchup-team.away { flex-direction: row-reverse; }

.match-flag { width: 30px; height: auto; border-radius: 3px; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.08); }

.matchup-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Score ──────────────────────────────────────────── */
.matchup-score {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--color-border);
  justify-content: center;
  flex-shrink: 0;
}

.score-val {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gold-bright);
}

.score-colon {
  font-size: 16px;
  color: var(--color-text-dim);
}

.score-vs {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-dim);
  letter-spacing: 0.1em;
  font-weight: 600;
}

/* ── Footer ─────────────────────────────────────────── */
.match-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 100px;
}

.match-venue {
  font-size: 11px;
  color: var(--color-text-dim);
  text-align: right;
  white-space: nowrap;
}

.match-id-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-dim);
  background: var(--color-surface-elevated);
  padding: 1px 6px;
  border-radius: 3px;
}

/* ── Mobile ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .all-matches-page { padding-top: 24px; }

  .hero-title { font-size: 28px; }

  .hero-desc { font-size: 13px; }

  .timeline { gap: 20px; }

  .day-date { font-size: 17px; }

  .match-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px 14px;
  }

  .match-meta {
    flex-direction: row;
    justify-content: space-between;
    min-width: auto;
  }

  .match-kickoff { font-size: 14px; }

  .match-body { justify-content: center; }

  .matchup-team { padding: 8px 12px; gap: 6px; }

  .matchup-team.home { justify-content: flex-end; }

  .matchup-team.away { justify-content: flex-start; }

  .matchup-name { font-size: 13px; }

  .match-flag { width: 24px; }

  .matchup-score { padding: 8px 12px; }

  .score-val { font-size: 17px; }

  .match-footer {
    flex-direction: row;
    justify-content: space-between;
    min-width: auto;
  }

  .match-venue { font-size: 10px; text-align: left; }
}
</style>
