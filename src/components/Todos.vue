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
import { mapGetters } from "vuex";

export default {
  name: "Todos",
  // Way that we implement or define what getters we want to use
  // Allows use of getter which returns the state desired
  computed: mapGetters(["allTodos"])
};
</script>

<style>
</style>
