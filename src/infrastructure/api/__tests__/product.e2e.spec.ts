import { app, sequelize } from '../express'
import request from 'supertest'
describe('E2E TESTS FOR CUSTOMER', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'product1',
        price: 10
      })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('product1')
    expect(response.body.price).toBe(10)
  })

  it('should  thrown an error on create a product withou name', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: '',
        price: 10
      })
    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    await request(app)
      .post('/product')
      .send({
        name: 'product1',
        price: 10
      })
    const response = await request(app)
      .get('/product').send()
    expect(response.status).toBe(200)
    console.log(response.body)
    expect(response.body.products.length).toBe(1)
    expect(response.body.products[0].name).toBe('product1')
    expect(response.body.products[0].price).toBe(10)
  })
})
