<template>
  <div id="app">
    <loadingDialog :loadingMessage="loadingMessage" :loadingDialogShow="loadingDialogShow"></loadingDialog>
    <v-data-table
      :headers="headers"
      :items="listaroles"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>PERMISOS</v-toolbar-title>
          <!-- Barra Vertical -->
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>  
  </div>

</template>

<script>
//const axios = require('axios');
import loadingDialog from '@/components/loading-dialog.vue';

  export default {
    data: () => ({
      loadingDialogShow : false,
      loadingMessage  : "",
      editMode: true
    }),
    components : {
      loadingDialog
    },
  }
</script>
    