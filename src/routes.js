import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import UserMenu from './components/administration/vue-table-users.vue'
import RolMenu from './components/administration/vue-table-rol.vue'
import PermisoMenu from './components/administration/vue-table-permiso.vue'
import Projects from './components/desarrollo/vue-table-projects.vue'
import TasksEdit from './components/desarrollo/tasks-edit.vue'
import ProjectsConfig from './components/configuracion/vue-table-projects-config.vue'
import baseLine from './components/configuracion/vue-table-baseLine.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/trazabilidad', component: Projects, name: 'traceability-menu' },
  { path: '/trazabilidad/administracion/usuarios', component: UserMenu, name: 'administration-user-menu'},
  { path: '/trazabilidad/administracion/roles', component: RolMenu, name: 'administration-rol-menu'},
  { path: '/trazabilidad/administracion/permisos', component: PermisoMenu, name: 'administration-permissions-menu'},
  { path: '/trazabilidad/desarrollo/tareas/:id', component: TasksEdit, name: 'desarrollo-task-edit'},   
  { path: '/trazabilidad/configuracion/proyectos', component: ProjectsConfig, name: 'configuration-projects-menu' }, 
  { path: '/trazabilidad/configuracion/:id/linea-bases', component: baseLine, name: 'line-base-menu' },             
]
export default routes;