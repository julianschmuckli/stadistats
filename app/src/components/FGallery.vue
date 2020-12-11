<template>
  <v-layout row wrap>
    <v-flex sm3 v-for="(image, index) in images" :key="index"><v-img :src="image" height="100" width="200"></v-img></v-flex>
  </v-layout>
</template>

<script>
import gameState from '../store/game';
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            images: []
        }
    },
    methods: {
        loadImages() {
            this.images = gameState.captures[this.name.toLowerCase()];
            console.log(gameState);
        }
    },
    watch: {
        name() {
            this.loadImages();
        }
    }
};
</script>

<style>
</style>