import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Todos from '@/components/Todos.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Todos.vue', () => {
  let actions;
  let store;

  const state = {
    todos: []
  };
  const getters = {
    allTodos: (state) => state.todos
  };
  const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
    updateTodo: (state, todoToUpdate) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === todoToUpdate.id
      );
      if (index !== -1) {
        state.todos.splice(index, 1, todoToUpdate);
      }
    }
  };

  beforeEach(() => {
    actions = {
      fetchTodos: jest.fn(),
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      filterTodos: jest.fn(),
      updateTodo: jest.fn(),
      filterCompleted: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      state,
      getters,
      mutations
    });
  });

  it('dispatches "fetchTodos" when component is loaded', () => {
    // console.log(mutations.setTodos);
    const wrapper = shallowMount(Todos, { store, localVue });
    // console.log(wrapper.vm);
    expect(actions.fetchTodos).toHaveBeenCalled();
  });
});

describe('Todo.vue', () => {
  it('should import vuex', () => {});

  it('has a created hook', () => {
    expect(typeof Todos.created).toBe('function');
  });

  it('has a mapGetters function', () => {
    const getters = Object.keys(Todos.computed);
    console.log(Todos.computed.allTodos);
    expect(getters[0]).toBe('allTodos');
  });

  it('has fetchTodos function', () => {
    const methods = Todos.methods;
    expect(typeof methods.fetchTodos).toBe('function');
  });
});
