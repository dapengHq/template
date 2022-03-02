import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element-ui';

// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.scss'; // global css
import '@/icons'; // icon

process.env.VUE_APP_ENV === 'mock' && require('./axios/mock');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
