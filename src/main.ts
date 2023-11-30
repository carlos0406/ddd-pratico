import { Address } from './domain/entity/address'
import { Customer } from './domain/entity/customer'
import { Order } from './domain/entity/order'
import { OrderItem } from './domain/entity/orderItem'

const customer = new Customer(1, 'robson')
const address = new Address('rua', 123, '12345678', 'cidade')
customer.address = address
customer.active()

// a order guarda somente o id do customer já que o customer faz parte de outro grupo, porém como OrderItem é algo muito ligado ao order o order guarda a informação em formato de objeto

const item1 = new OrderItem(1, 'robson', 10, 1, 1)
const item2 = new OrderItem(2, 'robson2', 15, 1, 1)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const order = new Order(1, customer.id, [item1, item2])
