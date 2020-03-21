<template>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat >
                <v-toolbar-title>Iniciar sesión</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <!-- Formulario de login-->
                <v-form v-model="validForm" ref="formLogin">
                  <v-text-field 
                    required 
                    label="Usuario" 
                    prepend-icon="person"
                    :rules="nameRules" 
                    name="login" 
                    type="text" 
                    v-model="existingUser.username"/>
                  <v-text-field 
                    required 
                    id="password" 
                    prepend-icon="lock" 
                    :rules="passwordRules"
                    label="Contraseña" 
                    name="password" 
                    type="password"
                    v-model="existingUser.password"/>
                </v-form>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" @click="loginUser()">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col> 
        </v-row>
      </v-container>
</template>


<script>
const axios = require('axios');
  export default {
    name: 'PopupLogin',
    props: {
      source: String
    },
    data: () => ({
      usuarioDTO    : null,
      validForm     : false,
      //objetos
      existingUser	: {
        id: "",
        nombreCompleto: "",
        username: "",
        password: ""
      },     
      //reglas para campos de formularios
      nameRules: [
        v => !!v || "Usuario es requerido",
        v => (v && v.length <= 10) || "El Usuario debe ser menor a 10 caracteres"
      ],
      passwordRules: [
        v => !!v || "Contraseña es requerida"
      ]
    }),
    mounted() {
      if(this.usuarioDTO == 'null'){
        this.usuarioDTO = localStorage.usuarioDTO;
      }
    },
    methods: {
      //Funcion que llamara al servicio de login en backend
      loginUser() {
        this.$refs.formLogin.validate();
        if(!this.validForm) {
          return false;
        }
        axios.post("http://localhost:8081/api/login",this.existingUser,{headers:{'X-Requested-With':'XMLHttpRequest'}})
        .then(response => {
          this.$emit("authenticatedUser",response.data.dto)
          console.log(response)
          localStorage.setItem('usuarioDTO', JSON.stringify(response.data.dto))
          this.$router.push({name: 'traceability-menu'});
          location.reload()          
          // Persite objeto Usuario en memoria.
        }).catch(errorResponse => {
          alert(errorResponse)
        })
      }
    }
  }
</script>
