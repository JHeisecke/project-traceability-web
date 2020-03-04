<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <!-- Popup de login, solo se muestra si showLogin es true
            showLogin viene de Login.vue-->
            <v-card v-show="showLogin" class="elevation-12">
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
                <v-btn color="primary" @click="loginUser()"  :to="{ name: 'Home'}">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
            <!-- Popup de login, solo se muestra si showRegister es true
            showRegister viene de Login.vue-->
            <v-card v-show="showRegister" class="elevation-12">
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
                    v-model="newUser.confirmPassword" 
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
                <v-btn color="primary" @click="registerUser()"  :to="{ name: 'Home'}">Registrar</v-btn>
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
    name: 'PopupForm',
    props: {
      source: String,
      showLogin: Boolean,
      showRegister: Boolean,
    },
    data: () => ({
      validForm     : false,
      //objetos
      existingUser	: {},     
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
      //Funcion que llamara al servicio de login en backend
      loginUser() {
        this.$refs.formLogin.validate();
        if(!this.validForm) {
          return false;
        }
        alert("formulario validado")
      },
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
          this.newUser.password === this.newUser.confirmPassword || "Las contraseñas son distintas";
      }
    }
  }
</script>
