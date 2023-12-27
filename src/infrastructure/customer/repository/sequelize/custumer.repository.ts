import { Customer } from '../../../../domain/customer/entity/customer'
import { type CustomerRepositoryInterface } from '../../../../domain/customer/repository/custumer-repository.interface'
import { Address } from '../../../../domain/customer/value-object/address'
import { CustomerModel } from './custumer.model'

export class CustomerRepository implements CustomerRepositoryInterface {
  async update (entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      city: entity.address.city,
      number: entity.address.number,
      zipcode: entity.address.zip,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    }, {
      where: { id: entity.id }
    })
  }

  async find (id: string): Promise<Customer> {
    let customer: Customer
    try {
      const customerDB = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true })
      // eslint-disable-next-line prefer-const
      customer = new Customer(customerDB.id, customerDB.name)
      customer.address = new Address(customerDB.street, customerDB.number, customerDB.zipcode, customerDB.city)
    } catch (e) {
      throw new Error('Customer not found')
    }
    return customer
  }

  delete: (id: string) => Promise<void>
  async findAll (): Promise<Customer[]> {
    const customers = await CustomerModel.findAll()
    return customers.map(c => {
      const newCustomer = new Customer(c.id, c.name)
      newCustomer.address = new Address(c.street, c.number, c.zipcode, c.city)
      return newCustomer
    })
  }

  async create (entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      city: entity.address.city,
      number: entity.address.number,
      zipcode: entity.address.zip,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }
}
