<template>
  <div id="app">
    <v-container>
      <router-view />
    </v-container>
    <v-bottom-navigation style="bottom:0;position:fixed;padding-top:10px;" :value="value" color="primary">
      <v-btn @click="openHome">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn @click="openAbout">
        <span>About</span>
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  methods: {
    openHome() {
      this.$router.push('/');
    },
    openAbout() {
      this.$router.push('/about');
    }
  }
}
</script>