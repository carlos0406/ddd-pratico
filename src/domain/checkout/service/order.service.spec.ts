import { Customer } from '../../customer/entity/customer'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/orderItem'
import { OrderService } from './order.service'

describe('OrderService Unit test', () => {
  it('shoud calculate total of orders', () => {
    const order1 = new Order(10, 5, [new OrderItem(1, 'robson', 10, 2, 1), new OrderItem(2, 'robson2', 10, 2, 1), new OrderItem(3, 'robson', 10, 2, 1)])
    const order2 = new Order(10, 5, [new OrderItem(3, 'robson', 10, 2, 1), new OrderItem(4, 'robson2', 10, 2, 1)])

    const total = OrderService.calculateTotal([order1, order2])
    expect(total).toBe(100)
  })

  it('should place an order', () => {
    const customer = new Customer(1, 'robson')
    const orderItem1 = new OrderItem(3, 'robson', 10, 1, 1)

    const order = OrderService.placeOrder(customer, [orderItem1])
    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })
})
