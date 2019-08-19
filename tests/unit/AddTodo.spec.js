import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AddTodo from '../../src/components/AddTodo.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AddTodo.vue', () => {
  let actions;
  let store;
  let data;
  let state;

  beforeEach(() => {
    data = {
      title: 'test'
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
      onSubmit: jest.fn(),
      addTodo: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      state,
      data
    });
  });

  it('should call addTodo if the form is submit and input has a value', () => {
    const wrapper = shallowMount(AddTodo, { localVue, store });
    const form = wrapper.find('form');
    const input = wrapper.find('input.todoTitle');
    form.element.value = 'Submit';
    form.trigger('submit');
    input.element.value = 'test';

    expect(actions.addTodo).toHaveBeenCalled();
    expect(input.element.value).toBe('test');
  });

  it('should call addTodo if the form is submit and input has no value', () => {
    const wrapper = shallowMount(AddTodo, { localVue, store });
    const form = wrapper.find('form');
    const input = wrapper.find('input.todoTitle');
    form.element.value = 'Submit';
    form.trigger('submit');

    expect(actions.addTodo).toHaveBeenCalled();
  });
});
