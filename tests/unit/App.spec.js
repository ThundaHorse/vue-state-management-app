import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '../../src/App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {
  it('should have 3 components', () => {
    expect(Object.keys(App.components).length).toBe(3);
  });

  it('should have components that are not undefined', () => {
    const todos = App.components.Todos;
    const add = App.components.AddTodo;
    const filter = App.components.FilterTodos;

    expect(todos).toBeDefined();
    expect(add).toBeDefined();
    expect(filter).toBeDefined();
  });
});
