<template>
  <v-card>
      <v-card-title>{{ name }}</v-card-title>
  </v-card>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>