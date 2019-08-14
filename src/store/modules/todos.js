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
    // Get the list of todos from back-end
    axios
      .get('https://whispering-peak-23705.herokuapp.com/api/todos')
      .then((response) => {
        commit('setTodos', response.data);
      });
  },

  // POST
  // Adding a new Todo, this.title from AddTodo gets passed in @ title
  async addTodo({ commit }, title) {
    var params = {
      title,
      completed: false
    };
    axios
      .post('https://whispering-peak-23705.herokuapp.com/api/todos', params)
      .then((response) => {
        commit('newTodo', response.data);
      });
  },

  // DELETE
  // Remove from back-end
  async deleteTodo({ commit }, id) {
    await axios.delete(
      `https://whispering-peak-23705.herokuapp.com/api/todos/${id}`
    );
    commit('removeTodo', id);
  },

  // LIMIT
  // Filter Todos displayed
  async filterTodos({ commit }, e) {
    // Get filter number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await axios.get(
      `https://whispering-peak-23705.herokuapp.com/api/todos/limit/${limit}`
    );
    commit('setTodos', response.data);
  },

  // UPDATE
  async updateTodo({ commit }, todoToUpdate) {
    const response = await axios.patch(
      `https://whispering-peak-23705.herokuapp.com/api/todos/${
        todoToUpdate.id
      }`,
      todoToUpdate
    );

    console.log(response.data);
    commit('updateTodo', response.data);
  },

  // COMPLETED
  async filterCompleted({ commit }) {
    const response = await axios.get(
      'https://whispering-peak-23705.herokuapp.com/api/todos/completed'
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
