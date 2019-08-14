import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://whispering-peak-23705.herokuapp.com'
    : '/';

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
