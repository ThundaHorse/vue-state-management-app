import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {
  // GET
  async fetchTodos({ commit }) {
    axios.get('/api/todos').then((response) => {
      commit('setTodos', response.data);
    });
  },

  // POST
  async addTodo({ commit }, title) {
    var params = {
      title,
      completed: false
    };
    axios.post('/api/todos', params).then((response) => {
      commit('newTodo', response.data);
    });
  },

  // DELETE
  async deleteTodo({ commit }, id) {
    await axios.delete(`/api/todos/${id}`);
    commit('removeTodo', id);
  },

  // LIMIT
  async filterTodos({ commit }, e) {
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
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
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
