import Product from '../../../domain/product/entity/product'
import ListProductUseCase from './list.product.usecase'

const product1 = new Product('abc', 'p 1', 10)
const product2 = new Product('abc2', 'p 2', 20)
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    delete: jest.fn()
  }
}

describe('Unit test for listing products use case', () => {
  it('should list a products', async () => {
    const repository = MockRepository()
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
