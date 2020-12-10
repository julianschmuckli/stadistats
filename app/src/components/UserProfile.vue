<template>
  <v-card class="user_profile">
      <v-card-text>
          <div class="avatar" :style="'background-image:url(' + userState.user_profile.avatarUrl + ')'"></div>
          <h3>{{ userState.user_profile.stadiaName }}</h3>
      </v-card-text>
  </v-card>
</template>

<script>
import userState from "../store/user";

export default {
    mounted() {

    },
    data() {
        return {
            userState: userState
        }
    }
}
</script>

<style>
.avatar {
    background-size:cover;
    border-radius: 75px;
    height: 80px;
    width: 80px;
    margin-left:auto;
    margin-right:auto;
}
.user_profile {
    text-align: center;
}
h3 {
    margin-top: 10px;
}
</style>