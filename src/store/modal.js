export default {
    actions: {
        toggleModal(ctx, data) {
            ctx.commit('toggleModal', data);
        }
    },
    state: {
        info: {},
        modalDisplayed: false
    },
    mutations: {
        toggleModal(state, data) {
            state.modalDisplayed = !state.modalDisplayed;
            if (!data) return;
            state.info.header = data.header ? data.header : '';
            state.info.type = data.type ? data.type : '';
        }
    },
    getters: {
        modalDisplayed(state) {
            return state.modalDisplayed;
        },

        data(state) {
            return state.info;
        }
    }
}
