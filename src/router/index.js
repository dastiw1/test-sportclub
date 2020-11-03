import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/products/:id',
    name: 'UpdateProduct',
    component: () => import(/* webpackChunkName: "update-product" */ '../views/UpdateProduct.vue')
  },
  {
    path: '/products/create',
    name: 'CreateProduct',
    component: () => import(/* webpackChunkName: "create-product" */ '../views/CreateProduct.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
store.state.user.auth.token;

router.beforeEach((to, from, next) => {
  const token = store.state.user.auth.token;

  const isAuthenticated = token != null;
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
