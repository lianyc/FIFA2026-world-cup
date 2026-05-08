import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
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
