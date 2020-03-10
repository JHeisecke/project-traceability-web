<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Módulo de Administración</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-source-merge</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Módulo de Desarrollo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>        
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
          <v-spacer/>
          <v-btn color="primary"><v-icon>mdi-home</v-icon></v-btn>
      </template>
      <v-card-actions>
          <v-btn color="primary"><v-icon>mdi-logout</v-icon>SALIR</v-btn>
      </v-card-actions>         
    </v-app-bar>

    <v-content>
      <UserForm></UserForm>
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
  import UserForm from '@/components/administration/UserForm.vue';
  export default {
    components: {
        UserForm
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      
    }),
  }
</script>