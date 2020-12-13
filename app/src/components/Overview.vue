<template>
  <v-card>
    <v-card-title>Overview</v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <b>Total play time:</b><br />
          <f-time :seconds="totalPlayTime"></f-time>
        </v-flex>
        <v-flex xs12 sm6>
          <b>Total played games:</b><br />
          {{ gamesPlayed }} titles
        </v-flex>
        <v-flex xs12 sm6>
          <b>Total screenshots:</b><br />
          {{ totalScreenshots }} screenshots
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import gameState from "../store/game";
import FTime from "./FTime.vue";
export default {
  name: "Overview",
  computed: {
    totalPlayTime() {
      if (gameState.game_history === undefined) {
        return "...";
      }
      var total = 0;
      var gameTitles = Object.keys(gameState.game_history);
      gameTitles.forEach(function (gameTitle) {
        total += gameState.game_history[gameTitle].totalTimePlayed;
      });
      return total;
    },
    gamesPlayed() {
      if (gameState.game_history === undefined) {
        return "...";
      }
      var gameTitles = Object.keys(gameState.game_history);
      return gameTitles.length;
    },
    totalScreenshots() {
      var total = 0;
      var gameTitles = Object.keys(gameState.captures);
      gameTitles.forEach(function (gameTitle) {
        total += gameState.captures[gameTitle].length;
      });
      return total;
    }
  },
  components: { FTime },
};
</script>

<style>
</style>