export default {
    actions: {
        toggleModal(ctx) {
            ctx.commit('toggleModal');
        }
    },
    state: {
        info: [],
        modalDisplayed: false
    },
    mutations: {
        toggleModal(state) {
            state.modalDisplayed = !state.modalDisplayed;
        }
    },
    getters: {
        modalDisplayed(state) {
            return state.modalDisplayed;
        }
    }
}
