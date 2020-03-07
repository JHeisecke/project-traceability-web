<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Modulo de Gestion de Configuración</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Módulo de Administración</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-source-merge</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Módulo de Desarrollo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Project Traceability</v-toolbar-title>
      <template>
        <v-spacer />   
          <v-btn color="primary"><v-icon>mdi-logout</v-icon>SALIR</v-btn>
      </template>
    </v-app-bar>

    <v-content>
      <vueTable :headers="headers" :items="desserts" :itemsPerPage="itemsPerPage"></vueTable>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; Facultad Politecnica - LCIK - 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import vueTable from '@/components/vue-table.vue';
  export default {
    components: {
        vueTable
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      itemsPerPage: 5,
      headers: [
          {
            text: 'Código',
            align: 'start',
            sortable: false,
            value: 'projectCode',
          },
          { text: 'Proyecto', value: 'projectName' },
          { text: 'Estado', value: 'estate' },
          { text: 'Acciones', value: 'actions' },
      ],
      desserts: [
        {
          projectCode: '1',
          projectName: 'Aplicacion iOS para BNF',
          estate: 'EN CURSO',
          actions: '',
        },
        {
          projectCode: '2',
          projectName: 'Herramienta de Evaluacion de PYMES',
          estate: 'EN CURSO',
          actions: '',
        },
        {
          projectCode: '3',
          projectName: 'Pago de servicios automático',
          estate: 'EN PRODUCCIÓN',
          actions: '',        
        },
        {
          projectCode: '4',
          projectName: 'Herramienta CRM 2.0',
          estate: 'EN PRODUCCIÓN',
          actions: '',        
        },
        {
          projectCode: '5',
          projectName: 'Encuestas para clientes de la web',
          estate: 'ANÁLISIS',
          actions: '',          
        },
        {
          projectCode: '6',
          projectName: 'Prestamos desde ATM',
          estate: 'EN PRODUCCIÓN',
          actions: '',        
        },        
      ],
    }),
  }
</script>