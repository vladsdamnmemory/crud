<template>
  <div class="settings">
    <h2 class="mt24">Theme</h2>
    <div class="settings__colors">
      <div @click="setTheme('light')" class="settings__color color_light"></div>
      <div @click="setTheme('dark')" class="settings__color color_dark"></div>
<!--      <div @click="setTheme('bright')" class="settings__color color_bright"></div>-->
    </div>
  </div>
</template>

<script>

export default {
  name: "Settings",
  mounted() {
  },
  data() {
    return {}
  },
  methods: {
    setTheme(theme) {
      this.$store.dispatch('changeTheme', theme);
    }
  }
}
</script>


<style scoped lang="scss">
.settings {
  &__colors {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__color {
    border-radius: 4px;
    border: 1px #9d9d9d solid;
    width: 80px;
    height: 80px;
    margin-right: 12px;
    opacity: 1;

    cursor: pointer;

    &:hover {
      opacity: .8;
    }

    &.color_light {
      background: white;
    }

    &.color_dark {
      background: #4c3838;
    }

    &.color_bright {
      background: #25ced1;
    }
  }
}
</style>
