import { type EventInterface } from '../@shared/events.interface'

export default class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOcurred: Date
  eventData: any

  constructor (eventData: any) {
    this.dateTimeOcurred = new Date()
    this.eventData = eventData
  }
}
