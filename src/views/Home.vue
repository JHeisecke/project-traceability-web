<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Project Traceability</v-toolbar-title>
      <template>
        <v-spacer />
          <v-btn color="primary" @click="showPopupLogin()">Ingresar</v-btn>
      </template>
      
    </v-app-bar>
    <!-- Popup de login, solo se muestra si showLogin es true showLogin viene de Login.vue-->
    <PopupLogin v-show="showLogin"/>
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
import PopupLogin from '@/components/PopupLogin.vue';
  export default {
    props: {
      source: String,
    },
    data: () => ({
      showLogin     : false,
    }),
    components: {
        PopupLogin,
    },
    methods: {
      showPopupLogin() {
        this.showLogin = !this.showLogin
      },
    }
  }
</script>
