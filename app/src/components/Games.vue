<template>
  <v-card>
    <v-card-title style="margin:0;padding-bottom:0;">Your games ({{ countGames }})</v-card-title>
    <v-card-text>
      <v-text-field placeholder="Search your games..." v-model="game_query" style="margin:0 10px 0 10px;"></v-text-field>
      <v-list v-model="expandedGame">
        <v-list-item ripple style="cursor:pointer;"
          v-for="(game, index) in games"
          :key="game.skuName"
        >
          <v-list-item-title @click="() => { selectGame(index); openStats() }"
            >{{ game.skuName }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import gameState from "../store/game";

export default {
  data() {
    return {
      gameState: gameState,
      expandedGame: undefined,

      game_query: ""
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
    games() {
      if (gameState.library.entitlements !== undefined) {
        var games = gameState.library.entitlements.filter((item) => {
          if (this.game_query === "") {
            return true;
          } else if (item["skuName"].toLowerCase().includes(this.game_query.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        });
        
        return games.slice(0, 10);
      } else {
        return [];
      }
    }
  },
  methods: {
    openStats(game) {
      this.$emit("openGameDetails", game);
    },
    selectGame(index) {
      this.$emit("expandedGame", gameState.library.entitlements[index]);
    }
  }
};
</script>

<style>
</style>