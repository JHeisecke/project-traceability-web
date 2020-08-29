<template>
  <v-container>
    <loadingDialog :loadingMessage="loadingMessage" :loadingDialogShow="loadingDialogShow"></loadingDialog>
    <v-data-table
        :headers="headers"
        :items="baseLineList"
        :items-per-page="itemsPerPage"
        class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>LINEA BASES</v-toolbar-title>
            <v-spacer></v-spacer>            
          </v-toolbar>
        </template>        
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
                <tr>
                  <td>
                    <v-btn class="mx-1" fab dark small color="blue" @click="editBaseLine(item)">
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
//const axios = require('axios');
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
      baseLineList: [
        {
          id: 1,
          idFase: 1,
          estado: "CERRADO",
          fechaCreacion: "10/02/2020"
        },
        {
          id: 2,
          idFase: 1,
          estado: "CERRADO",
          fechaCreacion: "11/02/2020"
        },
        {
          id: 3,
          idFase: 1,
          estado: "CERRADO",
          fechaCreacion: "13/02/2020"
        },
        {
          id: 4,
          idFase: 2,
          estado: "ABIERTO",
          fechaCreacion: "14/02/2020"
        },
        {
          id: 5,
          idFase: 2,
          estado: "ABIERTO",
          fechaCreacion: "15/02/2020"
        },
        {
          id: 6,
          idFase: 1,
          estado: "ABIERTO",
          fechaCreacion: "16/02/2020"
        }         
      ],
      loadingMessage: "",
      headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Fase', value: 'idFase' },
          { text: 'Estado', value: 'estado' },
          { text: 'Fecha Creación', value: 'fechaCreacion' },
          { text: 'Acciones', value: 'actions' },
      ],
    }),
    methods: {
      getColor (estado) {
        if (estado == "CERRADO") return 'red'
        else if (estado == "ABIERTO") return 'blue'
        else return 'green'
      },
      editBaseLine (item) {
        console.log(`${item}`)
        //this.$router.push({name: 'desarrollo-task-edit', params : {id: item.id}});
      },
    },
    mounted: function() {
      /*this.loadingDialogShow = true
      this.loadingMessage = "Obteniendo proyectos"
      axios.get("http://localhost:8081/api/proyectos")
      .then(response => {
        this.listProjects = response.data.list
        this.loadingDialogShow = false
      }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })*/
    }
  }
</script>