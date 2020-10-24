<template>
  <section>
    <h3>{{ title }}</h3>
    <p>ID: {{ id }}</p>
    <p v-if="!editDesc" class="description" @click="edit()">{{ description }}</p>

    <div v-if="editDesc">
      <textarea name="" id="" cols="30" rows="10" v-model="desc"></textarea>
     <div @click="save()">save</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Task",
  props: {id: Number, title: String, description: String},
  data() {
    return {editDesc: false, desc: ''}
  },
  methods: {
    edit() {
      this.editDesc = true;
      this.desc = this.description;

    }, save() {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.find(task => task.id = this.id).description = this.desc;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.editDesc = false;

    }
  },
  watch: {
    description() {

    }
  }

}
</script>

<style scoped lang="scss">
section {
  padding: 24px;
  background: #fef5ef;
  margin: 0 0 12px;
  border-radius: 4px;

  .description {
    background: white;
    border-radius: 4px;
    padding: 12px;
    margin: 12px 0 0;
    /* box-shadow: 0 0 4px #d0d0d0; */
    border: 1px #c1c1c1 solid;
  }
}


</style>
