import { type OrderItem } from './orderItem'

export class Order {
  private readonly _id: string = ''
  private readonly _customerId: string = ''
  private readonly _items: OrderItem[] = []
  private readonly _total: number = 0

  constructor (_id: string, _customerId: string, _items: OrderItem[]) {
    this._id = _id
    this._customerId = _customerId
    this._items = _items
    this.validate()
  }

  validate (): void {
    if (this._id === '') {
      throw new Error('Id é obrigatório')
    }

    if (this._customerId === '') {
      throw new Error('Id do cliente é obrigatório')
    }

    if (this._items.length === 0) {
      throw new Error('Pedido deve ter pelo menos um item')
    }
  }

  get customerId (): string {
    return this._customerId
  }

  get id (): string {
    return this._id
  }

  get items (): OrderItem[] {
    return this._items
  }

  total (): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }
}
