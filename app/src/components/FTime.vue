<template>
  <div class="ftime" @click="changeTimeDisplay">
      <v-icon style="font-size:15px;">mdi-clock</v-icon>
      <span style="margin-left:5px;">{{ currentTime }}</span>
  </div>
</template>

<script>
export default {
    props: {
        seconds: {
            type: Number,
            required: true
        },
        nanText: {
            type: String,
            default: "Never played"
        }
    },
    data() {
        return {
            timeDisplay: "hours"
        }
    },
    computed: {
        currentTime() {
            if (Number.isNaN(this.seconds) || this.seconds === undefined) {
                return this.nanText;
            }
            switch(this.timeDisplay) {
                case "hours":
                    return Math.floor((this.seconds / 60 / 60) * 10) / 10  + " hours";
                case "minutes":
                    return Math.floor(this.seconds / 60) + " minutes";
                case "seconds":
                default:
                    return Math.floor(this.seconds) + " seconds"
            }
        }
    },
    watch: {
        seconds() {
            if (this.seconds < 3600) { // Do not show 0 hours at start.
                this.timeDisplay = "minutes";
            }
        }
    },
    methods: {
        changeTimeDisplay() {
            switch(this.timeDisplay) {
                case "hours":
                    this.timeDisplay = "minutes";
                    break;
                case "minutes":
                    this.timeDisplay = "seconds";
                    break;
                case "seconds":
                default:
                    this.timeDisplay = "hours";
                    break;
            }
        }
    }
}
</script>

<style>
.ftime {
    cursor: pointer;
}
</style>