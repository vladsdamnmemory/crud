<template>
  <div class="home">
    <h1>Currently available tasks</h1>

    <div class="sort">
      <i>sort by</i>
      <span @click="byId = true; byDate = false;">Id</span>
      <span @click="byDate = true; byId = false;">Date</span>
      <span @click="byDate = false; byDate =false;">Clear</span>
    </div>

    <div class="home__sections">
      <div class="info">
        Have a productive day!
      </div>

      <div class="tasks-b">
        <task class="tasks-b__task" v-for="task of tasks" :key="task.id" v-bind:title="task.title"
              v-bind:description="task.description" v-bind:id="task.id"></task>
      </div>

    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import Task from "@/components/Task";

export default {
  name: 'Dashboard',
  components: {
    Task,
  },
  data() {
    return {
      byDate: false,
      byId: false
    }
  },
  methods: {
    sortArray(propName) {
      return function sort(a, b) {
        if (propName === 'date') return b[propName] - a[propName];
        if (propName === 'id') return a[propName] - b[propName];
      }
    }
  },
  computed: {
    tasks() {

      let tasks = JSON.parse(localStorage.getItem('tasks'));

      if (tasks && tasks instanceof Array) {

        if (this.byDate) {
          return tasks.sort(this.sortArray('date'));
        }

        if (this.byId) {
          return tasks.sort(this.sortArray('id'));
        }

      }

      return tasks;


    }
  }
}
</script>

<style lang="scss">

.home {
  &__sections {
    display: flex;
    align-content: flex-start;

    > div {
      width: 50%;
    }

  }
}

.tasks-b {
  &__task {
  }
}

.sort {
  margin: 24px 0 12px;
  text-align: right;
  font-size: 16px;


  span {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    padding: 6px 18px;
    margin-left: 8px;
    background: #d6e3f8;
    user-select: none;
    cursor: pointer;
    color: #584b53;
    border-radius: 4px;
    animation: ease .4s;
    opacity: .7;

    &:hover {
      opacity: 1;
    }

  }
}
</style>
