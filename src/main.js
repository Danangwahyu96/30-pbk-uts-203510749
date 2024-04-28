const { createApp } = Vue;

createApp({
  data() {
    return {
      newTask: '',
      tasks: [
        { title: 'Task 1', completed: false },
        { title: 'Task 2', completed: true },
        { title: 'Task 3', completed: false },
      ],
    };
  },
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.completed).length;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({ title: this.newTask.trim(), completed: false });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(task => !task.completed);
    },
  },
}).mount('#app');