import { type Customer } from '../../../domain/customer/entity/customer'
import { type CustomerRepositoryInterface } from '../../../domain/customer/repository/custumer-repository.interface'
import { type OutputListCustomerDto, type InputListCustomerDto } from './dto/list.customer.dto'

export default class ListCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface
  constructor (CustomerRepository: CustomerRepositoryInterface) {
    this.customerRepository = CustomerRepository
  }

  async execute (input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toOutput(customers)
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class OutputMapper {
  static toOutput (customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city
        }
      }))
    }
  }
}
