import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import TraceabilityMenu from './views/TraceabilityMenu.vue'
//import UserMenu from './components/administration/vue-table-users.vue'
import UserMenu from './views/modules/administration/UserMenu.vue'
import RolMenu from './components/administration/vue-table-rol.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/trazabilidad', component: TraceabilityMenu, name: 'traceability-menu' },
  { path: '/trazabilidad/administracion/usuarios', component: UserMenu, name: 'administration-user-menu'},
  { path: '/trazabilidad/administracion/roles', component: RolMenu, name: 'administration-rol-menu'},    
]
export default routes;