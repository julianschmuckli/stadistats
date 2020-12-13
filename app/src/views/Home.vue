<template>
  <div class="home">
    <v-layout row wrap>
      <v-flex xs12 sm2>
        <v-img src="/logo.svg" width="50" style="margin-left:auto;margin-right:auto;"></v-img>
      </v-flex>
      <v-flex xs12 sm10 style="text-align:center;">
        <h1>Your StadiStats</h1>
      </v-flex>
    </v-layout>
    <div v-if="!imported">
      <UploadCard></UploadCard>
    </div>
    <v-layout row wrap style="margin:0;margin-bottom:100px;">
      <v-flex sm12 xs12 md12 lg12 v-if="imported">
        <UserProfile></UserProfile>
      </v-flex>
      <v-flex sm6 xs12 md6 lg6 v-if="imported">
        <Overview></Overview>
      </v-flex>
      <v-flex sm6 xs12 md6 lg6 v-if="imported">
        <Games @expandedGame="prepareGameDetails" @openGameDetails="d_game_details = true"></Games>
      </v-flex>
    </v-layout>
    <v-dialog v-model="d_game_details" max-width="800">
      <GameDetails :name="selected_game_name"></GameDetails>
    </v-dialog>
  </div>
</template>

<script>
import UploadCard from "../components/UploadCard";
import UserProfile from "../components/UserProfile";
import Games from "../components/Games";
import Overview from "../components/Overview";
import GameDetails from "../components/GameDetails";
import userState from "../store/user";

export default {
  name: 'Home',
  data() {
    return {
      d_game_details: false,
      selected_game_name: undefined
    }
  },
  computed: {
    imported() {
      return userState.user_profile !== undefined;
    }
  },
  methods: {
    prepareGameDetails(game) {
      if (game === undefined) {
        this.selected_game_name = undefined;
      } else {
        this.selected_game_name = game.skuName;
      }
    }
  },
  components: {
    UploadCard,
    UserProfile,
    Games,
    GameDetails,
    Overview
  }
}
</script>
<style>
h1 {
  margin-bottom: 40px;
}
.flex {
  padding: 10px;
}
</style>
