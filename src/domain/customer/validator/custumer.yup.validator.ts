import { type ValidatorInterface } from '../../@shared/validator/validator.interface'
import { type Customer } from '../entity/customer'
import * as yup from 'yup'
export class CustumerYupValidator implements ValidatorInterface<Customer> {
  validate (entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required('Nome é obrigatorio'),
          id: yup.string().required('Id é obrigatório')
        }).validateSync({
          id: entity.id,
          name: entity.name
        }, {
          abortEarly: false
        })
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(err => {
        entity.notification.addError({
          context: 'custumer',
          message: err
        })
      })
    }
  }
}
