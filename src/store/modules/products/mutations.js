export const SET_PRODUCTS = 'SET_PRODUCTS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const productsMutations = {
  [SET_PRODUCTS](state, items) {
    state.products = items;
  },
  [SET_CATEGORIES](state, items) {
    state.categories = items;
  },
  [ADD_PRODUCT](state, product) {
    state.products.push(product);
  },
  [DELETE_PRODUCT](state, product) {
    state.products = state.products.filter((p) => p.id !== product.id);
  },
  [UPDATE_PRODUCT](state, product) {
    state.products = state.products.map((p) =>
      p.id === product.id ? product : p
    );
  },
};
