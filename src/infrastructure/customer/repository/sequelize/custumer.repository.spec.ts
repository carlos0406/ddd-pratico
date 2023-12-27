import { Sequelize } from 'sequelize-typescript'
import { Customer } from '../../../../domain/customer/entity/customer'
import { Address } from '../../../../domain/customer/value-object/address'
import { CustomerModel } from './custumer.model'
import { CustomerRepository } from './custumer.repository'

describe('Customer repository Unit test', () => {
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

  it('should create a customer model', async () => {
    const customer = new Customer('abc', 'Customer 1')
    customer.address = new Address('Joao', 1, '123', 'parazinho')
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)
    const customerDb = await CustomerModel.findOne({ where: { id: 'abc' } })
    expect(customerDb.toJSON()).toStrictEqual({
      id: 'abc',
      name: 'Customer 1',
      street: 'Joao',
      number: 1,
      zipcode: '123',
      city: 'parazinho',
      active: false,
      rewardPoints: 0
    })
  })

  it('should update a customer', async () => {
    const customer = new Customer('abc', 'Customer 1')
    customer.address = new Address('Joao', 1, '123', 'parazinho')
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)
    customer.addRewardPoints(10)
    customer.changeName('Customer 2')
    customer.active()
    await customerRepository.update(customer)
    const customerDb = await CustomerModel.findOne({ where: { id: 'abc' } })

    expect(customerDb.toJSON()).toStrictEqual({
      id: 'abc',
      name: 'Customer 2',
      street: 'Joao',
      number: 1,
      zipcode: '123',
      city: 'parazinho',
      active: true,
      rewardPoints: 10
    })
  })

  it('should find a product', async () => {
    const customer = new Customer('abc', 'Customer 1')
    customer.address = new Address('Joao', 1, '123', 'parazinho')
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: 'abc' } })
    const customerDB = await customerRepository.find(customerModel.id)

    expect(customerModel.toJSON()).toStrictEqual({
      id: customerDB.id,
      name: customerDB.name,
      street: customerDB.address.street,
      number: customerDB.address.number,
      zipcode: customerDB.address.zip,
      city: customerDB.address.city,
      active: customerDB.isActive(),
      rewardPoints: customerDB.rewardPoints
    })
  })

  it('should find all product', async () => {
    const c1 = new Customer('abc', 'Customer 1')
    const c2 = new Customer('abcd', 'Customer 2')
    c1.address = new Address('Joao', 1, '123', 'parazinho')
    c2.address = new Address('Rabelo', 1, '123', 'parazinho')
    const customerRepository = new CustomerRepository()
    await customerRepository.create(c1)
    await customerRepository.create(c2)

    const custuomers = await customerRepository.findAll()
    expect(custuomers).toHaveLength(2)
    expect(custuomers).toContainEqual(c1)
    expect(custuomers).toContainEqual(c2)
  })

  it('shoud throw error when customer not found', async () => {
    const customerRepository = new CustomerRepository()
    void expect(async () => { await customerRepository.find('aaaaa') }).rejects.toThrow('Customer not found')
  })
})
