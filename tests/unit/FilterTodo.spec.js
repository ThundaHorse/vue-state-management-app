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

  it('should call filterTodos when select option is changed', () => {
    const wrapper = shallowMount(FilterTodos, { localVue, store });
    const selector = wrapper.find('select');
    selector.setValue('10');
    selector.trigger('onChange');
    expect(actions.filterTodos).toHaveBeenCalled();
  });

  it('should call onCheck when the checkbox is checked', () => {
    const wrapper = shallowMount(FilterTodos, { localVue, store });
    const checker = wrapper.find('input.checkbox');
    checker.trigger('click');

    expect(actions.filterCompleted).toHaveBeenCalled();
  });

  it('should call fetchTodos if filterCompleted is not called', () => {
    const wrapper = shallowMount(FilterTodos, { localVue, store });
    const checker = wrapper.find('input.checkbox');
    checker.trigger('click');

    if (data.checked) {
      expect(actions.fetchTodos).toHaveBeenCalled();
    } else {
      expect(actions.filterCompleted).toHaveBeenCalled();
    }
  });
});
