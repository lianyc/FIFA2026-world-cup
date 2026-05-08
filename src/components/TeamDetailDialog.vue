<script lang='ts' setup>
import { computed } from 'vue'
import { teamMap } from '@/data/worldcup2026'
import { squadMap } from '@/data/squads'
import type { Player } from '@/data/squads'

const props = defineProps<{ teamId: string | null; visible: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const team = computed(() => props.teamId ? teamMap.get(props.teamId) : null)
const squad = computed(() => props.teamId ? squadMap.get(props.teamId) : null)

const confederLabel = (conf: string) => {
  const m: Record<string, string> = {
    UEFA: '欧洲', CONMEBOL: '南美', CONCACAF: '中美及加勒比',
    CAF: '非洲', AFC: '亚洲', OFC: '大洋洲',
  }
  return m[conf] || conf
}

const confederColor = (conf: string) => {
  const m: Record<string, string> = {
    UEFA: 'var(--uefa)', CONMEBOL: 'var(--conmebol)', CONCACAF: 'var(--concacaf)',
    CAF: 'var(--caf)', AFC: 'var(--afc)', OFC: 'var(--ofc)',
  }
  return m[conf] || 'var(--color-text-dim)'
}

function avatarInitials(name: string): string {
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function playerBg(pos: Player['position']): string {
  const m = { GK: '#DC2626', DF: '#2563EB', MF: '#16A34A', FW: '#EA580C' }
  return m[pos]
}

const positionLabel = (pos: Player['position']) => {
  const m = { GK: '守门员', DF: '后卫', MF: '中场', FW: '前锋' }
  return m[pos]
}
</script>

<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="emit('close')"
    :width="720"
    top="0"
    :close-on-click-modal="true"
    destroy-on-close
    class="squad-dialog"
  >
    <template #header>
      <div v-if="team" class="dialog-header">
        <div class="dialog-flag-wrap">
          <img
            :src="`https://flagcdn.com/w80/${team.flag}.png`"
            :alt="team.name"
            class="dialog-flag"
            @error="($event.target as HTMLImageElement).style.display = 'none'; (($event.target as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'flex'"
          />
          <span class="dialog-flag-fallback">{{ team.flag.toUpperCase() }}</span>
        </div>
        <div class="dialog-title-group">
          <h3 class="dialog-title">{{ team.nameZh }} <span class="dialog-title-en">{{ team.name }}</span></h3>
          <el-tag size="small" :color="confederColor(team.confederation)" effect="dark">
            {{ confederLabel(team.confederation) }}
          </el-tag>
        </div>
      </div>
    </template>

    <div v-if="squad" class="squad-content">
      <!-- Coach -->
      <div class="section coach-section">
        <h4 class="section-title">教练组</h4>
        <div class="coach-card">
          <div class="coach-avatar">
            <img
              :src="`https://flagcdn.com/w80/${squad.coach.nationality}.png`"
              class="coach-flag"
              @error="($event.target as HTMLImageElement).style.display = 'none'; (($event.target as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'flex'"
            />
            <span class="coach-flag-fallback">{{ squad.coach.nationality.toUpperCase() }}</span>
          </div>
          <div class="coach-info">
            <span class="coach-name">{{ squad.coach.nameZh || squad.coach.name }}</span>
            <span class="coach-detail">{{ squad.coach.age }} 岁 · {{ squad.coach.nationality.toUpperCase() }}</span>
            <span class="coach-formation">阵型: {{ squad.formation }}</span>
          </div>
        </div>
      </div>

      <!-- Formation diagram -->
      <div class="section">
        <h4 class="section-title">阵型 — {{ squad.formation }}</h4>
        <div class="formation-viz">
          <div class="formation-row">
            <span v-for="i in Number(squad.formation.split('-')[2])" :key="'fw'+i" class="form-dot fw-dot"></span>
          </div>
          <div class="formation-row">
            <span v-for="i in Number(squad.formation.split('-')[1])" :key="'mf'+i" class="form-dot mf-dot"></span>
          </div>
          <div class="formation-row">
            <span v-for="i in Number(squad.formation.split('-')[0])" :key="'df'+i" class="form-dot df-dot"></span>
          </div>
          <div class="formation-row">
            <span class="form-dot gk-dot"></span>
          </div>
        </div>
      </div>

      <!-- Players by position -->
      <div class="section">
        <h4 class="section-title">球员名单</h4>

        <!-- Goalkeepers -->
        <div class="pos-group">
          <h5 class="pos-label" :style="{ color: playerBg('GK') }">&#9632; 守门员 (GK)</h5>
          <div class="player-grid">
            <div v-for="p in squad.goalkeepers" :key="p.number" class="player-card">
              <div class="player-avatar" :style="{ background: playerBg('GK') }">
                {{ avatarInitials(p.name) }}
              </div>
              <div class="player-info">
                <span class="player-name">{{ p.nameZh || p.name }} <span class="player-jersey">#{{ p.number }}</span></span>
                <span class="player-club">{{ p.club }} · {{ p.age }}岁</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Defenders -->
        <div class="pos-group">
          <h5 class="pos-label" :style="{ color: playerBg('DF') }">&#9632; 后卫 (DF)</h5>
          <div class="player-grid">
            <div v-for="p in squad.defenders" :key="p.number" class="player-card">
              <div class="player-avatar" :style="{ background: playerBg('DF') }">
                {{ avatarInitials(p.name) }}
              </div>
              <div class="player-info">
                <span class="player-name">{{ p.nameZh || p.name }} <span class="player-jersey">#{{ p.number }}</span></span>
                <span class="player-club">{{ p.club }} · {{ p.age }}岁</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Midfielders -->
        <div class="pos-group">
          <h5 class="pos-label" :style="{ color: playerBg('MF') }">&#9632; 中场 (MF)</h5>
          <div class="player-grid">
            <div v-for="p in squad.midfielders" :key="p.number" class="player-card">
              <div class="player-avatar" :style="{ background: playerBg('MF') }">
                {{ avatarInitials(p.name) }}
              </div>
              <div class="player-info">
                <span class="player-name">{{ p.nameZh || p.name }} <span class="player-jersey">#{{ p.number }}</span></span>
                <span class="player-club">{{ p.club }} · {{ p.age }}岁</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Forwards -->
        <div class="pos-group">
          <h5 class="pos-label" :style="{ color: playerBg('FW') }">&#9632; 前锋 (FW)</h5>
          <div class="player-grid">
            <div v-for="p in squad.forwards" :key="p.number" class="player-card">
              <div class="player-avatar" :style="{ background: playerBg('FW') }">
                {{ avatarInitials(p.name) }}
              </div>
              <div class="player-info">
                <span class="player-name">{{ p.nameZh || p.name }} <span class="player-jersey">#{{ p.number }}</span></span>
                <span class="player-club">{{ p.club }} · {{ p.age }}岁</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-squad">
      <p>暂无详细阵容数据</p>
    </div>
  </el-dialog>
</template>

<style>
/* Dialog global overrides — unscoped to penetrate el-dialog */
.squad-dialog.el-dialog {
  background: var(--color-surface) !important;
  border-radius: var(--radius-lg) !important;
  border: 1px solid var(--color-border) !important;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12) !important;
  top: 0 !important;
  margin-top: 2vh !important;
  height: 96vh !important;
  display: flex !important;
  flex-direction: column !important;
}

.squad-dialog .el-dialog__header {
  padding: 20px 24px 0 !important;
  border-bottom: none !important;
  flex-shrink: 0 !important;
}

.squad-dialog .el-dialog__body {
  padding: 16px 24px 24px !important;
  flex: 1 !important;
  overflow-y: auto !important;
}

.squad-dialog .el-dialog__close {
  color: var(--color-text-dim) !important;
  font-size: 20px !important;
}
</style>

<style scoped>
/* ── Dialog Header ──────────────────────────────────── */
.dialog-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dialog-flag-wrap {
  width: 48px;
  height: 32px;
  flex-shrink: 0;
  position: relative;
}

.dialog-flag {
  width: 48px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.dialog-flag-fallback {
  display: none;
  width: 48px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--color-text-dim);
}

.dialog-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dialog-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--color-text);
  margin: 0;
}

.dialog-title-en {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-dim);
}

/* ── Sections ────────────────────────────────────────── */
.squad-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--color-gold);
  margin-bottom: 10px;
  letter-spacing: 0.03em;
}

/* ── Coach ───────────────────────────────────────────── */
.coach-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: var(--color-surface-elevated);
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}

.coach-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}

.coach-flag { width: 100%; height: 100%; object-fit: cover; }

.coach-flag-fallback {
  display: none;
  position: absolute;
  inset: 0;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-dim);
}

.coach-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.coach-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.coach-detail {
  font-size: 12px;
  color: var(--color-text-dim);
}

.coach-formation {
  font-size: 12px;
  color: var(--color-gold);
  font-weight: 600;
  letter-spacing: 0.04em;
}

/* ── Formation Viz ───────────────────────────────────── */
.formation-viz {
  background: var(--color-surface-elevated);
  border-radius: var(--radius);
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  border: 1px solid var(--color-border);
}

.formation-row {
  display: flex;
  gap: 28px;
  justify-content: center;
}

.form-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
}

.fw-dot { border-color: #EA580C; background: rgba(234,88,12,0.08); }
.mf-dot { border-color: #16A34A; background: rgba(22,163,74,0.08); }
.df-dot { border-color: #2563EB; background: rgba(37,99,235,0.08); }
.gk-dot { border-color: #DC2626; background: rgba(220,38,38,0.08); }

/* ── Player Grid ─────────────────────────────────────── */
.pos-group {
  margin-bottom: 14px;
}

.pos-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.player-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.player-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--color-surface-elevated);
  border-radius: var(--radius);
  transition: background 0.15s ease;
}

.player-card:hover { background: var(--color-border); }

.player-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  color: #FFFFFF;
  flex-shrink: 0;
}

.player-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.player-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.player-jersey {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-gold);
  font-weight: 700;
}

.player-club {
  font-size: 12px;
  color: var(--color-text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-squad {
  text-align: center;
  padding: 40px 0;
  color: var(--color-text-dim);
  font-size: 15px;
}
</style>
