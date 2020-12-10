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
require("zip-js/WebContent/inflate");
require("zip-js/WebContent/deflate");
var zip = require("zip-js/WebContent/zip.js").zip;

export default {
  name: "UploadCard",
  methods: {
    selected() {
      let reader = new FileReader();
      reader.onload = function (e) {
        let blob = new Blob([new Uint8Array(e.target.result)], {
          type: this.file.type,
        });

        zip.useWebWorkers = true;

        zip.createReader(
          new zip.BlobReader(blob),
          function (reader) {
            // get all entries from the zip
            reader.getEntries(function (entries) {
              if (entries.length) {
                // get first entry content as text
                entries.forEach(function (entry) {
                  console.log(entry.filename);
                  entry.getData(
                    new zip.TextWriter(),
                    function (/*text*/) {
                      // text contains the entry data as a String
                      //console.log(text);
                    },
                    function (/*current, total*/) {
                      // onprogress callback
                      //console.log(current, total);
                    }
                  );
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