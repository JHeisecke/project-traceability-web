import Vue from 'vue'
import App from './App.vue'
import VueRouter  from 'vue-router'
import vuetify from './plugins/vuetify'
import routes from './routes'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css';

Vue.use(vuetify);
Vue.config.productionTip = false
Vue.use(VueRouter)
//const router = new VueRouter({routes});
const router = new VueRouter({routes, mode: 'history'});

new Vue({
  render: h => h(App),
  router,
  vuetify
}).$mount('#app')
