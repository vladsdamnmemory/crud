<template>
  <div class="create">
    <h2 class="mt24">New task</h2>

    <form>
      <h3>Title</h3>
      <input type="text" v-model="taskTitle">

      <h3>Description</h3>
      <textarea name="" id="" cols="30" rows="10" v-model="taskDescription"></textarea>

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

      let task = {
        id: undefined,
        title: this.taskTitle,
        description: this.taskDescription,
        date: new Date().getTime()
      };


      this.createTask(task);
      console.log('Submitted');
      this.$store.dispatch('unshiftLog', `Task ${task.id} has been created ${new Date().toLocaleTimeString()}`);



    }
  }


}
</script>

<style lang="scss">
form {
  width: 50%;
}
</style>
