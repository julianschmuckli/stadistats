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
import userState from "../store/user";

require("zip-js/WebContent/inflate");
require("zip-js/WebContent/deflate");
var zip = require("zip-js/WebContent/zip.js").zip;
zip.useWebWorkers = true;

export default {
  name: "UploadCard",
  methods: {
    selected() {
      let reader = new FileReader();
      reader.onload = function (e) {
        let blob = new Blob([new Uint8Array(e.target.result)], {
          type: this.file.type,
        });

        zip.createReader(
          new zip.BlobReader(blob),
          function (reader) {
            reader.getEntries(function (entries) {
              if (entries.length) {
                entries.forEach(function (entry) {
                  var fileType = entry.filename.split(".")[
                    entry.filename.split(".").length - 1
                  ];
                  var fileName = entry.filename.split("/")[entry.filename.split("/").length - 1].replace("." + fileType, "").toLowerCase();
                  if (fileType === "json") {
                    entry.getData(
                      new zip.TextWriter(),
                      function (content) {
                        switch(fileName) {
                            case "user_profile":
                                userState.user_profile = JSON.parse(content).userProfile;
                                break;
                        }
                      }
                    );
                  }
                });
              }
            });
          },
          function (error) {
            // onerror callback
            console.log(error);
          }
        );
      }.bind(this);
      reader.readAsArrayBuffer(this.file);
    },
  },
};
</script>

<style>
</style>