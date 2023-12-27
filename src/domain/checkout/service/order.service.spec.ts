import { Customer } from '../../customer/entity/customer'
import { Order } from '../entity/order'
import { OrderItem } from '../entity/orderItem'
import { OrderService } from './order.service'

describe('OrderService Unit test', () => {
  it('shoud calculate total of orders', () => {
    const order1 = new Order('abc', 'abc1', [new OrderItem('abc3', 'robson', 10, 2, 'abc5'), new OrderItem('abc56', 'robson2', 10, 2, 'abc55'), new OrderItem('abc5111', 'robson', 10, 2, 'abc5121')])
    const order2 = new Order('abcd', 'abc2', [new OrderItem('abc4', 'robson', 10, 2, 'abc6'), new OrderItem('abc57', 'robson2', 10, 2, 'abc55')])

    const total = OrderService.calculateTotal([order1, order2])
    expect(total).toBe(100)
  })

  it('should place an order', () => {
    const customer = new Customer('abc5', 'robson')
    const orderItem1 = new OrderItem('abc5', 'robson', 10, 1, 'abc51')

    const order = OrderService.placeOrder(customer, [orderItem1])
    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })
})
