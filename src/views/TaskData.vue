<template>
  <div class="taskData">

    <form class="mt24">
      <div class="status"
           v-bind:class="{
          progress: task.status === 'In progress',
          fulfilled: task.status === 'Fulfilled',
          closed: task.status === 'Closed'
        }"
           title="Change status" @click="showStatusOptions = !showStatusOptions">
        <div>{{ task.status }}</div>
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
      <h2>Task #{{ task.id }}: <span title="Click to edit" v-bind:class="{'empty': emptyTitle}" @click="editTitle()"
                                     v-if="!titleEditable">{{ task.title }}</span></h2>
      <input placeholder="Type in title of task" v-if="titleEditable" ref="titleRef" type="text" v-model="task.title"
             @blur="saveChanges()">

      <p class="description" v-bind:class="{'empty': emptyDescription}" title="Click to edit"
         @click="editDescription()"
         v-if="!descriptionEditable">{{ task.description }}</p>
      <div v-else>
        <label>
          <textarea placeholder="Type in description of task" ref="descRef" @blur="saveChanges()" name="" id=""
                    cols="30" rows="10"
                    v-model="task.description"></textarea>
        </label>
      </div>


      <div class="mt24 mb12 btn-container">
        <div>
          <d-button v-bind:type="'button'" class="" v-bind:title="'+ Add subtask'"
                    @click.native="createSubtask()"></d-button>

        </div>
        <div>
          <d-button v-bind:type="'button'" v-bind:title="'Remove'" @click.native="removeTask()"></d-button>
        </div>
      </div>

      <hr>

      <p class="help">
        Click on field to edit its information
      </p>
    </form>

    <div class="subtasks-wrapper">
      <div class="sub-tasks">
        <h3>Subtasks</h3>
        <div class="tasks-b">
          <task class="tasks-b__task" v-for="task of subtasks"
                :key="task.nestedId" v-bind:title="task.title"
                v-bind:description="task.description"
                v-bind:id="task.nestedId"
                v-bind:date="task.date"
                @click.native="goToTask(task.id)"></task>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DButton from "@/components/DButton";
import Task from "@/components/Task";

export default {
  name: "TaskData",
  components: {Task, DButton},
  data() {
    return {
      titleEditable: false,
      descriptionEditable: false,
      showStatusOptions: false,
    }
  },
  methods: {
    goToTask() {
    },

    assignStatus(status) {
      this.task.status = status;
      this.$store.dispatch('updateTaskInLocalStorage');

      this.$store.dispatch('pushMessage', 'Task status has been modified successfully');
      this.$store.dispatch('unshiftLog', `Status in task #${this.task.id} switch to "${status.toUpperCase()}" at ${new Date().toLocaleTimeString()}`);
    },

    removeTask() {
      this.$store.dispatch('pushMessage', `Task "${this.task.title.trim()}" has been removed`);
      this.$store.dispatch('unshiftLog', `Task "${this.task.title.trim()}" has been removed`);


      this.$store.commit('removeTask', this.task.id);
      this.$router.push({path: '/'}).catch();


    },
    createSubtask() {
      this.$store.commit('setType', 'subtask');
      this.$nextTick(() => {
        this.$store.dispatch('toggleModal');
      });
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
      this.$store.dispatch('pushMessage', 'Task has been modified successfully');
      this.$store.dispatch('unshiftLog', `Task ${this.task.id} has been modified at ${new Date().toLocaleTimeString()}`);

    }
  },

  computed: {
    subtasks() {

      if (this.$store.getters.allTasks.length) {

        let i = this.$store.getters.allTasks.indexOf(this.task);

        return this.$store.getters.allTasks[i].subtasks;

      }

      return [];


    }

    ,
    task() {
      if (this.$store.getters.allTasks.length) {
        return this.$store.getters.allTasks.find(task => {
          return +task.id === +this.$route.params.id;
        })
      }
      return {};
    },
    emptyDescription() {
      if (typeof this.task.description === 'string') {
        return !this.task.description.trim();
      }
      return true;
    },
    emptyTitle() {
      if (typeof this.task.title === 'string') {
        return !this.task.title.trim();
      }

      return true;

    }
  },

  mounted() {

    // setTimeout(() => {
    //   this.subtasks = this.$store.getters.subtasks;
    // }, 1000)
  }
}

</script>

<style scoped lang="scss">
.taskData {
  display: flex;
  justify-content: center;
  align-items: stretch;

  .subtasks-wrapper {
    width: 20%;
    margin-left: 24px;
    margin-top: 24px;
    min-width: 320px;
  }
}

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
