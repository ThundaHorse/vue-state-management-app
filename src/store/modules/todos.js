// Essentially, a boilerplate for a Vuex model
import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  // Takes in state as argument, returns state's todos
  allTodos: (state) => state.todos
};

const actions = {
  // GET
  async fetchTodos({ commit }) {
    // const response = await axios.get('/api/todos');
    //// To use setTodos, we use commit
    //// First param is mutation we want to call, second is what we want to call
    // commit('setTodos', response.data);

    // Get the list of todos
    axios.get('/api/todos').then((response) => {
      commit('setTodos', response.data);
    });
  },

  // POST
  // Adding a new Todo, this.title from AddTodo gets passed in @ title
  async addTodo({ commit }, title) {
    //// Make request, get response which gets whole new todo and commit to todo mutation
    // const response = await axios.post(
    // '/api/todos',
    //// Params for the new todo
    // { title, completed: false }
    // );
    //// Calling mutation
    // commit('newTodo', response.data);

    var params = {
      title,
      completed: false
    };

    axios.post('/api/todos', params).then((response) => {
      commit('newTodo', response.data);
    });
  },

  // DELETE
  // Remove from back-end
  async deleteTodo({ commit }, id) {
    // In order to update as deleting
    await axios.delete(`/api/todos/${id}`);
    commit('removeTodo', id);
    // If using this, have to refresh page
    // axios.delete(`/api/todos/${id}`).then(response => {
    // commit('removeTodo', response.data);
    // });
  },

  // LIMIT
  // Filter Todos displayed
  async filterTodos({ commit }, e) {
    // Get filter number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await axios.get(`/api/todos/limit/${limit}`);
    commit('setTodos', response.data);
  },

  // UPDATE
  async updateTodo({ commit }, todoToUpdate) {
    const response = await axios.patch(
      `/api/todos/${todoToUpdate.id}`,
      todoToUpdate
    );

    console.log(response.data);
    commit('updateTodo', response.data);
  },

  // COMPLETED
  async filterCompleted({ commit }) {
    const response = await axios.get('/api/todos/completed');
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
    (state.todos = state.todos.filter((todo) => todo.id !== id)),

  updateTodo: (state, todoToUpdate) => {
    const index = state.todos.findIndex((todo) => todo.id === todoToUpdate.id);
    if (index !== -1) {
      state.todos.splice(index, 1, todoToUpdate);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
