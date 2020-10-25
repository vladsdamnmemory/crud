<template>
  <div>
    <transition-group class="messages" tag="ul" name="fade">

      <li class="messages__msg" v-for="(message, index) in messages" v-bind:key="index">
      {{ message }}

      </li>
    </transition-group>

  </div>


</template>

<script>
export default {
  name: "Message",
  computed: {
    messages() {
      return this.$store.getters.getMessages;
    }
  }
}
</script>

<style scoped lang="scss">
.messages {
  position: fixed;
  z-index: 99999999999;
  top: 100px;
  right: 20px;

  display: flex;
  flex-direction: column;

  &__msg {
    display: block;
    box-shadow: 0 0 3px #b9b9b9;
    border-radius: 4px;
    padding: 12px;
    min-width: 200px;
    margin: 0 0 12px;
    color: white;
    background: #64dc90;
  }
}
</style>
