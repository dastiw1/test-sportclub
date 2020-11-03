export const productsGetters = {
    getProductById:  state => id => state.products.find(prod => prod.id === id),
    getCategoryById:  state => id => state.categories.find(cat => cat.id === id)
}