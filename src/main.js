import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueWait from 'vue-wait';
import Notifications from 'vue-notification'

import vuetify from './plugins/vuetify';
import i18n from './i18n';
import router from './router';

import App from './App.vue';
import store from './store';
import { LocalStorageDB } from './services/storage';
import { SET_USER_TOKEN } from './store/modules/user';
import pageTitleable from './mixins/pageTitleable';

Vue.use(Vuelidate);

Vue.use(VueWait);
Vue.use(Notifications)
Vue.config.productionTip = false;

// fetch and save in store auth token if exists;
const userDb = new LocalStorageDB('user');
const token = userDb.fetch('token');
if (token) {
  store.commit('user/' + SET_USER_TOKEN, token);
}
Vue.mixin(pageTitleable)



new Vue({
  vuetify,
  i18n,
  router,
  store,
  wait: new VueWait(),
  render: (h) => h(App),
}).$mount('#app');
