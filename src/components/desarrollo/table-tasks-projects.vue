<template>
  <v-container>
      <v-data-table
          :headers="headers"
          :items="listProjects"
          :items-per-page="itemsPerPage"
          class="elevation-1">
          
          <template v-slot:item.estado="{ item }">
            <v-chip :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
                <tr>
                  <td>               
                        <v-btn class="mx-1" fab dark small color="blue" @click="editTasks(item)">
                            <v-icon dark>mdi-lead-pencil</v-icon>
                        </v-btn>                                          
                  </td>
                </tr>
          </template>
      </v-data-table>
  </v-container>
</template>

<script>
const axios = require('axios');
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      itemsPerPage: "5",
      listProjects: [],
      project : {
        id : null,
        nombre : null,
        estado : null,
        fechaInicio : null,
        fechaFin : null,
        idLider : null,
        descripcion : null,
      },
      headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Proyecto', value: 'nombre' },
          { text: 'Estado', value: 'estado' },
          { text: 'Acciones', value: 'actions' },
      ]
    }),
    methods: {
      getColor (estate) {
        if (estate == "ANÁLISIS") return 'red'
        else if (estate == "EN CURSO") return 'blue'
        else return 'green'
      },
      editTasks (item) {
        this.$router.push({name: 'desarrollo-task-edit', params : {id: item.id}});
      }
    },
    mounted: function() {
      this.loadingDialogShow = true
      this.loadingMessage = "Obteniendo proyectos"
      axios.get("http://localhost:8081/api/proyectos")
      .then(response => {
        console.log(response.data.list  )
        this.listProjects = response.data.list
        this.loadingDialogShow = false
      }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>