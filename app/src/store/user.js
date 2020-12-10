import Vue from 'vue';
const userState = Vue.observable(
    {
        social_graph: undefined,
        user_profile: undefined
    }
);
export default userState;