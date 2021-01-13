<template>
  <div id="app" :class="[theme]">
    <nav id="nav" class="nav">
      <div>
        <div class="nav__links">
          <div class="logo"></div>
          <router-link to="/">Dashboard</router-link>
          <router-link to="/create">Create</router-link>
          <router-link to="/settings">Settings</router-link>
        </div>
        <div class="nav__options">
          <d-button v-if="!userData" :title="'Sign in'" :icon-provided="true" @click.native="authorize()">
            <font-awesome-icon icon="sign-in-alt"/>
          </d-button>
        </div>
      </div>
    </nav>
    <div class="content">


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
import DButton from "@/components/DButton";

export default {
  name: 'app',
  components: {DButton, Modal, Message},
  computed: {
    ...mapGetters(['allTasks']),
    theme() {
      return this.$store.getters.theme;
    },
    userData() {
      return this.$store.getters.userData;
    }
  },
  methods: {
    ...mapActions(['fetchTasks']),
    authorize() {
      this.$store.dispatch('toggleModal', {header: 'Authorization', type: 'auth'});
    }
  },

  mounted() {
    this.fetchTasks();
    this.$store.dispatch('changeTheme', localStorage.getItem('theme'));
  },

}
</script>


<style scoped lang="scss">
.logo {
  background: url("./assets/img/logo.png") #20ab85 no-repeat center;
  width: 86px;
  height: 86px;
  background-size: 64px;
  padding-right: 120px;
  filter: invert(1);
}

#app.dark {
  .logo {
    background-color: #6d6d6d;;
  }
}

</style>
