<template>
  <div id="app">
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        class="elevation-1">

        <template v-slot:item.actions="{ item }">
              <tr>
                <td>
                    <v-btn class="mx-1" fab dark small color="blue" @click="viewUser(item)">
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
    <v-btn @click="createUser()">NEW USER</v-btn>
    <!-- DIALOGO CON EL FORMULARIO PARA CREACION/EDICION DE USUARIOS-->
    <v-dialog v-model="showUserForm" persistent>      
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat >
          <v-toolbar-title>Usuario</v-toolbar-title>
          <v-spacer/>
          <v-tooltip bottom>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="validForm" ref="form" v-if="editMode">
            <v-text-field  
              v-model="user.nombreCompleto"
              label="Nombre completo del usuario" 
              prepend-icon="person"
              :rules="nameRules"
              name="fullName" 
              type="text" />
            <v-text-field 
              v-model="user.username"
              label="Username" 
              prepend-icon="person"
              :rules="usernameRules"
              name="username" 
              type="text" />
            <v-text-field 
              v-model="user.email"
              id="email" 
              prepend-icon="mdi-email"
              :rules="emailRules"  
              label="Correo electrónico" 
              name="email" 
              type="email"/>
            <v-text-field
              v-model="user.password" 
              id="password" 
              prepend-icon="lock"
              :rules="passwordRules"
              ref = "password"
              label="Contraseña" 
              name="password" 
              type="password"/>
            <v-text-field
              v-model="confirmPassword" 
              id="confirmPass" 
              prepend-icon="lock" 
              label="Confirmar contraseña"
              :rules="confirmPasswordRules.concat(passwordConfirmationRule)" 
              name="confirmPass" 
              type="password"/>
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
  export default {
    props: {
      source: String,
      headers: [],
      itemsPerPage: String,
      items: [],
    },
    data: () => ({ 
      showUserForm : false,
      user : {
        nombreCompleto : null,
        username : null,
        password : null,
        email    : null
      },
      editMode : Boolean,
      validForm  : false,
      confirmPassword : "",
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
      passwordRules: [
        v => !!v || "Contraseña es requerida",
      ],
      confirmPasswordRules: [
        v => !!v || "Confirmar la contraseña es requerida"
      ]      
    }),
    methods: {
      editUser (item) {
        this.showUserForm = true
        this.user.nombreCompleto = item.nombreCompleto
        this.user.username = item.username
        this.user.password = item.password
        this.confirmPassword = item.password
        this.user.email = item.email
        this.editMode = true
      },
      deleteUser (item) {
        alert(`estas borrando al usuario ${item.nombreCompleto}`)
        //axios delete user
      },
      createUser(){
        this.user.nombreCompleto = ""
        this.user.username = ""
        this.user.password = ""
        this.user.email = ""
        this.confirmPassword = ""
        this.editMode = true
        this.showUserForm = true
      },
      viewUser (item) {
        this.editMode = false
        this.showUserForm = true
        this.user.nombreCompleto = item.nombreCompleto
        this.user.username = item.username
        this.user.password = item.password
        this.confirmPassword = item.password
        this.user.email = item.email        
      },
      saveUser() {
          //axios
      },
      closeForm() {
        this.showUserForm = !this.showUserForm
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
      }
    }    
  }
</script>