import { type ProductInterface } from '../../../domain/product/entity/product.interface'
import { type ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface'
import { type InputListProductDto, type OutputListProductDto } from './dto/list.product.dto'

export default class ListProductUseCase {
  private readonly productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toOutput(products)
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class OutputMapper {
  static toOutput (products: ProductInterface[]): OutputListProductDto {
    return {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price

      }))
    }
  }
}
