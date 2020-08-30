<template>
  <v-container>
    <loadingDialog :loadingMessage="loadingMessage" :loadingDialogShow="loadingDialogShow"></loadingDialog>
    <v-data-table
        :headers="headers"
        :items="listProjects"
        :items-per-page="itemsPerPage"
        class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>PROYECTOS</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>        
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
        </template>

        <template v-slot:[`item.tareas`]="{ item }">
                <tr>
                  <td>
                    <v-btn class="mx-1" fab dark small color="blue" @click="editProjectBaseLine(item)">
                      <v-icon dark>mdi-lead-pencil</v-icon>
                    </v-btn> 
                  </td>
                </tr>
        </template>
    </v-data-table>

  </v-container>
</template>

<script>
import loadingDialog from '@/components/loading-dialog.vue';
const axios = require('axios');
  export default {
    components: {
      loadingDialog
    },
    props: {
      source: String,
    },
    data: () => ({
      loadingDialogShow : false,
      itemsPerPage: 10,
      listProjects: [],
      loadingMessage: "",
      headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Proyecto', value: 'nombre' },
          { text: 'Estado', value: 'estado' },
          { text: 'Linea Bases', value: 'tareas' },
      ],
    }),
    methods: {
      getColor (estado) {
        if (estado == "ANÁLISIS") return 'red'
        else if (estado == "EN CURSO") return 'blue'
        else return 'green'
      },
      editProjectBaseLine (item) {
        this.$router.push({name: 'line-base-menu', params : {id: item.id}});
      },
    },
    mounted: function() {
      this.loadingDialogShow = true
      this.loadingMessage = "Obteniendo proyectos"
      axios.get("http://localhost:8081/api/proyectos")
      .then(response => {
        this.listProjects = response.data.list
        this.loadingDialogShow = false
      }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>