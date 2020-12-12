<template>
  <div>
    <div v-html="game.skuDescription"></div>
    <v-btn color="primary" @click="openStats" style="float: right" text
      ><v-icon style="margin-right: 5px">mdi-open-in-new</v-icon>Open
      details</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "GamePanelContent",
  props: {
    game: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    openStats() {
      this.$emit("openStats", this.game);
    },
  },
};
</script>

<style>
</style>