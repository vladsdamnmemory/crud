<template>
  <section>
    <p class="task-date">Created: {{ creationDate }} at {{ creationTime }}</p>

    <h3><span>Task #{{ id }}:</span> {{ title }}</h3>
    <p class="description" v-if="description.trim()">{{ description }}</p>

  </section>
</template>

<script>
export default {
  name: "Task",
  props: {
    id: {
      type: [String, Number]
    },
    title: {
      type: [String]
    },
    description: {
      type: [String]
    },
    date: {
      type: [Number]
    }
  }
  ,
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
.task-date {
  font-size: 12px;
  //text-align: right;
  margin-bottom: 12px;
}


section {
  padding: 24px;
  background: #fef5ef;
  margin: 0 0 12px;
  border-radius: 4px;

  .description {
    background: white;
    border-radius: 4px;
    padding: 12px;
    margin: 24px 0 0;
    /* box-shadow: 0 0 4px #d0d0d0; */
    //border: 1px #c1c1c1 solid;
  }
}


</style>
