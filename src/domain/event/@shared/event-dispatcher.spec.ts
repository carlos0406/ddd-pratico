/* eslint-disable @typescript-eslint/dot-notation */
import CustomerAddressChangedEvent from '../custumer/custumer-address-changed.event'
import CustomerCreatedEvent from '../custumer/custumer-created.event'
import EnviaConsoleLogHandler from '../custumer/handler/envia-console-log.handler'
import EnviaConsoleLog1Handler from '../custumer/handler/envia-console1.handler'
import EnviaConsoleLog2Handler from '../custumer/handler/envia-console2.handler'
import { SendEmailWhenProductIsCreatedHandler } from '../product/handler/send-email-when-product-Is-created.handler'
import { ProductCreatedEvent } from '../product/product-created.event'
import { EventDispatcher } from './event-dispatcher'

describe('domain event tests', () => {
  it('should register event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
  })

  it('should unregister event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    eventDispatcher.unregisterAll()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined()
  })

  it('should notify event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    const productCreatedEvent = new ProductCreatedEvent({
      email: 'email@com.com',
      description: 'description',
      price: 100
    })
    // quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle deve ser executado
    eventDispatcher.notify(productCreatedEvent)
    expect(spyEventHandler).toHaveBeenCalled()
  })

  it('should register customer EnviaConsoleLog2Handler1', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new EnviaConsoleLog1Handler()

    eventDispatcher.register('CustomerCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler)
  })

  it('should register customer  EnviaConsoleLog2Handler2', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new EnviaConsoleLog2Handler()

    eventDispatcher.register('CustomerCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler)
  })

  it('should register customer  EnviaConsoleLogHandler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new EnviaConsoleLogHandler()

    eventDispatcher.register('CustomerCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler)
  })

  it('should register customer  all events', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new EnviaConsoleLogHandler()
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const eventHandler2 = new EnviaConsoleLog2Handler()

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler)

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2)
  })

  it('should notify customer created events', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const eventHandler2 = new EnviaConsoleLog2Handler()
    const spyEnviaConsoleLog1Handler = jest.spyOn(eventHandler1, 'handle')
    const spyEnviaConsoleLog2Handler = jest.spyOn(eventHandler2, 'handle')
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2)

    eventDispatcher.notify(new CustomerCreatedEvent({
      id: '1',
      name: 'c1'
    }))

    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled()
    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled()
  })
  it('should notify customer address changed events', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new EnviaConsoleLogHandler()
    const spyAddressChangedEvent = jest.spyOn(eventHandler, 'handle')
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler)

    eventDispatcher.notify(new CustomerAddressChangedEvent({
      id: '1',
      name: 'c1',
      address: {
        number: 10,
        street: 'robson da silva',
        city: 'parazinho'
      }
    }))

    expect(spyAddressChangedEvent).toHaveBeenCalled()
  })
})
