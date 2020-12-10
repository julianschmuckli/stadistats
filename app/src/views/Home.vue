<template>
  <div class="home">
    <h1>Your Stadia Stats</h1>
    <v-layout row wrap style="margin:0;">
      <v-flex sm6 xs12 md4 lg3 v-if="!imported">
        <UploadCard></UploadCard>
      </v-flex>
      <v-flex sm6 xs12 md4 lg3 v-if="imported">
        <UserProfile></UserProfile>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UploadCard from "../components/UploadCard";
import UserProfile from "../components/UserProfile";
import userState from "../store/user";

export default {
  name: 'Home',
  computed: {
    imported() {
      return userState.user_profile !== undefined;
    }
  },
  components: {
    UploadCard,
    UserProfile
  }
}
</script>
<style>
h1 {
  margin-bottom: 60px;
}
</style>
