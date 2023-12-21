import { type CustomerRepositoryInterface } from '../../../domain/customer/repository/custumer-repository.interface'
import { type InputFindCustomerDto, type OutputFindCustomerDto } from './dto/find.customer.dto'

export class FindCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface

  constructor (customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute ({ id }: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(id)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip
      }
    }
  }
}
