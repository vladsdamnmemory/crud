<template>
  <div class="create">
    <h1>New task {{ date }}</h1>

    <form>
      <h3>Title</h3>
      <input type="text" v-model="taskTitle">

      <h3>Description</h3>
      <textarea name="" id="" cols="30" rows="10" v-model="taskDescription"></textarea>

      <d-button v-bind:title="'Submit'" v-on:click.native="submit($event)"></d-button>
    </form>
  </div>
</template>


<script>
import DButton from "@/components/DButton";

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
      date: new Date().toLocaleString(),
      taskTitle: '',
      taskDescription: ''

    }
  },
  methods: {

    getMax(arr) {
      console.log('arr');
      return Math.max.apply(null, arr.map(item => item.id))
    },
    submit() {
      console.log('Submitted');

      let list = JSON.parse(localStorage.getItem('tasks'));

      let record = {id: undefined, title: this.taskTitle, description: this.taskDescription};


      if (list && list instanceof Array) {
        record.id = this.getMax(list);
        record.id++;
        list.push(record);
        localStorage.setItem('tasks', JSON.stringify(list));

      } else {
        record.id = 1;
        localStorage.setItem('tasks', JSON.stringify([record]));
      }

    }
  }


}
</script>

<style lang="scss">
form {
  width: 50%;
}
</style>
