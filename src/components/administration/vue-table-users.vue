<template>
<v-data-table
    :headers="headers"
    :users="users"
    :users-per-page="usersPerPage"
    class="elevation-1">

    <template v-slot:item.estate="{ item }">
      <v-chip :color="getColor(item.estate)" dark>{{ user.estate }}</v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
          <tr>
            <td>
                <v-btn class="mx-1" fab dark small color="blue" @click="viewUser(user.projectCode)">
                    <v-icon dark>mdi-eye</v-icon>
                </v-btn>                 
                <v-btn class="mx-1" fab dark small color="blue" @click="editUser(item.projectCode)">
                    <v-icon dark>mdi-lead-pencil</v-icon>
                </v-btn>                  
                <v-btn class="mx-1" fab dark small color="blue" @click="deleteUser(item.projectCode)">
                    <v-icon dark>mdi-account-edit</v-icon>
                </v-btn>                           
            </td>
          </tr>
    </template>
</v-data-table>
</template>

<script>
  export default {
    props: {
      source: String,
      headers: [],
      itemsPerPage: String,
      items: [],
    },
    methods: {
      editProject (codigo) {
        alert(`estas editando el proyecto n°${codigo}`)
      },
      seeProjectUsers (codigo) {
        alert(`estas viendo los usuarios del proyecto n°${codigo}`)
      },
      viewProject (codigo) {
        alert(`estas viendo el proyecto n°${codigo}`)
      },
    },
  }
</script>