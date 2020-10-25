<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(crumb, index) in crumbs" :key="index">
      <span class="btn btn-link"
            :class="{disabled: isLast(index)}"
            @click="go(crumb.value)">
        {{ crumb.name }}
      </span>
    </li>
  </ol>
</template>

<script>
export default {
  name: "breadcrumb",
  methods: {
    isLast(index) {
      return index === this.crumbs.length - 1;
    },
    go(crumb) {
      console.log(crumb);
      this.$router.push({path: '/' + crumb}).catch();
    }
  },
  computed: {
    crumbs() {
      return this.$store.getters.crumbs;

    }
  }
}
</script>

<style scoped lang="scss">
.breadcrumb {

  background: white;

  &-item {
    display: inline-block;
    margin-right: 8px;
  }
}
</style>
