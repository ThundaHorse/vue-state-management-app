<template>
  <div>
    Filter Todos:
    <select @change="filterTodos($event)">
      <option value="200">200</option>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="20">20</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>
    <label for="checkbox">Completed</label>
    <input type="checkbox" class="checkbox" v-model="checked" @click="onCheck" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FilterTodos",
  data() {
    return {
      checked: false
    };
  },
  methods: {
    ...mapActions(["filterTodos", "fetchTodos", "filterCompleted"]),
    onCheck() {
      this.checked != this.checked;

      if (!this.checked) {
        this.filterCompleted();
      } else {
        this.fetchTodos();
      }
    }
  }
};
</script>

<style>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}
label {
  padding-left: 10px;
}
</style>