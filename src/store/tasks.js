export default {
    actions: {
        fetchTasks(ctx) {
            return new Promise(resolve => {
                let tasks = JSON.parse(localStorage.getItem('tasks'));

                if (tasks && tasks instanceof Array) {
                    resolve(tasks);
                } else {
                    let defaultState = [{
                        "id": 7,
                        "title": "Use many methods of Array",
                        "description": "The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.",
                        "date": 1603614347395,
                        "status": "In progress",
                        "subtasks": [{
                            "id": 1,
                            "status": "Idle",
                            "date": 1603614558963,
                            "title": "Create instance of Array",
                            "description": "The concat method creates a new array consisting of the elements in the object on which it is called, followed in order by, for each argument, the elements of that argument (if the argument is an array) or the argument itself (if the argument is not an array). It does not recurse into nested array arguments.",
                            "nestedId": "7.1"
                        }]
                    }, {
                        "id": 6,
                        "title": "Use Splice()",
                        "description": "The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.",
                        "date": 1603594627163,
                        "status": "Closed",
                        "subtasks": [{
                            "id": 1,
                            "status": "Idle",
                            "date": 1603613783308,
                            "title": "",
                            "description": "",
                            "nestedId": "6.1"
                        }]
                    }, {
                        "id": 5,
                        "title": "Use Pop()",
                        "description": "The pop() method removes the last element from an array and returns that element. This method changes the length of the array.",
                        "date": 1603593819777,
                        "status": "Closed",
                        "subtasks": []
                    }, {
                        "id": 3,
                        "title": "Use FlatMap() ",
                        "description": "The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1, but slightly more efficient than calling those two methods separately.",
                        "date": 1603591018494,
                        "status": "Closed",
                        "subtasks": []
                    }, {
                        "id": 2,
                        "title": "Use Length",
                        "description": "The length property of an object which is an instance of type Array sets or returns the number of elements in that array. The value is an unsigned, 32-bit integer that is always numerically greater than the highest index in the array.",
                        "date": 1603590700327,
                        "status": "Closed",
                        "subtasks": []
                    }];
                    localStorage.setItem('tasks', JSON.stringify(defaultState));
                    resolve(defaultState);
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
        removeSubtask(state, options) {
            console.log('options',options);
            let task = state.tasks.find(item => +item.id === +options.taskId);

            for (let item of task.subtasks) {

                if (Number(item.id) === Number(options.subtaskId)) {

                    task.subtasks = task.subtasks.filter(subtask => {
                        return +subtask.id !== +options.subtaskId;
                    });

                    break;

                }
            }


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

        }
    }
}
