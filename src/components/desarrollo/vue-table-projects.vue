<template>
  <v-container>
    <loadingDialog :loadingMessage="loadingMessage" :loadingDialogShow="loadingDialogShow"></loadingDialog>
    <div class="text-center pt-2">
        <v-btn color="primary" class="mr-2" @click="createProject()">NUEVO PROJECTO</v-btn>
    </div>
    <v-data-table
        :headers="headers"
        :items="listProjects"
        :items-per-page="itemsPerPage"
        class="elevation-1">
        
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
        </template>

        <template v-slot:[`item.tareas`]="{ item }">
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
                      <v-btn class="mx-1" fab dark small color="red" @click="deleteProject(item)">
                          <v-icon dark>restore_from_trash</v-icon>
                      </v-btn>                           
                </td>
              </tr>
        </template>

        <template v-slot:[`item.descripcion`]="{ item }">
                <tr>
                  <td>
                    <v-btn color="primary" class="mr-2" @click="editTasks(item)">EDITAR FASES</v-btn>                                                         
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
              :rules="emptyRules"
              name="nombre" 
              type="text" />
            <v-text-field 
              v-model="project.descripcion"
              label="Descripcion" 
              prepend-icon="person"
              :rules="emptyRules"
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
                    hint="YYYY/MM/DD format"
                    :rules="emptyRules"
                    persistent-hint
                    prepend-icon="event"
                    @blur="project.fechaInicio = formatDate(project.fechaInicio)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="project.fechaInicio" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
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
                    hint="YYYY/MM/DD format"
                    :rules="emptyRules"
                    persistent-hint
                    prepend-icon="event"
                    @blur="project.fechaFin = formatDate(project.fechaFin)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="project.fechaFin" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
              <v-row align="center">
                  <v-select
                    v-model="project.idLider"
                    :items="listTeamLider"
                    label="TEAM LEADER"
                    :rules="emptyRules"
                    persistent-hint
                    item-value="id"
                    item-text="nombre"
                  ></v-select>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="project.estado"
                    :items="listEstados"
                    label="ESTADO"
                    :rules="emptyRules"
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
      //Permite seleccionar una fecha nueva en menuDate
      date: new Date().toISOString().substr(0, 10),
      validForm  : false,
      showProjectForm: false,
      editMode: false,
      loadingMessage: "cargando",
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
          { text: 'Acciones', value: 'tareas' },
          { text: 'FASES', value: 'descripcion' },
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
      ],
      // Reglas para campos de furmulario
      emptyRules: [
        v => !!v || "El campo es requerido"
      ],
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
          date = date.substring(0, 10)
          const [year, month, day] = date.split('-')
          //console.log(date)
          return `${year}-${month}-${day}`
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
      getColor(estado) {
        if (estado == "ANÁLISIS") return 'red'
        else if (estado == "EN CURSO") return 'blue'
        else return 'green'
      },
      // Permite editar un Poryecto existente usando el Form de creacion
      editProject (item) {
        this.editedProject = item.id
        // Formato de Fecha CAMBIA FORMATO ENVIADO POR EL BACK
        console.log(item)
        if (item.fechaInicio != null) {
          item.fechaInicio = this.formatDate(item.fechaInicio)
        }
        if (item.fechaFin != null) {
          item.fechaFin = this.formatDate(item.fechaFin)
        }
        this.project = Object.assign({}, item)
        this.editMode = true
        this.showProjectForm = true
      },
      listProjectUsers (project) {
        alert(`estas viendo los usuarios del proyecto "${project.nombre}"`)
      },
      viewProject (project) {
        alert(`estas viendo el proyecto "${project.nombre}"`)
      },
      deleteProject (project) {
        alert(`estas borrando el proyecto "${project.nombre}"`)
        var URL = `http://localhost:8081/api/proyecto/delete/${project.id}`
        console.log(URL)
        //Borra proyecto por ID
        axios.delete(URL)
          .then(response => {
              console.log(response.data.dto)
              this.refreshList()
            }).catch(errorResponse => {
              console.log(errorResponse)
              alert(`ERROR ${errorResponse.errorCode} - ${errorResponse}`)
            }) 
      },
      saveProject() {
        if (this.editedProject > -1) {
          console.log(this.project)
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
          this.loadingDialogShow = true
          this.loadingMessage = "Guardando Cambios"
          project.fechaAlta = this.formatDate(project.fechaAlta)
          console.log(project.fechaAlta)
          console.log(project)
          axios.post("http://localhost:8081/api/proyecto/save",project,{headers:{'X-Requested-With':'XMLHttpRequest'}})
          .then(response => {
              console.log(response.data.dto)
              this.loadingDialogShow = false
              this.refreshList()
            }).catch(errorResponse => {
              this.loadingDialogShow = false
              console.log(errorResponse)
              alert(`ERROR ${errorResponse.errorCode} - ${errorResponse}`)
            }) 
      },
      editTasks (item) {
        this.$router.push({name: 'desarrollo-phase-edit', params : {id: item.id}});
      },
      refreshList(){
        axios.get("http://localhost:8081/api/proyectos")
        .then(response => {
          console.log(response.data.list)
          this.listProjects = response.data.list
        }).catch(errorResponse => {
            this.loadingDialogShow = false
            alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
        })
      }
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