<template>
    <div class="todo-list">
      <h2>Daftar Kegiatan</h2>
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)">
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
          <button @click="removeTodo(index)">Hapus</button>
        </li>
      </ul>
      <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodoTitle" placeholder="Tambahkan kegiatan...">
        <button type="submit">Tambah</button>
      </form>
      <button @click="filterTodos('all')">Semua</button>
      <button @click="filterTodos('active')">Belum Selesai</button>
      <button @click="filterTodos('completed')">Sudah Selesai</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        todos: [
          // Contoh data todo
          { title: 'Belajar VueJS', completed: false },
          { title: 'Membuat Aplikasi Todo', completed: true },
        ],
        newTodoTitle: '',
      };
    },
    methods: {
      addTodo() {
        if (this.newTodoTitle.trim()) {
          this.todos.push({ title: this.newTodoTitle.trim(), completed: false });
          this.newTodoTitle = '';
        }
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      },
      updateTodo(todo) {
        const index = this.todos.indexOf(todo);
        this.todos[index].completed = !this.todos[index].completed;
      },
      filterTodos(status) {
        if (status === 'active') {
          this.todos = this.todos.filter(todo => !todo.completed);
        } else if (status === 'completed') {
          this.todos = this.todos.filter(todo => todo.completed);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>