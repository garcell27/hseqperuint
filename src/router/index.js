import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'



// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Academicos
const Cursos = () => import('@/views/academico/Cursos')
const Participantes = () => import('@/views/academico/Participantes')
const Empresas = () => import('@/views/academico/Empresas')

// Views - Portal

const Banners = () => import('@/views/portal/Banners')
const Galerias = () => import('@/views/portal/Galerias')
const Productos = () => import('@/views/portal/Productos')
const Contactenos = () => import('@/views/portal/Contactenos')


const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')



// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/panel',
      name: 'Home',
      component: DefaultContainer,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'panel',
          name: 'Panel',
          component: Dashboard
        },
        {
          path:'academico',
          redirect:'academico/cursos',
          name:'Academico',
          component:{
            render (c) { return c('router-view') }
          },
          children:[
            {
              path:'cursos',
              name:'Cursos',
              component: Cursos
            },
            {
              path:'empresas',
              name:'Empresas',
              component: Empresas
            },
            {
              path:'participantes',
              name:'Participantes',
              component: Participantes
            }
          ]
        },
        {
          path: 'portal',
          redirect: '/portal/banners',
          name: 'Portal',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'banners',
              name: 'Banners',
              component: Banners
            },
            {
              path: 'galerias',
              name: 'Galerias',
              component: Galerias
            },
            {
              path: 'contactenos',
              name: 'Contactenos',
              component: Contactenos
            },
            {
              path: 'productos',
              name: 'Productos',
              component: Productos
            }
          ]
        },

        {
          path: 'users',
          meta: { label: 'Users'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
            },
          ]
        },


      ]
    },
    {
      path: '/login',
      name:'Login',
      component:Login
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      meta: {
        requiresAuth: true
      },
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
