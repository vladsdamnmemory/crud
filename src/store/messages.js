export default {
    actions: {
        pushMessage(ctx, text) {
            ctx.commit('addMessage', text);
        }
    },
    state: {
        messages: []
    },
    mutations: {
        addMessage(state, text) {
            state.messages.push(text);

            setTimeout(() => {
                state.messages.shift();
            }, 4000);
        }
    },
    getters: {
        getMessages(state) {
            return state.messages;
        }
    }
}
