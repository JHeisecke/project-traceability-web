
<template>
  <div id="app">
    
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
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
    <div class="text-center pt-2">
        <v-btn color="primary" class="mr-2" @click="createRole()">NEW ROLE</v-btn>
    </div>
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
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="rol.permisos"
                    :items="listpermissions"
                    :rules="emptyRolRules"
                    :readonly="editMode"
                    label="Select"
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

</template>

<script>
const axios = require('axios');
  export default {
    data: () => ({
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
      listpermissions: [
        'ABM Proyecto', 'ABM Usuario', 'ABM Permisos',
      ],
      headers: [
        { text: 'Nombre Rol', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listaroles: [],
      /*Almacena permisos por rol*/
      permisosrol: [],
      editedRol: -1,
      nameRolRules: [
        v => !!v || "Nombre Rol es requerido"
      ],
      // Reglas para campos de furmulario
      emptyRolRules: [
        v => !!v || "El campo es requerido"
      ],
    }),
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      createRole(){
        this.rol.id = ""
        this.rol.nombre = ""
        this.rol.descripcion = ""
        this.rol.permisos = []
        this.editMode = false
        this.showRoleForm = true
      },
      saveRole(){
        if (this.editedRol > -1) {
          Object.assign(this.listaroles[this.editedRol], this.rol)
          //axios update
        } else {
          this.listaroles.push(this.rol)
          //axios save
        }
        this.close()
        this.showRoleForm = false
        this.editMode = false
      },
      editRole (item) {
        //alert(`estas editando el Rol ${item.nombre}`)
        this.editedRol = this.listaroles.indexOf(item)
        this.rol = Object.assign({}, item)
        this.editMode = false
        this.showRoleForm = true
        //axios edit role
      },
      viewRole (item) {
        this.editedRol = this.listaroles.indexOf(item)
        this.rol = Object.assign({}, item)
        this.editMode = true
        this.showRoleForm = true
      },
      deleteRole (item) {
        const index = this.listaroles.indexOf(item)
        confirm('Are you sure you want to delete this role?') && this.listaroles.splice(index, 1)
        //axios delete role
      },
      close () {
        this.dialog = false
        this.showRoleForm = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedRol = -1
        }, 300)
      },
    },
    mounted: function() {
      axios.get("http://localhost:8081/api/roles")
      .then(response => {
        this.listaroles = response.data.list
      }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>