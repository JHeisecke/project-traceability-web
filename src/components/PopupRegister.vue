<template>
  <v-app id="registerapp">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">

            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat >
                <v-toolbar-title>Registrarse</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="validForm" ref="formRegister" >
                  <v-text-field 
                    v-model="newUser.username"
                    label="Usuario" 
                    prepend-icon="person"
                    :rules="nameRules"
                    name="login" 
                    type="text" />
                  <v-text-field 
                    v-model="newUser.email"
                    id="email" 
                    prepend-icon="mdi-email"
                    :rules="emailRules"  
                    label="Correo electrónico" 
                    name="email" 
                    type="email"/>
                  <v-text-field
                    v-model="newUser.password" 
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
                <v-btn color="primary" @click="registerUser()">Registrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col> 
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
  export default {
    name: 'PopupRegister',
    props: {
      source: String
    },
    data: () => ({
      validForm       : false,
      confirmPassword : "",
      //objetos
      newUser       : {},
      //reglas para campos de formularios
      nameRules: [
        v => !!v || "Usuario es requerido",
        v => (v && v.length <= 10) || "El Usuario debe ser menor a 10 caracteres"
      ],
      emailRules: [
        v => !!v || "E-mail es requerido",
        v => /.+@.+/.test(v) || "E-mail debe ser valido"
      ],
      passwordRules: [
        v => !!v || "Contraseña es requerida"
      ],
      confirmPasswordRules: [
        v => !!v || "Confirmar la contraseña es requerida"
      ]
    }),
    methods: {
      //Funcion que llamara al servicio de registro en backend
      registerUser() {
        this.$refs.formRegister.validate();
        if(!this.validForm) {
          return false;
        }
        alert("formulario validado")
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
          this.newUser.password === this.confirmPassword || "Las contraseñas son distintas";
      }
    }
  }
</script>
