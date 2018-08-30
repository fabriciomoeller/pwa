import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import jwt from 'jwt-decode'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/user/Register.vue'),
      meta: { 
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/user/Login.vue'),
      meta: { 
        guest: true
      }
      
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import(/* webpackChunkName: "about" */ './views/gridPage.vue'),
      meta: { 
        requiresAuth: true,
        admin: true
      }
    },
    {
      path: '/form',
      name: 'cadastro',
      component: () => import(/* webpackChunkName: "about" */ './views/forms/form.vue'),
      meta: { 
        requiresAuth: true,
        admin: true
      }
    },
    {
      path: '/crud',
      name: 'crud',
      component: () => import(/* webpackChunkName: "about" */ './views/crud.vue'),
      meta: { 
        requiresAuth: true,
        admin: true
      }
    },
    {
      path: '/grafico',
      name: 'grafico',
      component: () => import(/* webpackChunkName: "about" */ './views/grafico.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/grafico2',
      name: 'grafico2',
      component: () => import(/* webpackChunkName: "about" */ './views/grafico2.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/grafico3',
      name: 'grafico3',
      component: () => import(/* webpackChunkName: "about" */ './views/grafico3.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/grafico4',
      name: 'Gráfico 04',
      component: () => import(/* webpackChunkName: "about" */ './views/grafico4.vue'),
      meta: { 
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
        next({
            path: '/login',
            params: { nextUrl: to.fullPath }
        })
    } else {
        let access = jwt(localStorage.getItem('accessToken') );
        //let user = JSON.parse(localStorage.getItem('user'))
        console.log('path: ' + to.name)
        if(to.matched.some(record => record.meta.admin)) {
            if(access.admin == true ){
                next()
            }
            else{
                next({ name: 'home'})
            }
        }else {
            next()
        }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'home'})
      }
  }else {
      next() 
  }
})


export default router
