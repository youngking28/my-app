// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from "vue-router"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './routes'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios)


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { Login },
//   template: '<Login/>',
//   router
// });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


