import { Address } from './address'
import { Customer } from './customer'

describe('Customer unit test', () => {
  // it('should get 2 as  result', () => {
  //   expect(1 + 1).toBe(2)
  // })

  it('shoud throw error whe id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Customer(0, 'robson')
    }).toThrow('Id é obrigatório')
  })

  it('shoud throw error whe name is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Customer(10, '')
    }).toThrow('Nome é obrigatorio')
  })

  it('shoud throw error whe name is empty on change name', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Customer(10, '')
    }).toThrow('Nome é obrigatorio')
  })

  it('shoud change name', () => {
    const customer = new Customer(10, 'robson')
    customer.changeName('robson2')
    expect(customer.name).toBe('robson2')
  })

  it('shoud activate customer', () => {
    const customer = new Customer(10, 'robson')
    const address = new Address('joão rabelo', 10, '59586000', 'parazinho')
    customer.address = address
    customer.active()
    expect(customer.isActive()).toBe(true)
  })

  it('shoud  throw error when activate customer', () => {
    const customer = new Customer(10, 'robson')

    expect(() => {
      customer.active()
    }).toThrow('Endereço é obrigatório para ativação')
  })

  it('shoud desactivate customer', () => {
    const customer = new Customer(10, 'robson')
    const address = new Address('joão rabelo', 10, '59586000', 'parazinho')
    customer.address = address
    customer.active()
    expect(customer.isActive()).toBe(true)
    customer.desactive()
    expect(customer.isActive()).toBe(false)
  })

  it('shoud add customer reward Points', () => {
    const customer = new Customer(10, 'robson')
    expect(customer.rewardPoints).toBe(0)
    customer.addRewardPoints(10)

    expect(customer.rewardPoints).toBe(10)
    customer.addRewardPoints(10)

    expect(customer.rewardPoints).toBe(20)
  })
})
