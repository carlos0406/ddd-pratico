import { Customer } from '../entity/customer'
import { type Address } from '../value-object/address'
import { v4 as uuid } from 'uuid'
/* eslint-disable @typescript-eslint/no-extraneous-class */
export class CustomerFactory {
  public static create (name: string): Customer {
    return new Customer(uuid(), name)
  }

  public static createWithAddress (name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name)
    customer.address = address
    return customer
  }
}
