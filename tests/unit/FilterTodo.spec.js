import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FilterTodos from '../../src/components/FilterTodos.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('FilterTodos.vue', () => {
  let actions;
  let store;
  let state;
  let data;

  beforeEach(() => {
    data = {
      checked: false
    };

    state = {
      todos: [
        {
          id: 1,
          title: 'Test',
          completed: false
        },
        {
          id: 2,
          title: 'Test 2',
          completed: true
        }
      ]
    };

    actions = {
      filterTodos: jest.fn(),
      fetchTodos: jest.fn(),
      filterCompleted: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      state,
      data
    });
  });

  it('should have a data prop', () => {
    shallowMount(FilterTodos, { localVue, store });
    expect(FilterTodos.data).toBeDefined();
  });

  it('should have a onCheck function', () => {
    shallowMount(FilterTodos, { localVue, store });
    expect(FilterTodos.methods.onCheck).toBeDefined();
  });

  // it('should call filterTodos when select option is changed', () => {
  //   const wrapper = shallowMount(FilterTodos, { localVue, store });
  //   let selector = wrapper.find('select');

  //   selector.element.value = '10';
  //   selector.trigger('10');

  //   expect(actions.filterTodos).toHaveBeenCalled();
  // });
});
