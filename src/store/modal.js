export default {
    actions: {
        toggleModal(ctx) {
            ctx.commit('toggleModal');
        }
    },
    state: {
        info: {},
        modalDisplayed: false
    },
    mutations: {
        toggleModal(state) {
            state.modalDisplayed = !state.modalDisplayed;
        },
        setType(state, value) {
            state.info.type = value;
        }
    },
    getters: {
        modalDisplayed(state) {
            return state.modalDisplayed;
        },
        modalType(state) {
            return state.info.type;

        }
    }
}
