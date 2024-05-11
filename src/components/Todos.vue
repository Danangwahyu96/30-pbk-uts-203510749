<!-- Todos.vue -->
<template>
  <div>
    <input type="text" v-model="newTodo" placeholder="Add new todo" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed" @change="toggleCompleted(todo)">
        <span>{{ todo.title }}</span>
        <button @click="removeTodo(todo)">Delete</button>
      </li>
    </ul>
    <button @click="showAll">Show All</button>
    <button @click="showActive">Show Active</button>
    <button @click="showCompleted">Show Completed</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    todos: Array,
  },
  setup(props) {
    const newTodo = ref('');
    const filter = ref('all');

    const filteredTodos = computed(() => {
      if (filter.value === 'active') {
        return props.todos.filter(todo => !todo.completed);
      } else if (filter.value === 'completed') {
        return props.todos.filter(todo => todo.completed);
      } else {
        return props.todos;
      }
    });

    const addTodo = () => {
      if (newTodo.value.trim() !== '') {
        props.todos.push({ id: Date.now(), title: newTodo.value, completed: false });
        newTodo.value = '';
      }
    };

    const toggleCompleted = (todo) => {
      todo.completed = !todo.completed;
    };

    const removeTodo = (todo) => {
      const index = props.todos.indexOf(todo);
      props.todos.splice(index, 1);
    };

    const showAll = () => {
      filter.value = 'all';
    };

    const showActive = () => {
      filter.value = 'active';
    };

    const showCompleted = () => {
      filter.value = 'completed';
    };

    return {
      newTodo,
      filteredTodos,
      addTodo,
      toggleCompleted,
      removeTodo,
      showAll,
      showActive,
      showCompleted,
    };
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
