import { Customer } from '../entity/customer'
import { type Address } from '../value-object/address'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class CustomerFactory {
  public static create (name: string): Customer {
    return new Customer(1, name)
  }

  public static createWithAddress (name: string, address: Address): Customer {
    const customer = new Customer(1, name)
    customer.address = address
    return customer
  }
}
