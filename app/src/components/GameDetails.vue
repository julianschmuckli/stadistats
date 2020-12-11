<template>
  <v-card>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text><p><f-time :seconds="currentState.totalTimePlayed"></f-time><f-time :seconds="currentState.averageTimePlayedPerSession"></f-time></p></v-card-text>
  </v-card>
</template>

<script>
import gameState from "../store/game";
import FTime from './FTime.vue';

export default {
  components: { FTime },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            gameState: gameState,
            currentState: {}
        }
    },
    methods: {
        setContext() {
            if (this.gameState.game_history[this.name]) {
                this.currentState = this.gameState.game_history[this.name];
            }
            
        }
    },
    mounted() {
        this.setContext();
    },
    watch: {
        name() {
            this.setContext();
        }
    }
}
</script>

<style>

</style>