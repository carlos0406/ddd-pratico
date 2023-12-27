import { Order } from './order'
import { OrderItem } from './orderItem'

describe('order unit test', () => {
  it('shoud throw error whe id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Order('', 'abc', [])
    }).toThrow('Id é obrigatório')
  })

  it('shoud throw error whe customer_id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Order('123', '', [])
    }).toThrow('Id do cliente é obrigatório')
  })

  it('shoud throw error whe order items is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Order('123', 'abc', [])
    }).toThrow('Pedido deve ter pelo menos um item')
  })

  it('shoud calculate total', () => {
    const item = new OrderItem('123', 'robson', 10, 2, 'abc')
    const item2 = new OrderItem('1234', 'robson', 15, 2, 'abc')
    const customer = new Order('abc', 'abc5', [item, item2])
    expect(customer.total()).toBe(50)
  })

  it('shoud throw error if item quantity is greater than 0', () => {
    expect(() => {
      const item = new OrderItem('abc', 'robson', 10, 0, 'abc')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Order('abc', 'abc5', [item])
    }).toThrow('Quantidade deve ser maior que zero')
  })
})
