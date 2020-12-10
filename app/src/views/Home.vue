<template>
  <div class="home">
    <h1>Your Stadia Stats</h1>
    <v-layout row wrap style="margin:0;margin-bottom:100px;">
      <v-flex sm6 xs12 md4 lg3 v-if="!imported">
        <UploadCard></UploadCard>
      </v-flex>
      <v-flex sm12 xs12 md12 lg12 v-if="imported">
        <UserProfile></UserProfile>
      </v-flex>
      <v-flex sm6 xs12 md6 lg6 v-if="imported">
        <Games @expandedGame="openGameDetails"></Games>
      </v-flex>
      <v-flex sm6 xs12 md6 lg6 v-if="imported && selected_game_name !== undefined">
        <GameDetails :name.sync="selected_game_name"></GameDetails>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UploadCard from "../components/UploadCard";
import UserProfile from "../components/UserProfile";
import Games from "../components/Games";
import GameDetails from "../components/GameDetails";
import userState from "../store/user";

export default {
  name: 'Home',
  data() {
    return {
      selected_game_name: undefined
    }
  },
  computed: {
    imported() {
      return userState.user_profile !== undefined;
    }
  },
  methods: {
    openGameDetails(game) {
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
    GameDetails
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
