import { toXML } from 'jstoxml'
import { type OutputListCustomerDto } from '../../../usecase/customer/list/dto/list.customer.dto'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CustomerPresenter {
  static toXML (data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true
    }
    return toXML({
      customers: {
        customer: data.customers.map(customer => (
          {
            id: customer.id,
            name: customer.name,
            address: customer.address
          }
        ))
      }

    }, xmlOptions)
  }
}
