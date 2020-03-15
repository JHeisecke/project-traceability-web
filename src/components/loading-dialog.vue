<template>
		<v-dialog v-model="loadingDialogShow" persistent="persistent" width="300">
      <v-card color="primary" dark="dark">
          <v-card-text>
            {{loadingMessage}}
            <v-progress-linear color="white" indeterminate="indeterminate" class="mb-0"></v-progress-linear>
          </v-card-text>
      </v-card>
    </v-dialog> 
</template>

<script>
export default {
    props: {
      loadingDialogShow: Boolean,
      loadingMessage: String
    },
}
</script>