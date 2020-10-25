<template>
  <div class="create">
    <h2 class="mt24">New task</h2>

    <form>
      <h3>Title</h3>
      <label>
        <input type="text" v-model="taskTitle" placeholder="Type in task title">
      </label>

      <h3>Description</h3>
      <label>
        <textarea name="" id="" cols="30" rows="10" v-model="taskDescription"
                  placeholder="Type in task description"></textarea>
      </label>

      <d-button v-bind:type="'submit'" v-bind:title="'Submit'" v-on:click.native="submit($event)"></d-button>
    </form>
  </div>
</template>


<script>
import DButton from "@/components/DButton";
import {mapMutations} from "vuex";


export default {
  name: "Create",
  components: {DButton},
  mounted() {
    console.log(this.$store);
    console.log(this);
    console.log(2123);
  },
  data() {
    return {
      taskTitle: '',
      taskDescription: ''

    }
  },
  methods: {
    ...mapMutations(['createTask']),

    submit() {

      if (!this.taskTitle.trim()) {
        this.$store.dispatch('pushMessage', 'Please specify the title');
        return;
      }

      let task = {
        id: undefined,
        title: this.taskTitle,
        description: this.taskDescription,
        date: new Date().getTime(),
        status: 'Idle',
        subtasks: []
      };


      this.createTask(task);
      console.log('Submitted');
      this.$store.dispatch('unshiftLog', `Task #${task.id} has been created ${new Date().toLocaleTimeString()}`);
      this.$store.dispatch('pushMessage', `Task #${task.id} has been successfully created`);

      this.taskTitle = this.taskDescription = '';
      this.$router.push({path: '/'}).catch();

    }
  }, created() {
    console.log(this.$route);
  }


}
</script>

<style lang="scss">
form {
  width: 50%;
}
</style>
