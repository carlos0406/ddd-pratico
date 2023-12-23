import { ProductFactory } from '../../../domain/product/factory/product.factory'
import { type ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import { type OutputCreateProductDto, type InputCreateProductDto } from './dto/create.product.dto'

export class CreateProductUseCase {
  constructor (private readonly productRepository: ProductRepositoryInterface) {}

  async execute (input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create('a', input.name, input.price)
    await this.productRepository.create(
      product
    )
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
