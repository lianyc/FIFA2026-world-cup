import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'schedule',
      component: () => import('@/views/ScheduleView.vue'),
    },
    {
      path: '/bracket',
      name: 'bracket',
      component: () => import('@/views/BracketView.vue'),
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import('@/views/AllMatchesView.vue'),
    },
  ],
})

export default router
