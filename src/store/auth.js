export default {
    actions: {
        requestAuth(ctx, data) {
            ctx.commit('authorize', data);
        }
    },
    state: {
        userData: null
    },
    mutations: {
        authorize(state, data) {
            state.userData = data;
        }
    },
    getters: {
        userData(state) {
            return state.userData;
        }
    }
}
