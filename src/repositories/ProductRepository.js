import { mock } from '../utils';
import { products } from '@/services/GLOBAL';

export const ProductRepository = {
  fetch(query) {
    const payload = products
      .filter((prod) => {
        /** Filter by name */
        try {
          if (query.name == '' || new RegExp(query.name, 'i').test(prod.name)) {
            return true;
          }
        } catch (error) {
          return false;
        }

        return false;
      })
      .filter((prod) => {
        /** Filter by category_id */
        if (
          query.category_id == null ||
          prod.category_id === query.category_id
        ) {
          return true;
        }
        return false;
      });
    return mock(payload);
  },
  add(payload) {
    return mock(payload);
  },

  update(payload) {
    return mock(payload);
  },
  delete(payload) {
    return mock({ id: payload.id });
  },
};
