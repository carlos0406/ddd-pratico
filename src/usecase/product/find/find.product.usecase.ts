import { type ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import { type OutputFindCustomerDto, type InputFindCustomerDto } from './dto/find.product.dto'

export class FindProductUseCase {
  private readonly productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute ({ id }: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const product = await this.productRepository.find(id)
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
