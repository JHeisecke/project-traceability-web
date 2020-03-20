<template>
      <vueTableUsers  :headers="headers" :items="items"></vueTableUsers>       
</template>

<script>
  import vueTableUsers from '@/components/administration/vue-table-users.vue';
  export default {
    components: {
        vueTableUsers
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      showUsers: false,
      usersPerPage: "5",
      section: "users",
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
      items: [
        {
          username: 'jheisecke',
          nombreCompleto: 'Javier Heisecke',
          email: 'jheisecke@gmail.com',
          password: '123456',
        },    
        {
          username: 'pvillagra',
          nombreCompleto: 'Paula Villagra',
          email: 'pvillagra@gmail.com',
          password: '123456',
        },  
        {
          username: 'ylopez',
          nombreCompleto: 'Yesshua Lopez',
          email: 'ylopez@gmail.com',
          password: '123456',
        }, 
        {
          username: 'mfare',
          nombreCompleto: 'Matias Fare',
          email: 'mfare@gmail.com',
          password: '123456',
        }                         
      ],
    })
  }
</script>