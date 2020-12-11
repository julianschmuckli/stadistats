<template>
  <div>
      {{ dateFormatted }}
  </div>
</template>

<script>
export default {
    props: {
        date: {
            type: Date,
            required: true
        },
        withTime: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        dateFormatted() {
            if (this.date === undefined) {
                return "Never played";
            }
            var date = (this.date.getDate() + "").padStart(2, "0") + "." + (this.date.getMonth() + 1 + "").padStart(2, "0") + "." + this.date.getFullYear();
            if (this.withTime) {
                date += " " + (this.date.getHours() + "").padStart(2, "0") + ":" + (this.date.getMinutes() + "").padStart(2, "0")
            }
            return date;
        }
    }
}
</script>

<style>

</style>