<template>
  <div class="home">

    <div class="sort">
      <i>Sort by</i>
      <span>ID</span>
      <span>Date</span>
    </div>
    <task v-for="task of tasks" :key="task.id" v-bind:title="task.title" v-bind:description="task.description"></task>
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
  computed: {
    tasks() {
      return JSON.parse(localStorage.getItem('tasks'));
    }
  }
}
</script>

<style lang="scss">
.sort {
  margin: 24px 0 12px;
  text-align: right;
  font-size: 16px;


  span {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    padding: 12px;
    margin-left: 8px;
    background: #d6e3f8;
    user-select: none;
    cursor: pointer;
    color: #584b53;
    border-radius: 4px;
  }
}
</style>
