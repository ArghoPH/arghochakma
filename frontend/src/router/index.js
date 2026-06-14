import { createRouter, createWebHistory } from 'vue-router'

import { authService } from '@/services/authService'

import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectDetailsView from '@/views/ProjectDetailsView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/Contact.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import AdminProjectsView from '@/views/AdminProjectsView.vue'
import AdminProjectFormView from '@/views/AdminProjectFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/projects/:slug',
      name: 'project-details',
      component: ProjectDetailsView,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLoginView,
    },
    {
      path: '/admin/projects',
      name: 'admin-projects',
      component: AdminProjectsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/projects/create',
      name: 'admin-project-create',
      component: AdminProjectFormView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/projects/edit/:id',
      name: 'admin-project-edit',
      component: AdminProjectFormView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    return '/admin/login'
  }

  if (to.name === 'admin-login' && authService.isAuthenticated()) {
    return '/admin/projects'
  }

  return true
})

export default router
