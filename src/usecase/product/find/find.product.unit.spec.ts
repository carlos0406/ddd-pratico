import Product from '../../../domain/product/entity/product'
import { FindProductUseCase } from './find.product.usecase'

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

describe('test find customer use case ', () => {
  it('should find a customer', async () => {
    const custumerRepository = MockRepository()
    const usecase = new FindProductUseCase(custumerRepository)

    const expectedOutput = {
      id: 1,
      name: 'p 1',
      price: 10
    }
    const output = await usecase.execute({ id: 1 })
    expect(output).toEqual(expectedOutput)
  })

  it('should not find a customer', async () => {
    const custumerRepository = MockRepository()
    custumerRepository.find.mockImplementation(() => {
      throw new Error('Product not found')
    })
    const usecase = new FindProductUseCase(custumerRepository)

    await expect(async () => {
      return await usecase.execute({ id: 1 })
    }).rejects.toThrow('Product not found')
  })
})
