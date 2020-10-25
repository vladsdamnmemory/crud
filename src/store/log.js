export default {
    actions: {
        unshiftLog(ctx, item) {
            ctx.commit('addLog', item);
        }
    },
    state: {
        logs: []
    },
    mutations: {
        addLog(state, item) {
            state.logs.unshift(item);

        }
    },
    getters: {
        getLogs(state) {
            return state.logs;
        }
    }
}
