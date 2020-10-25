export default {
    actions: {
        addBreadcrumb(ctx, item) {
            ctx.commit('addCrumb', item);
        }
    },
    state: {
        crumbs: []
    },
    mutations: {
        addCrumb(state, currentRoute) {
            // It's very hardcore I know
            // I'd like to improve it later
            console.log('currentRoute', currentRoute);
            let fullPath = currentRoute.fullPath[currentRoute.fullPath.length - 1] === '/' ? currentRoute.fullPath.slice(0, -1) : currentRoute.fullPath;

            let values = fullPath.split('/');
            let arr = [];
            let str = '';
            for (let index = 0; index < values.length; index++) {

                if (index !== values.length - 1) {
                    str += values[0] + values[index + 1] + '/';
                    arr.push({
                        value: str,
                        name: (() => {
                            if (currentRoute.matched[0].path === '/task/:id') {
                                return 'Task'
                            }
                            if (currentRoute.matched[0].path === '/task/:id/:nestedId') {
                                return 'Subtask'
                            }


                        })()
                    })
                }
            }
            console.log('arr', arr);
            arr.shift();
            state.crumbs = arr;


        }
    },
    getters: {
        crumbs(state) {
            return state.crumbs;
        }
    }
}
