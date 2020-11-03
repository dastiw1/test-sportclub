import Repository from '../../../repositories/RepositoryFactory';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_CATEGORIES,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from './mutations';
const ProductRepository = Repository.get('products');
const CategoryRepository = Repository.get('categories');

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const productsActions = {
  async fetchProducts({ commit, state }, query) {
    const { data } = await ProductRepository.fetch(query);
    if (state.products.length === 0) {
      commit(SET_PRODUCTS, data);
    }
    return data;
  },
  async fetchCategories({ commit }) {
    const { data } = await CategoryRepository.fetch();
    commit(SET_CATEGORIES, data);
    return data;
  },
  async createProduct({ commit }, prod) {
    const { data } = await ProductRepository.add(prod);
    commit(ADD_PRODUCT, { ...data, id: randomInteger(100, 1000) });
    return data;
  },
  async updateProduct({ commit }, prod) {
    const { data } = await ProductRepository.update(prod);
    commit(UPDATE_PRODUCT, data);
    return data;
  },
  async deleteProduct({ commit }, prod) {
    const { data } = await ProductRepository.delete(prod);
    commit(DELETE_PRODUCT, prod);
    return data;
  },
};
