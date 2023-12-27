import { Sequelize } from 'sequelize-typescript'

import OrderRepository from './order.repository'
import { Order } from '../../../../domain/checkout/entity/order'
import { OrderItem } from '../../../../domain/checkout/entity/orderItem'
import { Customer } from '../../../../domain/customer/entity/customer'
import { Address } from '../../../../domain/customer/value-object/address'
import Product from '../../../../domain/product/entity/product'
import { CustomerModel } from '../../../customer/repository/sequelize/custumer.model'
import { CustomerRepository } from '../../../customer/repository/sequelize/custumer.repository'
import { ProductRepository } from '../../../product/repository/sequelize/product.repository'
import { ProductModel } from '../../../product/repository/sequelize/prudct.model'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel
    ])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('robson', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)
    const customerDB = await customerRepository.find('robson')
    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      'abc',
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order('abcd', customerDB.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })
    expect(orderModel.toJSON()).toStrictEqual({
      id: 'abcd',
      customer_id: 'robson',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: 'p1',
          order_id: 'abcd'
        }
      ]
    })
  })

  it('should find a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('abc', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('abc', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      'abc',
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order('abc', 'abc', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const formattedOrder = await orderRepository.find('abc')
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })
    const orderItemDb = formattedOrder.items[0]
    expect(orderModel.toJSON()).toStrictEqual({
      id: formattedOrder.id,
      customer_id: formattedOrder.customerId,
      total: formattedOrder.total(),
      items: [
        {
          id: orderItemDb.id,
          name: orderItemDb.name,
          price: orderItemDb.price,
          quantity: orderItemDb.quantity,
          product_id: orderItemDb.productId,
          order_id: order.id
        }
      ]
    })
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('abc', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('abc', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem1 = new OrderItem(
      'abc',
      product.name,
      product.price,
      2,
      product.id
    )

    const orderItem2 = new OrderItem(
      'abcd',
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order('abc', 'abc', [orderItem1])
    const order2 = new Order('abc2', 'abc', [orderItem2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    await orderRepository.create(order2)

    const orders = await orderRepository.findAll()
    expect(orders).toHaveLength(2)
    expect(orders).toContainEqual(order)
    expect(orders).toContainEqual(order2)
  })

  it('should update a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('abc', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('abc', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      'abc',
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order('abc', 'abc', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    const formattedOrder = await orderRepository.find('abc')
    formattedOrder.items[0].price = 50
    await orderRepository.update(formattedOrder)
    const updatedOrder = await orderRepository.find('abc')
    expect(updatedOrder).toEqual(formattedOrder)
  })

  it('should delete a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('abc', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('abc', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      'abc',
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order('abc', 'abc', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    await orderRepository.delete('abc')
    const deletedOrder = await OrderModel.findOne({
      where: {
        id: 123
      }
    })
    expect(deletedOrder).toBeNull()
  })
})
