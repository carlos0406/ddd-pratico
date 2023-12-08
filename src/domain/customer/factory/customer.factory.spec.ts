import { Address } from './../value-object/address'
import { CustomerFactory } from './customer.factory'

describe('Customer Factory', () => {
  it('should create a customer a', () => {
    const customer = CustomerFactory.create('Customer a')
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Customer a')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const address = new Address('Address a', 10, '10209', 'robson')
    const customer = CustomerFactory.createWithAddress('Customer a', address)
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Customer a')
    expect(customer.address).toBe(address)
  })
})
