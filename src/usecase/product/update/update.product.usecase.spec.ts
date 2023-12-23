import { ProductFactory } from '../../../domain/product/factory/product.factory'
import UpdateProductUseCase from './update.product.usecase'

const product = ProductFactory.create('a', 'p1', 10)

const input = {
  id: product.id,
  name: 'p1',
  price: 10
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    delete: jest.fn()
  }
}

describe('Unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateProductUseCase(customerRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
