<!-- App.vue -->
<template>
  <div>
    <header>
      <nav>
        <ul>
          <li @click="selectedMenu = 'Post'" :class="{ active: selectedMenu === 'Post' }">Post</li>
          <li @click="selectedMenu = 'Todos'" :class="{ active: selectedMenu === 'Todos' }">Todos</li>
        </ul>
      </nav>
    </header>
    <main>
      <div v-if="selectedMenu === 'Post'">
        <h2>Post</h2>
        <select v-model="selectedUser" @change="fetchPosts">
          <option value="">Select User</option>
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
        <div v-if="posts.length">
          <ul>
            <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
          </ul>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
      <div v-else-if="selectedMenu === 'Todos'">
        <h2>Todos</h2>
        <!-- Todos component -->
        <Todos :todos="todos" />
      </div>
    </main>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import Todos from './components/Todos.vue';

export default {
  name: 'App',
  components: {
    Todos,
  },
  setup() {
    const selectedMenu = ref('Post');
    const selectedUser = ref('');
    const posts = ref([]);
    const todos = reactive([]);

    const users = ref([
  { id: 1, name: 'danang'},
  { id: 2, name: 'Junet'}
]);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    };

    const fetchPosts = async () => {
      if (selectedUser.value) {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
          posts.value = response.data;
        } catch (error) {
          console.error('Error fetching posts:', error);
          posts.value = [];
        }
      }
    };

    onMounted(async () => {
      const usersData = await fetchUsers();
      users.value = usersData;
    });

    return {
      selectedMenu,
      selectedUser,
      posts,
      fetchPosts,
      todos,
      users
    };
  },
};
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Body styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

/* Header styles */
header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}

nav ul {
  list-style: none;
}

nav ul li {
  display: inline-block;
  margin-right: 1rem;
  cursor: pointer;
}

nav ul li.active {
  font-weight: bold;
}

/* Main styles */
main {
  padding: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

/* Form styles */
select,
input[type="text"] {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}

/* Todos styles */
ul {
  list-style: none;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.completed {
  text-decoration: line-through;
}

</style>
