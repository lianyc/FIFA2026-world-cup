<script lang='ts' setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useMatchStore } from '@/stores/matches'

import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const store = useMatchStore()
const refreshing = ref(false)

onMounted(() => {
  store.loadApiData()
})

async function refresh() {
  refreshing.value = true
  await store.refreshData()
  refreshing.value = false
}

const navItems = [
  { name: 'schedule', label: '赛程表', path: '/' },
  { name: 'matches', label: '全部比赛', path: '/matches' },
  { name: 'bracket', label: '晋级拓扑', path: '/bracket' },
]

function isActive(name: string) {
  return route.name === name
}

function navigate(name: string) {
  router.push({ name })
}
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="header-brand">
        <div class="trophy-icon">&#9918;</div>
        <div class="brand-text">
          <h1 class="brand-title">FIFA World Cup 2026</h1>
          <p class="brand-sub">United 26 &mdash; 美国 &middot; 墨西哥 &middot; 加拿大</p>
        </div>
      </div>
      <nav class="header-nav">
        <button
          v-for="item in navItems"
          :key="item.name"
          :class="['nav-btn', { active: isActive(item.name) }]"
          @click="navigate(item.name)"
        >
          {{ item.label }}
        </button>
        <button class="nav-btn refresh-btn" @click="refresh" title="刷新比赛数据">
          <span :class="['refresh-icon', { spinning: refreshing }]">&#8635;</span>
        </button>
      </nav>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <!-- Loading overlay -->
    <Transition name="overlay-fade">
      <div v-if="!store.apiLoaded || refreshing" class="loading-overlay">
        <div class="loading-card">
          <div class="loading-spinner">
            <span class="spinner-ring"></span>
          </div>
          <span class="loading-text">更新比赛数据...</span>
        </div>
      </div>
    </Transition>

    <footer class="app-footer">
      <span>48 支球队 &middot; 16 座城市 &middot; 3 个国家 &middot; 1 座奖杯</span>
      <span class="footer-time">所有时间均为北京时间 (UTC+8)</span>
    </footer>
  </div>
</template>

<style>
/* ── Reset & Base ─────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-bg: #F8F6F2;
  --color-surface: #FFFFFF;
  --color-surface-elevated: #F0EDE7;
  --color-border: #E0DBD2;
  --color-border-strong: #C4BEB2;
  --color-gold: #B8860B;
  --color-gold-bright: #D4A017;
  --color-text: #1A1816;
  --color-text-dim: #7A736B;
  --color-accent-green: #16A34A;
  --color-accent-red: #DC2626;

  /* Confederation colors — vivid */
  --uefa: #2563EB;
  --conmebol: #0891B2;
  --concacaf: #EA580C;
  --caf: #16A34A;
  --afc: #DC2626;
  --ofc: #9333EA;

  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius: 6px;
  --radius-lg: 10px;
}

html { background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); }
body { min-height: 100vh; }
#app { min-height: 100vh; }

/* ── App Shell ────────────────────────────────────────── */
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ───────────────────────────────────────────── */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}

.header-brand { display: flex; align-items: center; gap: 16px; }

.trophy-icon {
  font-size: 36px;
  filter: drop-shadow(0 0 12px rgba(200, 169, 81, 0.4));
}

.brand-title {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--color-gold);
  letter-spacing: 0.04em;
  line-height: 1.1;
}

.brand-sub {
  font-size: 13px;
  color: var(--color-text-dim);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.header-nav { display: flex; gap: 8px; }

.nav-btn {
  padding: 10px 28px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-dim);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.25s ease;
  text-transform: uppercase;
}

.nav-btn:hover { color: var(--color-text); border-color: var(--color-gold); background: rgba(184, 134, 11, 0.06); }

.nav-btn.active {
  background: var(--color-gold);
  color: #FFFFFF;
  border-color: var(--color-gold);
  font-weight: 600;
}

.refresh-btn {
  padding: 10px 14px;
  margin-left: 4px;
}

.refresh-icon {
  display: inline-block;
  font-size: 20px;
  line-height: 1;
}

.refresh-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ── Main ─────────────────────────────────────────────── */
.app-main {
  flex: 1;
  padding: 0 48px 64px;
}

/* ── Footer ───────────────────────────────────────────── */
.app-footer {
  display: flex;
  justify-content: space-between;
  padding: 20px 48px;
  border-top: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-dim);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ── Page Transition ──────────────────────────────────── */
.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-fade-enter-from { opacity: 0; transform: translateY(12px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-12px); }

/* ── Element Plus Overrides ───────────────────────────── */
.el-card {
  background: var(--color-surface) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: var(--radius-lg) !important;
  color: var(--color-text) !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04) !important;
}

.el-table {
  --el-table-bg-color: var(--color-surface) !important;
  --el-table-tr-bg-color: var(--color-surface) !important;
  --el-table-header-bg-color: var(--color-surface-elevated) !important;
  --el-table-border-color: var(--color-border) !important;
  --el-table-text-color: var(--color-text) !important;
  --el-table-header-text-color: var(--color-gold) !important;
  --el-table-row-hover-bg-color: var(--color-surface-elevated) !important;
  --el-table-row-striped-bg-color: #FAF9F7 !important;
}

.el-tag {
  border-radius: var(--radius) !important;
  border: none !important;
}

.el-empty__description { color: var(--color-text-dim) !important; }
</style>
