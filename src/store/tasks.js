import router from "@/router";

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
        },

        addSubTask(ctx, data) {
            ctx.commit('createSubTask', data);
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
        },
        createSubTask(state, data) {
            console.log('createSubTask');

            let task = state.tasks.find(task => {
                return +task.id === +data.taskId;
            });

            console.log('task', task);

            if (task.subtasks.length) {
                data.subtask.id = Math.max.apply(null, task.subtasks.map(item => item.id));
                ++data.subtask.id;
            } else {
                data.subtask.id = 1;
            }

            data.subtask.nestedId = task.id + '.' + data.subtask.id;

            task.subtasks.unshift(data.subtask);
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
        subtasks(state, ctx) {
            console.log('subtasks getter');
            let index = 0;

            let task = state.tasks.find((task, i) => {
                console.log(task.id, +router.currentRoute.params.id);
                index = i;
                return +task.id === +router.currentRoute.params.id;
            });

            if (task && task.subtasks) {
                console.log(task.subtasks);
                console.log((ctx));
                return ctx.allTasks[index].subtasks;
            }
            return [];

        }
    }
}
