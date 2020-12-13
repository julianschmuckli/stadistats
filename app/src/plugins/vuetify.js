import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          dark: {
            primary: '#D72D2D',
            secondary: '#FF6652',
            accent: '#FF8147',
            error: '#b71c1c',
          },
          light: {
            primary: '#D72D2D',
            secondary: '#FF6652',
            accent: '#FF8147',
            error: '#b71c1c',
          },
        },
      },
});
