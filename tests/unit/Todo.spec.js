import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Todos from '@/components/Todos.vue';
import todoModule from '../../src/store/modules/todos';

// Using localVue to create a scoped Vue constructor to make changes and not update the global Vue constructor
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Todos.vue', () => {
  let state;
  let store;
  let actions;

  beforeEach(() => {
    state = {
      todos: [
        {
          id: 1,
          title: 'Test',
          completed: true
        },
        {
          id: 2,
          title: 'Test 2',
          completed: false
        }
      ]
    };
    actions = {
      fetchTodos: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodo: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        todoModule: {
          state,
          actions,
          getters: todoModule.getters
        }
      }
    });
  });

  it('has a created hook', () => {
    expect(Todos.created).toBeDefined();
  });

  it('should fetch all todos', () => {
    shallowMount(Todos, { store, localVue });
    expect(actions.fetchTodos).toHaveBeenCalled();
  });

  // it('has a update todo method', () => {
  //   const wrapper = shallowMount(Todos, { store, localVue });

  //   expect(Todos.methods.markAsCompleted).toBeDefined();
  // });
});
