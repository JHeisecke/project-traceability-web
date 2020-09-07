
<template>
<v-container>
  <v-app id="app">
    <v-card>
      <v-card-title>
        TAREAS DEL PROYECTO
        <v-spacer></v-spacer>
        <div class="text-center pt-2">
          <v-btn color="primary" class="mr-2" @click="createTask()">NUEVA TAREA</v-btn>
        </div>
        <!-- BUSCADOR
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        -->
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaTareas"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
                  <tr>
                    <td>
                        <!--<v-btn class="mx-1" fab dark small color="blue" @click="viewTask(item)">
                            <v-icon dark>mdi-eye</v-icon>
                        </v-btn>-->
                        <v-btn class="mx-1"  v-if="canEdit(item)" fab dark small color="blue" @click="editTask(item)">
                            <v-icon dark>mdi-lead-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mx-1"  v-else fab dark small color="gray">
                            <v-icon dark>mdi-lead-pencil</v-icon>
                        </v-btn>                        
                        <v-btn class="mx-1" v-if="canEdit(item)" fab dark small color="blue" @click="deleteTask(item)">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn class="mx-1"  v-else fab dark small color="gray">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>                            
                    </td>
                  </tr>
          </template>
      </v-data-table>
      <!--Form crear TAREA--->
      <v-dialog width=800 v-model="showTaskForm" persistent>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat >
            <v-toolbar-title>TAREA</v-toolbar-title>
            <v-spacer/>
            <v-tooltip bottom>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="validForm" ref="form" v-if="editMode">
              <v-text-field
                v-model="tarea.nombre"
                label="Nombre Tarea"
                prepend-icon="rate_review"
                :rules="nameRolRules"
                name="nombre"
                type="text" />
              <v-text-field
                v-model="tarea.descripcion"
                label="Descripcion"
                prepend-icon="rate_review"
                name="descripcion"
                type="text" />
                <v-row align="center">
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="tarea.prioridad"
                      :items="listaPrioridad"
                      label="PRORIDAD"
                      chips
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="tarea.estado"
                      :items="listaEstados"
                      label="ESTADO"
                      chips
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="tarea.idItemPadre"
                      :items="listaTareasPadre"
                      label="TAREA PADRE"
                      chips
                      item-value="id"
                      item-text="nombre"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                    v-model="tarea.version"
                    label="VERSION"
                    prepend-icon="rate_review"
                    name="version"
                    :readonly="true"
                    type="text" />
                  </v-col>
                </v-row>
                <v-text-field
                v-model="tarea.observacion"
                label="Observacion"
                prepend-icon="rate_review"
                name="observacion"
                type="text" />
          </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="success" @click="saveTask()">Guardar</v-btn>
            <v-btn color="error" @click="close()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</v-container>
</template>

<script>
const axios = require('axios');
  export default {
    data: () => ({
      prop :{
        projecto : {}
      },
      dialog: false,
      items:[],
      fases:[],
      validForm  : false,
      showTaskForm: false,
      showPermissionsForm: true,
      editMode: false,
      tarea : {
        id : null,
        nombre : null,
        version: null,
        prioridad: null,
        idFase: null,
        estado: null,
        descripcion : null,
        observacion: null,
        idItemPadre: null,
        idProyecto : null
      },
      listaEstados: [
        'INICIADO', 'PENDIENTE', 'FINALIZADO',
      ],
      listaPrioridad: [
        'alto', 'medio', 'bajo',
      ],
      headers: [
        { text: 'Nombre Tarea', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listaTareas: [],
      listaTareasPadre: [],
      /*Almacena permisos por rol*/
      permisosrol: [],
      editedTask: -1,
      nameRolRules: [
        v => !!v || "Nombre Rol es requerido"
      ],
    }),
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      createTask(){
        this.tarea.nombre = ""
        this.tarea.descripcion = ""
        this.tarea.prioridad= ""
        this.tarea.estado= ""
        this.tarea.version= 1
        this.tarea.idProyecto = this.$route.params.id
        this.tarea.idFase = this.$route.params.idFase
        this.editMode = true
        this.showTaskForm = true        
        if(this.listaTareas.length == 0 && this.fases.length > 1){
          let currentIndex = this.fases.indexOf(parseInt(this.tarea.idFase))
          var URL = `http://localhost:8081/api/item/fase/last/${this.fases[currentIndex+1]}`
          axios.get(URL)
          .then(response => {
            //this.tarea.idItemPadre = response.data.dto.id
            this.listaTareasPadre.push(response.data.dto)
          }).catch(errorResponse => {
            this.loadingDialogShow = false
            alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
          })          
        } else {
          this.listaTareasPadre = this.listaTareas
        }
      },
      saveTask(){
        axios.post("http://localhost:8081/api/item/save",this.tarea,{headers:{'X-Requested-With':'XMLHttpRequest'}})
          .then(response => {
            this.tarea = response.data.dto
            if (this.editedTask > -1) {
              Object.assign(this.listaTareas[this.editedTask], this.tarea)
            } else {             
              this.listaTareas.push(this.tarea)
            }
          }).catch(errorResponse => {
            this.loadingDialogShow = false
            alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
          })
        this.close()
        this.showTaskForm = false
        this.editMode = false
      },
      editTask (item) {
        this.editedTask = this.listaTareas.indexOf(item)
        this.tarea = Object.assign({}, item)
        this.editMode = true
        this.showTaskForm = true
        this.listaTareasPadre = []
        if (item.idItemPadre != null) {
          if (this.listaTareasPadre.indexOf(item.idItemPadre) == -1) {
            axios.get(`http://localhost:8081/api/item/data/${item.idItemPadre}`)
            .then(response => {
              this.listaTareasPadre.push(response.data.dto)
            }).catch(errorResponse => {
                alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
            })
          } else {
            this.listaTareasPadre = this.listaTareas
          }
        }else {
            this.listaTareasPadre = this.listaTareas
        }
      },
      deleteTask (item) {
        const index = this.listaTareas.indexOf(item)
        if (confirm('Quieres eliminar esta tarea?') && this.listaTareas.splice(index, 1)){
            axios.delete(`http://localhost:8081/api/item/delete/${item.id}`)
              .then(response => {
                console.log(`${response.data.listaTareas}`)
              }).catch(errorResponse => {
                this.loadingDialogShow = false
                alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
              })
        }
      },
      getColor(estado) {
        //'INICIADO', 'PENDIENTE', 'FINALIZADO'
        if (estado == "PENDIENTE") return 'orange'
        else if (estado == "INICIADO") return 'blue'
        else if (estado == "FINALIZADO") return 'green'
      },
      close () {
        this.dialog = false
        this.showTaskForm = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedTask = -1
        }, 300)
      },
      canEdit(item) {
        if(item.idLineaBase == null) return true
        return false
      }
    },
    mounted: function() {
      // Obtiene id de proyecto del route
      let idProject = this.$route.params.id
      let idPhase = this.$route.params.idFase
      var URL = `http://localhost:8081/api/item/${idProject}/${idPhase}`
      axios.get(URL)
      .then(response => {
        //console.log(`${response.data.listaTareas}`)
       this.listaTareas = response.data.list
      }).catch(errorResponse => {
         this.loadingDialogShow = false
         alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })

      URL = `http://localhost:8081/api/fase/proyecto/${idProject}`
      axios.get(URL)
      .then(response => {
        this.fases = response.data.list.map(a => a.id)
      }).catch(errorResponse => {
        alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>