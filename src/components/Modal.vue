<template>
  <transition name="fade">
    <div class="modal">
      <div class="overlay" @click.self="hide()">
        <div class="popup">
          <h2>Create subtask</h2>

          <form v-if="modalType === 'subtask'">
            <h3>Title</h3>
            <label><input type="text" v-model="subtaskTitle" placeholder="Type in subtask title"></label>

            <h3>Description</h3>
            <label>
              <textarea name="" id="" cols="30" rows="10" v-model="subtaskDescription"
                        placeholder="Type in subtask description"></textarea>
            </label>
            <d-button v-bind:type="'submit'" v-bind:title="'Submit'" v-on:click.native="submit($event)"></d-button>

          </form>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DButton from "@/components/DButton";

export default {
  name: "Modal",
  components: {DButton},
  data() {
    return {
      subtaskTitle: '',
      subtaskDescription: ''
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('addSubTask', {
        taskId: this.$route.params.id,
        subtask: {
          id: undefined,
          status: 'Idle',
          date: new Date().getTime(),
          title: this.subtaskTitle,
          description: this.subtaskDescription
        }

      });
      this.hide();

    },
    hide() {
      this.$store.dispatch('toggleModal');
    }
  },
  computed: {
    modalType() {
      return this.$store.getters.modalType;
    }
  }


}
</script>

<style scoped lang="scss">
.modal {
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(128, 88, 103, 0.6);
    z-index: 99999999999;

    .popup {
      background: #ffffff;
      border-radius: 4px;
      width: 80vw;
      max-width: 840px;
      min-height: 200px;
      padding: 32px;
      max-height: 90vh;
      overflow-x: auto;

      form {
        width: 100%;
      }

      h2 {
        //text-align: center;
      }

      textarea, input {
        width: 100%;
      }
    }
  }
}
</style>
