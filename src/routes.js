import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import TraceabilityMenu from './views/TraceabilityMenu.vue'
import UserMenu from './views/modules/administration/UserMenu.vue'
import RolMenu from './views/modules/administration/RolMenu.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/trazabilidad', component: TraceabilityMenu, name: 'traceability-menu' },
  { path: '/trazabilidad/administracion/usuarios', component: UserMenu, name: 'administration-user-menu'},
  { path: '/trazabilidad/administracion/roles', component: RolMenu, name: 'administration-rol-menu'},    
  // route level code-splitting// this generates a separate chunk (about.[hash].js) for this route// which is lazy-loaded when the route is visited.component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  {path: '/about', component: About, name: 'about'}
]
export default routes;

/*const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})*/

