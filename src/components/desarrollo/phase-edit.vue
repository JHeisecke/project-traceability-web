
<template>
<v-container>
  <v-app id="app">
    <v-card>
      <v-card-title>
        FASES DEL PROYECTO
        <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-2" @click="createPhase()">NUEVA FASE</v-btn>
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
        :items="listafases"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
                  <tr>
                    <td>
                        <v-btn color="primary" class="mr-2" @click="tasksEdit(item)">EDITAR TAREAS</v-btn>

                        <v-btn class="mx-1" fab dark small color="blue" @click="editPhase(item)">
                            <v-icon dark>mdi-lead-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mx-1" fab dark small color="blue" @click="deletePhase(item)">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                  </tr>
          </template>
      </v-data-table>
      <!--Form crear TAREA--->
      <v-dialog width=800 v-model="showPhaseForm" persistent>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat >
            <v-toolbar-title>Fase</v-toolbar-title>
            <v-spacer/>
            <v-tooltip bottom>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="validForm" ref="form" v-if="editMode">
              <v-text-field
                v-model="phase.id"
                label="Fase"
                prepend-icon="rate_review"
                name="nombre"
                type="text" />
                <v-select
                  v-model="phase.estado"
                  :items="listaEstados"
                  label="ESTADO"
                  chips
                  persistent-hint
                ></v-select>
                <!--
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
                    :rules="userRolRules"
                    name="version"
                    :readonly="true"
                    type="text" />
                  </v-col>
                </v-row>
                <v-text-field
                v-model="tarea.observacion"
                label="Observacion"
                prepend-icon="rate_review"
                :rules="userRolRules"
                name="observacion"
                type="text" />
                -->
          </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="success" @click="savePhase()">Guardar</v-btn>
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
      showPhaseForm: false,
      showPermissionsForm: false,
      editMode: false,
      phase : {
        id : null,
        idProyecto : null,
        estado: null,
        fechaAlta : null,
        fechaModificacion: null,
        high_user: null
      },
      listaEstados: [
        'inicial', 'desarrollo', 'para revisión', 'completa'
      ],
      listaPrioridad: [
        'alto', 'medio', 'bajo',
      ],
      headers: [
        { text: 'Fase', value: 'id' },
        { text: 'Orden', value: 'orden' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listafases: [
        {
          id : 1,
          idProyecto : 1,
          estado: "inicial",
          fechaAlta : "20/01/2020",
          modification_user: "mfare",
          high_user: "mfare"
        },
        {
          id : 2,
          idProyecto : 1,
          estado: "desarrollo",
          fechaAlta : "20/01/2020",
          modification_user: "mfare",
          high_user: "mfare"
        },
        {
          id : 3,
          idProyecto : 1,
          estado: "para revisión",
          fechaAlta : "20/01/2020",
          modification_user: "mfare",
          high_user: "mfare"
        },
        {
          id : 4,
          idProyecto : 1,
          estado: "completa",
          fechaAlta : "20/01/2020",
          modification_user: "mfare",
          high_user: "mfare"
        }
      ],
      /*Almacena permisos por rol*/
      permisosrol: [],
      editedPhase: -1,
      nameRolRules: [
        v => !!v || "Fase es requerido"
      ],
    }),
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      createPhase(){
        this.showPhaseForm = true
        this.phase.id = null
        this.phase.idProyecto = this.$route.params.id
        this.phase.estado= ""
        this.phase.fechaAlta= ""
        this.phase.fechaModificacion= ""
        this.phase.high_user= ""
        this.editMode = true
      },
      tasksEdit(){
        //tasksEdit(item) -- recibir item para cuando tenga endpoint tareas por fase
       // this.$router.push({name: 'desarrollo-task-edit', params : {id: item.id}});
        this.$router.push({name: 'desarrollo-task-edit', params : {id: this.$route.params.id}});
      },
      savePhase(){
        console.log(this.phase)
        axios.post("http://localhost:8081/api/fase/save",this.phase,{headers:{'X-Requested-With':'XMLHttpRequest'}})
          .then(response => {
            this.tarea = response.data.dto
            if (this.editedPhase > -1) {
              Object.assign(this.listafases[this.editedPhase], this.phase)
            } else {             
              this.listatareas.push(this.tarea)
            }
          }).catch(errorResponse => {
            this.loadingDialogShow = false
            alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
          })
        //window.location.reload()
        this.close()
        this.showPhaseForm = false
        this.editMode = false
      },
      editPhase (item) {
        this.editMode = true
        this.showPhaseForm = true
        this.editedPhase = this.listafases.indexOf(item)
        this.tarea = Object.assign({}, item)
        //axios edit Phase
      },
      deletePhase (item) {
        //alert(`estas borrando el Rol ${item.nombre}`)
        const index = this.listatareas.indexOf(item)
        print(index)
        /*
        if (confirm('Are you sure you want to delete this role?') && this.listatareas.splice(index, 1)){
          //axios delete Phase
            axios.delete(`http://localhost:8081/api/item/delete/${item.id}`)
              .then(response => {
                console.log(`${response.data.listatareas}`)
              }).catch(errorResponse => {
                this.loadingDialogShow = false
                alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
              })
              //window.location.reload()
        }
        */
      },
      close () {
        this.dialog = false
        this.showPhaseForm = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedPhase = -1
        }, 300)
      },
    },
    mounted: function() {
      // Obtiene id de proyecto del route
      var URL = `http://localhost:8081/api/fase/proyecto/${this.$route.params.id}`
      axios.get(URL)
      .then(response => {
        console.log(`${response.data.listatareas}`)
       this.listafases = response.data.list
      }).catch(errorResponse => {
         this.loadingDialogShow = false
         alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>