import { type EventHandlerInterface } from '../../@shared/event-handler.interface'
import type CustomerAddressChangedEvent from '../custumer-address-changed.event'

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle (event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}`)
  }
}
