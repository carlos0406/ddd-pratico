import { type Customer } from '../../customer/entity/customer'
import { type OrderItem } from '../entity/orderItem'
import { Order } from './../entity/order'
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class OrderService {
  static calculateTotal (orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }

  static placeOrder (customer: Customer, orderItems: OrderItem[]): Order {
    if (orderItems.length === 0) {
      throw new Error('ordem deve conter pelo menos um item')
    }
    const order = new Order(1, customer.id, orderItems)
    customer.addRewardPoints(order.total() / 2)
    return order
  }
}
