<template>
  <v-app id="app">
  <div id="system" v-if="authenticated == 'true'" key ="burger-menu">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Módulos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list dense>
        <v-list-group prepend-icon="mdi-settings" value="true">
          <template v-slot:activator>
            <v-list-item-title>Gestion de Configuración</v-list-item-title>
          </template>
            <v-list-item link>
              <v-list-item-title>Linea Bases</v-list-item-title>
            </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="folder_open" value="true">
          <template v-slot:activator>
            <v-list-item-title>Administración</v-list-item-title>
          </template>
          <v-list-item link>
            <v-list-item-title @click="showingAdminstrationUsers()">Usuarios</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title @click="showingAdminstrationRoles()">Roles</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title @click="showingAdminstrationPermissions()">Permisos</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="mdi-code-array" value="true">
          <template v-slot:activator>
            <v-list-item-title>Desarrollo</v-list-item-title>
          </template>
            <v-list-item link>
              <v-list-item-title @click="showingProjects()">Proyectos</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title >Items</v-list-item-title>
            </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Project Traceability</v-toolbar-title>
      <template>
        <v-spacer />   
          <v-btn color="primary" @click="logOut()"><v-icon>mdi-logout</v-icon>SALIR</v-btn>
      </template>
    </v-app-bar>

    <v-content>
          <!--COMPONENTES-->
          <router-view/>
    </v-content>
  </div>
  <!-- LA PANTALLA LOGIN SOLO SE MUESTRA SI NO ESTA LOGGEADO-->
    <div id="login" v-else-if="!autenticated" key="login">
      <v-app-bar app color="indigo" dark>
        <v-toolbar-title>Project Traceability</v-toolbar-title>
        <template>
          <v-spacer />
            <v-btn color="primary" @click="showPopupLogin()">Ingresar</v-btn>
        </template>
        
      </v-app-bar>
      <!-- Popup de login, solo se muestra si showLogin es true showLogin viene de Login.vue-->
      
      <v-content>
        <PopupLogin @authenticatedUser="setAuthentication" v-show="showLogin"/>
      </v-content>
      <v-footer color="indigo" app>
        <span class="white--text">&copy; Facultad Politecnica - LCIK - 2020</span>
      </v-footer>    
    </div>
  </v-app>
</template>



<script>
  import 'material-design-icons-iconfont/dist/material-design-icons.css';
  import PopupLogin from '@/components/PopupLogin.vue';
  export default {
    name: 'App',
    components: {
      PopupLogin
    },
    props: {
      source: String,
    },
    data: () => ({
      authenticated : false,
      showLogin     : false,
      drawer        : null
    }),
    mounted: function() {
      // Crea el objeto autenticated en el storage cliente
      if (localStorage.authenticated) {
        this.authenticated = localStorage.authenticated;
      }
    },
    methods: {
      setAuthentication(userDTO){
        if(userDTO.id != null){
          location.reload()
          localStorage.setItem('authenticated', true)
          this.authenticated = true
        }
      },
      showingAdminstrationUsers() {      
        this.$router.push({name: 'administration-user-menu'}).catch({name: 'traceability-menu'});
      },
      showingAdminstrationRoles() {
        this.$router.push({name: 'administration-rol-menu'});
      },
      showingProjects() {
        this.$router.push({name: 'traceability-menu'});
      },
      logOut(){
        this.$router.push({name: 'home'});
        localStorage.removeItem('authenticated')
        this.authenticated = false
        location.reload()
      },
      showPopupLogin() {
        this.showLogin = !this.showLogin
      },
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>