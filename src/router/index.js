import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/views/ArticlesListView.vue')
    },
    {
      path: '/articles/:slug',
      name: 'article-detail',
      component: () => import('@/views/ArticleDetailView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsListView.vue')
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;
