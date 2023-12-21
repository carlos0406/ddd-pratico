import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { FindCustomerUseCase } from './find.customer.usecase'

const customer = new Customer(1, 'Customer 1')
customer.address = new Address('Joao', 1, '123', 'parazinho')
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn<Promise<Customer>, [number]>().mockReturnValue(Promise.resolve(customer)),
    delete: jest.fn(),
    findAll: jest.fn()
  }
}

describe('test find customer use case ', () => {
  it('should find a customer', async () => {
    const custumerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(custumerRepository)

    const expectedOutput = {
      id: 1,
      name: 'Customer 1',
      address: {
        street: 'Joao',
        city: 'parazinho',
        number: 1,
        zip: '123'
      }
    }
    const output = await usecase.execute({ id: 1 })
    expect(output).toEqual(expectedOutput)
  })

  it('should not find a customer', async () => {
    const custumerRepository = MockRepository()
    custumerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const usecase = new FindCustomerUseCase(custumerRepository)

    await expect(async () => {
      return await usecase.execute({ id: 1 })
    }).rejects.toThrow('Customer not found')
  })
})
