import { type OrderItem } from './orderItem'

export class Order {
  private readonly _id: number = 0
  private readonly _customerId: number = 0
  private readonly _items: OrderItem[] = []
  private readonly _total: number = 0

  constructor (_id: number, _customerId: number, _items: OrderItem[]) {
    this._id = _id
    this._customerId = _customerId
    this._items = _items
    this.validate()
  }

  validate (): void {
    if (this._id === 0) {
      throw new Error('Id é obrigatório')
    }

    if (this._customerId === 0) {
      throw new Error('Id do cliente é obrigatório')
    }

    if (this._items.length === 0) {
      throw new Error('Pedido deve ter pelo menos um item')
    }
  }

  get customerId (): number {
    return this._customerId
  }

  get id (): number {
    return this._id
  }

  get items (): OrderItem[] {
    return this._items
  }

  total (): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }
}
