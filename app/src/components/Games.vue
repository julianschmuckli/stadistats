<template>
  <v-card>
    <v-card-title>Your games ({{ countGames }})</v-card-title>
    <v-card-text>
      <v-expansion-panels v-model="expandedGame" >
        <v-expansion-panel
          v-for="game in gameState.library.entitlements"
          :key="game.skuName"
        >
          <v-expansion-panel-header
            >{{ game.skuName }}
          </v-expansion-panel-header>
          <v-expansion-panel-content
          ><div v-html="game.skuDescription"></div></v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import gameState from "../store/game";

export default {
  data() {
    return {
      gameState: gameState,
      expandedGame: undefined
    };
  },
  computed: {
    countGames() {
      if (gameState.library.entitlements !== undefined) {
        return gameState.library.entitlements.length;
      } else {
        return 0;
      }
    },
  },
  watch: {
      expandedGame(index) {
          this.$emit("expandedGame", gameState.library.entitlements[index]);
      }
  }
};
</script>

<style>
</style>