<template>
  <div id="app">
    <nav id="nav">
      <div>
        <div class="logo"></div>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/create">Create</router-link>
        <router-link to="/settings">Settings</router-link>
      </div>
    </nav>
    <div class="content">

      <breadcrumb :crumbs="crumbs" @selected="selected"></breadcrumb>

      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <message></message>
    <modal v-if="$store.getters.modalDisplayed"></modal>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Message from "@/components/Message";
import Modal from "@/components/Modal";
import Breadcrumb from "@/components/breadcrumb";

export default {
  name: 'app',
  components: {Breadcrumb, Modal, Message},
  computed: mapGetters(['allTasks']),
  methods: {
    ...mapActions(['fetchTasks']),
    selected(crumb) {
      console.log(crumb);
    }
  },
  data() {
    return {
      crumbs: ['Dashboard', 'Task', 'Subtask']
    }
  },
  mounted() {
    this.fetchTasks();
  }

}
</script>


<style lang="scss">
.logo {
  background: url("./assets/img/logo.png") #20ab85 no-repeat center;
  width: 86px;
  height: 86px;
  background-size: 64px;
  padding-right: 120px;
  filter: invert(1);
}

</style>
