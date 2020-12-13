import captureState from "../store/capture";
import gameState from "../store/game";
import userState from "../store/user";

var zip = require("zip-js/WebContent/zip.js").zip;
zip.useWebWorkers = true;

var imageData = {};

var UploadManager = {
    processEntry(entry) {
        var fileType = entry.filename.split(".")[
            entry.filename.split(".").length - 1
        ];
        var fileNameParts = entry.filename.split("/");
        var fileName = (
            fileNameParts[fileNameParts.length - 2] +
            "/" +
            fileNameParts[fileNameParts.length - 1].replace("." + fileType, "")
        ).toLowerCase();
        switch (fileType) {
            case "json":
                entry.getData(
                    new zip.TextWriter(),
                    function(content) {
                        UploadManager.saveJSON(fileName, content);
                    }.bind(this)
                );
                break;
            /*
            Stores the images / captures from the game additionaly. Due to performance issues, I had to cancel this.
            I now just count the amount of images below.

            case "jpeg":
                entry.getData(
                    new zip.BlobWriter(),
                    async function(content) {
                        await UploadManager.saveJPEG(fileName, content);
                    }.bind(this)
                );
                break;*/

            case "jpeg":
                var fileStructure = fileName.split("/");
                if (fileStructure[0] === "user_captures") {
                    var imageName = fileStructure[1].split("_capture")[0];
                    if (!imageData[imageName]) {
                        imageData[imageName] = [];
                    }

                    imageData[imageName].push(fileName);
                }
                gameState.captures = imageData;
                break;
        }
    },
    saveJSON(fileName, content) {
        switch (fileName) {
            case "user/user_profile":
                userState.user_profile = JSON.parse(content).userProfile;
                break;
            case "social/social_graph":
                userState.social_graph = JSON.parse(content);
                break;
            case "game_data/library":
                // Check for duplicates
                var library = JSON.parse(content).library;
                library.entitlements.sort(UploadManager.sortGames);

                var temp_library = [],
                    unique_names = ["Stadia Pro"];
                library.entitlements.forEach(function(game) {
                    if (!unique_names.includes(game["skuName"])) {
                        temp_library.push(game);
                        unique_names.push(game["skuName"]);
                    }
                });
                gameState.library.entitlements = temp_library;
                break;
            case "game_data/gamer_history":
                var applications = JSON.parse(content).gamerHistory
                    .applications;
                var history = {};

                applications.forEach(function(application) {
                    history[application.applicationName] = {
                        averageTimePlayedPerSession: parseInt(
                            application.averageTimePlayedPerSession.replace(
                                "s",
                                ""
                            )
                        ),
                        mostRecentPlayTime: new Date(
                            application.mostRecentPlayTime
                        ),
                        totalTimePlayed: parseInt(
                            application.totalTimePlayed.replace("s", "")
                        ),
                    };
                });
                gameState.game_history = history;
                break;
        }
    },
    /** @deprecated */
    saveJPEG(fileName, content) {
        return new Promise(function(resolve) {
            var fileStructure = fileName.split("/");
            if (fileStructure[0] === "user_captures") {
                var imageName = fileStructure[1].split("_capture")[0];
                if (!imageData[imageName]) {
                    imageData[imageName] = [];
                }

                if (imageData[imageName].length > 2) {
                    resolve(true);
                } else {
                    var reader = new FileReader();
                    reader.readAsDataURL(content);
                    reader.onloadend = function() {
                        if (imageData[imageName].length <= 2) {
                            imageData[imageName].push(reader.result);
                        }
                        resolve(true);
                    };
                }
            }
        });
    },
    /** @deprecated */
    finalizeImages() {
        captureState.captures = imageData;
    },
    unzip: function(blob, updateProgress) {
        zip.createReader(
            new zip.BlobReader(blob),
            function(reader) {
                reader.getEntries(
                    function(entries) {
                        if (entries.length > 0) {
                            var index = 0;
                            entries.forEach(
                                function(entry) {
                                    UploadManager.processEntry(entry);
                                    UploadManager.finalizeImages();
                                    index++;
                                    updateProgress(index, entries.length);
                                }.bind(this)
                            );
                            console.log(gameState);
                            console.log(userState);
                        }
                    }.bind(this)
                );
            }.bind(this),
            function(error) {
                // onerror callback
                console.log(error);
            }.bind(this)
        );
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
};

export default UploadManager;
