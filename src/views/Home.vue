<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Project Traceability</v-toolbar-title>
    </v-app-bar>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      showLogin     : false,
    }),
    methods: {
      showPopupLogin() {
        this.showLogin = !this.showLogin
      },
    }
  }
</script>
