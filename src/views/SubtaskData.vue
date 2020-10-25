<template>
  <div class="subtask">
    <form class="mt24">
      <div class="status"
           v-bind:class="{
          progress: subtask.status === 'In progress',
          fulfilled: subtask.status === 'Fulfilled',
          closed: subtask.status === 'Closed'
        }"
           title="Change status" @click="showStatusOptions = !showStatusOptions">
        <div>{{ subtask.status }}</div>
        <transition name="fade">
          <div class="status-change" v-if="showStatusOptions">
            <ul>
              <li @click="assignStatus('Idle')">Idle</li>
              <li @click="assignStatus('In progress')">In progress</li>
              <li @click="assignStatus('Fulfilled')">Fulfilled</li>
              <li @click="assignStatus('Closed')">Closed</li>
            </ul>
          </div>
        </transition>
      </div>
      <h2>Subtask #{{ subtask.nestedId }}: <span title="Click to edit" v-bind:class="{'empty': emptyTitle}"
                                                 @click="editTitle()"
                                                 v-if="!titleEditable">{{ subtask.title }}</span></h2>
      <label><input placeholder="Type in title of task" v-if="titleEditable" ref="titleRef" type="text"
                    v-model="subtask.title"
                    @blur="saveChanges()"></label>

      <p class="description" v-bind:class="{'empty': emptyDescription}" title="Click to edit"
         @click="editDescription()"
         v-if="!descriptionEditable">{{ subtask.description }}</p>
      <div v-else>
        <label>
          <textarea placeholder="Type in description of task" ref="descRef" @blur="saveChanges()" name="" id=""
                    cols="30" rows="10"
                    v-model="subtask.description"></textarea>
        </label>
      </div>


      <div class="mt24 mb12 btn-container">

        <div>
          <d-button v-bind:type="'button'" v-bind:title="'Remove'" @click.native="removeSubtask()"></d-button>
        </div>
      </div>

      <hr>

      <p class="help">
        Click on field to edit its information
      </p>
    </form>

  </div>
</template>

<script>
import DButton from "@/components/DButton";

export default {
  name: "SubtaskData",
  components: {DButton},
  data() {
    return {
      titleEditable: false,
      descriptionEditable: false,
      showStatusOptions: false,
    }
  },
  methods: {
    assignStatus(status) {
      if (this.subtask.status === status) {
        return false;
      }

      this.subtask.status = status;
      this.$store.dispatch('updateTaskInLocalStorage');

      this.$store.dispatch('pushMessage', 'Subtask status has been modified successfully');
      this.$store.dispatch('unshiftLog', `Status in subtask #${this.subtask.nestedId} has been switched to "${status.toUpperCase()}" at ${new Date().toLocaleTimeString()}`);
    },

    removeSubtask() {
      this.$store.dispatch('pushMessage', `Subtask "${this.subtask.title.trim()}" has been removed`);
      this.$store.dispatch('unshiftLog', `Subtask "${this.subtask.title.trim()}" has been removed`);


      this.$store.commit('removeSubtask', {subtaskId: +this.subtask.id, taskId: +this.$route.params.id});
      this.$router.push({path: '/task/' + this.$route.params.id}).catch();


    },
    editTitle() {
      this.titleEditable = true;
      this.$nextTick(() => {
        this.$refs.titleRef.focus();
      })
    },

    editDescription() {
      this.descriptionEditable = true;
      this.$nextTick(() => {
        this.$refs.descRef.focus();
      })
    },

    saveChanges() {
      this.descriptionEditable = false;
      this.titleEditable = false;

      this.$store.dispatch('updateTaskInLocalStorage');
      this.$store.dispatch('pushMessage', 'Subtask has been modified successfully');
      this.$store.dispatch('unshiftLog', `Subtask #${this.subtask.nestedId} has been modified at ${new Date().toLocaleTimeString()}`);

    }
  }
  ,
  computed: {
    subtask() {
      console.log(this.$route);
      if (this.$store.getters.allTasks.length) {
        let index;
        let task = this.$store.getters.allTasks.find((task, i) => {
          index = i;
          return task.id === +this.$route.params.id;
        });
        console.log('mytask', task);

        let subtask = {};

        for (let item of this.$store.getters.allTasks[index].subtasks) {
          console.log(Number(item.nestedId));
          console.log(Number(this.$route.params.nestedId));
          if (Number(item.nestedId) === Number(this.$route.params.nestedId)) {
            subtask = item;
            return subtask;
          }
        }


      }
      return {};
    }
    ,
    emptyDescription() {
      if (typeof this.subtask.description === 'string') {
        return !this.subtask.description.trim();
      }
      return true;
    }
    ,
    emptyTitle() {
      if (typeof this.subtask.title === 'string') {
        return !this.subtask.title.trim();
      }

      return true;

    }
  }

}
</script>

<style scoped lang="scss">



form {
  display: block;
  position: relative;
  width: 80%;

  .sub-tasks {
    margin: 24px 0 0;
    padding-left: 32px;

    h3 {
      text-align: right;
    }
  }

  h2 {
    span:hover {
      opacity: .7;
    }
  }

  p.description:hover {
    opacity: .7;

  }

  input {
  }


  .status {
    position: absolute;
    display: flex;
    padding: 4px 24px;
    background: #b8b8b8;
    color: white;
    text-transform: uppercase;
    border-radius: 4px;
    cursor: pointer;
    opacity: 1;
    right: 0;
    top: 0;
    font-size: 14px;

    &.progress {
      background: #e4bb97;

    }

    &.fulfilled {
      background: #64dc90;

    }

    &.closed {
      background: #3ab567;
    }

    &:hover {
      //opacity: .9;

    }

  }



  .status-change {
    position: absolute;
    top: 32px;
    right: 0;
    width: 120px;
    min-height: 100px;
    z-index: 120;
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 1px black;

    li {
      display: block;
      padding: 12px;
      color: #584b53;

      &:hover {
        background: #c26387;
        color: white;
      }
    }
  }

  //&:hover {
  //  .delete {
  //    display: flex;
  //
  //  }
  //}
}


.help {
  user-select: none;
  color: #bb5079;
}

hr {
}

.btn-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > div {
    margin-right: 12px;
  }


}
</style>
