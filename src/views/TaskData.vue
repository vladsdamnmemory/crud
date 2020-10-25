<template>
  <div class="taskData">

    <form class="mt24">
      <h2>Task #{{ task.id }}: <span v-bind:class="{'empty': emptyTitle}" @click="editTitle()"
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

      <hr>

      <p class="help">
        Click on field to edit its information
      </p>
    </form>


  </div>
</template>

<script>
export default {
  name: "TaskData",

  data() {
    return {
      titleEditable: false,
      descriptionEditable: false
    }
  },
  methods: {

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
    task() {
      if (this.$store.getters.allTasks.length) {
        return this.$store.getters.allTasks.find(task => {
          return +task.id === +this.$route.params.id;
        })
      }
      return {};
    },
    emptyDescription() {
      return !this.task.description.trim();
    },
    emptyTitle() {
      return !this.task.title.trim();
    }
  },

  mounted() {
  }
}

</script>

<style scoped lang="scss">
form {
  display: block;
  width: 80%;

  input {
  }

  .taskData__description {
  }
}

.help {
  user-select: none;
  color: #bb5079;
}

hr {
}
</style>
