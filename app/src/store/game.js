import Vue from 'vue';
const gameState = Vue.observable(
    {
        library: {
            entitlements: undefined // All the purchased / claimed titles
        },
        game_history: undefined, // Shows the history like play time, etc..
        captures: [], // Counting all the screenshots
        clips: [] // Counting all the clips
    }
);
export default gameState;