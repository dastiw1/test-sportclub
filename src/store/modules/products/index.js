import { productsActions } from './actions';
import { productsGetters } from './getters';
import { productsMutations } from './mutations';

export const products = {
  namespaced: true,
  state: () => ({
    products: [],
    categories: []
  }),
  mutations: productsMutations,
  getters: productsGetters,
  actions: productsActions,
};
