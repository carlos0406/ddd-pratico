import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../../../infrastructure/customer/repository/sequelize/custumer.model'
import { CustomerRepository } from '../../../infrastructure/customer/repository/sequelize/custumer.repository'
import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/value-object/address'
import { FindCustomerUseCase } from './find.customer.usecase'

describe('test find customer use case ', () => {
  let sequileze: Sequelize
  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequileze.addModels([CustomerModel])
    await sequileze.sync()
  })

  afterEach(async () => {
    await sequileze.close()
  })

  it('should find a customer', async () => {
    const customer = new Customer('abc', 'Customer 1')
    customer.address = new Address('Joao', 1, '123', 'parazinho')
    const custumerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(custumerRepository)
    await custumerRepository.create(customer)
    const input = {
      id: 'abc'
    }
    const expectedOutput = {
      id: 'abc',
      name: 'Customer 1',
      address: {
        street: 'Joao',
        city: 'parazinho',
        number: 1,
        zip: '123'
      }
    }
    const output = await usecase.execute(input)
    expect(output).toEqual(expectedOutput)
  })
})
