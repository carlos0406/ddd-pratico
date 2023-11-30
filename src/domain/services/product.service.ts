import type Product from '../entity/product'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProductService {
  static increasePrice (products: Product[], percetage: number): void {
    products.forEach(product => {
      product.changePrice(product.price + product.price * (percetage / 100))
    })
  }
}
