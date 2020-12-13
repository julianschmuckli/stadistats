import Vue from 'vue';
const userState = Vue.observable(
    {
        social_graph: undefined, // Social graph stats
        user_profile: undefined // User details like profile picture and username
    }
);
export default userState;