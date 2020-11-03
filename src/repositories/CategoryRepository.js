import { mock } from '../utils';
import { categories } from '@/services/GLOBAL';
export const CategoryRepository = {
  fetch() {
    const payload = categories;
    return mock(payload);
  },
};
