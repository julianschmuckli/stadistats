import Vue from 'vue';
const gameState = Vue.observable(
    {
        library: {
            entitlements: undefined
        },
        game_history: undefined,
        captures: undefined
    }
);
export default gameState;