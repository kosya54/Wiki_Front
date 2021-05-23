import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '@/store/store'

import ArticleList from '@/views/ArticleList'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import AdminPage from '@/views/AdminPage'
import UserPage from '@/components/UserPage'
import Article from '@/components/article/Article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/articles',
    name: 'ArticleList',
    props: true,
    component: ArticleList
  },
  {
    path: '/articles/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/articles/categories/:id',
    name: 'ArticleListByCategory',
    component: ArticleList
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'SignIn' && !store.getters.isAuthenticated) {
    next({ name: 'SignIn' })
  }

  if (to.name === 'SignUp' && store.getters.isAuthenticated) {
    next({ name: 'ArticleList' })
  }

  next()
})

export default router
