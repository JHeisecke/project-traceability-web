<template>
  <div id="app">
    <loadingDialog :loadingMessage="loadingMessage" :loadingDialogShow="loadingDialogShow"></loadingDialog>
    <v-data-table
      :headers="headers"
      :items="listaPermisos"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>PERMISOS</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>  
  </div>

</template>

<script>
const axios = require('axios');
import loadingDialog from '@/components/loading-dialog.vue';

  export default {
    data: () => ({
      loadingDialogShow : false,
      loadingMessage  : "",
      editMode: true,
      listaPermisos : [],
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Descripcion', value: 'descripcion' }
      ],
    }),
    components : {
      loadingDialog
    },
    mounted: function() {
      this.loadingDialogShow = true
      this.loadingMessage = "Obteniendo permisos del sistema"
      //obtencion de usuarios
      axios.get("http://localhost:8081/api/permisos")
      .then(response => {
        this.listaPermisos = response.data.list
        this.loadingDialogShow = false
      }).catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
          this.loadingDialogShow = false
      })
    }
  }
</script>
    