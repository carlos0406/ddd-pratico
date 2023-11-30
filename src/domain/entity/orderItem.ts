export class OrderItem {
  private readonly _id: number = 0
  private readonly _name: string
  private _price: number = 0
  private readonly _quantity: number = 0
  private readonly _product_id: number = 0

  constructor (_id: number, _name: string, price: number, quantity: number, productId: number) {
    this._id = _id
    this._name = _name
    this._price = price
    this._quantity = quantity
    this._product_id = productId
    this.validate()
  }

  set price (price: number) {
    this._price = price
  }

  get price (): number {
    return this._price
  }

  get quantity (): number {
    return this._quantity
  }

  get productId (): number {
    return this._product_id
  }

  get name (): string {
    return this._name
  }

  get id (): number {
    return this._id
  }

  orderItemTotal (): number {
    return this._price * this._quantity
  }

  validate (): boolean {
    if (this._quantity <= 0) {
      throw new Error('Quantidade deve ser maior que zero')
    }
    return true
  }
}
