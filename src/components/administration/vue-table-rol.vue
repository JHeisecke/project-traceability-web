
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
      <template v-slot:no-data>
        <v-btn color="primary" @click="methods">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
        <v-btn color="primary" class="mr-2" @click="createRole()">NEW ROLE</v-btn>
    </div>
    <!--Form crear Role--->
    <v-dialog width=800 v-model="showRoleForm" persistent>      
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat >
          <v-toolbar-title>NUEVO ROL</v-toolbar-title>
          <v-spacer/>
          <v-tooltip bottom>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="validForm" ref="form" v-if="editMode">
            <v-text-field  
              v-model="rol.nombre"
              label="Nombre Rol" 
              prepend-icon="person"
              :rules="nameRolRules"
              name="nombre" 
              type="text" />
            <v-text-field 
              v-model="rol.descripcion"
              label="Descripcion" 
              prepend-icon="person"
              :rules="userRolRules"
              name="descripcion" 
              type="text" />
              <v-row align="center">
      <v-col cols="12" sm="6">
        <v-subheader v-text="'PERMISOS'"></v-subheader>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="permissions"
          :items="listpermissions"
          label="Select"
          multiple
          chips
          hint="Que permisos desea asignar?"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
          </v-form>
          <div v-else>            
          </div>
        </v-card-text>             
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="saveRole()">Guardar</v-btn>
          <v-btn color="error" @click="close()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </div>

</template>

<script>
const axios = require('axios');
  export default {
    data: () => ({
      dialog: false,
      items:[],
      permissions:[],
      validForm  : false,
      showRoleForm: false,
      showPermissionsForm: true,        
      rol : {
        id : null,
        nombre : null,
        descripcion : null
      },
      listpermissions: [
        'ABM Proyecto', 'ABM Usuario', 'ABM Permisos',
      ],
      headers: [
        {
          text: 'RolNumber',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre Rol', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listaroles: [],
      /*Almacena permisos por rol*/
      permisosrol: [],
      editedIndex: -1,
      nameRolRules: [
        v => !!v || "Nombre Rol es requerido"
      ],
    }),
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      createRole(){
        this.showRoleForm = true        
        this.rol.id = ""
        this.rol.nombre = ""
        this.rol.descripcion = ""
        this.editMode = true
        this.showRoleForm = true
      },
      saveRole(){
        this.loadingDialogShow = true
        //axios
        this.listaroles.push(this.rol)
        this.loadingDialogShow = false
        this.showRoleForm = false
      },
      editRole (item) {
        alert(`estas editando el Rol ${item.nombre}`)
        //axios edit role
      },
      deleteRole (item) {
        alert(`estas borrando el Rol ${item.nombre}`)
        //axios delete role
      },
      close () {
        this.dialog = false
        this.showRoleForm = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      /*Permite guardar un rol editado*/
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.listaroles[this.editedIndex], this.editedItem)
        } else {
          this.listaroles.push(this.editedItem)
        }
        this.close()
      },
    },
    mounted: function() {
      axios.get("http://localhost:8081/api/roles")
      .then(response => {
        console.log(`${response.data.listaroles}`)
        this.listaroles = response.data.list
      }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>