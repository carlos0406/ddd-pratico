import { type EventHandlerInterface } from '../../../@shared/event/event-handler.interface'
import type CustomerCreatedEvent from '../custumer-created.event'

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle (event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
