<template>
  <div id="app">
		<v-dialog v-model="loadingDialogShow" persistent="persistent" width="300">
      <v-card color="primary" dark="dark">
          <v-card-text>
            Aguarde...
            <v-progress-linear color="white" indeterminate="indeterminate" class="mb-0"></v-progress-linear>
          </v-card-text>
      </v-card>
    </v-dialog>    
    <v-data-table
        :headers="headers"
        :items="datos"
        :items-per-page="itemsPerPage"
        class="elevation-1">

        <template v-slot:item.actions="{ item }">
              <tr>
                <td>
                    <v-btn class="mx-1" fab dark small color="blue" @click="viewUser(datos)">
                        <v-icon dark>mdi-eye</v-icon>
                    </v-btn>                 
                    <v-btn class="mx-1" fab dark small color="blue" @click="editUser(item)">
                        <v-icon dark>mdi-lead-pencil</v-icon>
                    </v-btn>                  
                    <v-btn class="mx-1" fab dark small color="blue" @click="deleteUser(item)">
                        <v-icon dark>mdi-delete</v-icon>
                    </v-btn>                           
                </td>
              </tr>
        </template>
    </v-data-table>
    <v-btn @click="createUser()">NEW ROL</v-btn>
    <!-- DIALOGO CON EL FORMULARIO PARA CREACION/EDICION DE USUARIOS-->
    <v-dialog v-model="showRolForm" persistent>      
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat >
          <v-toolbar-title>Usuario</v-toolbar-title>
          <v-spacer/>
          <v-tooltip bottom>
          </v-tooltip>
        </v-toolbar>
        <!-- Formulario para nuevo rol-->
        <v-card-text>
          <v-form v-model="validForm" ref="form" v-if="editMode">
            <v-text-field  
              v-model="user.nombreCompleto"
              label="Nombre Rol" 
              prepend-icon="person"
              :rules="nameRules"
              name="fullName" 
              type="text" />
            <v-text-field 
              v-model="user.username"
              label="Descripción" 
              prepend-icon="person"
              :rules="usernameRules"
              name="username" 
              type="text" />
          </v-form>
          <div v-else>
            <v-text-field  
              v-model="user.nombreCompleto"
              readonly 
              prepend-icon="person"
              name="fullName" 
              type="text" />
            <v-text-field 
              v-model="user.username"
              readonly
              prepend-icon="person"
              name="username" 
              type="text" />            
            <v-text-field v-model="user.email"
              prepend-icon="mdi-email"
              readonly="" 
              name="email" 
              type="email"/>            
            <v-text-field v-model="user.password" readonly prepend-icon="lock" name="confirmPass" type="password"/>            
          </div>
        </v-card-text>             
        <v-card-actions>
          <v-spacer />
          <v-btn color="success" @click="saveUser()">Guardar</v-btn>
          <v-btn color="error" @click="closeForm()">Cancelar</v-btn>
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
      headers: [],
      itemsPerPage: String,
    },
    data: () => ({ 
      showRolForm : false,
      loadingDialogShow : false,
      datos: [],
      rol : {
        rolname : null,
        description : null
      },
      editMode : Boolean,
      validForm  : false,
      //reglas para campos de formularios
      nameRules: [
        v => !!v || "Nombre completo es requerido"
      ],
      usernameRules: [
        v => !!v || "Usuario es requerido",
        v => (v && v.length <= 10) || "El Usuario debe ser menor a 10 caracteres"
      ],
      emailRules: [
        v => !!v || "E-mail es requerido",
        v => /.+@.+/.test(v) || "E-mail debe ser valido"
      ],
      confirmPasswordRules: [
        v => !!v || "Confirmar la contraseña es requerida"
      ]      
    }),
    methods: {
      editUser (datos) {
        this.showRolForm = true
        this.user.nombreCompleto = item.nombreCompleto
        this.user.username = item.username
        this.user.password = item.password
        this.user.email = item.email
        this.editMode = true
      },
      deleteUser (datos) {
        alert(`estas borrando al usuario ${item.nombreCompleto}`)
        //axios delete user
      },
      createUser(){
        this.user.nombreRol = ""
        this.user.username = ""
        this.user.password = ""
        this.user.email = ""
        this.editMode = true
        this.showRolForm = true
      },
      viewUser (data) {
        this.editMode = false
        this.showRolForm = true
        this.user.nombreRol = item.nombreRol
        this.user.username = item.username
        this.user.password = item.password
        this.user.email = item.email        
      },
      saveUser() {
        this.showRolForm = false
        this.loadingDialogShow = true
        //axios
        this.items.push(this.user)
        this.loadingDialogShow = false
      },
      closeForm() {
        this.showRolForm = !this.showRolForm
      }      
    },
    computed: {
      /*
        * Concatenamos regla de contraseñas iguales, porque no existe una forma de validacion por vuetify
        * va en el computed porque confirmPassword DEPENDEN de password, Vue sabe en que momento ejecutar
        * este metodo 
      */
      passwordConfirmationRule() {
        return () =>
          this.newUser.password === this.newUser.confirmPassword || "Las contraseñas son distintas";
      },
    }, 
    mounted: function() {
      axios.get("http://localhost:8081/api/users")
        .then(response => {
          console.log(`success ${response}`)
          this.items = response.data.list
        }).catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
        })
    }
  }
</script>