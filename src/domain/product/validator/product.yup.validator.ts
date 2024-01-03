import { type ValidatorInterface } from '../../@shared/validator/validator.interface'
import * as yup from 'yup'
import type Product from '../entity/product'
export class ProductYupValidator implements ValidatorInterface<Product> {
  validate (entity: Product): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required('Nome é obrigatorio'),
          id: yup.string().required('Id é obrigatório'),
          price: yup.number().required('Preço é obrigatório').min(1, 'Preço é obrigatório')
        }).validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price
        }, {
          abortEarly: false
        })
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(err => {
        entity.notification.addError({
          context: 'product',
          message: err
        })
      })
    }
  }
}
