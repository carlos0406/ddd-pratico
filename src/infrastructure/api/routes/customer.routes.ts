import express, { type Request, type Response } from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase'
import { CustomerRepository } from '../../customer/repository/sequelize/custumer.repository'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'

export const customerRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())
  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip
      }
    }
    const output = await usecase.execute(customerDTO)
    res.json(output).status(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
customerRoute.get('/', async (req: Request, res: Response) => {
  try {
    const usecase = new ListCustomerUseCase(new CustomerRepository())
    const list = await usecase.execute({})
    res.json(list).status(200)
  } catch {
    res.sendStatus(500)
  }
})
