import { type ValidatorInterface } from '../../@shared/validator/validator.interface'
import type Product from '../entity/product'
import { ProductYupValidator } from '../validator/product.yup.validator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ProductValidatorFactory {
  static create (): ValidatorInterface<Product> {
    return new ProductYupValidator()
  }
}
