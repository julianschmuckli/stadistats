<template>
<div>
<v-layout row wrap v-if="images.length > 0">
    <v-flex sm4 v-for="(image, index) in images.reverse()" :key="index"><v-img :src="image" width="100%"></v-img></v-flex>
  </v-layout>
  <div v-else>
      <p>No captures for this game.</p>
  </div>
</div>
  
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            required: true
        }
    }
};
</script>

<style>
</style>