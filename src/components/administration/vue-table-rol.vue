
<template>
<v-container>
  <div id="app">
    <loadingDialog :loadingMessage="loadingMessage" :loadingDialogShow="loadingDialogShow"></loadingDialog>
    <v-data-table
      :headers="headers"
      :items="listaroles"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ROLES</v-toolbar-title>
          <!-- Barra Vertical -->
          <v-divider lass="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div class="text-center pt-2">
              <v-btn color="primary" class="mr-2" @click="createRole()">NUEVO ROL</v-btn>
          </div>          
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
                <tr>
                  <td>
                      <v-btn class="mx-1" fab dark small color="blue" @click="viewRole(item)">
                          <v-icon dark>mdi-eye</v-icon>
                      </v-btn>                 
                      <v-btn class="mx-1" fab dark small color="blue" @click="editRole(item)">
                          <v-icon dark>mdi-lead-pencil</v-icon>
                      </v-btn>                  
                      <v-btn class="mx-1" fab dark small color="blue" @click="deleteRole(item)">
                          <v-icon dark>mdi-delete</v-icon>
                      </v-btn>                           
                  </td>
                </tr>
        </template>
    </v-data-table>

    <!--Form crear Role--->
    <v-dialog width=800 v-model="showRoleForm" persistent>      
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat >
          <v-toolbar-title>ROL</v-toolbar-title>
          <v-spacer/>
          <v-tooltip bottom>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="validForm" ref="form" >
            <v-text-field  
              v-model="rol.nombre"
              label="Nombre Rol" 
              prepend-icon="person"
              :rules="emptyRolRules"
              name="nombre" 
              type="text" 
              :readonly="editMode"
               />
            <v-text-field 
              v-model="rol.descripcion"
              label="Descripcion" 
              prepend-icon="person"
              :rules="emptyRolRules"
              name="descripcion" 
              type="text" 
              :readonly="editMode"/>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-subheader v-text="'PERMISOS'"></v-subheader>
                </v-col>
              </v-row>
              <!-- SELECTS CON PERMISOS POR RECURSOS -->
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-subheader v-text="'Visualizar'"></v-subheader>
                </v-col>                
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="permisosVisualizar"
                    :items="listaRecursos"
                    :rules="emptyRolRules"
                    :readonly="editMode"
                    label="Módulos"
                    multiple
                    chips
                    hint="Que permisos desea asignar?"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-subheader v-text="'Crear'"></v-subheader>
                </v-col>                
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="permisosCrear"
                    :items="listaRecursos"
                    :rules="emptyRolRules"
                    :readonly="editMode"
                    label="Módulos"
                    multiple
                    chips
                    hint="Que permisos desea asignar?"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-subheader v-text="'Editar'"></v-subheader>
                </v-col>                
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="permisosEditar"
                    :items="listaRecursos"
                    :rules="emptyRolRules"
                    :readonly="editMode"
                    label="Módulos"
                    multiple
                    chips
                    hint="Que permisos desea asignar?"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-subheader v-text="'Eliminar'"></v-subheader>
                </v-col>                
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="permisosBorrar"
                    :items="listaRecursos"
                    :rules="emptyRolRules"
                    :readonly="editMode"
                    label="Módulos"
                    multiple
                    chips
                    hint="Que permisos desea asignar?"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>                                      
          </v-form>
        </v-card-text>             
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" :disabled="editMode" @click="saveRole()">Guardar</v-btn>
          <v-btn color="error" @click="close()">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </div>
</v-container>
</template>

<script>
const axios = require('axios');
import loadingDialog from '@/components/loading-dialog.vue';

  export default {
    data: () => ({
      loadingDialogShow : false,
      loadingMessage  : "",
      editMode: true,
      dialog: false,
      items:[],
      validForm  : false,
      showRoleForm: false,
      showPermissionsForm: true,        
      rol : {
        id : null,
        nombre : null,
        descripcion : null,
        permisos: [],
      },
      listaRecursos: [],
      diccionarioRecursos : [], //En esta variable se guardan los recursos con estructura {id: nombre}
      permisosBorrar: [],
      permisosCrear: [],
      permisosEditar: [],
      permisosVisualizar: [],
      headers: [
        { text: 'Nombre Rol', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listaroles: [],
      /*Almacena permisos por rol*/
      editedRol: -1,
      nameRolRules: [
        v => !!v || "Nombre Rol es requerido"
      ],
      // Reglas para campos de furmulario
      emptyRolRules: [
        v => !!v || "El campo es requerido"
      ],
    }),
    components : {
      loadingDialog
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      getRoles(){
        axios.get("http://localhost:8081/api/roles")
        .then(response => {
          this.listaroles = response.data.list
          this.loadingDialogShow = false
        }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
        })
      },
      createRole(){
        this.rol.id = ""
        this.rol.nombre = ""
        this.rol.descripcion = ""
        this.rol.permisos = []
        this.editMode = false
        this.showRoleForm = true
        this.permisosBorrar = []
        this.permisosCrear = []
        this.permisosEditar = []
        this.permisosVisualizar = []   
      },
      editRole (item) {
        this.editedRol = this.listaroles.indexOf(item)
        this.rol = Object.assign({}, item)
        this.editMode = false
        this.showRoleForm = true
        for (var index in item.permisos) {
          for (var indexRecurso in item.permisos[index].recursos) {
            if(item.permisos[index].nombre == "visualizar") {
              this.permisosVisualizar.push(item.permisos[index].recursos[indexRecurso].id)
            }else if(item.permisos[index].nombre == "crear") {
              this.permisosCrear.push(item.permisos[index].recursos[indexRecurso].id)
            }else if(item.permisos[index].nombre == "editar") {
              this.permisosEditar.push(item.permisos[index].recursos[indexRecurso].id)
            }else if(item.permisos[index].nombre == "eliminar") {
              this.permisosBorrar.push(item.permisos[index].recursos[indexRecurso].id)
            }else {
              alert("epa! que hiciste ahi")
            }
          }
        }  
      },
      saveRole(){
        this.loadingDialogShow = true
        this.loadingMessage = "Guardando Rol"
        //Recorrer recursos y seleccionar
        // Construimos a mano el array de permisos con objetos permiso con array de recursos
        let recursos = []
        let permiso = {}
        this.rol.permisos = []
        // Recursos para el permiso visualizar
        //TODO CUANDO ES UNA OPCION LA SELECCIONADA EXPLOTA
        for(let indexRecursoSeleccionado in  this.permisosVisualizar) {  
          let index = this.permisosVisualizar[indexRecursoSeleccionado]        
          let recurso = {}
          recurso.id = index
          recurso.nombre = this.diccionarioRecursos[index]
          recurso.descripcion = null
          recursos.push(recurso)
        }
        permiso.id = 1
        permiso.nombre = 'visualizar'
        permiso.descripcion = null
        permiso.recursos = recursos
        this.rol.permisos.push(permiso)  

        // Recursos para el permiso crear
        recursos = []
        permiso = {}
        for(let indexRecursoSeleccionado in  this.permisosCrear) {          
          let index = this.permisosCrear[indexRecursoSeleccionado] 
          let recurso = {}
          recurso.id = index
          recurso.nombre = this.diccionarioRecursos[index]
          recurso.descripcion = null
          recursos.push(recurso)
        }
        permiso.id = 2
        permiso.nombre = 'crear'
        permiso.descripcion = null
        permiso.recursos = recursos
        this.rol.permisos.push(permiso)

        // Recursos para el permiso editar
        recursos = []
        permiso = {}
        for(let indexRecursoSeleccionado in  this.permisosEditar) {          
          let index = this.permisosEditar[indexRecursoSeleccionado] 
          let recurso = {}
          recurso.id = index
          recurso.nombre = this.diccionarioRecursos[index]
          recurso.descripcion = null
          recursos.push(recurso)
        }
        permiso.id = 3
        permiso.nombre = 'editar'
        permiso.descripcion = null
        permiso.recursos = recursos
        this.rol.permisos.push(permiso)

        // Recursos para el permiso borrar
        recursos = []
        permiso = {}
        for(let indexRecursoSeleccionado in this.permisosBorrar) {
          let index = this.permisosBorrar[indexRecursoSeleccionado]
          let recurso = {}
          recurso.id = index
          recurso.nombre = this.diccionarioRecursos[index]
          recurso.descripcion = null
          recursos.push(recurso)
        }
        permiso.id = 4
        permiso.nombre = 'eliminar'
        permiso.descripcion = null
        permiso.recursos = recursos
        this.rol.permisos.push(permiso)

        axios.post(`http://localhost:8081/api/rol/save`,this.rol).then(response => {
          console.log(response.data.dto)
          this.listaroles.push(this.rol)          
          this.loadingDialogShow = false
          this.getRoles()
        }).catch(errorResponse => {
          console.log(errorResponse)
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse}`)
        })
        this.close()
        this.showRoleForm = false
        this.editMode = false
      },      
      viewRole (item) {
        this.editedRol = this.listaroles.indexOf(item)
        this.rol = Object.assign({}, item)
        this.editMode = true
        this.showRoleForm = true
        for (var index in item.permisos) {
          for (var indexRecurso in item.permisos[index].recursos) {
            if(item.permisos[index].nombre == "visualizar") {
              this.permisosVisualizar.push(item.permisos[index].recursos[indexRecurso].id)
            }else if(item.permisos[index].nombre == "crear") {
              this.permisosCrear.push(item.permisos[index].recursos[indexRecurso].id)
            }else if(item.permisos[index].nombre == "editar") {
              this.permisosEditar.push(item.permisos[index].recursos[indexRecurso].id)
            }else if(item.permisos[index].nombre == "eliminar") {
              this.permisosBorrar.push(item.permisos[index].recursos[indexRecurso].id)
            }else {
              alert("epa! que hiciste ahi")
            }
          }
        }          
      },
      deleteRole (item) {
        this.loadingDialogShow = true
        this.loadingMessage = "Borrando rol"
        axios.delete(`http://localhost:8081/api/rol/delete/${item.id}`).then(r =>{
          console.log(r)
          this.getRoles()
        }).catch(errorResponse => {
          console.log(errorResponse)          
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse}`)
        }) 
        this.loadingDialogShow = false
      },
      close () {
        this.dialog = false
        this.showRoleForm = false
        this.permisosVisualizar = []
        this.permisosCrear = []
        this.permisosEditar = []
        this.permisosBorrar = []        
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedRol = -1
        }, 300)
      },
    },
    mounted: function() {
      /*
      let recursos = [{value:1, text: "Sistema"},
      {value:2, text: "Modulo de Administracion"},
      {value:3, text: "Modulo de Configuracion"},
      {value:4, text: "Modulo de Desarollo"}]
      */
      this.loadingDialogShow = true
      this.loadingMessage = "Obteniendo Recursos"
      axios.get("http://localhost:8081/api/recursos")
      .then(response => {
        this.listaRecursosSinModificacion = response.data.list
        let recurso
        for(var index in response.data.list){
          recurso = {}
          //Listado para mostrar en el select
          recurso["value"] = response.data.list[index].id  
          recurso["text"] = response.data.list[index].descripcion
          this.listaRecursos.push(recurso)

          //aqui creamos el diccionario
          recurso = {}
          this.diccionarioRecursos[response.data.list[index].id] = response.data.list[index].nombre
        }
      }).catch(errorResponse => {
        alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })  

      this.loadingMessage = "Obteniendo Roles"
      this.getRoles()
    }
  }
</script>