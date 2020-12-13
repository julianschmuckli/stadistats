<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex sm6 xs12 md4>
          <b>Total: </b
          ><f-time :seconds="currentState.totalTimePlayed"></f-time>
        </v-flex>
        <v-flex sm6 xs12 md4>
          <b>Per session: </b
          ><f-time :seconds="currentState.averageTimePlayedPerSession"></f-time>
        </v-flex>
        <v-flex sm6 xs12 md4>
          <b>Last time played: </b
          ><f-date
            :date="currentState.mostRecentPlayTime"
            :withTime="true"
          ></f-date>
        </v-flex>
      </v-layout>
      <h3>Recent captures</h3>
      <f-gallery :images="images"></f-gallery>
    </v-card-text>
  </v-card>
</template>

<script>
import gameState from "../store/game";
import captureState from "../store/capture";
import FTime from "./FTime.vue";
import FDate from "./FDate.vue";
import FGallery from "./FGallery.vue";

export default {
  components: { FTime, FDate, FGallery },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      gameState: gameState,
      captureState: captureState,

      currentState: {},
      images: [],
    };
  },
  methods: {
    setContext() {
      if (this.name !== undefined) {
        if (this.gameState.game_history[this.name]) {
          this.currentState = this.gameState.game_history[this.name];
        } else {
          this.currentState = {};
        }

        if (this.captureState.captures[this.name.toLowerCase()]) {
          this.images = this.captureState.captures[this.name.toLowerCase()];
        } else {
          this.images = [];
        }
      }
    },
  },
  mounted() {
    this.setContext();
  },
  watch: {
    name() {
      this.setContext();
    },
  },
};
</script>

<style>
</style>