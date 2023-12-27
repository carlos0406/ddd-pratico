import OrderFactory from './order.factory'

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps = {
      id: 'abc',
      customerId: 'abcd',
      items: [
        {
          id: 'abc',
          name: 'Product 1',
          productId: 'abc',
          quantity: 1,
          price: 100
        }
      ]
    }

    const order = OrderFactory.create(orderProps)

    expect(order.id).toEqual(orderProps.id)
    expect(order.customerId).toEqual(orderProps.customerId)
    expect(order.items.length).toBe(1)
  })
})
