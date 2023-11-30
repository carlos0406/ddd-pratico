import { Sequelize } from 'sequelize-typescript'

import OrderRepository from './order.repository'
import { CustomerModel } from '../db/sequelize/model/custumer.model'
import OrderModel from '../db/sequelize/model/order.model'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import { ProductModel } from '../db/sequelize/model/prudct.model'
import { CustomerRepository } from './custumer.repository'
import { Customer } from '../../domain/entity/customer'
import { Address } from '../../domain/entity/address'
import Product from '../../domain/entity/product'
import { ProductRepository } from './product.repository'
import { OrderItem } from '../../domain/entity/orderItem'
import { Order } from '../../domain/entity/order'

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
    const customer = new Customer(1, 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product(1, 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      1,
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order(123, 1, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })
    expect(orderModel.toJSON()).toStrictEqual({
      id: 123,
      customer_id: 1,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: 1,
          order_id: 123
        }
      ]
    })
  })

  it('should find a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer(1, 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product(1, 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      1,
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order(123, 1, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const formattedOrder = await orderRepository.find(123)
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
    const customer = new Customer(1, 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product(1, 'Product 1', 10)
    await productRepository.create(product)

    const orderItem1 = new OrderItem(
      1,
      product.name,
      product.price,
      2,
      product.id
    )

    const orderItem2 = new OrderItem(
      2,
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order(123, 1, [orderItem1])
    const order2 = new Order(124, 1, [orderItem2])

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
    const customer = new Customer(1, 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product(1, 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      1,
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order(123, 1, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    const formattedOrder = await orderRepository.find(123)
    formattedOrder.items[0].price = 50
    await orderRepository.update(formattedOrder)
    const updatedOrder = await orderRepository.find(123)
    expect(updatedOrder).toEqual(formattedOrder)
  })

  it('should delete a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer(1, 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.address = address
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product(1, 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      1,
      product.name,
      product.price,
      2,
      product.id
    )

    const order = new Order(123, 1, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    await orderRepository.delete(123)
    const deletedOrder = await OrderModel.findOne({
      where: {
        id: 123
      }
    })
    expect(deletedOrder).toBeNull()
  })
})
