<template>
  <div class="home">
    <v-layout row wrap>
      <v-flex sm6 xs12 md4 lg3>
        <UploadCard @uploaded="refresh_page"></UploadCard>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UploadCard from "../components/UploadCard";

export default {
  name: 'Home',
  components: {
    UploadCard
  }
}
</script>
