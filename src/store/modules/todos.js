// Essentially, a boilerplate for a Vuex model
import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );

    // To use setTodos, we use commit
    // First param is mutation we want to call, second is what we want to call
    commit('setTodos', response.data);
  },

  // Adding a new Todo, this.title from AddTodo gets passed in @ title
  async addTodo({ commit }, title) {
    // Make request, get response which gets whole new todo and commit to todo mutation
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      // Params for the new todo
      { title, completed: false }
    );

    // Calling mutation
    commit('newTodo', response.data);
  },

  // Remove from back-end
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },

  // Filter Todos displayed
  async filterTodos({ commit }, e) {
    // Get filter number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit('setTodos', response.data);
  }
};

const mutations = {
  // Take in array, in this case from fetchTodos
  // Take in todos from state and set it to the todos that are passed in
  setTodos: (state, todos) => (state.todos = todos),
  // Afterwards, should be sent down to the component

  // Takes in state and todo, unshifts the new todo
  newTodo: (state, todo) => state.todos.unshift(todo),

  // Remove from UI
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id))
};

export default {
  state,
  getters,
  actions,
  mutations
};
