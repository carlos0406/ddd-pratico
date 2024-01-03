import { Sequelize } from 'sequelize-typescript'
import { ProductRepository } from '../../../infrastructure/product/repository/sequelize/product.repository'
import { ProductModel } from '../../../infrastructure/product/repository/sequelize/prudct.model'
import { CreateProductUseCase } from './create.product.usecase'

describe('test create product use case ', () => {
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
  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: 'p 1',
      price: 10
    }

    const output = await usecase.execute(input)

    expect(output).toEqual({
      name: 'p 1',
      price: 10,
      id: expect.any(String)
    })
  })

  it('should thrown an error when name is missing', async () => {
    const productRepository = new ProductRepository()
    const customerCreateUseCase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'p 1',
      price: 10
    }
    input.name = ''

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'product: Nome é obrigatorio'
    )
  })

  it('should thrown an error when price lower or equal to zero', async () => {
    const productRepository = new ProductRepository()
    const customerCreateUseCase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'p 1',
      price: 0
    }

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Preço é obrigatório'
    )
  })
})
