<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card v-show="showLogin" class="elevation-12">
              <v-toolbar color="primary" dark flat >
                <v-toolbar-title>Iniciar sesión</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Usuario" prepend-icon="person" name="login" type="text" />
                  <v-text-field id="password" prepend-icon="lock" label="Contraseña" name="password" type="password"/>
                </v-form>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-show="showRegister" class="elevation-12">
              <v-toolbar color="primary" dark flat >
                <v-toolbar-title>Registrarse</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Usuario" prepend-icon="person" name="login" type="text" />
                  <v-text-field id="email" prepend-icon="mdi-email" label="Correo electrónico" name="email" type="email"/>
                  <v-text-field id="password" prepend-icon="lock" 
                    label="Contraseña" name="password" type="password"
                    class="input-group--focused"/>
                  <v-text-field id="confirmedPass" prepend-icon="lock" 
                    label="Confirmar contraseña" name="confirmedPass" type="password"/>
                </v-form>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary">Registrar</v-btn>
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
      dialog: false,
      items: [
        { icon: 'mdi-contacts', text: 'Contacts' },
        { icon: 'mdi-history', text: 'Frequently contacted' },
        { icon: 'mdi-content-copy', text: 'Duplicates' },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'mdi-plus', text: 'Create label' },
          ],
        },
        {
          icon: 'mdi-chevron-up',
          'icon-alt': 'mdi-chevron-down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' },
          ],
        },
        { icon: 'mdi-settings', text: 'Settings' },
        { icon: 'mdi-message', text: 'Send feedback' },
        { icon: 'mdi-help-circle', text: 'Help' },
        { icon: 'mdi-cellphone-link', text: 'App downloads' },
        { icon: 'mdi-keyboard', text: 'Go to the old version' },
      ],
    }),
  }
</script>
