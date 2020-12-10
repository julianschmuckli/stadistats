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
import gameState from "../store/game";
import userState from "../store/user";

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
                    entry.getData(new zip.TextWriter(), function (content) {
                      switch (fileName) {
                        case "user_profile":
                          userState.user_profile = JSON.parse(
                            content
                          ).userProfile;
                          break;
                        case "social_graph":
                          userState.user_profile = JSON.parse(content);
                          break;
                        case "library":
                          // Check for duplicates
                          var library = JSON.parse(content).library;
                          library.entitlements.sort(this.sortGames);

                          var temp_library = [], unique_names = ["Stadia Pro"];
                          library.entitlements.forEach(function (game) {
                            if (!unique_names.includes(game["skuName"])) {
                              temp_library.push(game);
                              unique_names.push(game["skuName"]);
                            }
                          });
                          gameState.library.entitlements = temp_library;
                          break;
                      }
                    }.bind(this));
                  }
                }.bind(this));
              }
            }.bind(this));
          }.bind(this),
          function (error) {
            // onerror callback
            console.log(error);
          }.bind(this)
        );
      }.bind(this);
      reader.readAsArrayBuffer(this.file);
    },
    sortGames(a, b) {
      if (a.skuName < b.skuName) {
        return -1;
      }
      if (a.skuName > b.skuName) {
        return 1;
      }
      return 0;
    },
  },
};
</script>

<style>
</style>