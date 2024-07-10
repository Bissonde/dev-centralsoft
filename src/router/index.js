// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    // component: () => import('@/layouts/default/Default.vue'),
    component: () => import('@/views/DashboardModules.vue'),
    children: [
      {
        path: '/',
        name: 'Bissonde',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
    
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardModules.vue')
  },  
  {
    path: '/about',
    name: 'Sobre',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('@/views/Posts.vue')
  },
  {
    path: '/signin',
    name: 'Iniciar Sessão',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Registo',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/reset',
    name: 'Reset Password',
    component: () => import('@/views/Reset.vue')
  },
  {
    path: '/activate',
    name: 'Activar',
    component: () => import('@/views/Activate.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});


export default router
