import { UserRepository } from './UserRepository';
import { ProductRepository } from './ProductRepository';
import { CategoryRepository } from './CategoryRepository';

const repositories = {
    'products': ProductRepository,
    'user': UserRepository,
    'categories': CategoryRepository,
}
export default {
    get: name => repositories[name]
};