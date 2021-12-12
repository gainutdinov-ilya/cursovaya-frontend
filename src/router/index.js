import { createRouter, createWebHashHistory } from 'vue-router'
import store from '/src/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Home.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    meta: {
      isGuest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Register.vue')
    },
    meta: {
      isGuest: true
    }
  },
  {
    path: '/appointment',
    name: 'Appointment',
    meta:{
      isLoggined: true
    },
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/ClientAppointment.vue')
    }
  },
  {
    path: '/listUsers',
    name: 'listUsers',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AdminUsers.vue')
    },
    meta: {
      isAdmin: true,
      isLoggined: true

    }
  },
  {
    path: '/user/:userID?',
    name: 'UserProfile',
    component: function (){
      return import('../views/PersonalAdminUserPage.vue')
    },
    meta: {
      isAdmin: true,
      isLoggined: true
    },
    props: true
  }
  ,{
    path: '/user/register',
    name: 'UserRegister',
    component: function (){
      return import('../views/AdminCreateAccount.vue')
    },
    meta: {
      isAdmin: true
    }
  },{
    path: '/timeToRecord',
    name: 'TimeToRecord',
    component: function (){
      return import('../views/AdminTimeToRecord.vue')
    }
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLoggined)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.)
    if (!store.getters.loggedIn) {
      next({
        name: 'Login'
      })
    }
  }
  if (to.matched.some(record => record.meta.isAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.)
    if (!store.getters.isAdmin) {
      next({
        name: 'Home'
      })
    }
  }
  if (to.matched.some(record => record.meta.isGuest)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.)
    if (store.getters.loggedIn) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  }else{
    next()
  }
})

export default router
