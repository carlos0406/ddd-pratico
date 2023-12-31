import { type ProductInterface } from './product.interface'

export default class ProductB implements ProductInterface {
  _id: string = ''
  _name: string = ''
  _price: number = 0

  constructor (_id: string, _name: string, _price: number) {
    this._id = _id
    this._name = _name
    this._price = _price
    this.validate()
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price * 2
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

  validate (): boolean {
    if (this._id.length === 0) {
      throw new Error('Id é obrigatório')
    }
    if (this._name.length === 0) {
      throw new Error('Nome é obrigatório')
    }

    if (this._price <= 0) {
      throw new Error('Preço é obrigatório')
    }

    return true
  }
}
