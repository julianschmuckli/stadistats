<template>
  <v-card>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <h3>Times</h3>
      <v-layout row wrap>
        <v-flex sm6 xs12 md4>
          <b>Total</b><f-time :seconds="currentState.totalTimePlayed"></f-time>
        </v-flex>
        <v-flex sm6 xs12 md4>
          <b>Per session</b
          ><f-time :seconds="currentState.averageTimePlayedPerSession"></f-time>
        </v-flex>
        <v-flex sm6 xs12 md4>
          <b>Last time played</b
          ><f-date
            :date="currentState.mostRecentPlayTime"
            :withTime="true"
          ></f-date>
        </v-flex>
      </v-layout>
      <h3 v-if="game_stats.length >= 1">Game stats</h3>
      <v-layout row wrap>
        <v-flex lg3 md4 sm6 xs12 v-for="stat in game_stats" :key="stat.name">
          <p>
            <b>{{ stat.name }}</b>
          </p>
          <p>{{ stat.value }}</p>
        </v-flex>
      </v-layout>
      <h3 v-if="game_achievements.length >= 1">Achievements</h3>
      <v-layout row wrap>
        <v-flex
          lg6
          md6
          sm12
          xs12
          v-for="achievement in game_achievements"
          :key="achievement.name"
          :class="{
            completed: achievement.progress === '100%',
            achievement: true,
          }"
        >
          <p>
            <b
              >{{ achievement.achievementName }} ({{ achievement.progress }})</b
            >
          </p>
          <p>{{ achievement.description }}</p>
          <dd v-if="achievement.progress === '100%'">
            Completed on
            <f-date
              style="display: inline"
              :date="new Date(achievement.completionTime)"
            ></f-date>
          </dd>
          <dd v-else>Not completed yet</dd>
        </v-flex>
      </v-layout>
      <!--<h3>Recent captures</h3>-->
      <!--<f-gallery :images="images"></f-gallery>-->
    </v-card-text>
  </v-card>
</template>

<script>
import gameState from "../store/game";
import captureState from "../store/capture";
import FTime from "./FTime.vue";
import FDate from "./FDate.vue";
//import FGallery from "./FGallery.vue";

export default {
  components: { FTime, FDate /*FGallery*/ },
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
      game_stats: [],
      game_achievements: [],
    };
  },
  methods: {
    resetContext() {
      this.currentState = {};
      this.images = [];
      this.game_stats = [];
      this.game_achievements = [];
    },
    setContext() {
      if (this.name !== undefined) {
        // Game history / times
        if (this.gameState.game_history[this.name]) {
          this.currentState = this.gameState.game_history[this.name];
        } else {
          this.currentState = {};
        }

        // Captures
        if (this.captureState.captures[this.name.toLowerCase()]) {
          this.images = this.captureState.captures[this.name.toLowerCase()];
        } else {
          this.images = [];
        }

        // Game stats
        if (this.gameState.game_stats[this.name.toLowerCase()]) {
          this.game_stats = this.gameState.game_stats[
            this.name.toLowerCase()
          ].inApplicationGamerStats.item;
        } else {
          this.game_stats = [];
        }

        // Game achievements
        if (this.gameState.game_achievements[this.name.toLowerCase()]) {
          this.game_achievements = this.gameState.game_achievements[
            this.name.toLowerCase()
          ].inApplicationAchievements.item
            .filter((item) => {
              return item.achievementName !== undefined;
            })
            .sort((a, b) => {
              var progress_a = parseInt(a.progress.replace("%", ""));
              var progress_b = parseInt(b.progress.replace("%", ""));
              if (progress_a < progress_b) {
                return 1;
              } else {
                return -1;
              }
            });
        } else {
          this.game_achievements = [];
        }
      }
    },
  },
  mounted() {
    this.resetContext();
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
h3 {
  margin-left: -5px;
  color: black;
}

.achievement.completed {
  color: rgb(1, 185, 1);
}
.achievement {
  color: rgb(182, 182, 182);
}
dd {
  font-size: 10px;
}
</style>