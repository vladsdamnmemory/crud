export default {
    actions: {
        changeTheme(ctx, theme) {
            ctx.commit('setTheme', theme);
        }
    },
    state: {
        theme: ''
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
            localStorage.setItem('theme', theme)
        }
    },
    getters: {
        theme(state) {

            return state.theme;
        }
    }
}
