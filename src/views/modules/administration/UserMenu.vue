<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
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
              <v-list-item-title @click="showingUsers()">Usuarios</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title @click="showingRoles()">Roles</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title >Permisos</v-list-item-title>
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

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Project Traceability</v-toolbar-title>
      <template>
        <v-spacer />   
          <v-btn color="primary"><v-icon>mdi-logout</v-icon>SALIR</v-btn>
      </template>
    </v-app-bar>

    <v-content>
      <vueTableUsers  :headers="headers" :items="items" :itemsPerPage="itemsPerPage"></vueTableUsers>       
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; Facultad Politecnica - LCIK - 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import vueTableUsers from '@/components/administration/vue-table-users.vue';
  export default {
    components: {
        vueTableUsers
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      showUsers: false,
      usersPerPage: "5",
      section: "users",
      headers: [
          {
            text: 'Username',
            align: 'start',
            sortable: false,
            value: 'username',
          },
          { text: 'Nombre Completo', value: 'nombreCompleto' },
          { text: 'E-mail', value: 'email' },
          { text: 'Acciones', value: 'actions' }
      ],
      items: [
        {
          username: 'jheisecke',
          nombreCompleto: 'Javier Heisecke',
          email: 'jheisecke@gmail.com',
          password: '123456',
        },    
        {
          username: 'pvillagra',
          nombreCompleto: 'Paula Villagra',
          email: 'pvillagra@gmail.com',
          password: '123456',
        },  
        {
          username: 'ylopez',
          nombreCompleto: 'Yesshua Lopez',
          email: 'ylopez@gmail.com',
          password: '123456',
        }, 
        {
          username: 'mfare',
          nombreCompleto: 'Matias Fare',
          email: 'mfare@gmail.com',
          password: '123456',
        }                         
      ],
    }),
    methods: {
      showingProjects() {
        this.$router.push({name: 'traceability-menu'});
      },
      showingRoles() {
        this.$router.push({name: 'administration-rol-menu'});
      }
    }
  }
</script>