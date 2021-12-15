import { createRouter, createWebHashHistory } from 'vue-router'
import store from '/src/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import('../views/Home.vue')
    }
  },
  {
    path: '/about',
    name: 'About',

    component: function () {
      return import('../views/About.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import('../views/Login.vue')
    },
    meta: {
      isLoggined: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: function () {
      return import('../views/Register.vue')
    },
    meta: {
      isLoggined: false
    }
  },
  {
    path: '/appointment',
    name: 'Appointment',
    meta:{
      isLoggined: true
    },
    component: function () {
      return import('../views/ClientAppointment.vue')
    }
  },
  {
    path: '/listUsers',
    name: 'listUsers',
    component: function () {
      return import('../views/AdminUsers.vue')
    },
    meta: {
      isPersonal: true
    }
  },
  {
    path: '/user/:userID?',
    name: 'UserProfile',
    component: function (){
      return import('../views/PersonalAdminUserPage.vue')
    },
    meta: {
      isPersonal: true,
    },
    props: true
  },
  {
    path: '/ticket/approve',
    name: 'DoctorPage',
    component: function (){
      return import('../views/DoctorPage.vue')
    },
    meta: {
      isDoctor: true,
    }
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: function (){
      return import('../views/AdminCreateAccount.vue')
    },
    meta: {
      isPersonal: true,
    }
  },{
    path: '/timeToRecord',
    name: 'TimeToRecord',
    component: function (){
      return import('../views/AdminTimeToRecord.vue')
    }
  },
  {
    path: '/ticket/:id?',
    name: 'Ticket',
    component: function (){
      return import('../views/Ticket.vue')
    },
    meta: {
      isLoggined: true,
    },
    props: true
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLoggined)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login'
      })
    }
  }
  if (to.matched.some(record => record.meta.isAdmin)) {
    if (!store.getters.isAdmin) {
      next({
        name: 'Home'
      })
    }
  }
  if (to.matched.some(record => record.meta.isPersonal)) {
    if (!store.getters.isPersonal) {
      next({
        name: 'Home'
      })
    }
  }
  if (to.matched.some(record => record.meta.isGuest)) {
    if (store.getters.loggedIn) {
      next({
        name: 'Home'
      })
    }
  }
  else{
    next()
  }
})

export default router
