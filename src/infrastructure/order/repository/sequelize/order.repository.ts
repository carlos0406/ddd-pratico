import { Order } from '../../../../domain/checkout/entity/order'
import { OrderItem } from '../../../../domain/checkout/entity/orderItem'
import type OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'

export default class OrderRepository implements OrderRepositoryInterface {
  async delete (id: number): Promise<void> {
    await OrderModel.destroy({ where: { id } })
  }

  async update (entity: Order): Promise<void> {
    try {
      await OrderModel.update(
        {
          total: entity.total()
        },
        {
          where: { id: entity.id }
        }
      )

      await OrderItemModel.destroy(
        {
          where: { order_id: entity.id }
        }
      )

      await OrderItemModel.bulkCreate(entity.items.map((item) => {
        return {
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price
        }
      }))
    } catch (e) {
      console.log('error updating user:', e)
    }
  }

  async find (id: number): Promise<Order> {
    const orderDb = await OrderModel.findByPk(id, {
      include: [{ model: OrderItemModel }]
    })
    if (orderDb) {
      const orderItems = orderDb.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.product_id
        )
      })
      return new Order(orderDb.id, orderDb.customer_id, orderItems)
    }
  }

  async findAll (): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    })
    return orders.map(o => {
      const orderItems = o.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.product_id
        )
      })
      return new Order(o.id, o.customer_id, orderItems)
    })
  }

  async create (entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity
          }))
        },
        {
          include: [{ model: OrderItemModel }]
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
}
