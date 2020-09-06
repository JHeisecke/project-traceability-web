
<template>
<v-container>
  <v-app id="app">
    <v-card>
      <v-card-title>
        TAREAS DEL PROYECTO
        <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-2" @click="createTask()">NUEVA TAREA</v-btn>
        <v-spacer></v-spacer>
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
        :items="listatareas"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
                  <tr>
                    <td>
                        <v-btn class="mx-1" fab dark small color="blue" @click="viewTask(item)">
                            <v-icon dark>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="blue" @click="editTask(item)">
                            <v-icon dark>mdi-lead-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="blue" @click="deleteTask(item)">
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
                      v-model="tarea.id_tarea_padre"
                      :items="listatareas"
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
        id_tarea_padre: null,
        idProyecto : null
      },
      listaEstados: [
        'iniciado', 'pendiente', 'finalizado',
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
      listatareas: [],
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
      },
      saveTask(){
        //console.log(this.tarea)
        axios.post("http://localhost:8081/api/item/save",this.tarea,{headers:{'X-Requested-With':'XMLHttpRequest'}})
          .then(response => {
            this.tarea = response.data.dto
            if (this.editedTask > -1) {
              Object.assign(this.listatareas[this.editedTask], this.tarea)
            } else {             
              this.listatareas.push(this.tarea)
            }
          }).catch(errorResponse => {
            this.loadingDialogShow = false
            alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
          })
        //window.location.reload()
        this.close()
        this.showTaskForm = false
        this.editMode = false
      },
      editTask (item) {
        this.editedTask = this.listatareas.indexOf(item)
        this.tarea = Object.assign({}, item)
        this.editMode = true
        this.showTaskForm = true
        //axios edit task
      },
      deleteTask (item) {
        //alert(`estas borrando el Rol ${item.nombre}`)
        const index = this.listatareas.indexOf(item)
        if (confirm('Are you sure you want to delete this role?') && this.listatareas.splice(index, 1)){
          //axios delete task
            axios.delete(`http://localhost:8081/api/item/delete/${item.id}`)
              .then(response => {
                console.log(`${response.data.listatareas}`)
              }).catch(errorResponse => {
                this.loadingDialogShow = false
                alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
              })
              //window.location.reload()
        }
      },
      close () {
        this.dialog = false
        this.showTaskForm = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedTask = -1
        }, 300)
      },
    },
    mounted: function() {
      // Obtiene id de proyecto del route
      let idProject = this.$route.params.id
      let idPhase = this.$route.params.idFase
      var URL = `http://localhost:8081/api/item/${idProject}/${idPhase}`
      axios.get(URL)
      .then(response => {
        //console.log(`${response.data.listatareas}`)
       this.listatareas = response.data.list
      }).catch(errorResponse => {
         this.loadingDialogShow = false
         alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>