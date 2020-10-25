<template>
  <div>
    <button v-bind:type="type" class="default-button" @click="clicked($event)">{{ title }}</button>
  </div>
</template>

<script>


export default {
  name: "DButton",
  props: {
    title: String,
    type: String
  },
  methods: {
    clicked(ev) {
      console.log(ev);
    }
  }
}
</script>

<style scoped lang="scss">

button {
  padding: 12px;
  text-decoration: none;
  font-size: 16px;
  //background: #fef5ef;
  border: none;
  border-radius: 4px;
  min-width: 200px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-transform: uppercase;
  background: #ba5179;
}
</style>
