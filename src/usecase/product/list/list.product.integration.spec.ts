import Product from '../../../domain/product/entity/product'
import ListProductUseCase from './list.product.usecase'
import { Sequelize } from 'sequelize-typescript'
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product.repository'
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/prudct.model'
const product1 = new Product('abc', 'p 1', 10)
const product2 = new Product('abc2', 'p 2', 20)

describe('Unit test for listing products use case', () => {
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
  it('should list a products', async () => {
    const repository = new ProductRepository()
    await repository.create(product1)
    await repository.create(product2)
    const useCase = new ListProductUseCase(repository)

    const output = await useCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })
})
