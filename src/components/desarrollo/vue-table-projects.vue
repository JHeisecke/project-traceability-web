<template>
  <div id="projects">
    <div class="text-center pt-2">
        <v-btn color="primary" class="mr-2" @click="createProject()">NUEVO PROJECTO</v-btn>
    </div>
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
                      <v-btn class="mx-1" fab dark small color="blue" @click="viewProject(item)">
                          <v-icon dark>mdi-eye</v-icon>
                      </v-btn>                 
                      <v-btn class="mx-1" fab dark small color="blue" @click="editProject(item)">
                          <v-icon dark>mdi-lead-pencil</v-icon>
                      </v-btn>                  
                      <v-btn class="mx-1" fab dark small color="blue" @click="listProjectUsers(item)">
                          <v-icon dark>mdi-account-edit</v-icon>
                      </v-btn>                           
                </td>
              </tr>
        </template>
    </v-data-table>

    <!--Form crear Proyecto--->
    <v-dialog width=800 v-model="showProjectForm" persistent>      
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat >
          <v-toolbar-title>PROYECTO</v-toolbar-title>
          <v-spacer/>
          <v-tooltip bottom>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="validForm" ref="form" v-if="editMode">
            <v-text-field  
              v-model="project.nombre"
              label="Nombre Proyecto" 
              prepend-icon="person"
              :rules="nameRolRules"
              name="nombre" 
              type="text" />
            <v-text-field 
              v-model="project.descripcion"
              label="Descripcion" 
              prepend-icon="person"
              :rules="userRolRules"
              name="descripcion" 
              type="text" />
          <!--Seccion de Fechas-->
          <!--Fechas Inicio-->
          <v-row>
            <v-col cols="12" lg="6">
              <v-menu ref="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px" >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="project.fechaInicio"
                    label="Fecha Inicio"
                    hint="DD/MM/YYYY format"
                    persistent-hint
                    prepend-icon="event"
                    @blur="project.fechaInicio = parseDate(project.fechaInicio)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="project.fechaInicio" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
              <p>Date in ISO format: <strong>{{ project.fechaInicio}}</strong></p>
            </v-col>
            <!--Fechas Fin-->
            <v-col cols="12" lg="6">
              <v-menu ref="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px" >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="project.fechaFin"
                    label="Fecha Fin"
                    hint="DD/MM/YYYY format"
                    persistent-hint
                    prepend-icon="event"
                    @blur="project.fechaFin = parseDate(project.fechaFin)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="project.fechaFin" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
              <p>Date in ISO format: <strong>{{ project.fechaFin }}</strong></p>
            </v-col>
          </v-row>
              <v-row align="center">
                  <v-select
                    v-model="project.idLider"
                    :items="listTeamLider"
                    label="TEAM LEADER"
                    persistent-hint
                    item-value="id"
                    item-text="nombre"
                  ></v-select>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="project.estado"
                    :items="listEstados"
                    label="ESTADO"
                    hint="Que estado desea asignar?"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
          </v-form>
        </v-card-text>             
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="saveProject()">Guardar</v-btn>
          <v-btn color="error" @click="close()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
const axios = require('axios');
  export default {
    props: {
      source: String,
    },
    data: () => ({
      //Permite seleccionar una fecha nueva en menuDate
      date: new Date().toISOString().substr(0, 10),
      validForm  : false,
      showProjectForm: false,
      itemsPerPage: 10,
      editedProject: -1,
      listProjects: [],
      TeamLider : {
        id : null,
        nombre : null
      },
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
      ],
      listEstados: [
        'EN CURSO', 'EN PRODUCCIÓN', 'ANÁLISIS'
      ],
      listTeamLider: [
        {
          id : 0,
          nombre: 'fare',    
        },
        {
          id : 1,
          nombre: 'javier',    
        },
        {
          id : 2,
          nombre: 'test',    
        }
      ]
    }),
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      createProject(){
        this.project.id = null
        this.project.nombre = ""
        this.project.descripcion = ""
        this.project.idLider = null
        this.project.estado = ""
        this.project.fechaInicio = this.date //Por defecto toma fecha del sistema
        this.project.fechaFin = null
        this.editMode = true
        this.showProjectForm = true
      },
      formatDate (date) {
          if (!date) return null
          const [year, month, day] = date.split('-')
          return `${day}/${month}/${year}`
      },
      parseDate (date) {
          if (!date) return null
          const [month, day, year] = date.split('/')
          console.log(`${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`)
          return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
      },
      close () {
        this.showProjectForm = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedProject = -1
        }, 300)
      },
      getColor (estado) {
        if (estado == "ANÁLISIS") return 'green'
        else if (estado == "EN CURSO") return 'blue'
        else return 'red'
      },
      // Permite editar un Poryecto existente usando el Form de creacion
      editProject (item) {
        alert(`estas editando el proyecto ${item.nombre}`)
        this.editedProject = item.id
        // Formato de Fecha CAMBIA FORMATO ENVIADO POR EL BACK
        if (item.fechaInicio != null) {
          item.fechaInicio = this.parseDate(item.fechaInicio)
        }
        if (item.fechaFin != null) {
          item.fechaFin = this.parseDate(item.fechaFin)
        }
        this.project = Object.assign({}, item)
        this.editMode = true
        this.showProjectForm = true
      },
      listProjectUsers (codigo) {
        alert(`estas viendo los usuarios del proyecto n°${codigo}`)
      },
      viewProject (codigo) {
        alert(`estas viendo el proyecto n°${codigo}`)
      },
      saveProject() {
        if (this.editedProject > -1) {
          console.log(this.project)
          Object.assign(this.listProjects[this.project.id], this.project)
          //Guarda los cambios en la BD
          this.saveProjectBackEnd(this.project) 
        } else {
          this.listProjects.push(this.project)
          //Guarda los cambios en la BD
          console.log(this.project)
          this.saveProjectBackEnd(this.project) 
        }
        this.close()
        this.showRoleForm = false
        this.editMode = false
      },
      saveProjectBackEnd(project) {
          axios.post("http://localhost:8081/api/proyecto/save",project,{headers:{'X-Requested-With':'XMLHttpRequest'}})
          .then(response => {
              console.log(response)
              this.loadingDialogShow = false
              window.location.reload()
            }).catch(errorResponse => {
              this.loadingDialogShow = false
              console.log(errorResponse)
              alert(`ERROR ${errorResponse.errorCode} - ${errorResponse}`)
            }) 
      }
    },
    mounted: function() {
      axios.get("http://localhost:8081/api/proyectos")
      .then(response => {
        console.log(response.data.dto)
        this.listProjects = response.data.dto
      }).catch(errorResponse => {
          //this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>