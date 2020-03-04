<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
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
        <v-spacer />
          <v-btn color="primary" @click="showCard" >Ingresar</v-btn>
      </template>
      <v-card-actions>
        <v-btn 
        color="white" 
        class="black--text"
        v-on="on">
        Registrarse
        </v-btn>
      </v-card-actions>
      
    </v-app-bar>
    <PopupLogin/>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
          </v-col>
        </v-row>
      </v-container>
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
import PopupLogin from '@/components/PopupLogin.vue'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    components: {
        PopupLogin
    }
  }
</script>
