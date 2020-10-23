<template>
  <section>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </section>
</template>

<script>
export default {
  name: "Task",
  props: {title: String, description: String}
}
</script>

<style scoped lang="scss">
section {
  padding: 24px;
  background: #fef5ef;
  margin: 0 0 12px;
  border-radius: 4px;
}
</style>
