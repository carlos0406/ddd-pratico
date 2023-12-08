import { type EventHandlerInterface } from '../../../@shared/event/event-handler.interface'
import type CustomerCreatedEvent from '../custumer-created.event'

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle (event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
