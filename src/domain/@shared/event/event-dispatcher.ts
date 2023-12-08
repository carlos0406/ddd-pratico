import { type EventDispatcherInterface } from './event-dispatcher.inteface'
import { type EventHandlerInterface } from './event-handler.interface'
import { type EventInterface } from './events.interface'

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: Record<string, EventHandlerInterface[]> = {}

  get getEventHandlers (): Record<string, EventHandlerInterface[]> {
    return this.eventHandlers
  }

  notify (event: EventInterface): void {
    const eventName = event.constructor.name
    if (!this.eventHandlers[eventName]) {
      return
    }
    this.eventHandlers[eventName].forEach(handler => { handler.handle(event) })
  }

  register (eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister (eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      return
    }
    this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(handler => handler !== eventHandler)
  }

  unregisterAll (): void {
    this.eventHandlers = {}
  }
}
