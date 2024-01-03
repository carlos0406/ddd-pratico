import { type ValidatorInterface } from '../../@shared/validator/validator.interface'
import { type Customer } from '../entity/customer'
import { CustumerYupValidator } from '../validator/custumer.yup.validator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class CustumerValidatorFactory {
  static create (): ValidatorInterface<Customer> {
    return new CustumerYupValidator()
  }
}
