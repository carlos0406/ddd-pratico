import Product from '../../../domain/product/entity/product'
import { FindProductUseCase } from './find.product.usecase'
import { Sequelize } from 'sequelize-typescript'
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product.repository'
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/prudct.model'

const product = new Product('abc', 'p 1', 10)

describe('test find customer use case ', () => {
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

  it('should find a customer', async () => {
    const productRepository = new ProductRepository()
    await productRepository.create(product)
    const usecase = new FindProductUseCase(productRepository)

    const expectedOutput = {
      id: 'abc',
      name: 'p 1',
      price: 10
    }
    const output = await usecase.execute({ id: 'abc' })
    expect(output).toEqual(expectedOutput)
  })

  it('should not find a customer', async () => {
    const custumerRepository = new ProductRepository()
    const usecase = new FindProductUseCase(custumerRepository)

    await expect(async () => {
      return await usecase.execute({ id: 'aaaaa' })
    }).rejects.toThrow('Product not found')
  })
})
