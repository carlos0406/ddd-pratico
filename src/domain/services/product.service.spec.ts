import Product from '../entity/product'
import { ProductService } from './product.service'

describe('ProductService Unit test', () => {
  it('should change the price off alll products', () => {
    const prodcut1 = new Product(1, 'Produto 1', 100)
    const prodcut2 = new Product(2, 'Produto 2', 200)
    const prodcut3 = new Product(3, 'Produto 3', 300)
    const products = [prodcut1, prodcut2, prodcut3]

    ProductService.increasePrice(products, 100)

    expect(prodcut1.price).toBe(200)
    expect(prodcut2.price).toBe(400)
    expect(prodcut3.price).toBe(600)
  })
})
