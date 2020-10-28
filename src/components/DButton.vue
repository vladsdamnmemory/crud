<template>
  <div>
    <button v-bind:class="{'remove': title.toLowerCase() === 'remove', 'icon': iconProvided}" v-bind:type="type"
            class="default-button"
            @click="clicked($event)">
      <span>{{ title }}</span>
      <span><slot></slot></span>
    </button>
  </div>
</template>

<script>


export default {
  name: "DButton",
  props: {
    title: {
      default: '',
      type: String
    },
    type: String,
    iconProvided: Boolean
  },
  methods: {
    clicked(ev) {
      console.log(ev);
    }
  }
}
</script>

<style scoped lang="scss">

#app.dark {
  button {
    color: #c3c3c3;
    background: #401b1b;

    &:active {
      background: #472525;

    }

    &.remove {
      background: #999494;
      color: #3c1c1e;

      &:active {
        background: #ac9f9f;

      }
    }
  }
}

button {
  opacity: .9;
  cursor: pointer;
  outline: none;
  padding: 12px;
  text-decoration: none;
  font-size: 16px;
  //background: #fef5ef;
  border: none;
  border-radius: 4px;
  min-width: 144px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  //text-transform: uppercase;
  background: #ba5179;

  &.icon {
    span:first-child {
      margin-right: 6px;
    }
  }

  &:hover {
    opacity: 1;
  }

  &:active {
    background: #d26b92;
  }

  &.remove {
    background: #d4d4d4;

    &:active {
      background: #c5c5c5;
    }
  }
}
</style>
