<template>
  <div class="home">
    <h2 class="mt24">Dashboard</h2>
    <p class="comment mb24" v-if="!tasks.length">Feels a little empty over here. Wanna add some tasks? Go ahead!</p>


    <div class="sort" v-if="tasks.length">
      <i>sort by</i>
      <span @click="sortBy('id')">Number</span>
      <span @click="sortBy('date')">Date of creation</span>
    </div>

    <div class="home__sections">
      <div class="info">
        <span v-if="!logs.length && tasks.length">No feed to show</span>

        <div class="home__log" v-for="(log, index) in logs" v-bind:key="index">
          {{ log }}
        </div>
      </div>

      <div class="tasks-b">

        <task class="tasks-b__task" v-for="task of tasks"
              :key="task.id" v-bind:title="task.title"
              v-bind:description="task.description"
              v-bind:id="task.id"
              v-bind:date="task.date"
              v-bind:value="'Task'"
              @click.native="goToTask(task.id)"></task>
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

    goToTask(id) {
      this.$router.push({path: `/task/${id}`}).catch((err) => {
        console.log(err);
      });

    },
    sortArray(propName) {
      return function sort(a, b) {
        if (propName === 'id') return a[propName] - b[propName];
        if (propName === 'date') return b[propName] - a[propName];
      }
    },
    sortBy(filter) {
      this.$store.getters.allTasks.sort(this.sortArray(filter))
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.allTasks;
    },
    logs() {
      return this.$store.getters.getLogs;
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

  &__log {
    opacity: .8;
    box-shadow: 0 0 1px 0 #ba5179;
    padding: 12px;
    border-radius: 4px;
    margin-right: 12px;
    margin-bottom: 12px;

    &:nth-child(even) {
      opacity: 1;
    }
  }
}

.tasks-b {
  &__task {
    animation: ease .4s;
    cursor: pointer;

    &:hover {
      opacity: .7;
    }
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
