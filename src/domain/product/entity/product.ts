import { AbstractClassEntity } from '../../@shared/entity/entity.abstract'
import NotificationError from '../../@shared/notification/notification.error'
import ProductValidatorFactory from '../factory/product.validator.factory'
import { type ProductInterface } from './product.interface'

export default class Product extends AbstractClassEntity implements ProductInterface {
  private _name: string = ''
  private _price: number = 0

  constructor (_id: string, _name: string, _price: number) {
    super()
    this._id = _id
    this._name = _name
    this._price = _price
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErros())
    }
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price
  }

  get id (): string {
    return this._id
  }

  changePrice (price: number): void {
    this._price = price
    this.validate()
  }

  changeName (name: string): void {
    this._name = name
    this.validate()
  }

  validate (): void {
    ProductValidatorFactory.create().validate(this)
  }
}
