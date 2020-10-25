export default {
    actions: {
        fetchTasks(ctx) {
            return new Promise(resolve => {
                let tasks = JSON.parse(localStorage.getItem('tasks'));

                if (tasks && tasks instanceof Array) {
                    resolve(tasks);
                } else {
                    localStorage.setItem('tasks', JSON.stringify([]));
                    resolve([]);
                }
            }).then(tasks => {
                console.log('tasks', tasks);
                console.log('context', ctx);
                ctx.commit('updateTasks', tasks)
                return tasks;
            });
        },
        updateTaskInLocalStorage(ctx) {
            localStorage.setItem('tasks', JSON.stringify(ctx.state.tasks));
        }

    },
    state: {
        tasks: []
    },
    mutations: {
        updateTasks(state, tasks) {
            state.tasks = tasks;
        },
        removeTask(state, id) {
            state.tasks = state.tasks.filter(task => {
                return +task.id !== +id;
            });

            this.dispatch('updateTaskInLocalStorage');
        },
        createTask(state, newTask) {
            console.log('This', this);
            newTask.id = state.tasks.length ? this.getters.newId : 1;

            state.tasks.unshift(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    getters: {
        allTasks(state) {
            return state.tasks;
        },
        newId(state) {
            let maxId = Math.max.apply(null, state.tasks.map(item => item.id));
            return ++maxId;
        },
    }
}
