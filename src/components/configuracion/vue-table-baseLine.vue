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
                  label="ID FASE"
                  :rules="emptyRules"
                  hint="Elegir fase del proyecto"
                  persistent-hint
                ></v-select>                
                <v-select
                  v-model="baseLine.estado"
                  :items="fases"
                  label="ESTADO"
                  :rules="emptyRules"
                  hint="Que estado desea asignar?"
                  persistent-hint
                ></v-select>
<!--                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="baseLine.fechaCreacion"
                    label="Fecha Creacion"
                    hint="DD/MM/YYYY format"
                    :rules="emptyRules"
                    persistent-hint
                    prepend-icon="event"
                    @blur="baseLine.fechaCreacion = formatDate(baseLine.fechaCreacion)"
                    v-on="on"
                  ></v-text-field> 
                </template>    -->  
                  <v-select
                    v-model="baseLine.items"
                    :items="tasks"
                    :rules="emptyRolRules"
                    label="TAREAS"
                    multiple
                    chips
                    hint="Que tareas deshabilitará?"
                    persistent-hint
                  ></v-select>                                       
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
      showBaseLineForm : false,
      loadingMessage: "",
      validForm : false,
      itemsPerPage: 10,
      editMode : true,
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
          { text: 'Fecha Creación', value: 'fechaCreacion' },
          { text: 'Acciones', value: 'actions' },
      ],
      fases : [1, 2, 3],
      tasks : [1, 2, 3],
      baseLine : {
        id : null,
        idFase : null,
        estado : null,
        fechaCreacion : null,
        fechaModificacion : null,
        items : []
      },
      // Reglas para campos de fOrmulario
      emptyRules: [
        v => !!v || "El campo es requerido"
      ]      
    }),
    methods: {
      getColor (estado) {
        if (estado == "CERRADO") return 'red'
        else if (estado == "ABIERTO") return 'blue'
        else return 'green'
      },
      close(){
        this.showBaseLineForm = false
      },
      editBaseLine (item) {
        console.log(`${item}`)
        this.showBaseLineForm = true      
      },
      createBaseLine () {      
        this.baseLine.id = null
        this.baseLine.idFase = null
        this.baseLine.estado = null
        this.baseLine.fechaCreacion = this.date
        this.baseLine.fechaModificacion = this.date
        this.baseLine.items = []
        this.editMode = true
        this.showBaseLineForm = true
      },
      saveBaseLine () {
        this.showBaseLineForm = false
      }
    },
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
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