import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/loginpage',
    name: 'Login',
    component: loadPage('LoginPage'),
    beforeEnter: authGuard
  },
  {
    // NOTE: use a bind on the application path to accept additional parameters that are sent in the URL. IF you are having redirect issues, consider using a bind.
    path: '/:application',
    name: 'Application',
    component: loadPage('ApplicationPage')
  },
  {
    path: '/testpage',
    name: 'Test',
    component: loadPage('TestPage'),
  },
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
