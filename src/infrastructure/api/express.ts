import express, { type Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../customer/repository/sequelize/custumer.model'
import { customerRoute } from './routes/customer.routes'
import { ProductModel } from '../product/repository/sequelize/prudct.model'
import { productRoute } from './routes/product.routes'

export const app: Express = express()
app.use(express.json())
app.use('/customer', customerRoute)
app.use('/product', productRoute)
export let sequelize: Sequelize

async function setupDb (): Promise<void> {
  sequelize = new Sequelize(
    {
      dialect: 'sqlite',
      storage: ':memory121:'
    })
  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
setupDb()
