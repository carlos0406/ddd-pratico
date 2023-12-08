import { type ProductInterface } from './product.interface'

export default class Product implements ProductInterface {
  _id: number = 0
  _name: string = ''
  _price: number = 0

  constructor (_id: number, _name: string, _price: number) {
    this._id = _id
    this._name = _name
    this._price = _price
    this.validate()
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price
  }

  get id (): number {
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
    if (this._id <= 0) {
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
