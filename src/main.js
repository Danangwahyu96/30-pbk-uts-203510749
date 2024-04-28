methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({ title: this.newTask.trim(), completed: false, editing: false });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(task => !task.completed);
    },
    editTask(index) {
      this.tasks[index].editing = true;
    },
    toggleCompleted(task) {
      task.completed = !task.completed;
    },
  },