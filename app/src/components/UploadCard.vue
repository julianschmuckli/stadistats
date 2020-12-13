<template>
  <v-card>
    <v-card-title>Upload</v-card-title>
    <v-card-text>
      <p style="margin-bottom:10px;">Upload here the received ZIP from your Google Takeout Export.</p>
      <v-file-input
        v-if="file === undefined"
        v-model="file"
        show-size
        truncate-length="15"
        @change="selected"
      ></v-file-input>
      <div style="text-align: center;" v-else>
        <v-progress-circular color="#D72D2D" :value="progress"></v-progress-circular>
        <p>{{ progress }} %</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import UploadManager from "../logic/UploadManager";

export default {
  name: "UploadCard",
  data() {
    return {
      file: undefined,
      progress: 0,
    };
  },
  methods: {
    selected() {
      let reader = new FileReader();
      reader.onload = function (e) {
        let blob = new Blob([new Uint8Array(e.target.result)], {
          type: this.file.type,
        });

        UploadManager.unzip(blob, this.updateProgress);
      }.bind(this);
      reader.readAsArrayBuffer(this.file);
    },
    updateProgress(current, max) {
      this.progress = Math.round((current / max) * 100);
    },
  },
};
</script>

<style>
</style>