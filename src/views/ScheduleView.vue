<script lang='ts' setup>
import { computed, ref } from 'vue'
import { useMatchStore } from '@/stores/matches'
import { groups, teamMap, groupStageMatches as gsMatches } from '@/data/worldcup2026'
import type { GroupName } from '@/types'
import TeamDetailDialog from '@/components/TeamDetailDialog.vue'

const store = useMatchStore()

const groupNames: GroupName[] = ['A','B','C','D','E','F','G','H','I','J','K','L']
const selectedGroup = ref<GroupName>('A')
const selectedTeamId = ref<string | null>(null)
const dialogVisible = ref(false)

function openTeamDetail(teamId: string) {
  selectedTeamId.value = teamId
  dialogVisible.value = true
}

const groupTeams = computed(() =>
  groups[selectedGroup.value].map(id => teamMap.get(id)!)
)

const groupStandings = computed(() =>
  store.standings[selectedGroup.value]
)

const groupMatches = computed(() =>
  store.groupStage.filter(m => m.group === selectedGroup.value)
)

const confederationColor = (conf: string) => {
  const map: Record<string, string> = {
    UEFA: 'var(--uefa)',
    CONMEBOL: 'var(--conmebol)',
    CONCACAF: 'var(--concacaf)',
    CAF: 'var(--caf)',
    AFC: 'var(--afc)',
    OFC: 'var(--ofc)',
  }
  return map[conf] || 'var(--color-text-dim)'
}

const confederationLabel = (conf: string) => {
  const map: Record<string, string> = {
    UEFA: '欧洲',
    CONMEBOL: '南美',
    CONCACAF: '中美及加勒比',
    CAF: '非洲',
    AFC: '亚洲',
    OFC: '大洋洲',
  }
  return map[conf] || conf
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const mm = (d.getMonth() + 1).toString().padStart(2, '0')
  const dd = d.getDate().toString().padStart(2, '0')
  const hh = d.getHours().toString().padStart(2, '0')
  const min = d.getMinutes().toString().padStart(2, '0')
  return `${mm}-${dd} ${hh}:${min}`
}
</script>

<template>
  <div class="schedule-page">
    <section class="page-hero">
      <h2 class="hero-title">小组赛赛程</h2>
      <p class="hero-desc">16 个小组 &middot; 48 场比赛 &middot; 每组前两名晋级 32 强</p>
    </section>

    <!-- Group selector -->
    <div class="group-tabs">
      <button
        v-for="g in groupNames"
        :key="g"
        :class="['group-tab', { active: selectedGroup === g }]"
        @click="selectedGroup = g"
      >
        {{ g }} 组
      </button>
    </div>

    <!-- Group info -->
    <div class="group-content">
      <div class="group-panel">
        <h3 class="panel-title">{{ selectedGroup }} 组 — 参赛球队</h3>
        <div class="team-cards">
          <div v-for="team in groupTeams" :key="team.id" class="team-card" @click="openTeamDetail(team.id)">
            <img
              :src="`https://flagcdn.com/w80/${team.flag}.png`"
              :alt="team.name"
              class="team-flag"
              loading="lazy"
            />
            <div class="team-info">
              <span class="team-name">{{ team.nameZh }}</span>
              <span class="team-name-en">{{ team.name }}</span>
            </div>
            <el-tag
              size="small"
              :color="confederationColor(team.confederation)"
              effect="dark"
            >
              {{ confederationLabel(team.confederation) }}
            </el-tag>
          </div>
        </div>
      </div>

      <!-- Standings -->
      <div class="group-panel">
        <h3 class="panel-title">积分榜</h3>
        <el-table :data="groupStandings" stripe row-key="teamId" size="medium">
          <el-table-column label="球队" min-width="140">
            <template #default="{ row }">
              <div class="table-team">
                <img
                  :src="`https://flagcdn.com/w40/${teamMap.get(row.teamId)!.flag}.png`"
                  class="table-flag"
                  loading="lazy"
                />
                <span>{{ teamMap.get(row.teamId)!.nameZh }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="played" label="赛" width="48" align="center" />
          <el-table-column prop="won" label="胜" width="48" align="center" />
          <el-table-column prop="drawn" label="平" width="48" align="center" />
          <el-table-column prop="lost" label="负" width="48" align="center" />
          <el-table-column label="进/失" width="72" align="center">
            <template #default="{ row }">
              {{ row.goalsFor }}/{{ row.goalsAgainst }}
            </template>
          </el-table-column>
          <el-table-column label="净胜" width="52" align="center">
            <template #default="{ row }">
              <span :class="{ positive: row.goalsFor - row.goalsAgainst > 0, negative: row.goalsFor - row.goalsAgainst < 0 }">
                {{ row.goalsFor - row.goalsAgainst > 0 ? '+' : '' }}{{ row.goalsFor - row.goalsAgainst }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="points" label="分" width="52" align="center">
            <template #default="{ row }">
              <strong>{{ row.points }}</strong>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- Matches -->
      <div class="group-panel">
        <h3 class="panel-title">比赛</h3>
        <div class="match-list">
          <div v-for="m in groupMatches" :key="m.id" class="match-item">
            <div class="match-time">
              <span class="match-date">{{ formatTime(m.date) }}</span>
              <span class="match-venue">{{ m.city }} · {{ m.venue }}</span>
            </div>
            <div class="match-teams">
              <div class="match-team home">
                <img
                  v-if="m.homeTeamId"
                  :src="`https://flagcdn.com/w40/${teamMap.get(m.homeTeamId)!.flag}.png`"
                  class="match-flag"
                  loading="lazy"
                />
                <span class="team-label">{{ m.homeTeamId ? teamMap.get(m.homeTeamId)!.nameZh : '待定' }}</span>
              </div>
              <div class="match-score">
                <template v-if="m.homeScore !== null">
                  <span class="score-num">{{ m.homeScore }}</span>
                  <span class="score-div">:</span>
                  <span class="score-num">{{ m.awayScore }}</span>
                </template>
                <span v-else class="score-vs">VS</span>
              </div>
              <div class="match-team away">
                <img
                  v-if="m.awayTeamId"
                  :src="`https://flagcdn.com/w40/${teamMap.get(m.awayTeamId)!.flag}.png`"
                  class="match-flag"
                  loading="lazy"
                />
                <span class="team-label">{{ m.awayTeamId ? teamMap.get(m.awayTeamId)!.nameZh : '待定' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TeamDetailDialog
      :team-id="selectedTeamId"
      :visible="dialogVisible"
      @close="dialogVisible = false"
    />
  </div>
</template>

<style scoped>
.schedule-page { padding-top: 40px; }

/* ── Hero ────────────────────────────────────────────── */
.page-hero {
  margin-bottom: 40px;
}

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

/* ── Group Tabs ──────────────────────────────────────── */
.group-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.group-tab {
  width: 52px;
  height: 40px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-dim);
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.2s ease;
}

.group-tab:hover { border-color: var(--color-gold); color: var(--color-text); }

.group-tab.active {
  background: var(--color-gold);
  color: var(--color-bg);
  border-color: var(--color-gold);
  font-weight: 700;
}

/* ── Group Content ───────────────────────────────────── */
.group-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.group-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.group-panel:last-child {
  grid-column: 1 / -1;
}

.panel-title {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--color-gold);
  margin-bottom: 18px;
  letter-spacing: 0.03em;
}

/* ── Team Cards ──────────────────────────────────────── */
.team-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.team-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--color-surface-elevated);
  border-radius: var(--radius);
  border-left: 3px solid var(--color-border);
  transition: border-color 0.25s ease, transform 0.2s ease;
  cursor: pointer;
}

.team-card:hover { border-left-color: var(--color-gold); transform: translateX(4px); }

.team-flag { width: 44px; height: auto; border-radius: 3px; }

.team-info { flex: 1; }
.team-name { display: block; font-weight: 600; font-size: 15px; }
.team-name-en { display: block; font-size: 12px; color: var(--color-text-dim); }

/* ── Table ───────────────────────────────────────────── */
.table-team { display: flex; align-items: center; gap: 10px; }
.table-flag { width: 24px; border-radius: 2px; }

.positive { color: var(--color-accent-green); }
.negative { color: var(--color-accent-red); }

/* ── Match List ──────────────────────────────────────── */
.match-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.match-item {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 16px 20px;
  background: var(--color-surface-elevated);
  border-radius: var(--radius);
  transition: background 0.2s ease;
}

.match-item:hover { background: var(--color-border); }

.match-time {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 100px;
}

.match-date {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-gold);
}

.match-venue {
  font-size: 11px;
  color: var(--color-text-dim);
}

.match-teams {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
}

.match-team {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.match-team.home { justify-content: flex-end; text-align: right; }

.match-flag { width: 28px; border-radius: 2px; }

.team-label { font-size: 14px; font-weight: 500; }

.match-score {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 80px;
  justify-content: center;
}

.score-num {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gold-bright);
}

.score-div {
  font-size: 16px;
  color: var(--color-text-dim);
}

.score-vs {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-text-dim);
  letter-spacing: 0.1em;
}
</style>
