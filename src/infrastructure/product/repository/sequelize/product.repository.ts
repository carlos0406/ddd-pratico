import Product from '../../../../domain/product/entity/product'
import { type ProductInterface } from '../../../../domain/product/entity/product.interface'
import { type ProductRepositoryInterface } from '../../../../domain/product/repository/product-repository.interface'
import { ProductModel } from './prudct.model'

export class ProductRepository implements ProductRepositoryInterface {
  async update (entity: ProductInterface): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: { id: entity.id }
    })
  }

  async find (id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } })
    if (!productModel) throw new Error('Product not found')
    return new Product(productModel.id, productModel.name, productModel.price)
  }

  delete: (id: string) => Promise<void>
  async findAll (): Promise<Product[]> {
    const products = await ProductModel.findAll()
    return products.map(product => new Product(product.id, product.name, product.price))
  }

  async create (entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }
}
