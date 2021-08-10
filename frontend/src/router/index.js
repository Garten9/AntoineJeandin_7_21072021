import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',

    component: () => import('../views/Signup.vue')
  },
  {
    path: '/accueil',
    name: 'Accueil',

    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/compte',
    name: 'Compte',

    component: () => import('../views/Compte.vue')
  },
  {
    path: '/moderator',
    name: 'Moderator',

    component: () => import('../views/Moderator.vue')
  },
  {
    path: '/updatePost/:id',
    name: 'UpdatePost',

    component: () => import('../views/UpdatePost.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
