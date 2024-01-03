import { ProductFactory } from '../../../domain/product/factory/product.factory'
import UpdateProductUseCase from './update.product.usecase'
import { Sequelize } from 'sequelize-typescript'
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product.repository'
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/prudct.model'
const product = ProductFactory.create('a', 'p1', 10)

const input = {
  id: product.id,
  name: 'p1',
  price: 10
}

describe('Unit test for customer update use case', () => {
  let sequileze: Sequelize

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequileze.addModels([ProductModel])
    await sequileze.sync()
  })

  afterEach(async () => {
    await sequileze.close()
  })
  it('should update a customer', async () => {
    const productRepository = new ProductRepository()
    await productRepository.create(product)
    const customerUpdateUseCase = new UpdateProductUseCase(productRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
