<template>
  <div>
    <h3>Todos</h3>
    <div class="todos">
      <div v-for="todo in allTodos" :key="todo.id" class="todo">{{ todo.title }}</div>
    </div>
  </div>
</template>

<script>
// This maps getters from Vuex to the component as an array
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  methods: {
    // Way that we implement or define what getters we want to use
    // Allows use of getter which returns the state desired
    // Using spread operator
    ...mapActions(["fetchTodos"])
  },
  computed: mapGetters(["allTodos"]),
  // Lifecycle hook
  created() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
</style>
