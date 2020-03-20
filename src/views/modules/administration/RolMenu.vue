<template>
  <v-app id="inspire">


    <v-content>
      <!-- Inserta tabla de roles -->
      <!-- <vueTableRol  :headers="headers" :items="items" :itemsPerPage="itemsPerPage"></vueTableRol>     -->
      <vueTableRol></vueTableRol>
    </v-content>

  </v-app>
</template>

<script>
  import vueTableRol from '@/components/administration/vue-table-rol.vue'
  export default {
    components: {
        vueTableRol
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      showUsers: false,
      usersPerPage: "5",
      section: "users",
    }),
  }
</script>