<template>
  <div id="projects">
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
                      <v-btn class="mx-1" fab dark small color="blue" @click="viewProject(item.projectCode)">
                          <v-icon dark>mdi-eye</v-icon>
                      </v-btn>                 
                      <v-btn class="mx-1" fab dark small color="blue" @click="editProject(item.projectCode)">
                          <v-icon dark>mdi-lead-pencil</v-icon>
                      </v-btn>                  
                      <v-btn class="mx-1" fab dark small color="blue" @click="listProjectUsers(item.projectCode)">
                          <v-icon dark>mdi-account-edit</v-icon>
                      </v-btn>                           
                </td>
              </tr>
        </template>
    </v-data-table>
  </div>
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
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'projectCode',
          },
          { text: 'Proyecto', value: 'projectName' },
          { text: 'Estado', value: 'estate' },
          { text: 'Acciones', value: 'actions' },
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
      editProject (codigo) {
        alert(`estas editando el proyecto n°${codigo}`)
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