<template>
  <v-container>
      <v-data-table
          :headers="headers"
          :items="projects"
          :items-per-page="itemsPerPage"
          class="elevation-1">
          
          <template v-slot:item.estate="{ item }">
            <v-chip :color="getColor(item.estate)" dark>{{ item.estate }}</v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
                <tr>
                  <td>               
                        <v-btn class="mx-1" fab dark small color="blue" @click="editTasks(item.projectCode)">
                            <v-icon dark>mdi-lead-pencil</v-icon>
                        </v-btn>                                          
                  </td>
                </tr>
          </template>
      </v-data-table>
  </v-container>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      itemsPerPage: "5",
      headers: [
          { text: 'Proyecto', value: 'projectName' },
          { text: 'Editar Items', value: 'actions' },
          { text: 'Estado', value: 'estate' },
      ],
      projects: [
          {
            projectCode: '1',
            projectName: 'Aplicacion iOS para BNF',
            estate: 'EN CURSO',
            actions: '',
          },
          {
            projectCode: '2',
            projectName: 'Herramienta de Evaluacion de PYMES',
            estate: 'EN CURSO',
            actions: '',
          },
          {
            projectCode: '3',
            projectName: 'Pago de servicios automático',
            estate: 'EN PRODUCCIÓN',
            actions: '',        
          },
          {
            projectCode: '4',
            projectName: 'Herramienta CRM 2.0',
            estate: 'EN PRODUCCIÓN',
            actions: '',        
          },
          {
            projectCode: '5',
            projectName: 'Encuestas para clientes de la web',
            estate: 'ANÁLISIS',
            actions: '',          
          },
          {
            projectCode: '6',
            projectName: 'Prestamos desde ATM',
            estate: 'EN PRODUCCIÓN',
            actions: '',        
          },        
        ]
    }),
    methods: {
      getColor (estate) {
        if (estate == "ANÁLISIS") return 'red'
        else if (estate == "EN CURSO") return 'blue'
        else return 'green'
      },
      editTasks (codigo) {
        alert(`estas editando tareas del proyecto ${codigo}`)
        this.$router.push({name: 'desarrollo-task-edit'});
      },
      listProjectUsers (codigo) {
        alert(`estas viendo los usuarios del proyecto n°${codigo}`)
      },
      viewProject (codigo) {
        alert(`estas viendo el proyecto n°${codigo}`)
      },
    }
  }
</script>