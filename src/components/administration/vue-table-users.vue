<template>
<v-container>
  <div id="app">
    <loadingDialog :loadingMessage="loadingMessage" :loadingDialogShow="loadingDialogShow"></loadingDialog>
    <v-data-table
        :headers="headers"
        :items-per-page="itemsPerPage"
        :items="listausuarios"
        class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>USUARIOS</v-toolbar-title>
            <v-spacer></v-spacer>   
            <div class="text-center pt-2">
              <v-btn color="primary" class="mr-2" @click="createUser()">NUEVO USUARIO</v-btn>
            </div>           
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
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
            <v-select
              v-model="user.roles"
              :items="roles"
              filled
              chips
              label="Roles del Usuario"
              multiple
            ></v-select>              
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
            <v-select
              v-model="user.roles"
              :items="roles"
              filled
              readonly
              chips
              label="Roles del Usuario"
              multiple
            ></v-select>                        
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
</v-container>
</template>

<script>
const axios = require('axios');
import loadingDialog from '@/components/loading-dialog.vue';
  export default {
    props: {
      source: String,
    },
    components : {
      loadingDialog
    },
    data: () => ({ 
      showUserForm : false,
      loadingDialogShow : false,
      user : {
        nombreCompleto : "",
        username : "",
        roles    : [],
        password : "",
        email    : ""
      },
      roles  : [],
      listausuarios : [],
      headers: [
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Nombre Completo', value: 'nombreCompleto' },
        { text: 'E-mail', value: 'email' },
        { text: 'Acciones', value: 'actions' }
      ],
      itemsPerPage: 5,      
      editMode : Boolean,
      validForm  : false,
      confirmPassword : "",
      loadingMessage  : "",
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
        let rol
        this.user.roles = []
        for(var index in item.roles){
          rol = {}
          rol["value"] = item.roles[index].id  
          rol["text"] = item.roles[index].nombre
          this.user.roles.push(rol)
        }   
        this.confirmPassword = item.password
        this.user.email = item.email
        this.editMode = true
      },
      deleteUser (item) {
        alert(`estas borrando al usuario ${item.nombreCompleto}`)
        var URL = `http://localhost:8081/api/usuario/delete/${item.username}`
        console.log(URL)
        //Borra usuario por username
        axios.delete(URL)
          .then(response => {
              console.log(response)
              window.location.reload()
            }).catch(errorResponse => {
              console.log(errorResponse)
              alert(`ERROR ${errorResponse.errorCode} - ${errorResponse}`)
            }) 
      },
      createUser(){
        this.user.nombreCompleto = ""
        this.user.username = ""
        this.user.password = ""
        this.user.email = ""
        this.user.roles = null
        this.confirmPassword = ""
        this.editMode = true
        this.showUserForm = true
      },
      viewUser (item) {
        this.editMode = false
        this.showUserForm = true
        this.user.nombreCompleto = item.nombreCompleto
        this.user.username = item.username
        let rol
        this.user.roles = []
        for(var index in item.roles){
          rol = {}
          rol["value"] = item.roles[index].id  
          rol["text"] = item.roles[index].nombre
          this.user.roles.push(rol)
        }        
        this.user.password = item.password
        this.confirmPassword = item.password
        this.user.email = item.email  
      },
      saveUser() {
        this.$refs.form.validate();
        if(!this.validForm) {
          return false;
        }        
        this.showUserForm = false
        this.loadingDialogShow = true
        this.loadingMessage = "Guardando Usuario"
        let rol
        let userBackup = this.user.roles
        this.user.roles = []
        for(var index in userBackup){
          rol = {}
          rol["id"] = userBackup[index]  
          this.user.roles.push(rol)
        } 
        axios.post("http://localhost:8081/api/usuario/save",this.user,{headers:{'X-Requested-With':'XMLHttpRequest'}})
        .then(response => {
          console.log(response)
          this.loadingDialogShow = false
          window.location.reload()
        }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
        })
        
        
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
          this.user.password === this.confirmPassword || "Las contraseñas son distintas";
      },
    }, 
    mounted: function() {
      this.loadingDialogShow = true
      this.loadingMessage = "Obteniendo usuarios en el sistema"
      //obtencion de usuarios
      axios.get("http://localhost:8081/api/usuarios")
      .then(response => {
        this.listausuarios = response.data.list
      }).catch(errorResponse => {
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
      
      //obtencion de roles
      this.loadingMessage = "Obteniendo roles en el sistema"
      axios.get("http://localhost:8081/api/roles")
      .then(response => {
        var rol
        for(var index in response.data.list){
          rol = {}
          rol["value"] = response.data.list[index].id  
          rol["text"] = response.data.list[index].nombre
          this.roles.push(rol)
        }
        this.loadingDialogShow = false
      }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>