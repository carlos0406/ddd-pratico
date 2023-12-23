import Product from '../../../domain/product/entity/product'
import { CreateProductUseCase } from './create.product.usecase'

const product = new Product(1, 'p 1', 10)
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    delete: jest.fn(),
    findAll: jest.fn()
  }
}

describe('test create product use case ', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: 'p 1',
      price: 10
    }

    const output = await usecase.execute(input)
    expect(output).toEqual({
      id: 1,
      name: 'p 1',
      price: 10
    })
  })

  it('should thrown an error when name is missing', async () => {
    const productRepository = MockRepository()
    const customerCreateUseCase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'p 1',
      price: 10
    }
    input.name = ''

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Nome é obrigatório'
    )
  })

  it('should thrown an error when price lower or equal to zero', async () => {
    const productRepository = MockRepository()
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
