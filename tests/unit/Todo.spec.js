import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Todos from '@/components/Todos.vue';
// Using localVue to create a scoped Vue constructor to make changes and not update the global Vue constructor
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Todos.vue', () => {
  let state;
  let getters;
  let store;
  let actions;

  beforeEach(() => {
    // state = {
    //   todos: [
    //     {
    //       id: 1,
    //       title: 'Test',
    //       completed: true
    //     },
    //     {
    //       id: 2,
    //       title: 'Test 2',
    //       completed: false
    //     }
    //   ]
    // };
    // getters = {
    //   allTodos: (state) => state.todos
    // };
    // actions = {
    //   fetchTodos: jest.fn(),
    //   deleteTodo: jest.fn(),
    //   updateTodo: jest.fn()
    // };
    // store = new Vuex.Store({
    //   getters,
    //   state,
    //   state,
    //   actions
    // });
  });

  it('has a created hook', () => {
    expect(Todos.computed).toBeDefined();
  });

  it('has a update todo method', () => {
    expect(Todos.methods).toHaveProperty('updateTodo');
  });
});
