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
            <div class="text-center pt-2">
              <v-btn color="primary" class="mr-2" @click="createBaseLine()">NUEVA LINEA BASE</v-btn>
            </div>                         
          </v-toolbar>
        </template>   
 
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
        </template>
        <template v-slot:[`item.fechaAlta`]="{ item }">
          <tr>
            <td>
              {{ showFormattedDate(item.fechaAlta) }}
            </td>
          </tr>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
                <tr>
                  <td>
                    <v-btn color="primary" class="mr-2" @click="asignTasks(item)">ASIGNAR TAREAS</v-btn> 
                  </td>
                </tr>
        </template>
    </v-data-table>

    <!--Form crear Linea Base--->
    <v-dialog width=800 v-model="showBaseLineForm" persistent>      
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat >
          <v-toolbar-title>LINEA BASE</v-toolbar-title>
          <v-spacer/>
          <v-tooltip bottom>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="validForm" ref="form" v-if="editMode">
            <v-row align="center">
              <v-col>
                <v-select
                  v-model="baseLine.idFase"
                  :items="fases"
                  label="FASE"
                  :rules="emptyRules"
                  hint="Elegir fase del proyecto"
                  persistent-hint
                ></v-select>                
                ESTADO: <v-chip :color="getColor('ABIERTO')" dark>ABIERTO</v-chip>                                  
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="saveBaseLine()">Guardar</v-btn>
          <v-btn color="error" @click="close()">Cancelar</v-btn>
        </v-card-actions>        
      </v-card>
    </v-dialog>

    <!-- Form para asignar tareas a lineas bases-->
    <v-dialog width=800 v-model="showTasksAssignment" persistent>      
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat >
          <v-toolbar-title>ASIGNACIÓN DE TAREAS</v-toolbar-title>
          <v-spacer/>
          <v-tooltip bottom>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="validForm" ref="form" v-if="editMode">
            <v-row align="center">
              <v-col>
                <v-select
                    v-model="assignedTasks"
                    :items="tasks"
                    :rules="emptyRolRules"
                    label="TAREAS"
                    multiple
                    chips
                    hint="Que tareas desea bloquear?"
                    persistent-hint
                  ></v-select>                    
                  <p style="color: red;">ATENCIÓN: Una vez guardada la línea base, automaticamente pasará a cerrada y no se podrá editar</p>                           
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="saveTasksAssigned()">Guardar</v-btn>
          <v-btn color="error" @click="showTasksAssignment = !showTasksAssignment">Cancelar</v-btn>
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
      showBaseLineForm : false,
      showTasksAssignment : false,
      loadingMessage: "",
      validForm : false,
      itemsPerPage: 10,
      editMode : true,
      baseLineList: [],
      stateList: [
        'ABIERTO', 'CERRADO'
      ],      
      headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Fase', value: 'idFase' },
          { text: 'Estado', value: 'estado' },
          { text: 'Fecha Creación', value: 'fechaAlta' },
          { text: 'Acciones', value: 'actions' },
      ],
      fases : [],
      tasks : [],
      assignedTasks: [],
      baseLine : {
        id : null,
        idFase : null,
        estado : null,
      },
      // Reglas para campos de fOrmulario
      emptyRules: [
        v => !!v || "El campo es requerido"
      ]      
    }),
    methods: {
      getColor (estado) {
        if (estado == "CERRADO") return 'red'
        else if (estado == "ABIERTO") return 'green'
        else return 'blue'
      },
      showFormattedDate(fechaAlta) {
        let d = new Date(fechaAlta)
        return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
      },
      close(){
        this.showBaseLineForm = false
      },
      asignTasks (item) {
        console.log(`${item}`)
        this.getItemsByPhase()
        this.showTasksAssignment = true      
      },
      createBaseLine () {      
        this.baseLine.id = null
        this.baseLine.idFase = null
        this.baseLine.idProyecto = this.$route.params.id
        this.baseLine.estado = "ABIERTO"
        this.editMode = true
        this.showBaseLineForm = true
      },
      saveBaseLine () {
        this.showBaseLineForm = false
        this.loadingDialogShow = true
        this.loadingMessage = "Guardando linea base"
        axios.post(`http://localhost:8081/api/linea-base/save`,this.baseLine,{headers:{'X-Requested-With':'XMLHttpRequest'}})
        .then(response => {
          console.log(response)
          this.refreshList()
        }).catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
        })
        this.loadingDialogShow = false
      },
      getItemsByPhase () {
        this.loadingDialogShow = true
        this.loadingMessage = "Obteniendo items por fase seleccionada"
        axios.get(`http://localhost:8081/api/item/${this.$route.params.id}`)
        .then(response => {
          let item
          for(var index in response.data.list){
            item = {}
            //Listado para mostrar en el select
            item["value"] = response.data.list[index].id  
            item["text"] = response.data.list[index].nombre
            this.tasks.push(item)

            //aqui creamos el diccionario
            //this.diccionarioRecursos[response.data.list[index].id] = response.data.list[index].nombre
          }
        }).catch(errorResponse => {
            alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
        })        
      },
      saveTasksAssigned () {

      },  
      refreshList() {
        axios.get(`http://localhost:8081/api/linea-base/${this.$route.params.id}`)
        .then(response => {
          this.baseLineList = response.data.dto
        }).catch(errorResponse => {
            alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
        })        
      }
    },
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    mounted: function() {
      this.loadingDialogShow = true
      this.loadingMessage = "Obteniendo lineas base por proyecto"
      axios.get(`http://localhost:8081/api/linea-base/${this.$route.params.id}`)
      .then(response => {
        this.baseLineList = response.data.dto
      }).catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })

      this.loadingMessage = "Obteniendo fases por proyecto"
      axios.get(`http://localhost:8081/api/fase/proyecto/${this.$route.params.id}`)
      .then(response => {
        this.fases = response.data.list.map(a => a.id)
        console.log(this.fases)
      }).catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })

      this.loadingDialogShow = false
    }
  }
</script>