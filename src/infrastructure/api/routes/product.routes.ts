import express, { type Request, type Response } from 'express'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { ProductRepository } from '../../product/repository/sequelize/product.repository'
import { type InputCreateProductDto } from '../../../usecase/product/create/dto/create.product.dto'
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase'

export const productRoute = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())
  try {
    const productDTO: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price
    }
    const output = await usecase.execute(productDTO)
    res.json(output).status(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
productRoute.get('/', async (req: Request, res: Response) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository())
    const list = await usecase.execute({})
    console.log(list)
    res.json(list).status(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
