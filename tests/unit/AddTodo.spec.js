import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AddTodo from '../../src/components/AddTodo.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AddTodo.vue', () => {
  let actions;
  let store;
  let data;

  beforeEach(() => {
    data = {
      title: 'test'
    };

    actions = {
      onSubmit: jest.fn((e) => {
        e.preventDefault();
        this.addTodo();
      }),
      addTodo: jest.fn()
    };

    store = new Vuex.Store({
      actions
    });
  });

  it('should call addTodo if the form is submit even with no input', () => {
    const wrapper = shallowMount(AddTodo, { localVue, store });
    const form = wrapper.find('form');
    form.element.value = 'Submit';
    form.trigger('submit');
    expect(actions.addTodo).toHaveBeenCalled();
  });

  it('should set title to the form input on submission', () => {
    const wrapper = shallowMount(AddTodo, { localVue, store });
    const form = wrapper.find('form');
    const input = wrapper.find('input#title');
    const sub = wrapper.find('input#submit');

    sub.element.value = 'Submit';
    input.element.value = 'test';
    form.trigger('Submit');

    // expect(actions.addTodo).toHaveBeenCalled();
    expect(actions.onSubmit).toHaveBeenCalled();
    expect(data.title).toBe('test');
  });
});
