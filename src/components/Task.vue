<template>
  <section>
    <h3>{{ title }}</h3>
    <p>Creation date: {{ creationDate }}</p>
    <p>Time: {{ creationTime }}</p>
    <p>ID: {{ id }}</p>
    <p class="description" v-if="description.trim()">{{ description }}</p>

  </section>
</template>

<script>
export default {
  name: "Task",
  props: {id: Number, title: String, description: String, date: Number},
  data() {
    return {
      editDesc: false,
      desc: '',
      creationDate: new Date(this.date).toLocaleDateString(),
      creationTime: new Date(this.date).getHours() + ':' + new Date(this.date).getMinutes()

    }
  },
  methods: {}

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
    //border: 1px #c1c1c1 solid;
  }
}


</style>
