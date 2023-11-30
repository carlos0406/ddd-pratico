import Product from '../../domain/entity/product'
import { ProductModel } from '../db/sequelize/model/prudct.model'
import { type ProductRepositoryInterface } from './../../domain/repository/product-repository.interface'
export class ProductRepository implements ProductRepositoryInterface {
  async update (entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: { id: entity.id }
    })
  }

  async find (id: number): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } })
    return new Product(productModel.id, productModel.name, productModel.price)
  }

  delete: (id: number) => Promise<void>
  async findAll (): Promise<Product[]> {
    const products = await ProductModel.findAll()
    return products.map(product => new Product(product.id, product.name, product.price))
  }

  async create (entity: Product): Promise<void> {
    await ProductModel.create({
      name: entity.name,
      price: entity.price
    })
  }
}
