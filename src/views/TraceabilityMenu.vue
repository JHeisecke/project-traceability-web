<template>
  <v-app id="inspire">
      <vueTableProjects :headers="headers" :items="items" :itemsPerPage="itemsPerPage"></vueTableProjects>   
  </v-app>
</template>

<script>
  import vueTableProjects from '@/components/vue-table-projects.vue';
  export default {
    components: {
        vueTableProjects,
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
    })
  }
</script>