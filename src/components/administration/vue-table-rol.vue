
<template>
  <v-data-table
    :headers="headers"
    :items="listaroles"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>ROLES</v-toolbar-title>
        <!-- Barra Vertical -->
        <v-divider lass="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- button New Rol -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Rol</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <!-- V-car para new Roll-->
            <v-card-text>
              <v-container>
                <v-row>
                    <v-text-field v-model="editedItem.name" label="Rol name"></v-text-field>
                    <v-text-field v-model="editedItem.carbs" label="Description"></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- button Actions -->
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
const axios = require('axios');
  export default {
    data: () => ({
      dialog: false,
      items:[],
      rol : {
        id : null,
        nombre : null,
        descripcion : null
      },
      headers: [
        {
          text: 'RolNumber',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre Rol', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      listaroles: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {

      initialize () {
        this.listaroles = [
        {
          id: 1,
          nombre: 'root',
          descripcion: 'acceso total al sistema',
        }
        ]
      },
      editItem (item) {
        this.editedIndex = this.listaroles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.listaroles.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.listaroles.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.listaroles[this.editedIndex], this.editedItem)
        } else {
          this.listaroles.push(this.editedItem)
        }
        this.close()
      },
    },
    mounted: function() {
      axios.get("http://localhost:8081/api/roles")
      .then(response => {
        console.log(`${response.data.listaroles}`)
        this.listaroles = response.data.list
      }).catch(errorResponse => {
          this.loadingDialogShow = false
          alert(`ERROR ${errorResponse.errorCode} - ${errorResponse.message}`)
      })
    }
  }
</script>