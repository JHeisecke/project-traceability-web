<template>
<v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    class="elevation-1">

    <template v-slot:item.actions="{ item }">
          <tr>
            <td>
                <v-btn class="mx-1" fab dark small color="blue" @click="viewUser(item.username)">
                    <v-icon dark>mdi-eye</v-icon>
                </v-btn>                 
                <v-btn class="mx-1" fab dark small color="blue" @click="editUser(item.username)">
                    <v-icon dark>mdi-lead-pencil</v-icon>
                </v-btn>                  
                <v-btn class="mx-1" fab dark small color="blue" @click="deleteUser(item.username)">
                    <v-icon dark>mdi-delete</v-icon>
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
      editUser (codigo) {
        alert(`estas editando el usuario ${codigo}`)
      },
      deleteUser (codigo) {
        alert(`estas borrando al usuario ${codigo}`)
      },
      viewUser (codigo) {
        alert(`estas viendo al usuario ${codigo}`)
      },
    }
  }
</script>