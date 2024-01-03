import { app, sequelize } from '../express'
import request from 'supertest'
describe('E2E TESTS FOR CUSTOMER', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Robson',
        address: {
          street: 'Rua',
          number: 1,
          city: 'São Paulo',
          zip: '12345'
        }
      })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Robson')
    expect(response.body.address.street).toBe('Rua')
    expect(response.body.address.number).toBe(1)
    expect(response.body.address.city).toBe('São Paulo')
    expect(response.body.address.zip).toBe('12345')
  })

  it('should  thrown an error on create a customer withou name', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: '',
        address: {
          street: 'Rua',
          number: 1,
          city: 'São Paulo',
          zip: '12345'
        }
      })
    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'Robson',
        address: {
          street: 'Rua',
          number: 1,
          city: 'São Paulo',
          zip: '12345'
        }
      })
    const response = await request(app)
      .get('/customer').send()
    expect(response.status).toBe(200)
    expect(response.body.customers.length).toBe(1)
    expect(response.body.customers[0].name).toBe('Robson')
    expect(response.body.customers[0].address.street).toBe('Rua')
    expect(response.body.customers[0].address.number).toBe(1)
    expect(response.body.customers[0].address.city).toBe('São Paulo')
    expect(response.body.customers[0].address.zip).toBe('12345')
  })

  it('should list all customers with xml', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'Robson',
        address: {
          street: 'Rua',
          number: 1,
          city: 'São Paulo',
          zip: '12345'
        }
      })
    const response = await request(app)
      .get('/customer').set('Accept', 'application/xml').send()
    expect(response.status).toBe(200)
    expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(response.text).toContain('<customers>')
    expect(response.text).toContain('<customer>')
    expect(response.text).toContain('<name>Robson</name>')
    expect(response.text).toContain('<address>')
    expect(response.text).toContain('<street>Rua</street>')
    expect(response.text).toContain('<number>1</number>')
    expect(response.text).toContain('<city>São Paulo</city>')
    expect(response.text).toContain('<zip>12345</zip>')

    // expect(response.body.customers.length).toBe(1)
    // expect(response.body.customers[0].name).toBe('Robson')
    // expect(response.body.customers[0].address.street).toBe('Rua')
    // expect(response.body.customers[0].address.number).toBe(1)
    // expect(response.body.customers[0].address.city).toBe('São Paulo')
    // expect(response.body.customers[0].address.zip).toBe('12345')
  })
})
