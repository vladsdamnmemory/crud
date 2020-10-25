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
  overflow: visible;
  display: flex;
  width: 0;
  flex-direction: column;
  align-items: flex-end;

  &__msg {
    border-radius: 4px;
    opacity: .9;
    padding: 12px;
    min-width: 200px;
    width: max-content;
    max-width: 50vw;
    margin: 0 0 12px;
    color: #ffffff;
    background: #6ccd48;
    //border: 1px #21371c solid;
    list-style: none;
    box-shadow: 0 0 2px #b5b5b5;
    &::before{
      content: '\25C8';
    }
  }
}
</style>
