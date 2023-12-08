import { Sequelize } from 'sequelize-typescript'
import { ProductRepository } from './product.repository'
import { ProductModel } from './prudct.model'
import Product from '../../../../domain/product/entity/product'

describe('product repository Unit test', () => {
  let sequileze: Sequelize

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    })
    sequileze.addModels([ProductModel])
    await sequileze.sync()
  })

  afterEach(async () => {
    await sequileze.close()
  })

  it('should create a product model', async () => {
    const productRepository = new ProductRepository()
    await productRepository.create(new Product(1, 'Produto 1', 100))
    const product = await ProductModel.findOne({ where: { id: 1 } })
    expect(product?.toJSON()).toStrictEqual({
      id: 1,
      name: 'Produto 1',
      price: 100
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product(1, 'Produto 1', 100)
    await productRepository.create(product)
    // const productDb = await ProductModel.findOne({ where: { id: 1 } })

    product.changeName('produto 2')
    product.changePrice(200)
    await productRepository.update(product)
    const productDb = await ProductModel.findOne({ where: { id: 1 } })
    expect(productDb?.toJSON()).toStrictEqual({
      id: 1,
      name: 'produto 2',
      price: 200
    })
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    await productRepository.create(new Product(1, 'Produto 1', 100))
    const productModel = await ProductModel.findOne({ where: { id: 1 } })
    const productDB = await productRepository.find(productModel?.id)
    expect(productModel?.toJSON()).toStrictEqual({
      id: productDB.id,
      name: productDB.name,
      price: productDB.price
    })
  })

  it('should find all product', async () => {
    const p1 = new Product(1, 'Produto 1', 100)
    const p2 = new Product(2, 'Produto 2', 200)
    const p = [p1, p2]
    const productRepository = new ProductRepository()
    await productRepository.create(p1)
    await productRepository.create(p2)
    const productsDB = await productRepository.findAll()
    expect(p).toEqual(productsDB)
  })
})
