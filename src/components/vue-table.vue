<template>
<v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    class="elevation-1">

    <template v-slot:item.estate="{ item }">
      <v-chip :color="getColor(item.estate)" dark>{{ item.estate }}</v-chip>
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
      getColor (estate) {
        if (estate == "ANÁLISIS") return 'red'
        else if (estate == "EN CURSO") return 'blue'
        else return 'green'
      },
    },
  }
</script>