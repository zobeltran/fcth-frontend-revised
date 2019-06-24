import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import './plugins/vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import VeeValidate from 'vee-validate';
import VueStripeCheckout from 'vue-stripe-checkout';


Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(VueStripeCheckout, process.env.VUE_APP_STRIPE_PKEY);

router.beforeEach((to: any, from: any, next: any) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if true, redirect to main page.
    if (store.getters.loggedIn) {
      if (!to.meta.roles) {
        next();
      } else if (to.meta.roles.includes(store.getters.loggedRole)) {
        next();
      } else {
        next({
          name: 'home',
        });
      }
    } else {
      next({
        name: 'login',
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
