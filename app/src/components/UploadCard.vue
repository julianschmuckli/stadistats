<template>
  <v-card>
    <v-card-title>Upload</v-card-title>
    <v-card-text>
      Upload here the received ZIP from your Google Takeout Export.
      <v-file-input
        v-model="file"
        hide-input
        show-size
        truncate-length="15"
        @change="selected"
      ></v-file-input>
    </v-card-text>
  </v-card>
</template>

<script>
import UploadManager from "../logic/UploadManager";

export default {
  name: "UploadCard",
  methods: {
    selected() {
      let reader = new FileReader();
      reader.onload = function (e) {
        let blob = new Blob([new Uint8Array(e.target.result)], {
          type: this.file.type,
        });

        UploadManager.unzip(blob);
      }.bind(this);
      reader.readAsArrayBuffer(this.file);
    },
  },
};
</script>

<style>
</style>