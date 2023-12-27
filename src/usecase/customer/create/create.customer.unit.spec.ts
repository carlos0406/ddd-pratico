import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { CreateCustomerUseCase } from './create.customer.usecase'

const customer = new Customer('abc', 'Customer 1')
customer.address = new Address('Joao', 1, '123', 'parazinho')
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn<Promise<Customer>, [string]>().mockReturnValue(Promise.resolve(customer)),
    delete: jest.fn(),
    findAll: jest.fn()
  }
}

describe('test create customer use case ', () => {
  it('should create a customer', async () => {
    const custumerRepository = MockRepository()
    const usecase = new CreateCustomerUseCase(custumerRepository)

    const input = {
      name: 'Customer 1',
      address: {
        street: 'Joao',
        city: 'parazinho',
        number: 1,
        zip: '123'
      }
    }

    const output = await usecase.execute(input)

    expect(output).toEqual({
      name: 'Customer 1',
      id: expect.any(String),
      address: {
        street: 'Joao',
        city: 'parazinho',
        number: 1,
        zip: '123'
      }
    })
  })

  it('should thrown an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)
    const input = {
      name: 'Customer 1',
      address: {
        street: 'Joao',
        city: 'parazinho',
        number: 1,
        zip: '123'
      }
    }
    input.name = ''

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Nome é obrigatorio'
    )
  })
})
