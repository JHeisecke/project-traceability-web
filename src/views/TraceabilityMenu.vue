<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Módulos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  <v-list dense>
        <v-list-group prepend-icon="mdi-settings" value="true">
          <template v-slot:activator>
            <v-list-item-title>Gestion de Configuración</v-list-item-title>
          </template>
          <v-list-item link>
            <v-list-item-title >option 1</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
            </v-list-item>
          <v-list-item link>
            <v-list-item-title >option 2</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
            </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-account-multiple"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Administración</v-list-item-title>
          </template>
  
      
  
            <v-list-item link>
              <v-list-item-title >option 1</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title >option 2</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
            </v-list-item>
            

        </v-list-group>
                <v-list-group prepend-icon="mdi-account-multiple" value="true">
          <template v-slot:activator>
            <v-list-item-title>Desarrollo</v-list-item-title>
          </template>
          <v-list-item link>
            <v-list-item-title >option 1</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
            </v-list-item>
          <v-list-item link>
            <v-list-item-title >option 2</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
            </v-list-item>
        </v-list-group>
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
      <vueTable :headers="headers" :items="items" :itemsPerPage="itemsPerPage"></vueTable>
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
      items: [
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
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings'],
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete'],
    ],
    }),
  }
</script>