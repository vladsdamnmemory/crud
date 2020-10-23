<template>
  <div id="app">
    <nav id="nav">
      <div>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/create">Create</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </nav>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">


</style>
