<template>
    <div id="app">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">

            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat >
                <v-toolbar-title>Usuario</v-toolbar-title>
                <v-spacer/>
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="validForm" ref="form" >
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
              </v-card-text>
              
              <v-card-actions>
                <v-spacer />
                <v-btn color="success" @click="saveUser()">Guardar</v-btn>
                <v-btn color="error" @click="deleteUser()">Eliminar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col> 
        </v-row>
      </v-container>
    </v-content>					      	  
    </div>
</template>

<script>
export default {
  data: () => ({    
    user : {
      nombreCompleto : null,
      username : null,
      password : null,
      email    : null
    },
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
      v => (v && v.length < 5) || "La contraseña debe tener 5 caracteres como minimo"
    ],
    confirmPasswordRules: [
      v => !!v || "Confirmar la contraseña es requerida"
    ]            
  }),
  methods : {
    saveUser() {
        //axios
    },
    deleteUser() {
        //axios
    }
  }
}
</script>