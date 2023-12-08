/* eslint-disable @typescript-eslint/no-extraneous-class */
import Product from '../entity/product'
import { type ProductInterface } from '../entity/product.interface'
import ProductB from '../entity/productb'

export class ProductFactory {
  public static create (type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case 'a': {
        return new Product(1, name, price)
      }
      case 'b': {
        return new ProductB(1, name, price)
      }
      default: {
        throw new Error('Invalid type')
      }
    }
  }
}
